#pragma once

#include "io/console.hpp"

#define TRY_CATCH_STATEMENT(STATEMENT)                                                  \
	try {                                                                               \
		STATEMENT;                                                                      \
	} catch (const std::exception& e) {                                                 \
		Console::error("Exception on file %s:%d = %s\n", __FILE__, __LINE__, e.what()); \
		return false;                                                                   \
	} catch (...) {                                                                     \
		Console::error("Unknown exception on file %s:%d\n", __FILE__, __LINE__);        \
		return false;                                                                   \
	}                                                                                   \
	return true;