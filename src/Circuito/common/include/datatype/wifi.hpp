#pragma once
#include <Arduino.h>

struct WifiConfig {
	char* ssid;
	char* password;
	unsigned char channel;
	uint8_t* macAndress;
};