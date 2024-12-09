var WASM = [];
var RULES = {};
var HIGHLIGHT = {};

WASM.push(['rtx'.toUpperCase(), 'wasm/tree-sitter-rtx.wasm']);

WASM.push(['twolc'.toUpperCase(), 'wasm/tree-sitter-twolc.wasm']);

WASM.push(['cg'.toUpperCase(), 'wasm/tree-sitter-cg.wasm']);

RULES.RTX = [
  {
    "pattern": "[\"{\" \"}\" (comment)] @root",
    "output": ""
  },
  {
    "pattern": "\n(source_file\n  [(attr_rule) (output_rule) (retag_rule) (reduce_rule_group)] @thing_list\n) @root",
    "output": [
      {
        "lists": {
          "thing_list": {
            "join": "\n\n",
            "html_type": "p"
          }
        },
        "output": "{thing_list}"
      }
    ]
  },
  {
    "pattern": "(source_file) @root",
    "output": ""
  },
  {
    "pattern": "\n(attr_rule\n  name: (ident) @name\n  (attr_default src: (ident) @src trg: (_) @trg_text)\n  [(ident) (string) (attr_set_insert)] @tag_list\n) @root",
    "output": [
      {
        "lists": {
          "tag_list": {
            "join": ", "
          }
        },
        "output": "Define the tag category {name} as consisting of {tag_list}, and if this category is not present, then insert {src} while parsing and replace it with {trg_text} when outputting."
      }
    ]
  },
  {
    "pattern": "\n(attr_rule\n  name: (ident) @name\n  [(ident) (string) (attr_set_insert)] @tag_list\n) @root",
    "output": [
      {
        "lists": {
          "tag_list": {
            "join": ", "
          }
        },
        "output": "Define the list {name} as consisting of {tag_list}."
      }
    ]
  },
  {
    "pattern": "(attr_rule \"@\" . (ident) @root_text)",
    "output": "{root_text} (which cannot be overwritten when copying tags from a chunk)"
  },
  {
    "pattern": "(attr_set_insert (ident) @set_text) @root",
    "output": "all the tags in {set_text}"
  },
  {
    "pattern": "(output_rule pos: (ident) @pos (magic)) @root",
    "output": "When outputting {pos}, just copy the tags from the input."
  },
  {
    "pattern": "(output_rule pos: (ident) @pos [(ident) (lit_tag)] @tag_list) @root",
    "output": [
      {
        "lists": {
          "tag_list": {
            "join": ", "
          }
        },
        "output": "When outputting {pos}, put the following: {tag_list}."
      }
    ]
  },
  {
    "pattern": "(output_rule (ident) @root (#eq? @root \"_\"))",
    "output": "the part of speech tag"
  },
  {
    "pattern": "(output_rule (lit_tag (ident) @tag) @root)",
    "output": "the literal tag {tag}"
  },
  {
    "pattern": "(output_rule pos: (ident) (ident) @root_text)",
    "output": "the {root_text} tag"
  },
  {
    "pattern": "\n(output_rule\n  pos: (ident) @pos\n  (lu_cond . (choice (always_tok) value: (_) @val) .)\n) @root",
    "output": "When outputting {pos}, put {val}."
  },
  {
    "pattern": "\n(output_rule pos: (ident) @pos (lu_cond (choice) @op_list)) @root\n        ",
    "output": [
      {
        "lists": {
          "op_list": {
            "join": "\n",
            "html_type": "ol"
          }
        },
        "output": "When outputting {pos}, use the first applicable rule from:\n{op_list}"
      }
    ]
  },
  {
    "pattern": "(lu_cond (choice cond: (_) @cond value: (_) @val) @root)",
    "output": "If {cond}, put {val}."
  },
  {
    "pattern": "(lu_cond (choice (else_tok) value: (_) @val) @root)",
    "output": "Otherwise, put {val}."
  },
  {
    "pattern": "(string_cond (choice) @c_list) @root",
    "output": [
      {
        "lists": {
          "c_list": {
            "join": "\n",
            "html_type": "ol"
          }
        },
        "output": "the first of the following that applies:\n{c_list}\n"
      }
    ]
  },
  {
    "pattern": "(string_cond (choice cond: (_) @cond value: (_) @val) @root)",
    "output": "If {cond}, then {val}."
  },
  {
    "pattern": "(string_cond (choice value: (_) @val) @root)",
    "output": "Otherwise, {val}."
  },
  {
    "pattern": "(condition . \"(\" (_) @thing_list \")\" .) @root",
    "output": [
      {
        "lists": {
          "thing_list": {
            "join": " "
          }
        },
        "output": "{thing_list}"
      }
    ]
  },
  {
    "pattern": "(and) @root",
    "output": "and"
  },
  {
    "pattern": "(or) @root",
    "output": "or"
  },
  {
    "pattern": "(not) @root",
    "output": "not"
  },
  {
    "pattern": "(str_op (_) @op) @root",
    "output": "{op}"
  },
  {
    "pattern": "((str_op_eq) @root (#match? @root \".*[cCfF].*\"))",
    "output": "equals (ignoring capitalization)"
  },
  {
    "pattern": "(str_op_eq) @root",
    "output": "="
  },
  {
    "pattern": "((str_op_isprefix) @root (#match? @root \".*[cCdD].*\"))",
    "output": "starts with (ignoring capitalization)"
  },
  {
    "pattern": "(str_op_isprefix) @root",
    "output": "starts with"
  },
  {
    "pattern": "((str_op_hasprefix) @root (#match? @root \".*[cCdD].*\"))",
    "output": "starts with (ignoring capitalization) an element of"
  },
  {
    "pattern": "(str_op_hasprefix) @root",
    "output": "starts with an element of"
  },
  {
    "pattern": "((str_op_issuffix) @root (#match? @root \".*[cClL].*\"))",
    "output": "ends with (ignoring capitalization)"
  },
  {
    "pattern": "(str_op_issuffix) @root",
    "output": "ends with"
  },
  {
    "pattern": "((str_op_hassuffix) @root (#match? @root \".*[cCoO].*\"))",
    "output": "ends with (ignoring capitalization) an element of"
  },
  {
    "pattern": "(str_op_hassuffix) @root",
    "output": "ends with an element of"
  },
  {
    "pattern": "((str_op_in) @root (#match? @root \".*[cCfF].*\"))",
    "output": "is (ignoring capitalization) an element of"
  },
  {
    "pattern": "(str_op_in) @root",
    "output": "is an element of"
  },
  {
    "pattern": "((str_op_contains) @root (#match? @root \".*[lLfF].*\"))",
    "output": "contains (ignoring capitalization)"
  },
  {
    "pattern": "(str_op_contains) @root",
    "output": "contains"
  },
  {
    "pattern": "(reduce_rule_group . (ident) @pos . (arrow) (reduce_rule) @rule_list) @root",
    "output": [
      {
        "lists": {
          "rule_list": {
            "join": "\n",
            "html_type": "ul"
          }
        },
        "output": "{pos} phrases can be constructed according to the following rules:\n{rule_list}"
      }
    ]
  },
  {
    "pattern": "\n(reduce_rule\n  rule_name: (string)? @name_text\n  (weight)? @weight_text\n  [(pattern_element) (unknown)] @pattern_list\n  (condition)? @cond\n  [(set_surf) (set_global_var) (set_global_str) (set_chunk_attr)]? @set_list\n  (reduce_output) @output\n) @root",
    "output": [
      {
        "lists": {
          "pattern_list": {
            "join": ", ",
            "html_type": "ol"
          }
        },
        "output": "When parsing, match {pattern_list}, and when outputting, put {output}."
      }
    ]
  },
  {
    "pattern": "(reduce_output . \"{\" (_) @thing_list \"}\" .) @root",
    "output": [
      {
        "lists": {
          "thing_list": {
            "join": ", ",
            "html_type": "ol"
          }
        },
        "output": "{thing_list}"
      }
    ]
  },
  {
    "pattern": "(unknown) @root",
    "output": "an unknown word"
  },
  {
    "pattern": "\n(pattern_element\n  (magic)? @magic\n  lemma: [(ident) (string) (attr_set_insert)]? @lemma\n  . (ident) @pos\n  (\".\" . [(ident) (attr_set_insert) (string)] @tag_list)?\n  (pattern_clip)? @set_list\n) @root",
    "output": [
      {
        "cond": [
          {
            "has": "magic"
          },
          {
            "has": "set_list"
          },
          {
            "has": "tag_list"
          },
          {
            "has": "lemma"
          }
        ],
        "output": "a word with {lemma} and part-of-speech tag {pos} followed by {tag_list}, from which copy the tags {set_list}, from which copy any tag needed by the chunk which is not specified somewhere else",
        "lists": {
          "set_list": {
            "join": ", "
          },
          "tag_list": {
            "join": ", "
          }
        }
      },
      {
        "cond": [
          {
            "has": "magic"
          },
          {
            "has": "set_list"
          },
          {
            "has": "tag_list"
          }
        ],
        "output": "a word with part-of-speech tag {pos} followed by {tag_list}, from which copy the tags {set_list}, from which copy any tag needed by the chunk which is not specified somewhere else",
        "lists": {
          "set_list": {
            "join": ", "
          },
          "tag_list": {
            "join": ", "
          }
        }
      },
      {
        "cond": [
          {
            "has": "magic"
          },
          {
            "has": "set_list"
          },
          {
            "has": "lemma"
          }
        ],
        "output": "a word with {lemma} and part-of-speech tag {pos}, from which copy the tags {set_list}, from which copy any tag needed by the chunk which is not specified somewhere else",
        "lists": {
          "set_list": {
            "join": ", "
          },
          "tag_list": {
            "join": ", "
          }
        }
      },
      {
        "cond": [
          {
            "has": "magic"
          },
          {
            "has": "set_list"
          }
        ],
        "output": "a word with part-of-speech tag {pos}, from which copy the tags {set_list}, from which copy any tag needed by the chunk which is not specified somewhere else",
        "lists": {
          "set_list": {
            "join": ", "
          },
          "tag_list": {
            "join": ", "
          }
        }
      },
      {
        "cond": [
          {
            "has": "magic"
          },
          {
            "has": "tag_list"
          },
          {
            "has": "lemma"
          }
        ],
        "output": "a word with {lemma} and part-of-speech tag {pos} followed by {tag_list}, from which copy any tag needed by the chunk which is not specified somewhere else",
        "lists": {
          "set_list": {
            "join": ", "
          },
          "tag_list": {
            "join": ", "
          }
        }
      },
      {
        "cond": [
          {
            "has": "magic"
          },
          {
            "has": "tag_list"
          }
        ],
        "output": "a word with part-of-speech tag {pos} followed by {tag_list}, from which copy any tag needed by the chunk which is not specified somewhere else",
        "lists": {
          "set_list": {
            "join": ", "
          },
          "tag_list": {
            "join": ", "
          }
        }
      },
      {
        "cond": [
          {
            "has": "magic"
          },
          {
            "has": "lemma"
          }
        ],
        "output": "a word with {lemma} and part-of-speech tag {pos}, from which copy any tag needed by the chunk which is not specified somewhere else",
        "lists": {
          "set_list": {
            "join": ", "
          },
          "tag_list": {
            "join": ", "
          }
        }
      },
      {
        "cond": [
          {
            "has": "magic"
          }
        ],
        "output": "a word with part-of-speech tag {pos}, from which copy any tag needed by the chunk which is not specified somewhere else",
        "lists": {
          "set_list": {
            "join": ", "
          },
          "tag_list": {
            "join": ", "
          }
        }
      },
      {
        "cond": [
          {
            "has": "set_list"
          },
          {
            "has": "tag_list"
          },
          {
            "has": "lemma"
          }
        ],
        "output": "a word with {lemma} and part-of-speech tag {pos} followed by {tag_list}, from which copy the tags {set_list}",
        "lists": {
          "set_list": {
            "join": ", "
          },
          "tag_list": {
            "join": ", "
          }
        }
      },
      {
        "cond": [
          {
            "has": "set_list"
          },
          {
            "has": "tag_list"
          }
        ],
        "output": "a word with part-of-speech tag {pos} followed by {tag_list}, from which copy the tags {set_list}",
        "lists": {
          "set_list": {
            "join": ", "
          },
          "tag_list": {
            "join": ", "
          }
        }
      },
      {
        "cond": [
          {
            "has": "set_list"
          },
          {
            "has": "lemma"
          }
        ],
        "output": "a word with {lemma} and part-of-speech tag {pos}, from which copy the tags {set_list}",
        "lists": {
          "set_list": {
            "join": ", "
          },
          "tag_list": {
            "join": ", "
          }
        }
      },
      {
        "cond": [
          {
            "has": "set_list"
          }
        ],
        "output": "a word with part-of-speech tag {pos}, from which copy the tags {set_list}",
        "lists": {
          "set_list": {
            "join": ", "
          },
          "tag_list": {
            "join": ", "
          }
        }
      },
      {
        "cond": [
          {
            "has": "tag_list"
          },
          {
            "has": "lemma"
          }
        ],
        "output": "a word with {lemma} and part-of-speech tag {pos} followed by {tag_list}",
        "lists": {
          "set_list": {
            "join": ", "
          },
          "tag_list": {
            "join": ", "
          }
        }
      },
      {
        "cond": [
          {
            "has": "tag_list"
          }
        ],
        "output": "a word with part-of-speech tag {pos} followed by {tag_list}",
        "lists": {
          "set_list": {
            "join": ", "
          },
          "tag_list": {
            "join": ", "
          }
        }
      },
      {
        "cond": [
          {
            "has": "lemma"
          }
        ],
        "output": "a word with {lemma} and part-of-speech tag {pos}",
        "lists": {
          "set_list": {
            "join": ", "
          },
          "tag_list": {
            "join": ", "
          }
        }
      },
      {
        "cond": [],
        "output": "a word with part-of-speech tag {pos}",
        "lists": {
          "set_list": {
            "join": ", "
          },
          "tag_list": {
            "join": ", "
          }
        }
      }
    ]
  },
  {
    "pattern": "(pattern_element (attr_prefix) . (ident) @root_text)",
    "output": "a lemma in the list {root_text}"
  },
  {
    "pattern": "(pattern_clip (ident) @attr (clip_side)? @clip) @root",
    "output": [
      {
        "cond": [
          {
            "has": "clip"
          }
        ],
        "output": "{attr} from the {clip} side"
      },
      {
        "output": "{attr}"
      }
    ]
  },
  {
    "pattern": "((clip_side) @root (#eq? @root \"/sl\"))",
    "output": "source"
  },
  {
    "pattern": "((clip_side) @root (#eq? @root \"/tl\"))",
    "output": "target"
  },
  {
    "pattern": "((clip_side) @root (#eq? @root \"/ref\"))",
    "output": "reference"
  },
  {
    "pattern": "(attr_pair src: (_) @src trg: (_) @trg) @root",
    "output": "from {src} to {trg}"
  },
  {
    "pattern": "(attr_pair [(ident) (string)] @root_text)",
    "output": "{root_text}"
  },
  {
    "pattern": "(attr_pair (attr_set_insert (ident) @set_text)) @root",
    "output": "every tag in {set_text}"
  },
  {
    "pattern": "(retag_rule src_attr: (ident) @src trg_attr: (ident) @trg (attr_pair) @pair_list) @root",
    "output": [
      {
        "lists": {
          "pair_list": {
            "join": ", "
          }
        },
        "output": "To change {src} to {trg}, change: {pair_list}."
      }
    ]
  },
  {
    "pattern": "(blank) @root",
    "output": "a space"
  },
  {
    "pattern": "\n(output_element\n  (conjoin)? @conjoin\n  (insert)? @insert\n  (inserted)? @inserted\n  (magic)? @magic\n  (num) @pos_text\n  (macro_name (ident) @macro)?\n  (output_var_set)? @vars\n) @root",
    "output": [
      {
        "cond": [
          {
            "has": "vars"
          },
          {
            "has": "insert"
          },
          {
            "has": "conjoin"
          },
          {
            "has": "magic"
          },
          {
            "has": "macro"
          },
          {
            "has": "inserted"
          }
        ],
        "output": "the word in position {pos_text}, if that position has been created by a parent chunk inserting a word into this chunk, as if it had part-of-speech tag {macro}, with all tag slots which correspond to something on the chunk being filled in by copying, which should be joined to the preceding word, which should be made a child of the preceding chunk, with the following tags being overridden: {vars}",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "vars"
          },
          {
            "has": "insert"
          },
          {
            "has": "conjoin"
          },
          {
            "has": "magic"
          },
          {
            "has": "macro"
          }
        ],
        "output": "the word in position {pos_text}, as if it had part-of-speech tag {macro}, with all tag slots which correspond to something on the chunk being filled in by copying, which should be joined to the preceding word, which should be made a child of the preceding chunk, with the following tags being overridden: {vars}",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "vars"
          },
          {
            "has": "insert"
          },
          {
            "has": "conjoin"
          },
          {
            "has": "magic"
          },
          {
            "has": "inserted"
          }
        ],
        "output": "the word in position {pos_text}, if that position has been created by a parent chunk inserting a word into this chunk, with all tag slots which correspond to something on the chunk being filled in by copying, which should be joined to the preceding word, which should be made a child of the preceding chunk, with the following tags being overridden: {vars}",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "vars"
          },
          {
            "has": "insert"
          },
          {
            "has": "conjoin"
          },
          {
            "has": "magic"
          }
        ],
        "output": "the word in position {pos_text}, with all tag slots which correspond to something on the chunk being filled in by copying, which should be joined to the preceding word, which should be made a child of the preceding chunk, with the following tags being overridden: {vars}",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "vars"
          },
          {
            "has": "insert"
          },
          {
            "has": "conjoin"
          },
          {
            "has": "macro"
          },
          {
            "has": "inserted"
          }
        ],
        "output": "the word in position {pos_text}, if that position has been created by a parent chunk inserting a word into this chunk, as if it had part-of-speech tag {macro}, which should be joined to the preceding word, which should be made a child of the preceding chunk, with the following tags being overridden: {vars}",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "vars"
          },
          {
            "has": "insert"
          },
          {
            "has": "conjoin"
          },
          {
            "has": "macro"
          }
        ],
        "output": "the word in position {pos_text}, as if it had part-of-speech tag {macro}, which should be joined to the preceding word, which should be made a child of the preceding chunk, with the following tags being overridden: {vars}",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "vars"
          },
          {
            "has": "insert"
          },
          {
            "has": "conjoin"
          },
          {
            "has": "inserted"
          }
        ],
        "output": "the word in position {pos_text}, if that position has been created by a parent chunk inserting a word into this chunk, which should be joined to the preceding word, which should be made a child of the preceding chunk, with the following tags being overridden: {vars}",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "vars"
          },
          {
            "has": "insert"
          },
          {
            "has": "conjoin"
          }
        ],
        "output": "the word in position {pos_text}, which should be joined to the preceding word, which should be made a child of the preceding chunk, with the following tags being overridden: {vars}",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "vars"
          },
          {
            "has": "insert"
          },
          {
            "has": "magic"
          },
          {
            "has": "macro"
          },
          {
            "has": "inserted"
          }
        ],
        "output": "the word in position {pos_text}, if that position has been created by a parent chunk inserting a word into this chunk, as if it had part-of-speech tag {macro}, with all tag slots which correspond to something on the chunk being filled in by copying, which should be made a child of the preceding chunk, with the following tags being overridden: {vars}",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "vars"
          },
          {
            "has": "insert"
          },
          {
            "has": "magic"
          },
          {
            "has": "macro"
          }
        ],
        "output": "the word in position {pos_text}, as if it had part-of-speech tag {macro}, with all tag slots which correspond to something on the chunk being filled in by copying, which should be made a child of the preceding chunk, with the following tags being overridden: {vars}",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "vars"
          },
          {
            "has": "insert"
          },
          {
            "has": "magic"
          },
          {
            "has": "inserted"
          }
        ],
        "output": "the word in position {pos_text}, if that position has been created by a parent chunk inserting a word into this chunk, with all tag slots which correspond to something on the chunk being filled in by copying, which should be made a child of the preceding chunk, with the following tags being overridden: {vars}",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "vars"
          },
          {
            "has": "insert"
          },
          {
            "has": "magic"
          }
        ],
        "output": "the word in position {pos_text}, with all tag slots which correspond to something on the chunk being filled in by copying, which should be made a child of the preceding chunk, with the following tags being overridden: {vars}",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "vars"
          },
          {
            "has": "insert"
          },
          {
            "has": "macro"
          },
          {
            "has": "inserted"
          }
        ],
        "output": "the word in position {pos_text}, if that position has been created by a parent chunk inserting a word into this chunk, as if it had part-of-speech tag {macro}, which should be made a child of the preceding chunk, with the following tags being overridden: {vars}",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "vars"
          },
          {
            "has": "insert"
          },
          {
            "has": "macro"
          }
        ],
        "output": "the word in position {pos_text}, as if it had part-of-speech tag {macro}, which should be made a child of the preceding chunk, with the following tags being overridden: {vars}",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "vars"
          },
          {
            "has": "insert"
          },
          {
            "has": "inserted"
          }
        ],
        "output": "the word in position {pos_text}, if that position has been created by a parent chunk inserting a word into this chunk, which should be made a child of the preceding chunk, with the following tags being overridden: {vars}",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "vars"
          },
          {
            "has": "insert"
          }
        ],
        "output": "the word in position {pos_text}, which should be made a child of the preceding chunk, with the following tags being overridden: {vars}",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "vars"
          },
          {
            "has": "conjoin"
          },
          {
            "has": "magic"
          },
          {
            "has": "macro"
          },
          {
            "has": "inserted"
          }
        ],
        "output": "the word in position {pos_text}, if that position has been created by a parent chunk inserting a word into this chunk, as if it had part-of-speech tag {macro}, with all tag slots which correspond to something on the chunk being filled in by copying, which should be joined to the preceding word, with the following tags being overridden: {vars}",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "vars"
          },
          {
            "has": "conjoin"
          },
          {
            "has": "magic"
          },
          {
            "has": "macro"
          }
        ],
        "output": "the word in position {pos_text}, as if it had part-of-speech tag {macro}, with all tag slots which correspond to something on the chunk being filled in by copying, which should be joined to the preceding word, with the following tags being overridden: {vars}",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "vars"
          },
          {
            "has": "conjoin"
          },
          {
            "has": "magic"
          },
          {
            "has": "inserted"
          }
        ],
        "output": "the word in position {pos_text}, if that position has been created by a parent chunk inserting a word into this chunk, with all tag slots which correspond to something on the chunk being filled in by copying, which should be joined to the preceding word, with the following tags being overridden: {vars}",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "vars"
          },
          {
            "has": "conjoin"
          },
          {
            "has": "magic"
          }
        ],
        "output": "the word in position {pos_text}, with all tag slots which correspond to something on the chunk being filled in by copying, which should be joined to the preceding word, with the following tags being overridden: {vars}",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "vars"
          },
          {
            "has": "conjoin"
          },
          {
            "has": "macro"
          },
          {
            "has": "inserted"
          }
        ],
        "output": "the word in position {pos_text}, if that position has been created by a parent chunk inserting a word into this chunk, as if it had part-of-speech tag {macro}, which should be joined to the preceding word, with the following tags being overridden: {vars}",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "vars"
          },
          {
            "has": "conjoin"
          },
          {
            "has": "macro"
          }
        ],
        "output": "the word in position {pos_text}, as if it had part-of-speech tag {macro}, which should be joined to the preceding word, with the following tags being overridden: {vars}",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "vars"
          },
          {
            "has": "conjoin"
          },
          {
            "has": "inserted"
          }
        ],
        "output": "the word in position {pos_text}, if that position has been created by a parent chunk inserting a word into this chunk, which should be joined to the preceding word, with the following tags being overridden: {vars}",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "vars"
          },
          {
            "has": "conjoin"
          }
        ],
        "output": "the word in position {pos_text}, which should be joined to the preceding word, with the following tags being overridden: {vars}",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "vars"
          },
          {
            "has": "magic"
          },
          {
            "has": "macro"
          },
          {
            "has": "inserted"
          }
        ],
        "output": "the word in position {pos_text}, if that position has been created by a parent chunk inserting a word into this chunk, as if it had part-of-speech tag {macro}, with all tag slots which correspond to something on the chunk being filled in by copying, with the following tags being overridden: {vars}",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "vars"
          },
          {
            "has": "magic"
          },
          {
            "has": "macro"
          }
        ],
        "output": "the word in position {pos_text}, as if it had part-of-speech tag {macro}, with all tag slots which correspond to something on the chunk being filled in by copying, with the following tags being overridden: {vars}",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "vars"
          },
          {
            "has": "magic"
          },
          {
            "has": "inserted"
          }
        ],
        "output": "the word in position {pos_text}, if that position has been created by a parent chunk inserting a word into this chunk, with all tag slots which correspond to something on the chunk being filled in by copying, with the following tags being overridden: {vars}",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "vars"
          },
          {
            "has": "magic"
          }
        ],
        "output": "the word in position {pos_text}, with all tag slots which correspond to something on the chunk being filled in by copying, with the following tags being overridden: {vars}",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "vars"
          },
          {
            "has": "macro"
          },
          {
            "has": "inserted"
          }
        ],
        "output": "the word in position {pos_text}, if that position has been created by a parent chunk inserting a word into this chunk, as if it had part-of-speech tag {macro}, with the following tags being overridden: {vars}",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "vars"
          },
          {
            "has": "macro"
          }
        ],
        "output": "the word in position {pos_text}, as if it had part-of-speech tag {macro}, with the following tags being overridden: {vars}",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "vars"
          },
          {
            "has": "inserted"
          }
        ],
        "output": "the word in position {pos_text}, if that position has been created by a parent chunk inserting a word into this chunk, with the following tags being overridden: {vars}",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "vars"
          }
        ],
        "output": "the word in position {pos_text}, with the following tags being overridden: {vars}",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "insert"
          },
          {
            "has": "conjoin"
          },
          {
            "has": "magic"
          },
          {
            "has": "macro"
          },
          {
            "has": "inserted"
          }
        ],
        "output": "the word in position {pos_text}, if that position has been created by a parent chunk inserting a word into this chunk, as if it had part-of-speech tag {macro}, with all tag slots which correspond to something on the chunk being filled in by copying, which should be joined to the preceding word, which should be made a child of the preceding chunk",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "insert"
          },
          {
            "has": "conjoin"
          },
          {
            "has": "magic"
          },
          {
            "has": "macro"
          }
        ],
        "output": "the word in position {pos_text}, as if it had part-of-speech tag {macro}, with all tag slots which correspond to something on the chunk being filled in by copying, which should be joined to the preceding word, which should be made a child of the preceding chunk",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "insert"
          },
          {
            "has": "conjoin"
          },
          {
            "has": "magic"
          },
          {
            "has": "inserted"
          }
        ],
        "output": "the word in position {pos_text}, if that position has been created by a parent chunk inserting a word into this chunk, with all tag slots which correspond to something on the chunk being filled in by copying, which should be joined to the preceding word, which should be made a child of the preceding chunk",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "insert"
          },
          {
            "has": "conjoin"
          },
          {
            "has": "magic"
          }
        ],
        "output": "the word in position {pos_text}, with all tag slots which correspond to something on the chunk being filled in by copying, which should be joined to the preceding word, which should be made a child of the preceding chunk",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "insert"
          },
          {
            "has": "conjoin"
          },
          {
            "has": "macro"
          },
          {
            "has": "inserted"
          }
        ],
        "output": "the word in position {pos_text}, if that position has been created by a parent chunk inserting a word into this chunk, as if it had part-of-speech tag {macro}, which should be joined to the preceding word, which should be made a child of the preceding chunk",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "insert"
          },
          {
            "has": "conjoin"
          },
          {
            "has": "macro"
          }
        ],
        "output": "the word in position {pos_text}, as if it had part-of-speech tag {macro}, which should be joined to the preceding word, which should be made a child of the preceding chunk",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "insert"
          },
          {
            "has": "conjoin"
          },
          {
            "has": "inserted"
          }
        ],
        "output": "the word in position {pos_text}, if that position has been created by a parent chunk inserting a word into this chunk, which should be joined to the preceding word, which should be made a child of the preceding chunk",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "insert"
          },
          {
            "has": "conjoin"
          }
        ],
        "output": "the word in position {pos_text}, which should be joined to the preceding word, which should be made a child of the preceding chunk",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "insert"
          },
          {
            "has": "magic"
          },
          {
            "has": "macro"
          },
          {
            "has": "inserted"
          }
        ],
        "output": "the word in position {pos_text}, if that position has been created by a parent chunk inserting a word into this chunk, as if it had part-of-speech tag {macro}, with all tag slots which correspond to something on the chunk being filled in by copying, which should be made a child of the preceding chunk",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "insert"
          },
          {
            "has": "magic"
          },
          {
            "has": "macro"
          }
        ],
        "output": "the word in position {pos_text}, as if it had part-of-speech tag {macro}, with all tag slots which correspond to something on the chunk being filled in by copying, which should be made a child of the preceding chunk",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "insert"
          },
          {
            "has": "magic"
          },
          {
            "has": "inserted"
          }
        ],
        "output": "the word in position {pos_text}, if that position has been created by a parent chunk inserting a word into this chunk, with all tag slots which correspond to something on the chunk being filled in by copying, which should be made a child of the preceding chunk",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "insert"
          },
          {
            "has": "magic"
          }
        ],
        "output": "the word in position {pos_text}, with all tag slots which correspond to something on the chunk being filled in by copying, which should be made a child of the preceding chunk",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "insert"
          },
          {
            "has": "macro"
          },
          {
            "has": "inserted"
          }
        ],
        "output": "the word in position {pos_text}, if that position has been created by a parent chunk inserting a word into this chunk, as if it had part-of-speech tag {macro}, which should be made a child of the preceding chunk",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "insert"
          },
          {
            "has": "macro"
          }
        ],
        "output": "the word in position {pos_text}, as if it had part-of-speech tag {macro}, which should be made a child of the preceding chunk",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "insert"
          },
          {
            "has": "inserted"
          }
        ],
        "output": "the word in position {pos_text}, if that position has been created by a parent chunk inserting a word into this chunk, which should be made a child of the preceding chunk",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "insert"
          }
        ],
        "output": "the word in position {pos_text}, which should be made a child of the preceding chunk",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "conjoin"
          },
          {
            "has": "magic"
          },
          {
            "has": "macro"
          },
          {
            "has": "inserted"
          }
        ],
        "output": "the word in position {pos_text}, if that position has been created by a parent chunk inserting a word into this chunk, as if it had part-of-speech tag {macro}, with all tag slots which correspond to something on the chunk being filled in by copying, which should be joined to the preceding word",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "conjoin"
          },
          {
            "has": "magic"
          },
          {
            "has": "macro"
          }
        ],
        "output": "the word in position {pos_text}, as if it had part-of-speech tag {macro}, with all tag slots which correspond to something on the chunk being filled in by copying, which should be joined to the preceding word",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "conjoin"
          },
          {
            "has": "magic"
          },
          {
            "has": "inserted"
          }
        ],
        "output": "the word in position {pos_text}, if that position has been created by a parent chunk inserting a word into this chunk, with all tag slots which correspond to something on the chunk being filled in by copying, which should be joined to the preceding word",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "conjoin"
          },
          {
            "has": "magic"
          }
        ],
        "output": "the word in position {pos_text}, with all tag slots which correspond to something on the chunk being filled in by copying, which should be joined to the preceding word",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "conjoin"
          },
          {
            "has": "macro"
          },
          {
            "has": "inserted"
          }
        ],
        "output": "the word in position {pos_text}, if that position has been created by a parent chunk inserting a word into this chunk, as if it had part-of-speech tag {macro}, which should be joined to the preceding word",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "conjoin"
          },
          {
            "has": "macro"
          }
        ],
        "output": "the word in position {pos_text}, as if it had part-of-speech tag {macro}, which should be joined to the preceding word",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "conjoin"
          },
          {
            "has": "inserted"
          }
        ],
        "output": "the word in position {pos_text}, if that position has been created by a parent chunk inserting a word into this chunk, which should be joined to the preceding word",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "conjoin"
          }
        ],
        "output": "the word in position {pos_text}, which should be joined to the preceding word",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "magic"
          },
          {
            "has": "macro"
          },
          {
            "has": "inserted"
          }
        ],
        "output": "the word in position {pos_text}, if that position has been created by a parent chunk inserting a word into this chunk, as if it had part-of-speech tag {macro}, with all tag slots which correspond to something on the chunk being filled in by copying",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "magic"
          },
          {
            "has": "macro"
          }
        ],
        "output": "the word in position {pos_text}, as if it had part-of-speech tag {macro}, with all tag slots which correspond to something on the chunk being filled in by copying",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "magic"
          },
          {
            "has": "inserted"
          }
        ],
        "output": "the word in position {pos_text}, if that position has been created by a parent chunk inserting a word into this chunk, with all tag slots which correspond to something on the chunk being filled in by copying",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "magic"
          }
        ],
        "output": "the word in position {pos_text}, with all tag slots which correspond to something on the chunk being filled in by copying",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "macro"
          },
          {
            "has": "inserted"
          }
        ],
        "output": "the word in position {pos_text}, if that position has been created by a parent chunk inserting a word into this chunk, as if it had part-of-speech tag {macro}",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "macro"
          }
        ],
        "output": "the word in position {pos_text}, as if it had part-of-speech tag {macro}",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "inserted"
          }
        ],
        "output": "the word in position {pos_text}, if that position has been created by a parent chunk inserting a word into this chunk",
        "lists": {}
      },
      {
        "cond": [],
        "output": "the word in position {pos_text}",
        "lists": {}
      }
    ]
  },
  {
    "pattern": "\n(output_element\n  (conjoin)? @conjoin\n  (insert)? @insert\n  (global_var_prefix)\n  (ident) @var\n) @root\n",
    "output": [
      {
        "cond": [
          {
            "has": "insert"
          },
          {
            "has": "conjoin"
          }
        ],
        "output": "the global variable {var}, which should be joined to the preceding word, which should be made a child of the preceding chunk",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "insert"
          }
        ],
        "output": "the global variable {var}, which should be made a child of the preceding chunk",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "conjoin"
          }
        ],
        "output": "the global variable {var}, which should be joined to the preceding word",
        "lists": {}
      },
      {
        "cond": [],
        "output": "the global variable {var}",
        "lists": {}
      }
    ]
  },
  {
    "pattern": "\n(output_element\n  (conjoin)? @conjoin\n  (insert)? @insert\n  (literal_lu) @lu\n) @root\n",
    "output": [
      {
        "cond": [
          {
            "has": "insert"
          },
          {
            "has": "conjoin"
          }
        ],
        "output": "{lu}, which should be joined to the preceding word, which should be made a child of the preceding chunk",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "insert"
          }
        ],
        "output": "{lu}, which should be made a child of the preceding chunk",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "conjoin"
          }
        ],
        "output": "{lu}, which should be joined to the preceding word",
        "lists": {}
      },
      {
        "cond": [],
        "output": "{lu}",
        "lists": {}
      }
    ]
  },
  {
    "pattern": "(set_var name: (ident) @name value: (_) @val) @root",
    "output": "set the tag {name} to {val}"
  },
  {
    "pattern": "(output_var_set (set_var) @set_list) @root",
    "output": [
      {
        "lists": {
          "set_list": {
            "join": ", "
          }
        },
        "output": "{set_list}"
      }
    ]
  },
  {
    "pattern": "(clip val: (ident) @tag) @root",
    "output": "{tag}"
  },
  {
    "pattern": "\n(clip\n  (inserted)? @inserted\n  pos: (num) @pos_text\n  attr: (ident) @attr\n  (clip_side)? @side\n  convert: (ident)? @conv\n) @root\n        ",
    "output": [
      {
        "cond": [
          {
            "has": "conv"
          },
          {
            "has": "inserted"
          },
          {
            "has": "side"
          }
        ],
        "output": "the {side} {attr} tag of word {pos_text}, if that position has been created by a parent chunk inserting a word into this chunk, using the conversion rules to change it to a {conv} tag",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "conv"
          },
          {
            "has": "inserted"
          }
        ],
        "output": "the {attr} tag of word {pos_text}, if that position has been created by a parent chunk inserting a word into this chunk, using the conversion rules to change it to a {conv} tag",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "conv"
          },
          {
            "has": "side"
          }
        ],
        "output": "the {side} {attr} tag of word {pos_text}, using the conversion rules to change it to a {conv} tag",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "conv"
          }
        ],
        "output": "the {attr} tag of word {pos_text}, using the conversion rules to change it to a {conv} tag",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "inserted"
          },
          {
            "has": "side"
          }
        ],
        "output": "the {side} {attr} tag of word {pos_text}, if that position has been created by a parent chunk inserting a word into this chunk",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "inserted"
          }
        ],
        "output": "the {attr} tag of word {pos_text}, if that position has been created by a parent chunk inserting a word into this chunk",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "side"
          }
        ],
        "output": "the {side} {attr} tag of word {pos_text}",
        "lists": {}
      },
      {
        "cond": [],
        "output": "the {attr} tag of word {pos_text}",
        "lists": {}
      }
    ]
  },
  {
    "pattern": "\n(clip\n  pos: (attr_prefix)\n  attr: (ident) @attr\n  (clip_side)? @side\n  convert: (ident)? @conv\n) @root\n        ",
    "output": [
      {
        "cond": [
          {
            "has": "conv"
          },
          {
            "has": "side"
          }
        ],
        "output": "the {side} {attr} tag of the chunk, using the conversion rules to change it to a {conv} tag",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "conv"
          }
        ],
        "output": "the {attr} tag of the chunk, using the conversion rules to change it to a {conv} tag",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "side"
          }
        ],
        "output": "the {side} {attr} tag of the chunk",
        "lists": {}
      },
      {
        "cond": [],
        "output": "the {attr} tag of the chunk",
        "lists": {}
      }
    ]
  },
  {
    "pattern": "\n(clip\n  (global_var_prefix)\n  var_name: (ident) @var\n  attr: (ident) @attr\n  (clip_side)? @side\n  convert: (ident)? @conv\n) @root\n        ",
    "output": [
      {
        "cond": [
          {
            "has": "conv"
          },
          {
            "has": "side"
          }
        ],
        "output": "the {side} {attr} tag of the global variable {var}, using the conversion rules to change it to a {conv} tag",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "conv"
          }
        ],
        "output": "the {attr} tag of the global variable {var}, using the conversion rules to change it to a {conv} tag",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "side"
          }
        ],
        "output": "the {side} {attr} tag of the global variable {var}",
        "lists": {}
      },
      {
        "cond": [],
        "output": "the {attr} tag of the global variable {var}",
        "lists": {}
      }
    ]
  },
  {
    "pattern": "\n(literal_lu\n  lemma: (_) @lem [(ident) (clip) (string_cond)] @tag_list\n  lemcase: (clip)? @lemcase\n) @root",
    "output": [
      {
        "cond": [
          {
            "has": "lemcase"
          }
        ],
        "lists": {
          "tag_list": {
            "join": ", "
          }
        },
        "output": "a word with lemma {lem} and capitalization matching {lemcase} and the following tags: {tag_list}"
      },
      {
        "lists": {
          "tag_list": {
            "join": ", "
          }
        },
        "output": "a word with lemma {lem} and the following tags: {tag_list}"
      }
    ]
  },
  {
    "pattern": "\n(lu_sequence\n  [(output_element) (blank) (numbered_blank) (lu_cond) (lu_sequence)] @thing_list\n) @root\n        ",
    "output": [
      {
        "lists": {
          "thing_list": {
            "join": ", ",
            "html_type": "ol"
          }
        },
        "output": "{thing_list}"
      }
    ]
  },
  {
    "pattern": "(lu_sequence) @root",
    "output": "nothing"
  },
  {
    "pattern": "(literal_lu parent_tag: (ident) @root_text)",
    "output": "the {root_text} tag from the chunk"
  },
  {
    "pattern": "[(ident) (string)] @root_text",
    "output": "{root_text}"
  }
];

