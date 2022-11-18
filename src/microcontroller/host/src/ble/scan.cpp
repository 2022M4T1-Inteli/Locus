#include "ble/scan.hpp"

vector<Device> MyAdvertisedDeviceCallbacks::devices = vector<Device>();
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
	m_pBLEScan = BLEDevice::getScan();
	m_pBLEScan->setAdvertisedDeviceCallbacks(new MyAdvertisedDeviceCallbacks());
	m_pBLEScan->setInterval(100);
	m_pBLEScan->setWindow(99);
	m_pBLEScan->setActiveScan(true);
}

void Scan::startScan() {
	BLEScanResults foundDevices = this->m_pBLEScan->start(SCAN_TIME, false);
	this->m_pBLEScan->clearResults();
}