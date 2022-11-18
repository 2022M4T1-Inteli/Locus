#pragma once

#include <Arduino.h>

class MacAddressUtil {
public:
	static String macToString(uint8_t *mac) {
		String macString = "";
		for (int i = 0; i < 6; i++) {
			macString += String(mac[i], HEX);
			if (i < 5) {
				macString += ":";
			}
		}
		return macString;
	}

	static uint8_t *stringToMac(String macString) {
		uint8_t *mac = new uint8_t[6];
		int index = 0;
		int start = 0;
		int end = 0;
		while ((end = macString.indexOf(":", start)) != -1) {
			mac[index] = (uint8_t)strtol(macString.substring(start, end).c_str(), NULL, 16);
			start = end + 1;
			index++;
		}
		mac[index] = (uint8_t)strtol(macString.substring(start).c_str(), NULL, 16);
		return mac;
	}
};