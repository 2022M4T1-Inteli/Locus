#pragma once

#include <Arduino.h>
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
	float batteryLevel;
	int rssi;
};

class Scan {
public:
	static Scan* getInstance();

	~Scan();

	void scan();
	void onResult(BLEAdvertisedDevice advertisedDevice);

	vector<Device> devices;

private:
	Scan();

	static Scan* m_pInstance;
	BLEScan* m_pBLEScan;
};