RULES.TWOLC = [
  {
    "pattern": "[(comment) (semicolon)] @root",
    "output": ""
  },
  {
    "pattern": "\n(source_file\n  [(alphabet) (sets) (definitions) (diacritics) (rule_variables) (rules)] @thing_list\n) @root",
    "output": [
      {
        "lists": {
          "thing_list": {
            "join": "\n\n",
            "html_type": "p"
          }
        },
        "output": "{thing_list}\n"
      }
    ]
  },
  {
    "pattern": "(source_file) @root",
    "output": ""
  },
  {
    "pattern": "(alphabet [(symbol) (symbol_pair)] @sym_list) @root",
    "output": [
      {
        "lists": {
          "sym_list": {
            "join": "\n",
            "html_type": "ul"
          }
        },
        "output": "The following mappings are possible:\n{sym_list}"
      }
    ]
  },
  {
    "pattern": "(alphabet (symbol) @root_text)",
    "output": "An underlying {root_text} remains unchanged (surfaces as {root_text})"
  },
  {
    "pattern": "(alphabet (symbol_pair left: (symbol) @l_text right: (symbol) @r_text) @root (#eq? @r_text \"0\"))",
    "output": "An underlying {l_text} is deleted"
  },
  {
    "pattern": "(alphabet (symbol_pair left: (symbol) @l_text right: (symbol) @r_text) @root)",
    "output": "An underlying {l_text} surfaces as {r_text}"
  },
  {
    "pattern": "(sets (set) @set_list) @root",
    "output": [
      {
        "lists": {
          "set_list": {
            "join": "\n",
            "html_type": "ul"
          }
        },
        "output": "We define the following sets of symbols:\n{set_list}"
      }
    ]
  },
  {
    "pattern": "(set name: (symbol) @name_text [(symbol) (symbol_pair)] @thing_list) @root",
    "output": [
      {
        "lists": {
          "thing_list": {
            "join": ", "
          }
        },
        "output": "The set {name_text} contains {thing_list}."
      }
    ]
  },
  {
    "pattern": "(set (symbol) @root_text)",
    "output": "{root_text}"
  },
  {
    "pattern": "(rules (rule) @rule_list) @root",
    "output": [
      {
        "lists": {
          "rule_list": {
            "join": "\n\n",
            "html_type": "p"
          }
        },
        "output": "The mappings are constrained by the following rules:\n\n{rule_list}"
      }
    ]
  },
  {
    "pattern": "(rule (rule_name) @name_text [(symbol) (symbol_pair)] @target (arrow) @arrow (positive_contexts) @pos) @root",
    "output": "{target} {arrow} it occurs in one of the following contexts:\n{pos}"
  },
  {
    "pattern": "((arrow) @root (#eq? @root \"<=>\"))",
    "output": "if and only if"
  },
  {
    "pattern": "(rule (symbol_pair left: (symbol) @l_text right: (symbol) @r_text) @root (#eq? @r_text \"0\"))",
    "output": "{l_text} is deleted"
  },
  {
    "pattern": "(rule (symbol_pair left: (symbol) @l_text right: (symbol) @r_text) @root (#eq? @l_text \"0\"))",
    "output": "{r_text} is inserted"
  },
  {
    "pattern": "(rule (symbol_pair left: (symbol) @l_text right: (symbol) @r_text) @root)",
    "output": "{l_text} becomes {r_text}"
  },
  {
    "pattern": "(positive_contexts (context) @ctx_list) @root",
    "output": [
      {
        "lists": {
          "ctx_list": {
            "join": "\n -",
            "html_type": "ul"
          }
        },
        "output": "- {ctx_list}"
      }
    ]
  },
  {
    "pattern": "(pattern (symbol) @s) @root",
    "output": "{s}"
  },
  {
    "pattern": "(pattern (symbol_pair) @s) @root",
    "output": "{s}"
  },
  {
    "pattern": "(pattern (word_boundary) @s) @root",
    "output": "{s}"
  },
  {
    "pattern": "(pattern (any) @s) @root",
    "output": "{s}"
  },
  {
    "pattern": "(pattern (lpar) (pattern) @s (rpar)) @root",
    "output": "({s})"
  },
  {
    "pattern": "(pattern (loptional) (pattern) @s (roptional)) @root",
    "output": "optional ({s})"
  },
  {
    "pattern": "(pattern (prefix_op) @o (pattern) @s) @root",
    "output": "{o} {s}"
  },
  {
    "pattern": "(pattern (pattern) @s (suffix_op) @o) @root",
    "output": "{o} {s}"
  },
  {
    "pattern": "(pattern (pattern) @p1 [(ignore_op) (bool_op) (replace_op) (compose_op)] @o (pattern) @p2) @root",
    "output": "{p1} {o} {p2}"
  },
  {
    "pattern": "(pattern (pattern) @p1 (pattern) @p2) @root",
    "output": "{p1}, {p2}"
  },
  {
    "pattern": "(symbol) @root_text",
    "output": "{root_text}"
  },
  {
    "pattern": "((symbol_pair left: (symbol) @l right: (symbol) @r) @root (#eq? @r \"0\"))",
    "output": "an underlying {l} which is deleted"
  },
  {
    "pattern": "(symbol_pair left: (symbol) @l right: (symbol) @r) @root",
    "output": "an underlying {l} which surfaces as {r}"
  },
  {
    "pattern": "(symbol_pair right: (symbol) @r) @root",
    "output": "a symbol whose surface form is {r}"
  },
  {
    "pattern": "(symbol_pair left: (symbol) @l) @root",
    "output": "a symbol whose underlying form is {l}"
  },
  {
    "pattern": "((bool_op) @root (#eq? @root \"|\"))",
    "output": "or"
  },
  {
    "pattern": "((bool_op) @root (#eq? @root \"&\"))",
    "output": "and"
  },
  {
    "pattern": "((bool_op) @root (#eq? @root \"-\"))",
    "output": "but not"
  },
  {
    "pattern": "(locus) @root",
    "output": "the locus of the rule"
  },
  {
    "pattern": "(context left: (pattern) @l (locus) @_ right: (pattern) @r) @root",
    "output": "it is preceded by {l} and followed by {r}"
  },
  {
    "pattern": "(context (locus) @_ right: (pattern) @r) @root",
    "output": "it is followed by {r}"
  },
  {
    "pattern": "(context left: (pattern) @l (locus) @_) @root",
    "output": "it is preceded by {l}"
  },
  {
    "pattern": "(context (locus) @_) @root",
    "output": "anywhere"
  }
];

