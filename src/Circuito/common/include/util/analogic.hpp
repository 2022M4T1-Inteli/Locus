#pragma once

class AnalogUtil {
public:
	static float valueToVoltage(int value) { return (value * 3.3) / 4095.0; }

	static int voltageToValue(float voltage) { return (voltage * 4095.0) / 3.3; }

	static float valueToPercentage(int value, int minValue, int maxValue) {
		return ((float)(value - minValue) / (float)(maxValue - minValue)) * 100.0;
	}
};