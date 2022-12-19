#include "ble/beacon.hpp"

#include "define/ble.hpp"
#include "environment/battery.hpp"
#include "environment/configuration.hpp"
#include "environment/system.hpp"

#define NAMESTATIC "LOCUS_"

Configuration configuration("self");

void BLECallbacks::onConnect(BLEServer* pServer) { Console::info("BLE ping in\n"); }

void BLECallbacks::onDisconnect(BLEServer* pServer) {
	Console::info("BLE ping out\n");
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
	configuration.setup();

	String identifier = configuration.getString("identifier", "unknown");
	String ble_name = NAMESTATIC + identifier;
	Console::info("Initializing BLE Beacon with name: %s\n", ble_name);

	BLEDevice::init(ble_name.c_str());
	BLEDevice::setPower(ESP_PWR_LVL_N12);

	this->m_pServer = BLEDevice::createServer();
	this->m_pServer->setCallbacks(new BLECallbacks());
	this->m_pService = this->m_pServer->createService(LOCUS_SERVICE_UUID);

	this->m_pCharacteristicBattery =
		this->m_pService->createCharacteristic(BATTERY_CHARACTERISTIC_UUID, BLECharacteristic::PROPERTY_READ);

	this->m_pCharacteristicResquest = this->m_pService->createCharacteristic(
		REQUEST_CHARACTERISTIC_UUID, BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_WRITE);

	this->m_pCharacteristicIdentifier = this->m_pService->createCharacteristic(
		IDENTIFIER_CHARACTERISTIC_UUID, BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_WRITE);

	float battery = Battery::getBatteryPercentage();
	this->m_pCharacteristicBattery->setValue(battery);

	this->m_pCharacteristicResquest->setValue("0");

	this->m_pCharacteristicIdentifier->setValue(identifier.c_str());

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

void Beacon::updateCurrentIdentifier(String identifier) {
	configuration.setString("identifier", identifier.c_str());
	this->m_pCharacteristicIdentifier->setValue(identifier.c_str());
}

String Beacon::getIdentifierValue() { return this->m_pCharacteristicIdentifier->getValue().c_str(); }

String Beacon::getCurrentIdentifier() { return configuration.getString("identifier", "unknown"); }