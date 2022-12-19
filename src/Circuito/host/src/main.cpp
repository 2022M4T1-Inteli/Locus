#include <Arduino.h>
#include <ArduinoJson.h>
#include <WebSocketClient.h>

#include "ble/scan.hpp"
#include "environment/builtin_leds.hpp"
#include "environment/system.hpp"

const char* ssid = "Inteli-COLLEGE";
const char* password = "QazWsx@123";

vector<Device> devices_list;
WebSocketClient webSocketClient;
WiFiClient client;

void setup_websockets() {
	if (client.connect("10.128.65.234", 3131)) {
		Serial.println("Connected");
	} else {
		BuiltinLEDs::setRed();
		Serial.println("Connection failed.");
		System::restart();
	}

	Console::info("Connecting to websocket server");
	char path[] = "/";
	char host[] = "10.128.65.234:3131";

	webSocketClient.path = path;
	webSocketClient.host = host;

	if (webSocketClient.handshake(client)) {
		Console::info("Connected to websocket server: %s\n", host);
	} else {
		BuiltinLEDs::setRed();
		Console::info("Connection failed to websocket server: %s\n", host);
		System::restart();
	}
}

void send(String event, vector<Device> devices_to_send) {
	if (!client.connected()) {
		BuiltinLEDs::setRed();
		Console::info("Not connected to websocket server\n");
		System::restart();
		return;
	}

	StaticJsonDocument<1024> doc;
	doc["macaddress"] = WiFi.macAddress();
	doc["name"] = String("L2");
	doc["event"] = event;

	JsonArray devices = doc.createNestedArray("devices");
	for (int i = 0; i < devices_to_send.size(); i++) {
		JsonObject device = devices_to_send[i].to_json();
		devices.add(device);
	}

	String json;
	serializeJson(doc, json);

	webSocketClient.sendData(json);
}

void setup() {
	BuiltinLEDs::setBlue();
	System::setup();
	WiFi.mode(WIFI_STA);
	WiFi.begin(ssid, password);

	Console::printf("Connecting to WiFi..");
	while (WiFi.status() != WL_CONNECTED) {
		delay(500);
		Console::printf(".");
	}
	Console::printf("Connected!\n");

	Console::info("IP address: %s\n", WiFi.localIP().toString().c_str());

	delay(1000);

	setup_websockets();
	BuiltinLEDs::setGreen();
}

void loop() {
	Watchdog::feed();
	Scan::getInstance()->scan();

	Console::info("Devices locus found in list: \n");
	for (int i = 0; i < devices_list.size(); i++) {
		Console::printf("\tDevice %d: %s\n", i, devices_list[i].name.c_str());
	}

	Console::printf("\n");

	devices_list = Scan::getInstance()->devices;

	send("update_devices", devices_list);

	String data = "";
	webSocketClient.getData(data);
	if (data.length() > 0) {
		Console::info("Received data: %s\n", data.c_str());
		for (int i = 0; i < devices_list.size(); i++) {
			if (devices_list[i].address == data) {
				Console::info("Device for location %s found!!\n", data.c_str());

				Scan::getInstance()->setCommandCaracteristicToMacAddress(data);

				webSocketClient.sendData("{\"event\":\"reset_locator\"}");
				break;
			}
		}
	}
	delay(1000);
}
