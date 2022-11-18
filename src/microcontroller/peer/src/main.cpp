#include <Arduino.h>
#include <WiFi.h>

#include "ble/beacon.hpp"
#include "define/debug.hpp"
#include "environment/system.hpp"
#include "io/console.hpp"

void setup() {
	System::setup();

	Console::info("ESP32 MAC Address: %s\n", System::getBleMacAddress().c_str());

	Beacon *beacon = Beacon::getInstance();

	delay(1000);
}

void loop() {
	Watchdog::feed();
	delay(1000);
}
