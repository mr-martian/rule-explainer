#!/bin/bash

# This script is hacks all the way down.
# If for some reason you've found yourself trying to run it, I'm sorry.
# -DGS 2023-06-14

. ../code2text/venv/bin/activate

make_wasm () {
    pushd "../tree-sitter-apertium/tree-sitter-$1"
    tree-sitter generate
    tree-sitter build --wasm
    popd
    cp "../tree-sitter-apertium/tree-sitter-$1/tree-sitter-$1.wasm" wasm/
}

if [[ "x$1" == "xall" ]]
then
    echo "recompiling wasm"
    make_wasm cg
    make_wasm lexc
    make_wasm lexd
    make_wasm rtx
    make_wasm twolc
    make_wasm xfst
fi

rm -f data.js

echo 'var WASM = [];' >> data.js
echo 'var RULES = {};' >> data.js
echo 'var HIGHLIGHT = {};' >> data.js
echo '' >> data.js

list_wasm () {
  echo "WASM.push(['$1'.toUpperCase(), 'wasm/tree-sitter-$1.wasm']);" >> data.js
  echo '' >> data.js
}

list_wasm rtx
list_wasm twolc
list_wasm cg

make_rules () {
    pushd "../code2text-$1"
    python3 <<EOF
import json, code2text_$1.grammar
with open('../rule-explainer/data.js', 'a') as fout:
    fout.write('rules.$1 = '.upper() + json.dumps(code2text_$1.grammar.base_rules, indent=2) + ';\n\n')
EOF
    popd
}

make_rules rtx
make_rules twolc
make_rules cg

make_highlight () {
    echo 'HIGHLIGHT["'$1'".toUpperCase()] = `[' >> "data.js"
    cat "../tree-sitter-apertium/tree-sitter-$1/queries/highlights.scm" | grep -v "#match" >> "data.js"
    echo ']`;' >> "data.js"
    echo '' >> data.js
}

make_highlight rtx
make_highlight twolc
make_highlight cg
