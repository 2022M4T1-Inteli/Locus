#pragma once
#include <Arduino.h>
#include <WiFi.h>

#include "io/console.hpp"
#include "util/macaddress.hpp"
#include "watchdog.hpp"
#ifdef ESP32S3
#	include "temperature.hpp"
#endif

class System {
public:
	static void setup() {
		Serial.begin(115200);

		Console::info("System: Initializing submodules:\n");
#ifdef ESP32S3
		Temperature::init();
#endif
		Watchdog::init();
		Console::info("System: Initialized\n");
	}

	static void restart() { ESP.restart(); }

	static String getChipId() {
		uint32_t chipId = 0;
		for (int i = 0; i < 17; i = i + 8) {
			chipId |= ((ESP.getEfuseMac() >> (40 - i)) & 0xff) << i;
		}
		return String(chipId, HEX);
	}

	static String getWifiMacAddress() { return WiFi.macAddress(); }

	static String getWifiApMacAddress() { return WiFi.softAPmacAddress(); }

	static String getBleMacAddress() {
		uint8_t baseMac[6];
		esp_read_mac(baseMac, ESP_MAC_BT);
		return MacAddressUtil::macToString(baseMac);
	}
};