exports.id = "main";
exports.modules = {

/***/ "../node_modules/_colors@1.2.3@colors/lib/colors.js":
/*!**********************************************************!*\
  !*** ../node_modules/_colors@1.2.3@colors/lib/colors.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n\nThe MIT License (MIT)\n\nOriginal Library\n  - Copyright (c) Marak Squires\n\nAdditional functionality\n - Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the \"Software\"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in\nall copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN\nTHE SOFTWARE.\n\n*/\n\nvar colors = {};\nmodule['exports'] = colors;\n\ncolors.themes = {};\n\nvar util = __webpack_require__(/*! util */ \"util\");\nvar ansiStyles = colors.styles = __webpack_require__(/*! ./styles */ \"../node_modules/_colors@1.2.3@colors/lib/styles.js\");\nvar defineProps = Object.defineProperties;\nvar newLineRegex = new RegExp(/[\\r\\n]+/g);\n\ncolors.supportsColor = __webpack_require__(/*! ./system/supports-colors */ \"../node_modules/_colors@1.2.3@colors/lib/system/supports-colors.js\").supportsColor;\n\nif (typeof colors.enabled === 'undefined') {\n  colors.enabled = colors.supportsColor() !== false;\n}\n\ncolors.enable = function() {\n  colors.enabled = true;\n};\n\ncolors.disable = function() {\n  colors.enabled = false;\n};\n\ncolors.stripColors = colors.strip = function(str) {\n  return ('' + str).replace(/\\x1B\\[\\d+m/g, '');\n};\n\n// eslint-disable-next-line no-unused-vars\nvar stylize = colors.stylize = function stylize(str, style) {\n  if (!colors.enabled) {\n    return str+'';\n  }\n\n  return ansiStyles[style].open + str + ansiStyles[style].close;\n};\n\nvar matchOperatorsRe = /[|\\\\{}()[\\]^$+*?.]/g;\nvar escapeStringRegexp = function(str) {\n  if (typeof str !== 'string') {\n    throw new TypeError('Expected a string');\n  }\n  return str.replace(matchOperatorsRe, '\\\\$&');\n};\n\nfunction build(_styles) {\n  var builder = function builder() {\n    return applyStyle.apply(builder, arguments);\n  };\n  builder._styles = _styles;\n  // __proto__ is used because we must return a function, but there is\n  // no way to create a function with a different prototype.\n  builder.__proto__ = proto;\n  return builder;\n}\n\nvar styles = (function() {\n  var ret = {};\n  ansiStyles.grey = ansiStyles.gray;\n  Object.keys(ansiStyles).forEach(function(key) {\n    ansiStyles[key].closeRe =\n      new RegExp(escapeStringRegexp(ansiStyles[key].close), 'g');\n    ret[key] = {\n      get: function() {\n        return build(this._styles.concat(key));\n      },\n    };\n  });\n  return ret;\n})();\n\nvar proto = defineProps(function colors() {}, styles);\n\nfunction applyStyle() {\n  var args = Array.prototype.slice.call(arguments);\n\n  var str = args.map(function(arg) {\n    return typeof arg === 'object' ? util.inspect(arg) : arg;\n  }).join(' ');\n\n  if (!colors.enabled || !str) {\n    return str;\n  }\n\n  var newLinesPresent = str.indexOf('\\n') != -1;\n\n  var nestedStyles = this._styles;\n\n  var i = nestedStyles.length;\n  while (i--) {\n    var code = ansiStyles[nestedStyles[i]];\n    str = code.open + str.replace(code.closeRe, code.open) + code.close;\n    if (newLinesPresent) {\n      str = str.replace(newLineRegex, code.close + '\\n' + code.open);\n    }\n  }\n\n  return str;\n}\n\ncolors.setTheme = function(theme) {\n  if (typeof theme === 'string') {\n    console.log('colors.setTheme now only accepts an object, not a string.  ' +\n      'If you are trying to set a theme from a file, it is now your (the ' +\n      'caller\\'s) responsibility to require the file.  The old syntax ' +\n      'looked like colors.setTheme(__dirname + ' +\n      '\\'/../themes/generic-logging.js\\'); The new syntax looks like '+\n      'colors.setTheme(require(__dirname + ' +\n      '\\'/../themes/generic-logging.js\\'));');\n    return;\n  }\n  for (var style in theme) {\n    (function(style) {\n      colors[style] = function(str) {\n        if (typeof theme[style] === 'object') {\n          var out = str;\n          for (var i in theme[style]) {\n            out = colors[theme[style][i]](out);\n          }\n          return out;\n        }\n        return colors[theme[style]](str);\n      };\n    })(style);\n  }\n};\n\nfunction init() {\n  var ret = {};\n  Object.keys(styles).forEach(function(name) {\n    ret[name] = {\n      get: function() {\n        return build([name]);\n      },\n    };\n  });\n  return ret;\n}\n\nvar sequencer = function sequencer(map, str) {\n  var exploded = str.split('');\n  exploded = exploded.map(map);\n  return exploded.join('');\n};\n\n// custom formatter methods\ncolors.trap = __webpack_require__(/*! ./custom/trap */ \"../node_modules/_colors@1.2.3@colors/lib/custom/trap.js\");\ncolors.zalgo = __webpack_require__(/*! ./custom/zalgo */ \"../node_modules/_colors@1.2.3@colors/lib/custom/zalgo.js\");\n\n// maps\ncolors.maps = {};\ncolors.maps.america = __webpack_require__(/*! ./maps/america */ \"../node_modules/_colors@1.2.3@colors/lib/maps/america.js\");\ncolors.maps.zebra = __webpack_require__(/*! ./maps/zebra */ \"../node_modules/_colors@1.2.3@colors/lib/maps/zebra.js\");\ncolors.maps.rainbow = __webpack_require__(/*! ./maps/rainbow */ \"../node_modules/_colors@1.2.3@colors/lib/maps/rainbow.js\");\ncolors.maps.random = __webpack_require__(/*! ./maps/random */ \"../node_modules/_colors@1.2.3@colors/lib/maps/random.js\");\n\nfor (var map in colors.maps) {\n  (function(map) {\n    colors[map] = function(str) {\n      return sequencer(colors.maps[map], str);\n    };\n  })(map);\n}\n\ndefineProps(colors, init());\n\n\n//# sourceURL=webpack:///../node_modules/_colors@1.2.3@colors/lib/colors.js?");

/***/ }),

