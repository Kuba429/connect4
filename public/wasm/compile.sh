emcc -O3 main.c -o wasm_loader.js -sEXPORTED_FUNCTIONS=_get_best_move -sEXPORTED_RUNTIME_METHODS=ccall,cwrap
