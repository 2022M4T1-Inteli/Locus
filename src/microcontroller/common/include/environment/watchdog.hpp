/**
 * @file watchdog.hpp
 * @breif: Contains the watchdog static class for the environment.
 * @description: The watchdog class is used to monitor the environment of the program, the main functionality is when
 * the program run as normal, the watchdog will not do anything, but when the program is in a deadlock state, the
 * watchdog will kill the program and restart the microcontroller.
 */

#pragma once

#include <esp_task_wdt.h>

#include "io/console.hpp"

#define WDT_TIMEOUT 10000  // ms

class Watchdog {
public:
	static void init() {
		Console::info("Watchdog: Initializing\n");
		esp_task_wdt_init(WDT_TIMEOUT, true);
		esp_task_wdt_add(NULL);
		Console::info("Watchdog: Initialized with timeout of %i ms!\n", WDT_TIMEOUT);
	}

	static void feed() { esp_task_wdt_reset(); }
};