RULES.CG = [
  {
    "pattern": "[(semicolon) (comment)] @root",
    "output": ""
  },
  {
    "pattern": "(source_file (_)* @thing_list) @root",
    "output": [
      {
        "lists": {
          "thing_list": {
            "join": "\n"
          }
        },
        "output": "{thing_list}"
      }
    ]
  },
  {
    "pattern": "(inlineset (inlineset_single (setname) @name_text)) @root",
    "output": "the set {name_text}"
  },
  {
    "pattern": "(rule [\"(\" \")\"] @root)",
    "output": ""
  },
  {
    "pattern": "\n(\n  (rule\n    (ruletype) @type\n    (rule_target (_) @target)\n    [(contexttest)* @test_list \"(\" \")\"]*\n  ) @root\n  (#eq? @type \"SELECT\")\n)\n",
    "output": [
      {
        "cond": [
          {
            "has": "test_list"
          }
        ],
        "output": "If {test_list}, keep only readings matching {target}.",
        "lists": {
          "test_list": {
            "join": " and "
          }
        }
      },
      {
        "output": "Keep only readings matching {target}"
      }
    ]
  },
  {
    "pattern": "\n(\n  (rule\n    (ruletype) @type\n    (rule_target (_) @target)\n    [(contexttest)* @test_list \"(\" \")\"]*\n  ) @root\n  (#eq? @type \"REMOVE\")\n)\n",
    "output": [
      {
        "cond": [
          {
            "has": "test_list"
          }
        ],
        "output": "If {test_list}, remove any readings matching {target}.",
        "lists": {
          "test_list": {
            "join": " and "
          }
        }
      },
      {
        "output": "If there are readings matching {target}, remove all others."
      }
    ]
  },
  {
    "pattern": "\n        (\n          (rule_map_etc\n            (ruletype_map_etc) @type\n            (inlineset) @tags\n            (rule_target (_) @target)\n            [(contexttest)* @test_list \"(\" \")\"]*\n          ) @root\n          (#eq? @type \"MAP\")\n        )\n        ",
    "output": [
      {
        "cond": [
          {
            "has": "test_list"
          }
        ],
        "output": "If {test_list}, add {tags} to each reading and prevent other rules from adding tags.",
        "lists": {
          "test_list": {
            "join": " and "
          }
        }
      },
      {
        "output": "Add {tags} to each reading and prevent other rules from adding tags."
      }
    ]
  },
  {
    "pattern": "\n        (\n          (rule_substitute_etc\n            (ruletype_substitute_etc) @type\n            (inlineset) @src\n            (inlineset) @trg\n            (rule_target (_) @target)\n            [(contexttest)* @test_list \"(\" \")\"]*\n          ) @root\n          (#eq? @type \"SUBSTITUTE\")\n        )\n        ",
    "output": [
      {
        "cond": [
          {
            "has": "test_list"
          }
        ],
        "output": "If {test_list}, replace {src} with {trg} in readings matching {target}.",
        "lists": {
          "test_list": {
            "join": " and "
          }
        }
      },
      {
        "output": "Replace {src} with {trg} in readings matching {target}."
      }
    ]
  },
  {
    "pattern": "\n        (\n          (rule_parentchild\n            type: (ruletype_parentchild) @type\n            trg: (rule_target (_) @target)\n            context: (contexttest)* @test_list\n            (contexttest) @ctxtarget\n            (contexttest)* @ctx_list\n          ) @root\n          (#eq? @type \"SETPARENT\")\n        )\n        ",
    "output": [
      {
        "cond": [
          {
            "has": "test_list"
          }
        ],
        "output": "If {test_list}, set the parent of {target} to {ctxtarget}.",
        "lists": {
          "test_list": {
            "join": " and "
          }
        }
      },
      {
        "output": "Set the parent of {target} to {ctxtarget}."
      }
    ]
  },
  {
    "pattern": "\n        (\n          (rule_with\n            trg: (rule_target (_) @target)\n            context: (contexttest)* @test_list\n            children: (_)* @rule_list\n          ) @root\n        )\n        ",
    "output": [
      {
        "cond": [
          {
            "has": "test_list"
          }
        ],
        "output": "Find a word matching {target} in context {test_list} and run the following rules:\n  ",
        "lists": {
          "test_list": {
            "join": " and "
          },
          "rule_list": {
            "join": "\n  "
          }
        }
      },
      {
        "output": "Find a word matching {target} and run the following rules:\n  ",
        "lists": {
          "rule_list": {
            "join": "\n  "
          }
        }
      }
    ]
  },
  {
    "pattern": "(section_header) @root",
    "output": "Start a new section."
  },
  {
    "pattern": "\n(\n  (tag (qtag) @tag_text) @root\n  (#match? @tag_text \"^\\\"<.*>\\\"$\")\n)",
    "output": "word form {tag_text}"
  },
  {
    "pattern": "(tag (qtag) @tag_text) @root",
    "output": "lemma {tag_text}"
  },
  {
    "pattern": "(tag (ntag) @tag_text) @root",
    "output": "{tag_text}"
  },
  {
    "pattern": "\n(\n  (set_special_list\n    (special_list_name) @name\n    (eq)\n    (taglist (tag)* @delim_list)\n  ) @root\n  (#eq? @name \"DELIMITERS\")\n)",
    "output": [
      {
        "lists": {
          "delim_list": {
            "join": " or "
          }
        },
        "output": "Start a new sentence after reading {delim_list}."
      }
    ]
  },
  {
    "pattern": "(taglist (tag)* @tag_list) @root",
    "output": [
      {
        "lists": {
          "tag_list": {
            "join": ", "
          }
        },
        "output": "tags {tag_list}"
      }
    ]
  },
  {
    "pattern": "(inlineset_single (taglist) @tags) @root",
    "output": "{tags}"
  },
  {
    "pattern": "(compotag \"(\" (tag)* @tag_list \")\") @root",
    "output": [
      {
        "lists": {
          "tag_list": {
            "join": " and "
          }
        },
        "output": "({tag_list})"
      }
    ]
  },
  {
    "pattern": "(list (setname) @name_text (taglist [(tag) (compotag)]* @tag_list)) @root",
    "output": [
      {
        "lists": {
          "tag_list": {
            "join": " or "
          }
        },
        "output": "Define the set {name_text} as matching {tag_list}."
      }
    ]
  },
  {
    "pattern": "(contexttest (contextpos) @ctx_text (inlineset (_) @set) (LINK) (contexttest) @link) @root",
    "output": "the word at position {ctx_text} matches {set} and, relative to that, {link}"
  },
  {
    "pattern": "(contexttest (contextpos) @ctx_text (inlineset (_) @set) !link) @root",
    "output": "the word at position {ctx_text} matches {set}"
  },
  {
    "pattern": "\n(\n  (inlineset_single (setname) @name_text) @root\n  (#match? @name_text \"^[$][$].*$\")\n)",
    "output": "a tag from the set {name_text}, which must be the same as other instances of {name_text} in this rule"
  },
  {
    "pattern": "(inlineset (inlineset_single) @a (set_op) @op_text (inlineset_single) @b) @root",
    "output": "{a} {op_text} {b}"
  }
];

