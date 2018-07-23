"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonata = require("jsonata");
var inversify_1 = require("inversify");
var combine_1 = require("./funcs/combine");
exports.CombineFunc = combine_1.CombineFunc;
var jparse_1 = require("./funcs/jparse");
exports.JparseFunc = jparse_1.JparseFunc;
var moment_1 = require("./funcs/moment");
exports.MomentFunc = moment_1.MomentFunc;
var qs_1 = require("./funcs/qs");
exports.QsFunc = qs_1.QsFunc;
// console.log(object)
var Jsonata = /** @class */ (function () {
    function Jsonata(funcs) {
        this.funcs = funcs;
    }
    Jsonata.prototype.exp = function (str) {
        var exp = jsonata(str);
        this.funcs.forEach(function (func) {
            func.init(exp);
        });
        return exp;
    };
    Jsonata = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.multiInject("func")),
        __metadata("design:paramtypes", [Array])
    ], Jsonata);
    return Jsonata;
}());
exports.Jsonata = Jsonata;
//# sourceMappingURL=/srv/crawler.v5/packages/utils/maps/services/jsonata/index.js.map