#pragma once

#include <Arduino.h>

#define BUZZER_PIN 9

class Buzzer {
public:
	static void setup() { pinMode(BUZZER_PIN, OUTPUT); }

	static void on() { digitalWrite(BUZZER_PIN, HIGH); }

	static void off() { digitalWrite(BUZZER_PIN, LOW); }

	static void beep() {
		on();
		delay(100);
		off();
		delay(100);
	}
};