HIGHLIGHT["rtx".toUpperCase()] = `[
[
  (arrow)
  (str_op)
  (and) (or)
  (not)
  "="
  (blank)
] @keyword.operator

[
  (if_tok)
  (elif_tok)
  (else_tok)
  (always_tok)
] @keyword.control

(comment) @comment

(weight) @constant.numeric
(reduce_rule ":" @constant.numeric)
(num) @constant.numeric

(colon) @punctuation.delimiter

(string) @constant.string

(output_rule
 pos: (ident) @variable)
(retag_rule
 src_attr: (ident) @variable
 trg_attr: (ident) @variable)
(attr_default
 src: (ident) @variable
 trg: (ident) @variable) ; (ND "") highlight trg as string
(attr_rule
 name: (ident) @variable)
]`;

HIGHLIGHT["twolc".toUpperCase()] = `[
(comment) @comment

[
 (arrow) (regex_arrow)
 (eq)
 (prefix_op) (suffix_op)
 (ignore_op) (bool_op) (replace_op) (compose_op)
] @operator

[
 (word_boundary)
 (any)
] @constant.builtin
((symbol) @constant.builtin

[
 (colon)
 (semicolon)
] @punctuation.delimiter

[
 (lpar) (rpar)
 (loptional) (roptional)
] @punctuation.bracket

(regex_target "<[" @punctuation.bracket)
(regex_target "]>" @punctuation.bracket)

[
 (alphabet_header) (diacritics_header) (rule_variables_header)
 (sets_header) (definitions_header) (rules_header)
] @keyword

(rule target: (symbol) @variable.parameter)
(rule target: (symbol_pair) @variable.parameter)
(locus) @variable.parameter

(rule_name) @string.quoted

[
 (except)
 (variable_keyword)
 (where)
 (in_keyword)
] @keyword

(variables name: (symbol) @variable.parameter)

(definition name: (symbol) @function)
(set name: (symbol) @function)
]`;

