emcc -O3 main.c -o wasm_loader.js -sEXPORTED_FUNCTIONS=_say_hello -sEXPORTED_RUNTIME_METHODS=ccall,cwrap
