#pragma once
#include <Arduino.h>

#include "datatype/color.hpp"

#define RGB_BRIGHTNESS 64

class BuiltinLEDs {
public:
	static void on() { digitalWrite(RGB_BUILTIN, HIGH); };
	static void off() { digitalWrite(RGB_BUILTIN, LOW); };
	static void toggle() { digitalWrite(RGB_BUILTIN, !digitalRead(RGB_BUILTIN)); };

	static void setRed() { neopixelWrite(RGB_BUILTIN, RGB_BRIGHTNESS, 0, 0); }
	static void setGreen() { neopixelWrite(RGB_BUILTIN, 0, RGB_BRIGHTNESS, 0); }
	static void setBlue() { neopixelWrite(RGB_BUILTIN, 0, 0, RGB_BRIGHTNESS); }
	static void setBlack() { neopixelWrite(RGB_BUILTIN, 0, 0, 0); }

	static void setColor(RGB rgb) { neopixelWrite(RGB_BUILTIN, rgb.r, rgb.g, rgb.b); }
	static void setColor(uint8_t r, uint8_t g, uint8_t b) { BuiltinLEDs::setColor(RGB{r, g, b}); }
};