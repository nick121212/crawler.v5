exports.id = "main";
exports.modules = {

/***/ "./inversify.config.ts":
/*!*****************************!*\
  !*** ./inversify.config.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar inversify_1 = __webpack_require__(/*! inversify */ \"inversify\");\nvar types_1 = __webpack_require__(/*! ./types */ \"./types.ts\");\nvar entities_1 = __webpack_require__(/*! ./entities */ \"./entities.ts\");\nvar logs_1 = __webpack_require__(/*! ./logs */ \"./logs.ts\");\nvar utilsContainer = new inversify_1.Container();\nexports.utilsContainer = utilsContainer;\nutilsContainer.bind(types_1.TYPES.Warrior).to(entities_1.Ninja);\nutilsContainer.bind(types_1.TYPES.Weapon).to(entities_1.Katana);\nutilsContainer.bind(types_1.TYPES.ThrowableWeapon).to(entities_1.Shuriken);\nutilsContainer.bind(types_1.TYPES.Logs).to(logs_1.ColorLogs).inSingletonScope();\n\n//# sourceURL=webpack:///./inversify.config.ts?");

/***/ })

};