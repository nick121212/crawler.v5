exports.id = "main";
exports.modules = {

/***/ "./inversify.config.ts":
/*!*****************************!*\
  !*** ./inversify.config.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar inversify_1 = __webpack_require__(/*! inversify */ \"inversify\");\nvar types_1 = __webpack_require__(/*! ./types */ \"./types.ts\");\nvar entities_1 = __webpack_require__(/*! ./entities */ \"./entities.ts\");\nvar logs_1 = __webpack_require__(/*! ./logs */ \"./logs.ts\");\nvar utilsContainer = new inversify_1.Container();\nexports.utilsContainer = utilsContainer;\nutilsContainer.bind(types_1.TYPES.Warrior).to(entities_1.Ninja);\nutilsContainer.bind(types_1.TYPES.Weapon).to(entities_1.Katana);\nutilsContainer.bind(types_1.TYPES.ThrowableWeapon).to(entities_1.Shuriken);\nutilsContainer.bind(types_1.TYPES.Logs).to(logs_1.ColorLogs);\n\n//# sourceURL=webpack:///./inversify.config.ts?");

/***/ }),

/***/ "./logs.ts":
/*!*****************!*\
  !*** ./logs.ts ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nvar __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {\n    var c = arguments.length,\n        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,\n        d;\n    if ((typeof Reflect === \"undefined\" ? \"undefined\" : _typeof(Reflect)) === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {\n        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    }return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = undefined && undefined.__metadata || function (k, v) {\n    if ((typeof Reflect === \"undefined\" ? \"undefined\" : _typeof(Reflect)) === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\n__webpack_require__(/*! reflect-metadata */ \"reflect-metadata\");\nvar inversify_1 = __webpack_require__(/*! inversify */ \"inversify\");\nvar tracer_1 = __webpack_require__(/*! tracer */ \"../node_modules/_tracer@0.8.15@tracer/lib/index.js\");\nvar ColorLogs = /** @class */function () {\n    function ColorLogs() {\n        this.logger = tracer_1.colorConsole();\n    }\n    ColorLogs.prototype.info = function (msg) {\n        this.logger.error(msg);\n    };\n    ColorLogs = __decorate([inversify_1.injectable(), __metadata(\"design:paramtypes\", [])], ColorLogs);\n    return ColorLogs;\n}();\nexports.ColorLogs = ColorLogs;\n\n//# sourceURL=webpack:///./logs.ts?");

/***/ })

};