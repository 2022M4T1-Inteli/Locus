#include "ble/scan.hpp"

Scan* Scan::m_pInstance = nullptr;

Scan* Scan::getInstance() {
	if (m_pInstance == nullptr) {
		m_pInstance = new Scan();
	}

	return m_pInstance;
}

Scan::~Scan() { delete m_pBLEScan; }

Scan::Scan() {
	BLEDevice::init("");

	BLEDevice::setPower(ESP_PWR_LVL_P18);
	this->devices = vector<Device>();
	this->m_pBLEScan = BLEDevice::getScan();
	this->m_pBLEScan->setInterval(1349);
	this->m_pBLEScan->setWindow(449);
	this->m_pBLEScan->setActiveScan(true);
}

void Scan::onResult(BLEAdvertisedDevice advertisedDevice) {
	if (advertisedDevice.haveServiceUUID() && advertisedDevice.getServiceUUID().toString() == LOCUS_SERVICE_UUID) {
		Console::info("Found locus device: %s\n", advertisedDevice.toString().c_str());
		Device device;

		device.address = advertisedDevice.getAddress().toString().c_str();
		device.rssi = advertisedDevice.getRSSI();
		Console::info("\tDevice rssi: %d\n", advertisedDevice.getRSSI());

		BLEClient* pClient = BLEDevice::createClient();

		pClient->connect(&advertisedDevice);

		BLERemoteService* pRemoteService = pClient->getService(LOCUS_SERVICE_UUID);

		if (pRemoteService == nullptr) {
			pClient->disconnect();
			return;
		}

		BLERemoteCharacteristic* pRemoteBatteryCharacteristic = pRemoteService->getCharacteristic(BATTERY_CHARACTERISTIC_UUID);
		BLERemoteCharacteristic* pRemoteIdentifierCharacteristic =
			pRemoteService->getCharacteristic(IDENTIFIER_CHARACTERISTIC_UUID);

		if (pRemoteBatteryCharacteristic != nullptr && pRemoteBatteryCharacteristic->canRead()) {
			float value = pRemoteBatteryCharacteristic->readFloat();
			Console::info("Battery value: %s\n", String(value));
			device.batteryLevel = value;
		}

		if (pRemoteIdentifierCharacteristic != nullptr && pRemoteIdentifierCharacteristic->canRead()) {
			std::string value = pRemoteIdentifierCharacteristic->readValue();
			Console::info("Identifier value: %s\n", value.c_str());
			device.name = value.c_str();
		}

		pClient->disconnect();

		this->devices.push_back(device);
	}
}

void Scan::scan() {
	Scan::getInstance()->devices.clear();

	BLEScanResults foundDevices = this->m_pBLEScan->start(SCAN_TIME, false);
	Console::info("Devices found: %d\n", foundDevices.getCount());

	for (int i = 0; i < foundDevices.getCount(); i++) {
		BLEAdvertisedDevice device = foundDevices.getDevice(i);
		this->onResult(device);
	}

	this->m_pBLEScan->clearResults();
}

void Scan::setCommandCaracteristicToMacAddress(String macAddress) {
	BLEClient* pClient = BLEDevice::createClient();

	pClient->connect(BLEAddress(macAddress.c_str()));

	BLERemoteService* pRemoteService = pClient->getService(LOCUS_SERVICE_UUID);

	if (pRemoteService == nullptr) {
		pClient->disconnect();
		return;
	}

	BLERemoteCharacteristic* pRemoteCommandCharacteristic = pRemoteService->getCharacteristic(REQUEST_CHARACTERISTIC_UUID);

	if (pRemoteCommandCharacteristic != nullptr && pRemoteCommandCharacteristic->canWrite()) {
		pRemoteCommandCharacteristic->writeValue("2");
	}

	pClient->disconnect();
}