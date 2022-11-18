#pragma once

#include "Arduino.h"
#include "util/analogic.hpp"

#define BATTERY_PIN 12

#define MIN_BATTERY_VOLTAGE 3.7
#define MAX_BATTERY_VOLTAGE 5.0

#define RESISTOR1 220.0
#define RESISTOR2 220.0

#define RESISTOR_DIVIDER (RESISTOR2 / (RESISTOR1 + RESISTOR2))

#define MIN_READ_BATTERY_VOLTAGE (MIN_BATTERY_VOLTAGE * RESISTOR_DIVIDER)
#define MAX_READ_BATTERY_VOLTAGE (MAX_BATTERY_VOLTAGE * RESISTOR_DIVIDER)

#define MIN_READ_BATTERY_VALUE AnalogUtil::voltageToValue(MIN_READ_BATTERY_VOLTAGE)
#define MAX_READ_BATTERY_VALUE AnalogUtil::voltageToValue(MAX_READ_BATTERY_VOLTAGE)

class Battery {
public:
	static float getBatteryVoltage() {
		return constrain(AnalogUtil::valueToVoltage(analogRead(BATTERY_PIN)) / RESISTOR_DIVIDER, 0,
						 3.3 / RESISTOR_DIVIDER);
	}

	static float getBatteryPercentage() {
		return constrain(
			AnalogUtil::valueToPercentage(analogRead(BATTERY_PIN), MIN_READ_BATTERY_VALUE, MAX_READ_BATTERY_VALUE), 0,
			100);
	}

	static bool isBatteryLow() { return Battery::getBatteryPercentage() < 25.0; }
};