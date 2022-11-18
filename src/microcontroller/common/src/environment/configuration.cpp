#include "environment/configuration.hpp"

#include <Preferences.h>

#include "io/console.hpp"

Configuration::Configuration(char *name = "self") {
	if (this->m_preferences.begin(name, false)) {
		Console::info("Preferences initialized\n");
	} else {
		Console::error("Preferences initialization failed\n");
	}
}

Configuration::~Configuration() { this->m_preferences.end(); }

size_t Configuration::set(const char *key, String value) { return this->m_preferences.putString(key, value); }

size_t Configuration::set(const char *key, int value) { return this->m_preferences.putInt(key, value); }

size_t Configuration::set(const char *key, bool value) { return this->m_preferences.putBool(key, value); }

String Configuration::get(const char *key, String defaultValue) {
	return this->m_preferences.getString(key, defaultValue);
}

int Configuration::get(const char *key, int defaultValue) { return this->m_preferences.getInt(key, defaultValue); }

bool Configuration::get(const char *key, bool defaultValue) { return this->m_preferences.getBool(key, defaultValue); }