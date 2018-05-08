exports.id = "main";
exports.modules = {

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar inversify_config_1 = __webpack_require__(/*! ./inversify.config */ \"./inversify.config.ts\");\nvar types_1 = __webpack_require__(/*! ./types */ \"./types.ts\");\nvar ninja = inversify_config_1.utilsContainer.get(types_1.TYPES.Warrior);\nconsole.log(\"123--456d\", ninja.fight(), ninja.sneak());\n\n//# sourceURL=webpack:///./index.ts?");

/***/ })

};