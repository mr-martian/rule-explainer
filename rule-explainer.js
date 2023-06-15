const TSParser = window.TreeSitter;
var langs = {
  CG: null,
  LEXC: null,
  LEXD: null,
  RTX: null,
  TWOLC: null,
  XFST: null,
};

var rules = {
  CG: null,
  LEXC: null,
  LEXD: null,
  RTX: null,
  TWOLC: null,
  XFST: null,
};

var Parser = null;

TSParser.init().then(async function () {
  let tpl = TSParser.Language;
  langs.CG = await tpl.load('wasm/tree-sitter-cg.wasm');
  langs.LEXC = await tpl.load('wasm/tree-sitter-lexc.wasm');
  langs.LEXD = await tpl.load('wasm/tree-sitter-lexd.wasm');
  langs.RTX = await tpl.load('wasm/tree-sitter-rtx.wasm');
  langs.TWOLC = await tpl.load('wasm/tree-sitter-twolc.wasm');
  langs.XFST = await tpl.load('wasm/tree-sitter-xfst.wasm');
  Parser = new TSParser();
  console.log("Languages loaded");
  rules.RTX = load_patterns(langs.RTX, RTX_RULES);
  console.log("Rules loaded");
  $('#update').click();
});

function make_spans(lines, tree, highlights) {
  let blob = [];
  for (let i = 0; i < lines.length; i++) {
    blob.push({whole: []});
  }
  let add_whole = function(lineno, id) {
    if (id == tree.rootNode.id) return;
    blob[lineno].whole.push(id);
  };
  let add_span = function(lineno, s, e, id) {
    let k = [s, e];
    if (!blob[lineno].hasOwnProperty(k)) {
      blob[lineno][k] = [];
    }
    blob[lineno][k].push(id);
  };
  let get_ranges = function(node) {
    let s = node.startPosition;
    let e = node.endPosition;
    let sln = lines[s.row].length;
    let eln = lines[e.row].length;
    if (s.row == e.row) {
      if (s.column == 0 && e.column == eln) {
        add_whole(s.row, node.id);
      } else {
        add_span(s.row, s.column, e.column, node.id);
      }
    } else {
      if (s.column == 0) {
        add_whole(s.row, node.id);
      } else {
        add_span(s.row, s.column, sln, node.id);
      }
      for (let i = s.row+1; i < e.row; i++) {
        add_whole(i, node.id);
      }
      if (e.column == eln) {
        add_whole(e.row, node.id);
      } else {
        add_span(e.row, 0, e.column, node.id);
      }
    }
    node.children.forEach(get_ranges);
  };
  let hl_cls = function(ls) {
    let ret = [];
    for (let id of ls) {
      if (highlights.hasOwnProperty(id)) {
        ret.push(highlights[id]);
      }
    }
    return ret.join(' ');
  };
  get_ranges(tree.rootNode);
  return lines.map(function(line, lineno) {
    let ret = '<p class="code-line '+hl_cls(blob[lineno].whole)+'" data-spans="' + blob[lineno].whole.join(' ') + '" data-line="'+(lineno+1)+'">';
    let spans = [];
    for (let k in blob[lineno]) {
      if (blob[lineno].hasOwnProperty(k) && k != 'whole') {
        spans.push(k);
      }
    }
    spans.sort(function(as, bs) {
      let a = as.split(',');
      let b = bs.split(',');
      return (b[1]-b[0])-(a[1]-a[0]);
    });
    let segs = [[0, line, []]];
    for (let i = 0; i < spans.length; i++) {
      let k = spans[i].split(',');
      let s = parseInt(k[0]);
      let e = parseInt(k[1]);
      let j = 0;
      for (; j < segs.length; j++) {
        if (segs[j][0] == s) break;
        if (segs[j][0] > s) {
          j--;
          break;
        }
      }
      if (j == segs.length) j--;
      let sg = segs[j];
      let new_segs = segs.slice(0, j);
      if (sg[0] < s) {
        new_segs.push([sg[0], sg[1].slice(0, s-sg[0]), sg[2]]);
      }
      new_segs.push([s, sg[1].slice(s-sg[0], e-sg[0]), sg[2].concat(blob[lineno][k])]);
      if (e < sg[0]+sg[1].length) {
        new_segs.push([e, sg[1].slice(e-sg[0]), sg[2]]);
      }
      new_segs = new_segs.concat(segs.slice(j+1));
      segs = new_segs;
    }
    if (segs.length == 1 && segs[0][1].length == 0) {
      segs[0][1] = '<br/>';
    }
    ret += segs.map((s) => '<span class="code-seg '+hl_cls(s[2])+'" data-spans="'+s[2].join(' ')+'">'+s[1]+'</span>').join('');
    ret += '</p>';
    return ret;
  }).join('');
}

