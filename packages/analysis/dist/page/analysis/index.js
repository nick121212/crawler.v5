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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const inversify_1 = require("inversify");
const base_1 = require("./base");
var area_1 = require("./area");
exports.AreaStrategy = area_1.AreaStrategy;
var array_1 = require("./array");
exports.ArrayStrategy = array_1.ArrayStrategy;
var case_1 = require("./case");
exports.CaseStrategy = case_1.CaseStrategy;
var normal_1 = require("./normal");
exports.NormalStrategy = normal_1.NormalStrategy;
var object_1 = require("./object");
exports.ObjectStrategy = object_1.ObjectStrategy;
var or_1 = require("./or");
exports.OrStrategy = or_1.OrStrategy;
var switch_1 = require("./switch");
exports.SwitchStrategy = switch_1.SwitchStrategy;
var base_2 = require("./base");
exports.BaseAnalysis = base_2.BaseAnalysis;
/**
 * 处理html文本策越
 */
let AnalysisStrategy = class AnalysisStrategy extends base_1.BaseAnalysis {
    /**
     * 构造函数
     * 注册默认的解析策略
     */
    constructor(analysises) {
        super();
        analysises.forEach((ayalysis) => {
            if (ayalysis.ayalysisName) {
                this.deals[ayalysis.ayalysisName] = ayalysis;
                ayalysis.deals = this.deals;
            }
        });
    }
    /**
     * 开始处理文本
     * @param   {IQueueItem}  queueItem 数据
     * @param   {Object}      rule      配置
     * @returns {Promise}
     */
    doDeal(queueItem, rule) {
        return __awaiter(this, void 0, void 0, function* () {
            let promiseAll = [];
            let dataResults = {};
            let check = (results) => {
                let promises = [];
                let getPromises = (rts) => {
                    lodash_1.default.forEach(rts, (result) => {
                        if (lodash_1.default.isArray(result)) {
                            getPromises(result);
                        }
                        else if (result && result.data && result.data.data) {
                            promises = promises.concat(this.doDealData.call(this, queueItem, result.data.data, result.result, result.$cur, result.index));
                        }
                    });
                };
                getPromises(results);
                return promises.length ? Promise.all(promises).then(check.bind(this)) : {
                    result: dataResults,
                    rule: rule.key
                };
                // return promises.length ? Promise.all(promises).then(check) : dataResults;
            };
            // 处理area
            return yield this.deals.area.doDeal(queueItem, rule.areas).then((results) => {
                lodash_1.default.forEach(rule.fields, (field, key) => {
                    promiseAll = promiseAll.concat(this.doDealData.call(this, queueItem, field.data, dataResults, results[key] ? results[key].$cur : null));
                });
                return Promise.all(promiseAll).then(check.bind(this));
            });
        });
    }
};
AnalysisStrategy = __decorate([
    __param(0, inversify_1.multiInject(base_1.BaseAnalysis)),
    __metadata("design:paramtypes", [Array])
], AnalysisStrategy);
exports.AnalysisStrategy = AnalysisStrategy;
//# sourceMappingURL=/srv/crawler.v5/packages/analysis/maps/page/analysis/index.js.map