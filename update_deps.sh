#!/bin/bash

# This script is hacks all the way down.
# If for some reason you've found yourself trying to run it, I'm sorry.
# -DGS 2023-06-14

source "/home/daniel/emsdk/emsdk_env.sh"

make_wasm () {
    pushd "../tree-sitter-apertium/tree-sitter-$1"
    tree-sitter generate
    tree-sitter build-wasm
    popd
    cp "../tree-sitter-apertium/tree-sitter-$1/tree-sitter-$1.wasm" wasm/
}

make_wasm rtx

make_rules () {
    pushd "../code2text-$1"
    python3 <<EOF
import json, code2text_$1.grammar
with open('../rule-explainer/rules/$1.js', 'w') as fout:
    fout.write('$1_rules = '.upper() + json.dumps(code2text_$1.grammar.base_rules, indent=2) + ';\n')
EOF
    popd
}

make_rules rtx
# TODO: js bindings for tree-sitter reject "choice" as a node name
sed -i 's/choice/_/g' rules/rtx.js

make_highlight () {
    echo "$1"'_highlight = `[' > "highlight/$1.js"
    cat "../tree-sitter-apertium/tree-sitter-$1/queries/highlights.scm" >> "highlight/$1.js"
    echo ']`;' >> "highlight/$1.js"
}

make_highlight rtx