/***/ "../node_modules/_colors@1.2.3@colors/lib/custom/trap.js":
/*!***************************************************************!*\
  !*** ../node_modules/_colors@1.2.3@colors/lib/custom/trap.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module['exports'] = function runTheTrap(text, options) {\n  var result = '';\n  text = text || 'Run the trap, drop the bass';\n  text = text.split('');\n  var trap = {\n    a: ['\\u0040', '\\u0104', '\\u023a', '\\u0245', '\\u0394', '\\u039b', '\\u0414'],\n    b: ['\\u00df', '\\u0181', '\\u0243', '\\u026e', '\\u03b2', '\\u0e3f'],\n    c: ['\\u00a9', '\\u023b', '\\u03fe'],\n    d: ['\\u00d0', '\\u018a', '\\u0500', '\\u0501', '\\u0502', '\\u0503'],\n    e: ['\\u00cb', '\\u0115', '\\u018e', '\\u0258', '\\u03a3', '\\u03be', '\\u04bc',\n         '\\u0a6c'],\n    f: ['\\u04fa'],\n    g: ['\\u0262'],\n    h: ['\\u0126', '\\u0195', '\\u04a2', '\\u04ba', '\\u04c7', '\\u050a'],\n    i: ['\\u0f0f'],\n    j: ['\\u0134'],\n    k: ['\\u0138', '\\u04a0', '\\u04c3', '\\u051e'],\n    l: ['\\u0139'],\n    m: ['\\u028d', '\\u04cd', '\\u04ce', '\\u0520', '\\u0521', '\\u0d69'],\n    n: ['\\u00d1', '\\u014b', '\\u019d', '\\u0376', '\\u03a0', '\\u048a'],\n    o: ['\\u00d8', '\\u00f5', '\\u00f8', '\\u01fe', '\\u0298', '\\u047a', '\\u05dd',\n         '\\u06dd', '\\u0e4f'],\n    p: ['\\u01f7', '\\u048e'],\n    q: ['\\u09cd'],\n    r: ['\\u00ae', '\\u01a6', '\\u0210', '\\u024c', '\\u0280', '\\u042f'],\n    s: ['\\u00a7', '\\u03de', '\\u03df', '\\u03e8'],\n    t: ['\\u0141', '\\u0166', '\\u0373'],\n    u: ['\\u01b1', '\\u054d'],\n    v: ['\\u05d8'],\n    w: ['\\u0428', '\\u0460', '\\u047c', '\\u0d70'],\n    x: ['\\u04b2', '\\u04fe', '\\u04fc', '\\u04fd'],\n    y: ['\\u00a5', '\\u04b0', '\\u04cb'],\n    z: ['\\u01b5', '\\u0240'],\n  };\n  text.forEach(function(c) {\n    c = c.toLowerCase();\n    var chars = trap[c] || [' '];\n    var rand = Math.floor(Math.random() * chars.length);\n    if (typeof trap[c] !== 'undefined') {\n      result += trap[c][rand];\n    } else {\n      result += c;\n    }\n  });\n  return result;\n};\n\n\n//# sourceURL=webpack:///../node_modules/_colors@1.2.3@colors/lib/custom/trap.js?");

/***/ }),

/***/ "../node_modules/_colors@1.2.3@colors/lib/custom/zalgo.js":
/*!****************************************************************!*\
  !*** ../node_modules/_colors@1.2.3@colors/lib/custom/zalgo.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// please no\nmodule['exports'] = function zalgo(text, options) {\n  text = text || '   he is here   ';\n  var soul = {\n    'up': [\n      '̍', '̎', '̄', '̅',\n      '̿', '̑', '̆', '̐',\n      '͒', '͗', '͑', '̇',\n      '̈', '̊', '͂', '̓',\n      '̈', '͊', '͋', '͌',\n      '̃', '̂', '̌', '͐',\n      '̀', '́', '̋', '̏',\n      '̒', '̓', '̔', '̽',\n      '̉', 'ͣ', 'ͤ', 'ͥ',\n      'ͦ', 'ͧ', 'ͨ', 'ͩ',\n      'ͪ', 'ͫ', 'ͬ', 'ͭ',\n      'ͮ', 'ͯ', '̾', '͛',\n      '͆', '̚',\n    ],\n    'down': [\n      '̖', '̗', '̘', '̙',\n      '̜', '̝', '̞', '̟',\n      '̠', '̤', '̥', '̦',\n      '̩', '̪', '̫', '̬',\n      '̭', '̮', '̯', '̰',\n      '̱', '̲', '̳', '̹',\n      '̺', '̻', '̼', 'ͅ',\n      '͇', '͈', '͉', '͍',\n      '͎', '͓', '͔', '͕',\n      '͖', '͙', '͚', '̣',\n    ],\n    'mid': [\n      '̕', '̛', '̀', '́',\n      '͘', '̡', '̢', '̧',\n      '̨', '̴', '̵', '̶',\n      '͜', '͝', '͞',\n      '͟', '͠', '͢', '̸',\n      '̷', '͡', ' ҉',\n    ],\n  };\n  var all = [].concat(soul.up, soul.down, soul.mid);\n\n  function randomNumber(range) {\n    var r = Math.floor(Math.random() * range);\n    return r;\n  }\n\n  function isChar(character) {\n    var bool = false;\n    all.filter(function(i) {\n      bool = (i === character);\n    });\n    return bool;\n  }\n\n\n  function heComes(text, options) {\n    var result = '';\n    var counts;\n    var l;\n    options = options || {};\n    options['up'] =\n      typeof options['up'] !== 'undefined' ? options['up'] : true;\n    options['mid'] =\n      typeof options['mid'] !== 'undefined' ? options['mid'] : true;\n    options['down'] =\n      typeof options['down'] !== 'undefined' ? options['down'] : true;\n    options['size'] =\n      typeof options['size'] !== 'undefined' ? options['size'] : 'maxi';\n    text = text.split('');\n    for (l in text) {\n      if (isChar(l)) {\n        continue;\n      }\n      result = result + text[l];\n      counts = {'up': 0, 'down': 0, 'mid': 0};\n      switch (options.size) {\n      case 'mini':\n        counts.up = randomNumber(8);\n        counts.mid = randomNumber(2);\n        counts.down = randomNumber(8);\n        break;\n      case 'maxi':\n        counts.up = randomNumber(16) + 3;\n        counts.mid = randomNumber(4) + 1;\n        counts.down = randomNumber(64) + 3;\n        break;\n      default:\n        counts.up = randomNumber(8) + 1;\n        counts.mid = randomNumber(6) / 2;\n        counts.down = randomNumber(8) + 1;\n        break;\n      }\n\n      var arr = ['up', 'mid', 'down'];\n      for (var d in arr) {\n        var index = arr[d];\n        for (var i = 0; i <= counts[index]; i++) {\n          if (options[index]) {\n            result = result + soul[index][randomNumber(soul[index].length)];\n          }\n        }\n      }\n    }\n    return result;\n  }\n  // don't summon him\n  return heComes(text, options);\n};\n\n\n\n//# sourceURL=webpack:///../node_modules/_colors@1.2.3@colors/lib/custom/zalgo.js?");

/***/ }),