HIGHLIGHT["cg".toUpperCase()] = `[
[
  (section_header)
  (END)
  (LIST)
  (SET)
  (INCLUDE)
  (TEMPLATE)
] @keyword.control

[
  (ruletype)
  (ruletype_substitute_etc)
  (ruletype_parentchild)
  (ruletype_relation)
  (ruletype_relations)
  (ruletype_map_etc)
  (ruletype_addcohort)
  (ruletype_mergecohorts)
  (ruletype_move)
  (ruletype_switch)
  (ruletype_external)
] @keyword.control

[
  (IF)
  (TARGET)
  (TO)
  (FROM)
  (WITHCHILD)
  (NOCHILD)
  (BEFORE)
  (AFTER)
  (WITH)
  (ONCE)
  (ALWAYS)
  (context_modifier)
  (BARRIER)
  (LINK)
  (OR)
  (set_op)
  (ruleflag_name)
] @keyword.operator

(eq) @operator

(semicolon) @punctuation.delimiter

(comment) @comment

(qtag) @string.quoted

(contextpos) @constant.number

(inlineset_single ["(" ")"] @punctuation.bracket)
(compotag ["(" ")"] @punctuation.bracket)

(taglist) @constant.other.symbol


(list (setname) @variable)
(set (setname) @variable)

[
  (special_list_name)
  (STATIC_SETS)
  (MAPPING_PREFIX)
  (SUBREADINGS)
  (PARENTHESES)
] @keyword.other.special-method
]`;

