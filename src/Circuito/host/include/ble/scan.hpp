#pragma once

#include <Arduino.h>
#include <ArduinoJson.h>
#include <BLEAdvertisedDevice.h>
#include <BLEDevice.h>
#include <BLEScan.h>
#include <BLEUtils.h>

#include "ble/scan.hpp"
#include "define/ble.hpp"
#include "io/console.hpp"

#define SCAN_TIME 5

using namespace std;

struct Device {
	String name;
	String address;
	int batteryLevel;
	int rssi;

	JsonObject to_json() {
		StaticJsonDocument<200> doc;
		doc["name"] = name;
		doc["macaddress"] = address;
		doc["battery_level"] = batteryLevel;
		String rssi_string = String(float(rssi), 2);
		doc["rssi"] = rssi_string;

		JsonObject output = doc.as<JsonObject>();
		return output;
	}
};

class Scan {
public:
	static Scan* getInstance();

	~Scan();

	void scan();
	void onResult(BLEAdvertisedDevice advertisedDevice);
	void setCommandCaracteristicToMacAddress(String macAddress);

	vector<Device> devices;

private:
	Scan();

	static Scan* m_pInstance;
	BLEScan* m_pBLEScan;
};