/***/ "../node_modules/_colors@1.2.3@colors/lib/maps/america.js":
/*!****************************************************************!*\
  !*** ../node_modules/_colors@1.2.3@colors/lib/maps/america.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var colors = __webpack_require__(/*! ../colors */ \"../node_modules/_colors@1.2.3@colors/lib/colors.js\");\n\nmodule['exports'] = (function() {\n  return function(letter, i, exploded) {\n    if (letter === ' ') return letter;\n    switch (i%3) {\n      case 0: return colors.red(letter);\n      case 1: return colors.white(letter);\n      case 2: return colors.blue(letter);\n    }\n  };\n})();\n\n\n//# sourceURL=webpack:///../node_modules/_colors@1.2.3@colors/lib/maps/america.js?");

/***/ }),

/***/ "../node_modules/_colors@1.2.3@colors/lib/maps/rainbow.js":
/*!****************************************************************!*\
  !*** ../node_modules/_colors@1.2.3@colors/lib/maps/rainbow.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var colors = __webpack_require__(/*! ../colors */ \"../node_modules/_colors@1.2.3@colors/lib/colors.js\");\n\nmodule['exports'] = (function() {\n  // RoY G BiV\n  var rainbowColors = ['red', 'yellow', 'green', 'blue', 'magenta'];\n  return function(letter, i, exploded) {\n    if (letter === ' ') {\n      return letter;\n    } else {\n      return colors[rainbowColors[i++ % rainbowColors.length]](letter);\n    }\n  };\n})();\n\n\n\n//# sourceURL=webpack:///../node_modules/_colors@1.2.3@colors/lib/maps/rainbow.js?");

/***/ }),

/***/ "../node_modules/_colors@1.2.3@colors/lib/maps/random.js":
/*!***************************************************************!*\
  !*** ../node_modules/_colors@1.2.3@colors/lib/maps/random.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var colors = __webpack_require__(/*! ../colors */ \"../node_modules/_colors@1.2.3@colors/lib/colors.js\");\n\nmodule['exports'] = (function() {\n  var available = ['underline', 'inverse', 'grey', 'yellow', 'red', 'green',\n    'blue', 'white', 'cyan', 'magenta'];\n  return function(letter, i, exploded) {\n    return letter === ' ' ? letter :\n      colors[\n        available[Math.round(Math.random() * (available.length - 2))]\n      ](letter);\n  };\n})();\n\n\n//# sourceURL=webpack:///../node_modules/_colors@1.2.3@colors/lib/maps/random.js?");

/***/ }),

/***/ "../node_modules/_colors@1.2.3@colors/lib/maps/zebra.js":
/*!**************************************************************!*\
  !*** ../node_modules/_colors@1.2.3@colors/lib/maps/zebra.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var colors = __webpack_require__(/*! ../colors */ \"../node_modules/_colors@1.2.3@colors/lib/colors.js\");\n\nmodule['exports'] = function(letter, i, exploded) {\n  return i % 2 === 0 ? letter : colors.inverse(letter);\n};\n\n\n//# sourceURL=webpack:///../node_modules/_colors@1.2.3@colors/lib/maps/zebra.js?");

/***/ }),

/***/ "../node_modules/_colors@1.2.3@colors/lib/styles.js":
/*!**********************************************************!*\
  !*** ../node_modules/_colors@1.2.3@colors/lib/styles.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*\nThe MIT License (MIT)\n\nCopyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the \"Software\"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in\nall copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN\nTHE SOFTWARE.\n\n*/\n\nvar styles = {};\nmodule['exports'] = styles;\n\nvar codes = {\n  reset: [0, 0],\n\n  bold: [1, 22],\n  dim: [2, 22],\n  italic: [3, 23],\n  underline: [4, 24],\n  inverse: [7, 27],\n  hidden: [8, 28],\n  strikethrough: [9, 29],\n\n  black: [30, 39],\n  red: [31, 39],\n  green: [32, 39],\n  yellow: [33, 39],\n  blue: [34, 39],\n  magenta: [35, 39],\n  cyan: [36, 39],\n  white: [37, 39],\n  gray: [90, 39],\n  grey: [90, 39],\n\n  bgBlack: [40, 49],\n  bgRed: [41, 49],\n  bgGreen: [42, 49],\n  bgYellow: [43, 49],\n  bgBlue: [44, 49],\n  bgMagenta: [45, 49],\n  bgCyan: [46, 49],\n  bgWhite: [47, 49],\n\n  // legacy styles for colors pre v1.0.0\n  blackBG: [40, 49],\n  redBG: [41, 49],\n  greenBG: [42, 49],\n  yellowBG: [43, 49],\n  blueBG: [44, 49],\n  magentaBG: [45, 49],\n  cyanBG: [46, 49],\n  whiteBG: [47, 49],\n\n};\n\nObject.keys(codes).forEach(function(key) {\n  var val = codes[key];\n  var style = styles[key] = [];\n  style.open = '\\u001b[' + val[0] + 'm';\n  style.close = '\\u001b[' + val[1] + 'm';\n});\n\n\n//# sourceURL=webpack:///../node_modules/_colors@1.2.3@colors/lib/styles.js?");

/***/ }),

