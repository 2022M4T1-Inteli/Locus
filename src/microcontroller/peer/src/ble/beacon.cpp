#include "ble/beacon.hpp"

#include "environment/system.hpp"

#define SERVICE_UUID "ed3eef7c-441d-46af-a13f-29f9e4fb7e3a"
#define CHARACTERISTIC_UUID "6b5f1a66-7ffd-42dd-a1d5-96a9fb835d13"
#define NAME "ESP32PEER_1"

Beacon* Beacon::m_pInstance = nullptr;

Beacon* Beacon::getInstance() {
	if (Beacon::m_pInstance == nullptr) {
		Beacon::m_pInstance = new Beacon();
	}

	return Beacon::m_pInstance;
}

Beacon::Beacon() {
	Console::info("Initializing BLE Beacon with name: %s\n", NAME);
	BLEDevice::init(NAME);

	this->m_pServer = BLEDevice::createServer();
	this->m_pService = this->m_pServer->createService(SERVICE_UUID);
	this->m_pCharacteristic = this->m_pService->createCharacteristic(
		CHARACTERISTIC_UUID, BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_WRITE);

	this->m_pCharacteristic->setValue("100");

	this->m_pService->start();

	this->m_pAdvertising = this->m_pServer->getAdvertising();
	this->m_pAdvertising->addServiceUUID(SERVICE_UUID);
	this->m_pAdvertising->setScanResponse(true);
	this->m_pAdvertising->setMinPreferred(0x06);
	this->m_pAdvertising->setMinPreferred(0x12);
	BLEDevice::startAdvertising();
	Console::info("BLE Beacon initialized!\n");
}

Beacon::~Beacon() {
	BLEDevice::deinit(true);

	delete this->m_pServer;
	delete this->m_pService;
	delete this->m_pCharacteristic;
	delete this->m_pAdvertising;
}

void Beacon::setCharacteristicValue(String value) { this->m_pCharacteristic->setValue(value.c_str()); }
