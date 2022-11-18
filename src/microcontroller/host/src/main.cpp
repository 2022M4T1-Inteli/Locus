#include <Arduino.h>
#include <ArduinoJson.h>
#include <ESPAsyncWebServer.h>

#include "ble/scan.hpp"
#include "environment/system.hpp"

const char* ssid = "casa_da_luna";
const char* password = "qwer1234";

AsyncWebServer server(80);

void setup() {
	System::setup();
	WiFi.begin(ssid, password);
	while (WiFi.status() != WL_CONNECTED) {
		delay(1000);
		Serial.println("Connecting to WiFi..");
	}

	Console::info("IP address: %s\n", WiFi.localIP().toString().c_str());

	server.on("/devices", HTTP_GET, [](AsyncWebServerRequest* request) {
		StaticJsonDocument<200> doc;
		JsonArray devices = doc.createNestedArray("devices");

		for (Device device : MyAdvertisedDeviceCallbacks::devices) {
			JsonObject deviceJson = devices.createNestedObject();
			deviceJson["address"] = device.address;
			deviceJson["name"] = device.name;
		}

		String output;
		serializeJson(doc, output);
		request->send(200, "application/json", output);
	});

	server.begin();
}

void loop() {
	Watchdog::feed();
	Scan::getInstance()->startScan();
	delay(1000);

	Console::info("Devices found in list: ");
	for (Device device : MyAdvertisedDeviceCallbacks::devices) {
		Console::info("%s, ", device.address.c_str());
		Console::info("%s \n", device.name.c_str());
	}
}