/***/ "../node_modules/_colors@1.2.3@colors/lib/system/has-flag.js":
/*!*******************************************************************!*\
  !*** ../node_modules/_colors@1.2.3@colors/lib/system/has-flag.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/*\nMIT License\n\nCopyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of\nthis software and associated documentation files (the \"Software\"), to deal in\nthe Software without restriction, including without limitation the rights to\nuse, copy, modify, merge, publish, distribute, sublicense, and/or sell copies\nof the Software, and to permit persons to whom the Software is furnished to do\nso, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n*/\n\n\n\nmodule.exports = function(flag, argv) {\n  argv = argv || process.argv;\n\n  var terminatorPos = argv.indexOf('--');\n  var prefix = /^-{1,2}/.test(flag) ? '' : '--';\n  var pos = argv.indexOf(prefix + flag);\n\n  return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);\n};\n\n\n//# sourceURL=webpack:///../node_modules/_colors@1.2.3@colors/lib/system/has-flag.js?");

/***/ }),

/***/ "../node_modules/_colors@1.2.3@colors/lib/system/supports-colors.js":
/*!**************************************************************************!*\
  !*** ../node_modules/_colors@1.2.3@colors/lib/system/supports-colors.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/*\nThe MIT License (MIT)\n\nCopyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the \"Software\"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in\nall copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN\nTHE SOFTWARE.\n\n*/\n\n\n\nvar os = __webpack_require__(/*! os */ \"os\");\nvar hasFlag = __webpack_require__(/*! ./has-flag.js */ \"../node_modules/_colors@1.2.3@colors/lib/system/has-flag.js\");\n\nvar env = process.env;\n\nvar forceColor = void 0;\nif (hasFlag('no-color') || hasFlag('no-colors') || hasFlag('color=false')) {\n  forceColor = false;\n} else if (hasFlag('color') || hasFlag('colors') || hasFlag('color=true')\n           || hasFlag('color=always')) {\n  forceColor = true;\n}\nif ('FORCE_COLOR' in env) {\n  forceColor = env.FORCE_COLOR.length === 0\n    || parseInt(env.FORCE_COLOR, 10) !== 0;\n}\n\nfunction translateLevel(level) {\n  if (level === 0) {\n    return false;\n  }\n\n  return {\n    level: level,\n    hasBasic: true,\n    has256: level >= 2,\n    has16m: level >= 3,\n  };\n}\n\nfunction supportsColor(stream) {\n  if (forceColor === false) {\n    return 0;\n  }\n\n  if (hasFlag('color=16m') || hasFlag('color=full')\n      || hasFlag('color=truecolor')) {\n    return 3;\n  }\n\n  if (hasFlag('color=256')) {\n    return 2;\n  }\n\n  if (stream && !stream.isTTY && forceColor !== true) {\n    return 0;\n  }\n\n  var min = forceColor ? 1 : 0;\n\n  if (process.platform === 'win32') {\n    // Node.js 7.5.0 is the first version of Node.js to include a patch to\n    // libuv that enables 256 color output on Windows. Anything earlier and it\n    // won't work. However, here we target Node.js 8 at minimum as it is an LTS\n    // release, and Node.js 7 is not. Windows 10 build 10586 is the first\n    // Windows release that supports 256 colors. Windows 10 build 14931 is the\n    // first release that supports 16m/TrueColor.\n    var osRelease = os.release().split('.');\n    if (Number(process.versions.node.split('.')[0]) >= 8\n        && Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {\n      return Number(osRelease[2]) >= 14931 ? 3 : 2;\n    }\n\n    return 1;\n  }\n\n  if ('CI' in env) {\n    if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI'].some(function(sign) {\n      return sign in env;\n    }) || env.CI_NAME === 'codeship') {\n      return 1;\n    }\n\n    return min;\n  }\n\n  if ('TEAMCITY_VERSION' in env) {\n    return (/^(9\\.(0*[1-9]\\d*)\\.|\\d{2,}\\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0\n    );\n  }\n\n  if ('TERM_PROGRAM' in env) {\n    var version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);\n\n    switch (env.TERM_PROGRAM) {\n      case 'iTerm.app':\n        return version >= 3 ? 3 : 2;\n      case 'Hyper':\n        return 3;\n      case 'Apple_Terminal':\n        return 2;\n      // No default\n    }\n  }\n\n  if (/-256(color)?$/i.test(env.TERM)) {\n    return 2;\n  }\n\n  if (/^screen|^xterm|^vt100|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {\n    return 1;\n  }\n\n  if ('COLORTERM' in env) {\n    return 1;\n  }\n\n  if (env.TERM === 'dumb') {\n    return min;\n  }\n\n  return min;\n}\n\nfunction getSupportLevel(stream) {\n  var level = supportsColor(stream);\n  return translateLevel(level);\n}\n\nmodule.exports = {\n  supportsColor: getSupportLevel,\n  stdout: getSupportLevel(process.stdout),\n  stderr: getSupportLevel(process.stderr),\n};\n\n\n//# sourceURL=webpack:///../node_modules/_colors@1.2.3@colors/lib/system/supports-colors.js?");

/***/ }),

