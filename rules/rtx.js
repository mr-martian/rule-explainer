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
    "pattern": "\n(attr_rule\n  name: (ident) @name_text\n  (attr_default src: (ident) @src_text trg: (_) @trg_text)\n  [(ident) (string) (attr_set_insert)]* @tag_list\n) @root",
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
    "pattern": "\n(attr_rule\n  name: (ident) @name_text\n  [(ident) (string) (attr_set_insert)]* @tag_list\n) @root",
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
    "pattern": "(output_rule \".\" @root)",
    "output": ", "
  },
  {
    "pattern": "(output_rule (ident) @root (#match? @root \"^_$\"))",
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
            "join": ", "
          }
        },
        "output": "When parsing, match {pattern_list}, and when outputting, put {output}."
      }
    ]
  },
  {
    "pattern": "(unknown) @root",
    "output": "an unknown word"
  },
  {
    "pattern": "\n(pattern_element\n  (magic)? @magic\n  . (ident) @pos_text\n  (\".\" . [(ident) (attr_set_insert) (string)] @tag_list)?\n  (\"$\" . (ident) @set_list)?\n) @root",
    "output": [
      {
        "cond": [
          {
            "has": "set_list"
          }
        ],
        "lists": {
          "set_list": {
            "join": ", "
          }
        },
        "output": "a word with part-of-speech {pos_text}, from which copy the tags {tag_list}"
      }
    ]
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
  }
];
