/**
 * @file temperature.hpp
 * @breif: Contains the temperature static class for the environment.
 * @description: The temperature class is used to get the temperature of internal temperature sensor of the
 * microcontroller, which is used to monitor the temperature.
 */

#pragma once

#include "driver/temp_sensor.h"
#include "io/console.hpp"

class Temperature {
public:
	static void init() {
		Console::info("Temperature: Initializing\n");
		temp_sensor_config_t temp_sensor = TSENS_CONFIG_DEFAULT();
		temp_sensor.dac_offset = TSENS_DAC_L2;	// L2 = -10℃ ~ 80℃
		temp_sensor_set_config(temp_sensor);
		temp_sensor_start();
		Console::info("Temperature: Initialized!\n");
	}

	static float getTemperature() {
		float temperature = 0;
		temp_sensor_read_celsius(&temperature);
		return temperature;
	}
};