/***/ "../node_modules/_colors@1.2.3@colors/safe.js":
/*!****************************************************!*\
  !*** ../node_modules/_colors@1.2.3@colors/safe.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("//\n// Remark: Requiring this file will use the \"safe\" colors API,\n// which will not touch String.prototype.\n//\n//   var colors = require('colors/safe');\n//   colors.red(\"foo\")\n//\n//\nvar colors = __webpack_require__(/*! ./lib/colors */ \"../node_modules/_colors@1.2.3@colors/lib/colors.js\");\nmodule['exports'] = colors;\n\n\n//# sourceURL=webpack:///../node_modules/_colors@1.2.3@colors/safe.js?");

/***/ }),

/***/ "../node_modules/_tinytim@0.1.1@tinytim/lib/index.js":
/*!***********************************************************!*\
  !*** ../node_modules/_tinytim@0.1.1@tinytim/lib/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./tinytim */ \"../node_modules/_tinytim@0.1.1@tinytim/lib/tinytim.js\");\n\n/**\n * Intermediate js cache.\n * \n * @type Object\n */\n\nvar cache = {};\n\n/**\n * Clear intermediate js cache.\n * \n * @api public\n */\n\nmodule.exports.clearCache = function() {\n\tcache = {};\n};\n\n/**\n * Render the given `str` of tim.\n * \n * @param {String}\n *            str\n * @param {Object}\n *            vars\n * @return {String}\n * @api public\n */\n\nmodule.exports.render = module.exports.tim;\n\n\n/**\n * Render an tim file at the given `path`.\n * \n * @param {String}\n *            path\n * @param {Vars}\n *            vars\n * @param {Bool}\n *            use cache or not\n * @api public\n */\n\nmodule.exports.renderFile = function(path, vars, useCache) {\n\tvar fs = __webpack_require__(/*! fs */ \"fs\");\n\tvar key = path + ':string';\n\tvar str = useCache ? cache[key]\n\t\t\t|| (cache[key] = fs.readFileSync(path, 'utf8')) : fs\n\t\t\t.readFileSync(path, 'utf8');\n\n\treturn module.exports.render(str, vars);\n};\n\n\n//# sourceURL=webpack:///../node_modules/_tinytim@0.1.1@tinytim/lib/index.js?");

/***/ }),

/***/ "../node_modules/_tinytim@0.1.1@tinytim/lib/tinytim.js":
/*!*************************************************************!*\
  !*** ../node_modules/_tinytim@0.1.1@tinytim/lib/tinytim.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*!\n tinytim.js\n   github.com/premasagar/tim\n    A tiny, secure JavaScript micro-templating script.\n    by Premasagar Rose\n        dharmafly.com\n    license\n        opensource.org/licenses/mit-license.php\n    creates global object\n        tim\n    v0.3.0\n        \n\tported and modified by LI Long <lilong@gmail.com> 3/13/2012\n */\nvar start = exports.start  = \"{{\";\nvar end = exports.end\t = \"}}\";\n        \nvar tim = exports.tim = (function(){\n    \"use strict\";\n\n    var \n        path    = \"[a-z0-9_][\\\\.a-z0-9_]*\", // e.g. config.person.name\n        undef;\n    \n    return function(template, data){\n        var pattern = new RegExp(exports.start + \"\\\\s*(\"+ path +\")\\\\s*\" + exports.end, \"gi\");\n\n        // Merge data into the template string\n        return template.replace(pattern, function(tag, token){\n            var path = token.split(\".\"),\n                len = path.length,\n                lookup = data,\n                i = 0;\n\n            for (; i < len; i++){\n                lookup = lookup[path[i]];\n                \n                // Property not found\n                if (lookup === undef){\n                    throw new Error(\"tim: '\" + path[i] + \"' not found in \" + tag);\n                }\n                \n                // Return the required value\n                if (i === len - 1){\n                    return lookup;\n                }\n            }\n        });\n    };\n}());\n\n\n//# sourceURL=webpack:///../node_modules/_tinytim@0.1.1@tinytim/lib/tinytim.js?");

/***/ }),

/***/ "../node_modules/_tracer@0.8.15@tracer/lib sync recursive":
/*!******************************************************!*\
  !*** ../node_modules/_tracer@0.8.15@tracer/lib sync ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function webpackEmptyContext(req) {\n\tvar e = new Error('Cannot find module \"' + req + '\".');\n\te.code = 'MODULE_NOT_FOUND';\n\tthrow e;\n}\nwebpackEmptyContext.keys = function() { return []; };\nwebpackEmptyContext.resolve = webpackEmptyContext;\nmodule.exports = webpackEmptyContext;\nwebpackEmptyContext.id = \"../node_modules/_tracer@0.8.15@tracer/lib sync recursive\";\n\n//# sourceURL=webpack:///../node_modules/_tracer@0.8.15@tracer/lib_sync?");

/***/ }),

/***/ "../node_modules/_tracer@0.8.15@tracer/lib/color_console.js":
/*!******************************************************************!*\
  !*** ../node_modules/_tracer@0.8.15@tracer/lib/color_console.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar colors = __webpack_require__(/*! colors/safe */ \"../node_modules/_colors@1.2.3@colors/safe.js\");\nmodule.exports = function(conf) {\n\treturn __webpack_require__(/*! ./console */ \"../node_modules/_tracer@0.8.15@tracer/lib/console.js\")({\n\t\tfilters : {\n\t\t\t//log : do nothing\n\t\t\ttrace : colors.magenta,\n\t\t\tdebug : colors.cyan,\n\t\t\tinfo : colors.green,\n\t\t\twarn : colors.yellow,\n\t\t\terror : colors.red.bold,\n\t\t\tfatal : colors.red.bold\n\t\t}\n\t}, conf);\n};\n\n\n//# sourceURL=webpack:///../node_modules/_tracer@0.8.15@tracer/lib/color_console.js?");

/***/ }),

