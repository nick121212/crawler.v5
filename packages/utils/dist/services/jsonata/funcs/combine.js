"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var CombineFunc = /** @class */ (function () {
    function CombineFunc() {
    }
    CombineFunc.prototype.init = function (exp) {
        exp.assign("combine", this.combine);
    };
    CombineFunc.prototype.combine = function (objs) {
        if (objs.constructor !== Array) {
            throw new Error("第一个参数有问题");
        }
        return objs.reduce(function (prev, obj) {
            return Object.assign({}, prev, obj);
        }, {});
    };
    CombineFunc = __decorate([
        inversify_1.injectable()
    ], CombineFunc);
    return CombineFunc;
}());
exports.CombineFunc = CombineFunc;
//# sourceMappingURL=/srv/crawler.v5/packages/utils/maps/services/jsonata/funcs/combine.js.map