function make_tree(node) {
  return '<div class="tree-node" data-id="'+node.id+'">'+node.type+node.children.map(make_tree).join('')+'</div>';
}

function get_highlights(tree, lang) {
  let caps = [];
  if (lang == 'RTX') {
    caps = langs.RTX.query(rtx_highlight).captures(tree.rootNode);
  }
  let ret = {};
  for (let obj of caps) {
    ret[obj.node.id] = obj.name.replace('.', '-');
  }
  for (let obj of langs[lang].query('(ERROR) @x').captures(tree.rootNode)) {
    ret[obj.node.id] = 'error';
  }
  return ret;
}

function gloss_tags(lang, tree) {
  if (lang == 'RTX') {
    let tag = {};
    let skip = [];
    for (let obj of langs.RTX.query(RTX_TAG_QUERY).captures(tree.rootNode)) {
      if (obj.name == 'tag') {
        tag[obj.node.id] = obj.node.text;
      } else {
        skip.push(obj.node.id);
      }
    }
    for (let id of skip) {
      tag[id] = undefined;
    }
    for (let k in tag) {
      let exp = tag[k].replace(/["<>%]/g, '').split('.').map(x => TAGS[x]).filter(x => (x != undefined)).join(', ');
      if (exp.length > 0) {
        $('*[data-id="'+k+'"]').attr('data-note', exp);
      }
    }
  }
}

function show_highlights() {
  let hl = $('.highlighted');
  if (hl.length > 0) {
    hl[0].scrollIntoView({behavior: 'smooth', block: 'nearest'});
  }
}

function update_output() {
  if (Parser == null) return;
  let lang = $('#parser').val();
  let text = document.getElementById('code').innerText;
  if (!text.match(/[^\n]\n[^\n]/)) {
    text = text.replace(/\n\n\n?/g, '\n');
  }
  text = text.trimEnd();
  console.log(lang);
  Parser.setLanguage(langs[lang]);
  let lines = text.split('\n');
  let tree = Parser.parse(text);
  let highlights = get_highlights(tree, lang);
  $('#code').html(make_spans(lines, tree, highlights));
  if (lang == 'RTX') {
    $('#tree').html(translate(rules.RTX, tree, true));
    gloss_tags(lang, tree);
  } else {
    $('#tree').html(make_tree(tree.rootNode));
  }
  $('.tree-node').mouseover(function(e) {
    let i = e.target.getAttribute('data-id');
    $('.highlighted').removeClass('highlighted');
    $('*[data-spans~="'+i+'"]').addClass('highlighted');
    show_highlights();
  });
  $('.code-line,.code-seg').mouseover(function(e) {
    let sp = e.target.getAttribute('data-spans');
    if (sp === null) return;
    $('.highlighted').removeClass('highlighted');
    sp.split(' ').forEach(i => $('*[data-id="'+i+'"]').addClass('highlighted'));
    show_highlights();
  });
}

$(function() {
  $('#update').click(update_output);
  $('#update').click();
});