/***/ "../node_modules/_tracer@0.8.15@tracer/lib/console.js":
/*!************************************************************!*\
  !*** ../node_modules/_tracer@0.8.15@tracer/lib/console.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar tinytim = __webpack_require__(/*! tinytim */ \"../node_modules/_tinytim@0.1.1@tinytim/lib/index.js\"), dateFormat = __webpack_require__(/*! dateformat */ \"dateformat\"), utils = __webpack_require__(/*! ./utils */ \"../node_modules/_tracer@0.8.15@tracer/lib/utils.js\"), path = __webpack_require__(/*! path */ \"path\"), settings = __webpack_require__(/*! ./settings */ \"../node_modules/_tracer@0.8.15@tracer/lib/settings.js\").settings;\n\nvar noop = function(){};\n\nvar fwrap = function(fn){\n\treturn function(str){ return fn(str) };\n};\n\n// Stack trace format :\n// https://github.com/v8/v8/wiki/Stack%20Trace%20API\nvar stackReg = /at\\s+(.*)\\s+\\((.*):(\\d*):(\\d*)\\)/i;\nvar stackReg2 = /at\\s+()(.*):(\\d*):(\\d*)/i;\n\n// main log method\nfunction logMain(config, level, title, format, filters, needstack, args) {\n\t//check level of global settings\n\tvar gLevel = settings.level;\n\tif (typeof (gLevel) == 'string')\n\t\tgLevel = config.methods.indexOf(gLevel);\n\tif (level < gLevel) { return; }\n\n\tvar data = {\n\t\ttimestamp : dateFormat(new Date(), config.dateformat),\n\t\tmessage : \"\",\n\t\ttitle : title,\n\t\tlevel : level,\n\t\targs : args\n\t};\n\tdata.method = data.path = data.line = data.pos = data.file = '';\n\n\tif (needstack) {\n\t\t// get call stack, and analyze it\n\t\t// get all file,method and line number\n\t\tvar stacklist = (new Error()).stack.split('\\n').slice(3);\n\t\tvar s = stacklist[config.stackIndex] || stacklist[0],\n\t\t\tsp = stackReg.exec(s) || stackReg2.exec(s);\n\t\tif (sp && sp.length === 5) {\n\t\t\tdata.method = sp[1];\n\t\t\tdata.path = sp[2];\n\t\t\tdata.line = sp[3];\n\t\t\tdata.pos = sp[4];\n\t\t\tdata.file = path.basename(data.path);\n\t\t\tdata.stack = stacklist.join('\\n');\n\t\t}\n\t}\n\n\tconfig.preprocess(data);\n\tvar msg = utils.format.apply(config, data.args);\n\tdata.message = msg;\n\n\t// call micro-template to ouput\n\tdata.output = tinytim.tim(format, data);\n\t\n\t// save unprocessed output\n\tdata.rawoutput = data.output;\n\n\t// process every filter method\n\tvar len = filters.length;\n\tfor ( var i = 0; i < len; i += 1) {\n\t\tdata.output = fwrap(filters[i])(data.output);\n\t\tif (!data.output)\n\t\t\treturn data;\n\t\t// cancel next process if return a false(include null, undefined)\n\t}\n\t// trans the final result\n\tconfig.transport.forEach(function(tras) {\n\t\ttras(data);\n\t});\n\treturn data;\n}\n\nmodule.exports = (function() {\n\t// default config\n\tvar _config = {\n\t\tformat : \"{{timestamp}} <{{title}}> {{file}}:{{line}} ({{method}}) {{message}}\",\n\t\tdateformat : \"isoDateTime\",\n\t\tpreprocess : function() {\n\t\t},\n\t\ttransport : function(data) {\n\t\t\tif (data.level >= 4) { // warn and more critical\n\t\t\t\tconsole.error(data.output);\n\t\t\t} else {\n\t\t\t\tconsole.log(data.output);\n\t\t\t}\n\t\t},\n\t\tfilters : [],\n\t\tlevel : 'log',\n\t\tmethods : [ 'log', 'trace', 'debug', 'info', 'warn', 'error', 'fatal' ],\n\t\tstackIndex : 0,\t\t// get the specified index of stack as file information. It is userful for development package.\n\t\tinspectOpt : {\n\t\t\tshowHidden : false, //if true then the object's non-enumerable properties will be shown too. Defaults to false\n\t\t\tdepth : 2 //tells inspect how many times to recurse while formatting the object. This is useful for inspecting large complicated objects. Defaults to 2. To make it recurse indefinitely pass null.\n\t\t}\n\t};\n\n\tvar userConfig = arguments;\n\tif(typeof userConfig[0] === 'string') {\n\t\tuserConfig = [__webpack_require__(\"../node_modules/_tracer@0.8.15@tracer/lib sync recursive\")(userConfig[0])];\n\t}\n\n\t// union user's config and default\n\t_config = utils.union(_config, userConfig);\n\n\tvar _self = {};\n\n\t_config.format = Array.isArray(_config.format) ? _config.format\n\t\t: [ _config.format ];\n\n\t_config.filters = Array.isArray(_config.filters) ? _config.filters\n\t\t: [ _config.filters ];\n\n\t_config.transport = Array.isArray(_config.transport) ? _config.transport : [_config.transport];\n\n\tvar fLen = _config.filters.length, lastFilter;\n\tif (fLen > 0)\n\t\tif (Object.prototype.toString.call(_config.filters[--fLen]) != '[object Function]') {\n\t\t\tlastFilter = _config.filters[fLen];\n\t\t\t_config.filters = _config.filters.slice(0, fLen);\n\t\t}\n\n\tif (typeof (_config.level) == 'string')\n\t\t_config.level = _config.methods.indexOf(_config.level);\n\n\t_config.methods.forEach(function(title, i) {\n\t\tif (i < _config.level)\n\t\t\t_self[title] = noop;\n\t\telse {\n\t\t\tvar format = _config.format[0];\n\t\t\tif (_config.format.length === 2 && _config.format[1][title])\n\t\t\t\tformat = _config.format[1][title];\n\t\t\tvar needstack = /{{(method|path|line|pos|file|stack)}}/i.test(format);\n\n\t\t\tvar filters;\n\t\t\tif (lastFilter && lastFilter[title])\n\t\t\t\tfilters = Array.isArray(lastFilter[title]) ? lastFilter[title]\n\t\t\t\t\t: [ lastFilter[title] ];\n\t\t\telse\n\t\t\t\tfilters = _config.filters;\n\n\t\t\t// interface\n\t\t\t_self[title] = function() {\n\t\t\t\treturn logMain(_config, i, title, format, filters, needstack, arguments);\n\t\t\t};\n\t\t}\n\t});\n\n\treturn _self;\n});\n\n\n//# sourceURL=webpack:///../node_modules/_tracer@0.8.15@tracer/lib/console.js?");

