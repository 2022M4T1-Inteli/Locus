#pragma once
#include <Preferences.h>

#include "io/console.hpp"

class Configuration {
public:
	Configuration(String name) { this->m_name = name; }
	~Configuration() { this->m_preferences.end(); }

	void setup() {
		if (this->m_preferences.begin(this->m_name.c_str(), false)) {
			Console::info("Preferences initialized\n");
		} else {
			Console::error("Preferences initialization failed\n");
		}
	}

	size_t setString(const char *key, String value) { return this->m_preferences.putString(key, value); }
	size_t setInt(const char *key, int value) { return this->m_preferences.putInt(key, value); }
	size_t setBool(const char *key, bool value) { return this->m_preferences.putBool(key, value); }

	String getString(const char *key, String defaultValue) {
		String value = this->m_preferences.getString(key, "NULL");
		if (value == "NULL") {
			this->setString(key, defaultValue);
			return defaultValue;
		}
		return value;
	}
	int getInt(const char *key, int defaultValue) { return this->m_preferences.getInt(key, defaultValue); }
	bool getBool(const char *key, bool defaultValue) { return this->m_preferences.getBool(key, defaultValue); }

private:
	Preferences m_preferences;
	String m_name;
};