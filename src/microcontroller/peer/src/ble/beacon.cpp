#include "ble/beacon.hpp"

#include "define/ble.hpp"
#include "environment/battery.hpp"
#include "environment/system.hpp"

#define NAME "LOCUS_ESP32"

void BLECallbacks::onConnect(BLEServer* pServer) { Console::info("BLE connected\n"); }

void BLECallbacks::onDisconnect(BLEServer* pServer) {
	Console::info("BLE disconnected\n");
	pServer->startAdvertising();
}

Beacon* Beacon::m_pInstance = nullptr;

Beacon* Beacon::getInstance() {
	if (Beacon::m_pInstance == nullptr) {
		Beacon::m_pInstance = new Beacon();
	}

	return Beacon::m_pInstance;
}

void Beacon::setup() {
	Console::info("Initializing BLE Beacon with name: %s\n", NAME);
	BLEDevice::init(NAME);
	BLEDevice::setPower(ESP_PWR_LVL_N12);

	this->m_pServer = BLEDevice::createServer();
	this->m_pServer->setCallbacks(new BLECallbacks());
	this->m_pService = this->m_pServer->createService(LOCUS_SERVICE_UUID);
	this->m_pCharacteristicBattery =
		this->m_pService->createCharacteristic(BATTERY_CHARACTERISTIC_UUID, BLECharacteristic::PROPERTY_READ);

	this->m_pCharacteristicResquest = this->m_pService->createCharacteristic(
		REQUEST_CHARACTERISTIC_UUID, BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_WRITE);

	float batteryLevel = Battery::getBatteryPercentage();

	this->m_pCharacteristicBattery->setValue(batteryLevel);
	this->m_pCharacteristicResquest->setValue("0");

	this->m_pService->start();

	this->m_pAdvertising = this->m_pServer->getAdvertising();
	this->m_pAdvertising->addServiceUUID(LOCUS_SERVICE_UUID);
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
	delete this->m_pCharacteristicBattery;
	delete this->m_pCharacteristicResquest;
	delete this->m_pAdvertising;
}

void Beacon::setBatteryValue(float value) { this->m_pCharacteristicBattery->setValue(value); }

String Beacon::getResquestValue() { return this->m_pCharacteristicResquest->getValue().c_str(); }

void Beacon::resetResquestValue() { this->m_pCharacteristicResquest->setValue("0"); }