/***/ }),

/***/ "../node_modules/_tracer@0.8.15@tracer/lib/dailyfile.js":
/*!**************************************************************!*\
  !*** ../node_modules/_tracer@0.8.15@tracer/lib/dailyfile.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar fs = __webpack_require__(/*! fs */ \"fs\"), dateFormat = __webpack_require__(/*! dateformat */ \"dateformat\"), tinytim = __webpack_require__(/*! tinytim */ \"../node_modules/_tinytim@0.1.1@tinytim/lib/index.js\"), utils = __webpack_require__(/*! ./utils */ \"../node_modules/_tracer@0.8.15@tracer/lib/utils.js\"), spawn = __webpack_require__(/*! child_process */ \"child_process\").spawn, spawnSync = __webpack_require__(/*! child_process */ \"child_process\").spawnSync;\n// var path = require('path');\nvar os = __webpack_require__(/*! os */ \"os\");\nvar mkdirp = __webpack_require__(/*! mkdirp */ \"mkdirp\");\n\nfunction checkLogFile(path) {\n    if(os.type() === 'Windows_NT') {\n        if(!fs.existsSync(path)) {\n            mkdirp(path);\n        }\n    }else {\n        spawnSync('mkdir', ['-p', path]);\n    }\n}\n\nmodule.exports = function (conf) {\n    var _conf = {\n        root: '.',\n        logPathFormat: '{{root}}/{{prefix}}.{{date}}.log',\n        splitFormat: 'yyyymmdd',\n        allLogsFileName: false,\n        maxLogFiles: 10\n    };\n\n    _conf = utils.union(_conf, [conf]);\n\n    function LogFile(prefix, date) {\n        this.date = date;\n        this.path = tinytim.tim(_conf.logPathFormat, {root: _conf.root, prefix: prefix, date: date});\n        checkLogFile(_conf.root);\n        this.stream = fs.createWriteStream(this.path, {\n            flags: \"a\",\n            encoding: \"utf8\",\n            mode: parseInt('0644', 8)\n            // When engines node >= 4.0.0, following notation will be better:\n            //mode: 0o644\n        });\n    }\n\n    LogFile.prototype.write = function (str) {\n        this.stream.write(str + \"\\n\");\n    };\n\n    LogFile.prototype.destroy = function () {\n        if (this.stream) {\n            this.stream.end();\n            this.stream.destroySoon();\n            this.stream = null;\n        }\n    };\n\n    var _logMap = {};\n\n    function _push2File(str, title) {\n        if (_conf.allLogsFileName) {\n            var allLogFile = _logMap.allLogFile, now = dateFormat(new Date(), _conf.splitFormat);\n            if (allLogFile && allLogFile.date != now) {\n                allLogFile.destroy();\n                allLogFile = null;\n            }\n            if (!allLogFile) {\n                allLogFile = _logMap.allLogFile = new LogFile(_conf.allLogsFileName, now);\n                spawn('find', ['./', '-type', 'f', '-name', '*.log', '-mtime', '+' + _conf.maxLogFiles, '-exec', 'rm', '{}', '\\;']);\n            }\n            allLogFile.write(str);\n        } else {\n            var logFile = _logMap[title], nowAgain = dateFormat(new Date(), _conf.splitFormat);\n            if (logFile && logFile.date != nowAgain) {\n                logFile.destroy();\n                logFile = null;\n            }\n            if (!logFile) {\n                logFile = _logMap[title] = new LogFile(title, nowAgain);\n                spawn('find', [_conf.root, '-type', 'f', '-name', '*.log', '-mtime', '+' + _conf.maxLogFiles, '-exec', 'rm', '{}', '\\;']);\n            }\n            logFile.write(str);\n        }\n    }\n\n    function dailyFileTransport(data) {\n        _push2File(data.output, data.title);\n    }\n\n    if (conf.transport) {\n        conf.transport = Array.isArray(conf.transport) ? conf.transport : [conf.transport];\n        conf.transport.push(dailyFileTransport)\n    } else {\n        conf.transport = [dailyFileTransport];\n    }\n    return __webpack_require__(/*! ./console */ \"../node_modules/_tracer@0.8.15@tracer/lib/console.js\")(conf);\n};\n\n\n//# sourceURL=webpack:///../node_modules/_tracer@0.8.15@tracer/lib/dailyfile.js?");

/***/ }),

/***/ "../node_modules/_tracer@0.8.15@tracer/lib/index.js":
/*!**********************************************************!*\
  !*** ../node_modules/_tracer@0.8.15@tracer/lib/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nexports.console = __webpack_require__(/*! ./console */ \"../node_modules/_tracer@0.8.15@tracer/lib/console.js\");\nexports.colorConsole = __webpack_require__(/*! ./color_console */ \"../node_modules/_tracer@0.8.15@tracer/lib/color_console.js\");\nexports.dailyfile = __webpack_require__(/*! ./dailyfile */ \"../node_modules/_tracer@0.8.15@tracer/lib/dailyfile.js\");\n\n//global settings\nvar settings = __webpack_require__(/*! ./settings */ \"../node_modules/_tracer@0.8.15@tracer/lib/settings.js\");\nexports.close = settings.close;\nexports.setLevel = settings.setLevel;\nexports.getLevel = settings.getLevel;\n\n\n//# sourceURL=webpack:///../node_modules/_tracer@0.8.15@tracer/lib/index.js?");

/***/ }),

