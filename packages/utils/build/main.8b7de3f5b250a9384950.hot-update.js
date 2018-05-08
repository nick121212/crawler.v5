exports.id = "main";
exports.modules = {

/***/ "./entities.ts":
/*!*********************!*\
  !*** ./entities.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nvar __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {\n    var c = arguments.length,\n        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,\n        d;\n    if ((typeof Reflect === \"undefined\" ? \"undefined\" : _typeof(Reflect)) === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {\n        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    }return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = undefined && undefined.__metadata || function (k, v) {\n    if ((typeof Reflect === \"undefined\" ? \"undefined\" : _typeof(Reflect)) === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nvar __param = undefined && undefined.__param || function (paramIndex, decorator) {\n    return function (target, key) {\n        decorator(target, key, paramIndex);\n    };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\n__webpack_require__(/*! reflect-metadata */ \"reflect-metadata\");\nvar inversify_1 = __webpack_require__(/*! inversify */ \"inversify\");\nvar types_1 = __webpack_require__(/*! ./types */ \"./types.ts\");\nvar Katana = /** @class */function () {\n    function Katana() {}\n    Katana.prototype.hit = function () {\n        return \"cut!\";\n    };\n    Katana = __decorate([inversify_1.injectable()], Katana);\n    return Katana;\n}();\nexports.Katana = Katana;\nvar Shuriken = /** @class */function () {\n    function Shuriken() {}\n    Shuriken.prototype.throw = function () {\n        return \"hit!\";\n    };\n    Shuriken = __decorate([inversify_1.injectable()], Shuriken);\n    return Shuriken;\n}();\nexports.Shuriken = Shuriken;\nvar Ninja = /** @class */function () {\n    function Ninja(katana, shuriken) {\n        this._katana = katana;\n        this._shuriken = shuriken;\n    }\n    Ninja.prototype.fight = function () {\n        return this._katana.hit();\n    };\n    Ninja.prototype.sneak = function () {\n        return this._shuriken.throw();\n    };\n    Ninja = __decorate([inversify_1.injectable(), __param(0, inversify_1.inject(types_1.TYPES.Weapon)), __param(1, inversify_1.inject(types_1.TYPES.ThrowableWeapon)), __metadata(\"design:paramtypes\", [Object, Object])], Ninja);\n    return Ninja;\n}();\nexports.Ninja = Ninja;\n\n//# sourceURL=webpack:///./entities.ts?");

/***/ }),

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar inversify_config_1 = __webpack_require__(/*! ./inversify.config */ \"./inversify.config.ts\");\nvar types_1 = __webpack_require__(/*! ./types */ \"./types.ts\");\nvar ninja = inversify_config_1.utilsContainer.get(types_1.TYPES.Warrior);\nconsole.log(\"123--456d7\", ninja.fight(), ninja.sneak());\n\n//# sourceURL=webpack:///./index.ts?");

/***/ }),

/***/ "./types.ts":
/*!******************!*\
  !*** ./types.ts ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar TYPES = {\n    Warrior: Symbol.for(\"Warrior\"),\n    Weapon: Symbol.for(\"Weapon\"),\n    ThrowableWeapon: Symbol.for(\"ThrowableWeapon\"),\n    Logs: Symbol.for(\"Logs\")\n};\nexports.TYPES = TYPES;\n\n//# sourceURL=webpack:///./types.ts?");

/***/ })

};