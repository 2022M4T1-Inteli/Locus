#include <Arduino.h>
#include <WiFi.h>

#include "ble/beacon.hpp"
#include "define/debug.hpp"
#include "environment/battery.hpp"
#include "environment/builtin_leds.hpp"
#include "environment/buzzer.hpp"
#include "environment/system.hpp"
#include "io/console.hpp"

#define BUZZER_BEEP_TIMES 25

void setup() {
	BuiltinLEDs::setBlue();
	System::setup();
	Buzzer::setup();

	Console::info("ESP32 MAC Address: %s\n", System::getBleMacAddress().c_str());

	Beacon::getInstance()->setup();

	delay(1000);
	BuiltinLEDs::setGreen();
}

void loop() {
	Watchdog::feed();

	Beacon::getInstance()->setBatteryValue(Battery::getBatteryPercentage());

	int request_value = Beacon::getInstance()->getResquestValue().toInt();
	String identifier = Beacon::getInstance()->getIdentifierValue();

	if (identifier != Beacon::getInstance()->getCurrentIdentifier()) {
		Console::info("Updating identifier to: %s\n", identifier);
		Beacon::getInstance()->updateCurrentIdentifier(identifier);
		System::restart();
	}

	if (request_value) {
		switch (request_value) {
			case 1:
				Console::info("Restarting ESP32\n");
				System::restart();
				break;
			case 2:
				Console::info("Locating ESP32\n");

				for (int i = 0; i < BUZZER_BEEP_TIMES; i++) {
					BuiltinLEDs::setBlack();
					Buzzer::beep();
					Watchdog::feed();
					BuiltinLEDs::setGreen();
				}

			default:
				break;
		}

		Beacon::getInstance()->resetResquestValue();
	}

	delay(1000);
}
