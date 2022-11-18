#pragma once
#include <Preferences.h>

class Configuration {
public:
	Configuration(char *name);
	~Configuration();

	size_t set(const char *key, String value);
	size_t set(const char *key, int value);
	size_t set(const char *key, bool value);

	String get(const char *key, String defaultValue);
	int get(const char *key, int defaultValue);
	bool get(const char *key, bool defaultValue);

private:
	Preferences m_preferences;
};