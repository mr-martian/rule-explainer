RTX_RULES = [
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
