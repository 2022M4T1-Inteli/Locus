#pragma once
#include "io/console.hpp"

#define DEBUG

#ifdef DEBUG
#	define DBG(...) Console::debug(__VA_ARGS__)
#else
#	define DBG(...)
#endif