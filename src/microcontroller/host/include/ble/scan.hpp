#pragma once

#include <Arduino.h>
#include <BLEAdvertisedDevice.h>
#include <BLEDevice.h>
#include <BLEScan.h>
#include <BLEUtils.h>

#include "io/console.hpp"

#define SCAN_TIME 5
#define SERVICE_UUID "ed3eef7c-441d-46af-a13f-29f9e4fb7e3a"
#define CHARACTERISTIC_UUID "6b5f1a66-7ffd-42dd-a1d5-96a9fb835d13"	// Name

using namespace std;

struct Device {
	String name;
	String address;
};

class MyAdvertisedDeviceCallbacks : public BLEAdvertisedDeviceCallbacks {
	void onResult(BLEAdvertisedDevice advertisedDevice) {
		if (advertisedDevice.haveServiceUUID() && advertisedDevice.getServiceUUID().toString() == SERVICE_UUID) {
			Console::info("Found our device! \n");

			Device device;

			device.address = advertisedDevice.getAddress().toString().c_str();
			device.name = advertisedDevice.getName().c_str();

			if (MyAdvertisedDeviceCallbacks::devices.size() == 0) {
				MyAdvertisedDeviceCallbacks::devices.push_back(device);
			} else {
				bool found = false;
				for (Device d : MyAdvertisedDeviceCallbacks::devices) {
					if (d.address == device.address) {
						found = true;
						break;
					}
				}

				if (!found) {
					MyAdvertisedDeviceCallbacks::devices.push_back(device);
				}
			}
		}
	}

public:
	static vector<Device> devices;
};

class Scan {
public:
	static Scan* getInstance();

	~Scan();

	void startScan();

private:
	Scan();

	static Scan* m_pInstance;
	BLEScan* m_pBLEScan;

	static void onScanResult(BLEAdvertisedDevice advertisedDevice);
};
