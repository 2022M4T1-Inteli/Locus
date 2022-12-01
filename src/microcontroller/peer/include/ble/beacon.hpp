#pragma once

#include <Arduino.h>
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>

class BLECallbacks : public BLEServerCallbacks {
public:
	void onConnect(BLEServer* pServer);
	void onDisconnect(BLEServer* pServer);
};

class Beacon {
public:
	static Beacon* getInstance();
	void setup();
	~Beacon();

	void setBatteryValue(float value);
	String getResquestValue();
	void resetResquestValue();

private:
	BLEServer* m_pServer;
	BLEService* m_pService;
	BLECharacteristic* m_pCharacteristicBattery;
	BLECharacteristic* m_pCharacteristicResquest;
	BLEAdvertising* m_pAdvertising;

	static Beacon* m_pInstance;
};
