#pragma once

#include <Arduino.h>
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>

class Beacon {
public:
	static Beacon* getInstance();

	~Beacon();

	void setCharacteristicValue(String value);

private:
	Beacon();

	BLEServer* m_pServer;
	BLEService* m_pService;
	BLECharacteristic* m_pCharacteristic;
	BLEAdvertising* m_pAdvertising;

	static Beacon* m_pInstance;
};
