RTX_RULES = [
  {
    "pattern": "[\"{\" \"}\" (comment)] @root",
    "output": ""
  },
  {
    "pattern": "(source_file (_) @thing_list) @root",
    "output": [
      {
        "lists": {
          "thing_list": {
            "join": "\n",
            "html_type": "p"
          }
        },
        "output": "{thing_list}"
      }
    ]
  },
  {
    "pattern": "\n(attr_rule\n  name: (ident) @name_text\n  (attr_default src: (ident) @src_text trg: (_) @trg_text)\n  [(ident) (string) (attr_set_insert)] @tag_list\n) @root",
    "output": [
      {
        "lists": {
          "tag_list": {
            "join": ", "
          }
        },
        "output": "Define the tag category {name_text} as consisting of {tag_list}, and if this category is not present, then insert {src_text} while parsing and replace it with {trg_text} when outputting."
      }
    ]
  },
  {
    "pattern": "\n(attr_rule\n  name: (ident) @name_text\n  [(ident) (string) (attr_set_insert)] @tag_list\n) @root",
    "output": [
      {
        "lists": {
          "tag_list": {
            "join": ", "
          }
        },
        "output": "Define the list {name_text} as consisting of {tag_list}."
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
    "pattern": "(output_rule pos: (ident) @pos_text (magic)) @root",
    "output": "When outputting {pos_text}, just copy the tags from the input."
  },
  {
    "pattern": "(output_rule pos: (ident) @pos_text [(ident) (lit_tag)] @tag_list) @root",
    "output": [
      {
        "lists": {
          "tag_list": {
            "join": ", "
          }
        },
        "output": "When outputting {pos_text}, put the following: {tag_list}."
      }
    ]
  },
  {
    "pattern": "(output_rule (ident) @root (#eq? @root \"_\"))",
    "output": "the part of speech tag"
  },
  {
    "pattern": "(output_rule (lit_tag (ident) @tag_text) @root)",
    "output": "the literal tag {tag_text}"
  },
  {
    "pattern": "(output_rule (ident) @root_text)",
    "output": "the {root_text} tag"
  },
  {
    "pattern": "\n(output_rule\n  pos: (ident) @pos_text\n  (lu_cond . (_ (always_tok) value: (_) @val) .)\n) @root",
    "output": "When outputting {pos_text}, put {val}."
  },
  {
    "pattern": "\n(output_rule pos: (ident) @pos_text (lu_cond (_) @op_list)) @root\n        ",
    "output": [
      {
        "lists": {
          "op_list": {
            "join": "\n",
            "html_type": "ol"
          }
        },
        "output": "When outputting {pos_text}, use the first applicable rule from:\n{op_list}"
      }
    ]
  },
  {
    "pattern": "(lu_cond (_ cond: (_) @cond value: (_) @val) @root)",
    "output": "If {cond}, put {val}."
  },
  {
    "pattern": "(lu_cond (_ (else_tok) value: (_) @val) @root)",
    "output": "Otherwise, put {val}."
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
    "pattern": "(attr_rule (ident) @root_text)",
    "output": "{root_text}"
  },
  {
    "pattern": "(reduce_rule_group . (ident) @pos_text . (arrow) (reduce_rule) @rule_list) @root",
    "output": [
      {
        "lists": {
          "rule_list": {
            "join": "\n",
            "html_type": "ul"
          }
        },
        "output": "{pos_text} phrases can be constructed according to the following rules:\n{rule_list}"
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
    "pattern": "\n(pattern_element\n  (magic)? @magic\n  lemma: [(ident) (string) (attr_set_insert)]? @lemma\n  . (ident) @pos_text\n  (\".\" . [(ident) (attr_set_insert) (string)] @tag_list)?\n  (pattern_clip)? @set_list\n) @root",
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
        "output": "a word with {lemma} and part-of-speech tag {pos_text} followed by {tag_list}, from which copy the tags {set_list}, from which copy any tag needed by the chunk which is not specified somewhere else",
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
        "output": "a word part-of-speech tag {pos_text} followed by {tag_list}, from which copy the tags {set_list}, from which copy any tag needed by the chunk which is not specified somewhere else",
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
        "output": "a word with {lemma} and part-of-speech tag {pos_text}, from which copy the tags {set_list}, from which copy any tag needed by the chunk which is not specified somewhere else",
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
        "output": "a word part-of-speech tag {pos_text}, from which copy the tags {set_list}, from which copy any tag needed by the chunk which is not specified somewhere else",
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
        "output": "a word with {lemma} and part-of-speech tag {pos_text} followed by {tag_list}, from which copy any tag needed by the chunk which is not specified somewhere else",
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
        "output": "a word part-of-speech tag {pos_text} followed by {tag_list}, from which copy any tag needed by the chunk which is not specified somewhere else",
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
        "output": "a word with {lemma} and part-of-speech tag {pos_text}, from which copy any tag needed by the chunk which is not specified somewhere else",
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
        "output": "a word part-of-speech tag {pos_text}, from which copy any tag needed by the chunk which is not specified somewhere else",
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
        "output": "a word with {lemma} and part-of-speech tag {pos_text} followed by {tag_list}, from which copy the tags {set_list}",
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
        "output": "a word part-of-speech tag {pos_text} followed by {tag_list}, from which copy the tags {set_list}",
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
        "output": "a word with {lemma} and part-of-speech tag {pos_text}, from which copy the tags {set_list}",
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
        "output": "a word part-of-speech tag {pos_text}, from which copy the tags {set_list}",
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
        "output": "a word with {lemma} and part-of-speech tag {pos_text} followed by {tag_list}",
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
        "output": "a word part-of-speech tag {pos_text} followed by {tag_list}",
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
        "output": "a word with {lemma} and part-of-speech tag {pos_text}",
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
        "output": "a word part-of-speech tag {pos_text}",
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
    "pattern": "(pattern_clip (ident) @attr_text (clip_side)? @clip) @root",
    "output": [
      {
        "cond": [
          {
            "has": "clip"
          }
        ],
        "output": "{attr_text} from the {clip} side"
      },
      {
        "output": "{attr_text}"
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
    "pattern": "(retag_rule src_attr: (ident) @src_text trg_attr: (ident) @trg_text (attr_pair) @pair_list) @root",
    "output": [
      {
        "lists": {
          "pair_list": {
            "join": ", "
          }
        },
        "output": "To change {src_text} to {trg_text}, change: {pair_list}."
      }
    ]
  },
  {
    "pattern": "(blank) @root",
    "output": "a space"
  },
  {
    "pattern": "\n(output_element\n  (conjoin)? @conjoin\n  (insert)? @insert\n  (inserted)? @inserted\n  (magic)? @magic\n  (num) @pos_text\n  (macro_name (ident) @macro_text)?\n  (output_var_set)? @vars\n) @root",
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
            "has": "macro_text"
          },
          {
            "has": "inserted"
          }
        ],
        "output": "the word in position {pos_text}, if that position has been created by a parent chunk inserting a word into this chunk, as if it had part-of-speech tag {macro_text}, with all tag slots which correspond to something on the chunk being filled in by copying, which should be joined to the preceding word, which should be made a child of the preceding chunk, with the following tags being overridden: {vars}",
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
            "has": "macro_text"
          }
        ],
        "output": "the word in position {pos_text}, as if it had part-of-speech tag {macro_text}, with all tag slots which correspond to something on the chunk being filled in by copying, which should be joined to the preceding word, which should be made a child of the preceding chunk, with the following tags being overridden: {vars}",
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
            "has": "macro_text"
          },
          {
            "has": "inserted"
          }
        ],
        "output": "the word in position {pos_text}, if that position has been created by a parent chunk inserting a word into this chunk, as if it had part-of-speech tag {macro_text}, which should be joined to the preceding word, which should be made a child of the preceding chunk, with the following tags being overridden: {vars}",
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
            "has": "macro_text"
          }
        ],
        "output": "the word in position {pos_text}, as if it had part-of-speech tag {macro_text}, which should be joined to the preceding word, which should be made a child of the preceding chunk, with the following tags being overridden: {vars}",
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
            "has": "macro_text"
          },
          {
            "has": "inserted"
          }
        ],
        "output": "the word in position {pos_text}, if that position has been created by a parent chunk inserting a word into this chunk, as if it had part-of-speech tag {macro_text}, with all tag slots which correspond to something on the chunk being filled in by copying, which should be made a child of the preceding chunk, with the following tags being overridden: {vars}",
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
            "has": "macro_text"
          }
        ],
        "output": "the word in position {pos_text}, as if it had part-of-speech tag {macro_text}, with all tag slots which correspond to something on the chunk being filled in by copying, which should be made a child of the preceding chunk, with the following tags being overridden: {vars}",
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
            "has": "macro_text"
          },
          {
            "has": "inserted"
          }
        ],
        "output": "the word in position {pos_text}, if that position has been created by a parent chunk inserting a word into this chunk, as if it had part-of-speech tag {macro_text}, which should be made a child of the preceding chunk, with the following tags being overridden: {vars}",
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
            "has": "macro_text"
          }
        ],
        "output": "the word in position {pos_text}, as if it had part-of-speech tag {macro_text}, which should be made a child of the preceding chunk, with the following tags being overridden: {vars}",
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
            "has": "macro_text"
          },
          {
            "has": "inserted"
          }
        ],
        "output": "the word in position {pos_text}, if that position has been created by a parent chunk inserting a word into this chunk, as if it had part-of-speech tag {macro_text}, with all tag slots which correspond to something on the chunk being filled in by copying, which should be joined to the preceding word, with the following tags being overridden: {vars}",
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
            "has": "macro_text"
          }
        ],
        "output": "the word in position {pos_text}, as if it had part-of-speech tag {macro_text}, with all tag slots which correspond to something on the chunk being filled in by copying, which should be joined to the preceding word, with the following tags being overridden: {vars}",
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
            "has": "macro_text"
          },
          {
            "has": "inserted"
          }
        ],
        "output": "the word in position {pos_text}, if that position has been created by a parent chunk inserting a word into this chunk, as if it had part-of-speech tag {macro_text}, which should be joined to the preceding word, with the following tags being overridden: {vars}",
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
            "has": "macro_text"
          }
        ],
        "output": "the word in position {pos_text}, as if it had part-of-speech tag {macro_text}, which should be joined to the preceding word, with the following tags being overridden: {vars}",
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
            "has": "macro_text"
          },
          {
            "has": "inserted"
          }
        ],
        "output": "the word in position {pos_text}, if that position has been created by a parent chunk inserting a word into this chunk, as if it had part-of-speech tag {macro_text}, with all tag slots which correspond to something on the chunk being filled in by copying, with the following tags being overridden: {vars}",
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
            "has": "macro_text"
          }
        ],
        "output": "the word in position {pos_text}, as if it had part-of-speech tag {macro_text}, with all tag slots which correspond to something on the chunk being filled in by copying, with the following tags being overridden: {vars}",
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
            "has": "macro_text"
          },
          {
            "has": "inserted"
          }
        ],
        "output": "the word in position {pos_text}, if that position has been created by a parent chunk inserting a word into this chunk, as if it had part-of-speech tag {macro_text}, with the following tags being overridden: {vars}",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "vars"
          },
          {
            "has": "macro_text"
          }
        ],
        "output": "the word in position {pos_text}, as if it had part-of-speech tag {macro_text}, with the following tags being overridden: {vars}",
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
            "has": "macro_text"
          },
          {
            "has": "inserted"
          }
        ],
        "output": "the word in position {pos_text}, if that position has been created by a parent chunk inserting a word into this chunk, as if it had part-of-speech tag {macro_text}, with all tag slots which correspond to something on the chunk being filled in by copying, which should be joined to the preceding word, which should be made a child of the preceding chunk",
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
            "has": "macro_text"
          }
        ],
        "output": "the word in position {pos_text}, as if it had part-of-speech tag {macro_text}, with all tag slots which correspond to something on the chunk being filled in by copying, which should be joined to the preceding word, which should be made a child of the preceding chunk",
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
            "has": "macro_text"
          },
          {
            "has": "inserted"
          }
        ],
        "output": "the word in position {pos_text}, if that position has been created by a parent chunk inserting a word into this chunk, as if it had part-of-speech tag {macro_text}, which should be joined to the preceding word, which should be made a child of the preceding chunk",
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
            "has": "macro_text"
          }
        ],
        "output": "the word in position {pos_text}, as if it had part-of-speech tag {macro_text}, which should be joined to the preceding word, which should be made a child of the preceding chunk",
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
            "has": "macro_text"
          },
          {
            "has": "inserted"
          }
        ],
        "output": "the word in position {pos_text}, if that position has been created by a parent chunk inserting a word into this chunk, as if it had part-of-speech tag {macro_text}, with all tag slots which correspond to something on the chunk being filled in by copying, which should be made a child of the preceding chunk",
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
            "has": "macro_text"
          }
        ],
        "output": "the word in position {pos_text}, as if it had part-of-speech tag {macro_text}, with all tag slots which correspond to something on the chunk being filled in by copying, which should be made a child of the preceding chunk",
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
            "has": "macro_text"
          },
          {
            "has": "inserted"
          }
        ],
        "output": "the word in position {pos_text}, if that position has been created by a parent chunk inserting a word into this chunk, as if it had part-of-speech tag {macro_text}, which should be made a child of the preceding chunk",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "insert"
          },
          {
            "has": "macro_text"
          }
        ],
        "output": "the word in position {pos_text}, as if it had part-of-speech tag {macro_text}, which should be made a child of the preceding chunk",
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
            "has": "macro_text"
          },
          {
            "has": "inserted"
          }
        ],
        "output": "the word in position {pos_text}, if that position has been created by a parent chunk inserting a word into this chunk, as if it had part-of-speech tag {macro_text}, with all tag slots which correspond to something on the chunk being filled in by copying, which should be joined to the preceding word",
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
            "has": "macro_text"
          }
        ],
        "output": "the word in position {pos_text}, as if it had part-of-speech tag {macro_text}, with all tag slots which correspond to something on the chunk being filled in by copying, which should be joined to the preceding word",
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
            "has": "macro_text"
          },
          {
            "has": "inserted"
          }
        ],
        "output": "the word in position {pos_text}, if that position has been created by a parent chunk inserting a word into this chunk, as if it had part-of-speech tag {macro_text}, which should be joined to the preceding word",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "conjoin"
          },
          {
            "has": "macro_text"
          }
        ],
        "output": "the word in position {pos_text}, as if it had part-of-speech tag {macro_text}, which should be joined to the preceding word",
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
            "has": "macro_text"
          },
          {
            "has": "inserted"
          }
        ],
        "output": "the word in position {pos_text}, if that position has been created by a parent chunk inserting a word into this chunk, as if it had part-of-speech tag {macro_text}, with all tag slots which correspond to something on the chunk being filled in by copying",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "magic"
          },
          {
            "has": "macro_text"
          }
        ],
        "output": "the word in position {pos_text}, as if it had part-of-speech tag {macro_text}, with all tag slots which correspond to something on the chunk being filled in by copying",
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
            "has": "macro_text"
          },
          {
            "has": "inserted"
          }
        ],
        "output": "the word in position {pos_text}, if that position has been created by a parent chunk inserting a word into this chunk, as if it had part-of-speech tag {macro_text}",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "macro_text"
          }
        ],
        "output": "the word in position {pos_text}, as if it had part-of-speech tag {macro_text}",
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
    "pattern": "(set_var name: (ident) @name_text value: (_) @val) @root",
    "output": "set the tag {name_text} to {val}"
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
    "pattern": "(clip val: (ident) @tag_text) @root",
    "output": "{tag_text}"
  },
  {
    "pattern": "\n(clip\n  (inserted)? @inserted\n  pos: (num) @pos_text\n  attr: (ident) @attr_text\n  (clip_side)? @side\n  convert: (ident)? @conv_text\n) @root\n        ",
    "output": [
      {
        "cond": [
          {
            "has": "conv_text"
          },
          {
            "has": "inserted"
          },
          {
            "has": "side"
          }
        ],
        "output": "the {side} {attr_text} tag of word {pos_text}, if that position has been created by a parent chunk inserting a word into this chunk, using the conversion rules to change it to a {conv_text} tag",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "conv_text"
          },
          {
            "has": "inserted"
          }
        ],
        "output": "the {attr_text} tag of word {pos_text}, if that position has been created by a parent chunk inserting a word into this chunk, using the conversion rules to change it to a {conv_text} tag",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "conv_text"
          },
          {
            "has": "side"
          }
        ],
        "output": "the {side} {attr_text} tag of word {pos_text}, using the conversion rules to change it to a {conv_text} tag",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "conv_text"
          }
        ],
        "output": "the {attr_text} tag of word {pos_text}, using the conversion rules to change it to a {conv_text} tag",
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
        "output": "the {side} {attr_text} tag of word {pos_text}, if that position has been created by a parent chunk inserting a word into this chunk",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "inserted"
          }
        ],
        "output": "the {attr_text} tag of word {pos_text}, if that position has been created by a parent chunk inserting a word into this chunk",
        "lists": {}
      },
      {
        "cond": [
          {
            "has": "side"
          }
        ],
        "output": "the {side} {attr_text} tag of word {pos_text}",
        "lists": {}
      },
      {
        "cond": [],
        "output": "the {attr_text} tag of word {pos_text}",
        "lists": {}
      }
    ]
  }
];
