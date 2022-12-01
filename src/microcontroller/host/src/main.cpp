#include <Arduino.h>
#include <ArduinoJson.h>
#include <ESPAsyncWebServer.h>

#include "ble/scan.hpp"
#include "environment/system.hpp"

const char* ssid = "esp32locus";
const char* password = "qwer1234";

AsyncWebServer server(80);

vector<Device> devices_list;

void setup() {
	System::setup();
	WiFi.softAP(ssid, password);

	// while (WiFi.status() != WL_CONNECTED) {
	//	delay(1000);
	//	Serial.println("Connecting to WiFi..");
	// }

	Console::info("IP address: %s\n", WiFi.softAPIP().toString().c_str());

	server.on("/devices", HTTP_GET, [](AsyncWebServerRequest* request) {
		StaticJsonDocument<200> doc;
		JsonArray devices = doc.createNestedArray("devices");

		for (int i = 0; i < devices_list.size(); i++) {
			JsonObject device = devices.createNestedObject();
			device["name"] = devices_list[i].name;
			device["address"] = devices_list[i].address;
			device["batteryLevel"] = devices_list[i].batteryLevel;
			device["rssi"] = devices_list[i].rssi;
		}

		String output;
		serializeJson(doc, output);
		request->send(200, "application/json", output);
	});

	server.begin();
}

void loop() {
	Watchdog::feed();
	Scan::getInstance()->scan();

	Console::info("Devices locus found in list: \n");
	for (int i = 0; i < devices_list.size(); i++) {
		Console::printf("\tDevice %d: %s\n", i, devices_list[i].name.c_str());
	}
	devices_list = Scan::getInstance()->devices;
	delay(1000);
}