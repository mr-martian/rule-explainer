#!/bin/bash

# Yes, these paths are specific to my machine
# I'm providing this script in the hope that it will be mildly
# illuminating of where to find a solution, since I don't know
# how to make a more general solution. - Daniel 2022-12-27

PATH="/home/daniel/emsdk:/home/daniel/emsdk/node/14.18.2_64bit/bin:/home/daniel/emsdk/upstream/emscripten:$PATH"

compile_lang () {
    (
        cd "/home/daniel/apertium/tree-sitter-apertium/tree-sitter-$1" && \
            pwd && \
            tree-sitter build-wasm && \
            cp *.wasm ../../rule-explainer/wasm
    )
}

time compile_lang cg
time compile_lang lexc
time compile_lang lexd
time compile_lang rtx
time compile_lang twolc
time compile_lang xfst