/***/ "../node_modules/_tracer@0.8.15@tracer/lib/settings.js":
/*!*************************************************************!*\
  !*** ../node_modules/_tracer@0.8.15@tracer/lib/settings.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar settings = {\n\tlevel : undefined\n}\n\n//end all of output\nvar close = function(){\n\tsettings.level = Number.MAX_VALUE;\n}\n\n//dynamically change the log level, all of output\nvar setLevel = function(level){\n\tsettings.level = level;\n}\n\n//get the current log level\nvar getLevel = function(){\n\treturn settings.level;\n}\n\n\nexports.settings = settings;\nexports.close = close;\nexports.setLevel = setLevel;\nexports.getLevel = getLevel;\n\n\n//# sourceURL=webpack:///../node_modules/_tracer@0.8.15@tracer/lib/settings.js?");

/***/ }),

/***/ "../node_modules/_tracer@0.8.15@tracer/lib/utils.js":
/*!**********************************************************!*\
  !*** ../node_modules/_tracer@0.8.15@tracer/lib/utils.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nexports.union = function(obj, args) {\n\tfor (var i = 0, len = args.length; i < len; i += 1) {\n\t\tvar source = args[i];\n\t\tfor ( var prop in source) {\n\t\t\tobj[prop] = source[prop];\n\t\t}\n\t}\n\treturn obj;\n};\n\nvar formatRegExp = /%[sdjt]/g;\nvar util = __webpack_require__(/*! util */ \"util\");\nexports.format = function(f) {\n\tvar inspectOpt = this.inspectOpt;\n\tvar args = arguments;\n\tvar i = 0;\n\n\tif (typeof f !== 'string') {\n\t\tvar objects = [];\n\t\tfor (; i < args.length; i++) {\n\t\t\tobjects.push(util.inspect(args[i], inspectOpt));\n\t\t}\n\t\treturn objects.join(' ');\n\t}\n\n\ti = 1;\n\tvar str = String(f).replace(formatRegExp, function(x) {\n\t\tswitch (x) {\n\t\tcase '%s':\n\t\t\treturn String(args[i++]);\n\t\tcase '%d':\n\t\t\treturn Number(args[i++]);\n\t\tcase '%j':\n\t\t\ttry {\n\t\t\t    if (args[i] instanceof Error) {\n\t\t\t\treturn JSON.stringify(args[i++], ['message', 'stack', 'type', 'name']);\n        \t\t    } else {\n            \t\t\treturn JSON.stringify(args[i++]);\n        \t\t    }\n\t\t\t} catch(e) {\n\t\t\t\treturn '[Circular]';\n\t\t\t}\n\t\tcase '%t':\n\t\t\treturn util.inspect(args[i++], inspectOpt);\n\t\tdefault:\n\t\t\treturn x;\n\t\t}\n\t});\n\tfor ( var len = args.length, x = args[i]; i < len; x = args[++i]) {\n\t\tif (x === null || typeof x !== 'object') {\n\t\t\tstr += ' ' + x;\n\t\t} else {\n\t\t\tstr += ' ' + util.inspect(x, inspectOpt);\n\t\t}\n\t}\n\treturn str;\n};\n\n\n//# sourceURL=webpack:///../node_modules/_tracer@0.8.15@tracer/lib/utils.js?");

/***/ }),

/***/ "./inversify.config.ts":
/*!*****************************!*\
  !*** ./inversify.config.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar inversify_1 = __webpack_require__(/*! inversify */ \"inversify\");\nvar types_1 = __webpack_require__(/*! ./types */ \"./types.ts\");\nvar entities_1 = __webpack_require__(/*! ./entities */ \"./entities.ts\");\nvar logs_1 = __webpack_require__(/*! ./logs */ \"./logs.ts\");\nvar utilsContainer = new inversify_1.Container();\nexports.utilsContainer = utilsContainer;\nutilsContainer.bind(types_1.TYPES.Warrior).to(entities_1.Ninja);\nutilsContainer.bind(types_1.TYPES.Weapon).to(entities_1.Katana);\nutilsContainer.bind(types_1.TYPES.ThrowableWeapon).to(entities_1.Shuriken);\nutilsContainer.bind(types_1.TYPES.ThrowableWeapon).to(logs_1.ColorLogs);\n\n//# sourceURL=webpack:///./inversify.config.ts?");

/***/ }),

/***/ "./logs.ts":
/*!*****************!*\
  !*** ./logs.ts ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nvar __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {\n    var c = arguments.length,\n        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,\n        d;\n    if ((typeof Reflect === \"undefined\" ? \"undefined\" : _typeof(Reflect)) === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {\n        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    }return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = undefined && undefined.__metadata || function (k, v) {\n    if ((typeof Reflect === \"undefined\" ? \"undefined\" : _typeof(Reflect)) === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\n__webpack_require__(/*! reflect-metadata */ \"reflect-metadata\");\nvar inversify_1 = __webpack_require__(/*! inversify */ \"inversify\");\nvar tracer_1 = __webpack_require__(/*! tracer */ \"../node_modules/_tracer@0.8.15@tracer/lib/index.js\");\nvar ColorLogs = /** @class */function () {\n    function ColorLogs() {\n        this.logger = tracer_1.colorConsole();\n    }\n    ColorLogs.prototype.info = function (msg) {\n        this.logger.info(msg);\n    };\n    ColorLogs = __decorate([inversify_1.injectable(), __metadata(\"design:paramtypes\", [])], ColorLogs);\n    return ColorLogs;\n}();\nexports.ColorLogs = ColorLogs;\n\n//# sourceURL=webpack:///./logs.ts?");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"child_process\");\n\n//# sourceURL=webpack:///external_%22child_process%22?");

/***/ }),

/***/ "dateformat":
/*!*****************************!*\
  !*** external "dateformat" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"dateformat\");\n\n//# sourceURL=webpack:///external_%22dateformat%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "mkdirp":
/*!*************************!*\
  !*** external "mkdirp" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mkdirp\");\n\n//# sourceURL=webpack:///external_%22mkdirp%22?");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"os\");\n\n//# sourceURL=webpack:///external_%22os%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"util\");\n\n//# sourceURL=webpack:///external_%22util%22?");

/***/ })

};