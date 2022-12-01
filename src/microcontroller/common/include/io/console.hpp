#pragma once
#include <Arduino.h>

class Console {
public:
	static void setup() { Serial.begin(115200); }

	static void _printf(const char* format, const char* type, va_list args) {
		if (type != NULL) {
			Serial.printf("[%s] ", type);
		}

		vprintf(format, args);

		va_end(args);
	}

	static void printf(const char* format, ...) {
		va_list args;
		va_start(args, format);

		Console::_printf(format, NULL, args);
	}

	static void info(const char* format, ...) {
		va_list args;
		va_start(args, format);
		Console::_printf(format, "INFO", args);
		va_end(args);
	}

	static void warn(const char* format, ...) {
		va_list args;
		va_start(args, format);
		Console::_printf(format, "WARN", args);
		va_end(args);
	}

	static void error(const char* format, ...) {
		va_list args;
		va_start(args, format);
		Console::_printf(format, "ERROR", args);
		va_end(args);
	}

	static void debug(const char* format, ...) {
		va_list args;
		va_start(args, format);
		Console::_printf(format, "DEBUG", args);
		va_end(args);
	}
};