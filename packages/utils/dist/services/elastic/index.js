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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var bluebird = require("bluebird");
var _ = require("lodash");
var elasticsearch_1 = require("elasticsearch");
var _fields = [
    "protocol",
    "host",
    "query",
    "port",
    "path",
    "depth",
    "url",
    "crawlerCount",
    "errorCount",
    "error",
    "statusCode",
    "responseBody",
    "responseBodyText",
    "@timestamp",
    "status",
    "updatedAt"
];
var EsStoreService = /** @class */ (function () {
    function EsStoreService($logger) {
        this.$logger = $logger;
        this.$logger.info("elasticsearch constructor");
    }
    /**
     * 保存分析出来的链接地址
     * 先判断地址是不是已经在es中
     * 存在的话，则不存入queue中
     * @param urls     连接数组
     * @param esIndex  index
     * @param esType   type
     */
    EsStoreService.prototype.saveUrls = function (urls, esIndex, esType) {
        return __awaiter(this, void 0, void 0, function () {
            var urlsById, docs, resources, newUrls, urlsResult;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        urlsById = _.keyBy(urls, "_id");
                        docs = [];
                        this.$logger.debug("saveUrls", urls, esIndex, esType);
                        _.forEach(urlsById, function (_url, key) {
                            docs.push({
                                _index: esIndex,
                                _type: esType,
                                _id: key
                            });
                        });
                        // 判断链接是否存在
                        if (!docs.length) {
                            return [2 /*return*/, []];
                        }
                        return [4 /*yield*/, this.client.mget({
                                body: {
                                    docs: docs
                                },
                                storedFields: ["statusCode"]
                            })];
                    case 1:
                        resources = _a.sent();
                        newUrls = _.filter(resources.docs, function (doc) {
                            if (doc.error && doc.error.type === "index_not_found_exception") {
                                return true;
                            }
                            if (doc.found === false) {
                                return true;
                            }
                            return false;
                        });
                        docs.length = 0;
                        // 保存新增的地址
                        _.each(newUrls, function (url) {
                            if (urlsById[url._id]) {
                                docs.push({
                                    create: {
                                        _index: esIndex,
                                        _type: esType,
                                        _id: url._id
                                    }
                                });
                                docs.push(_this.pick(_.extend({ "@timestamp": Date.now(), status: "queued" }, urlsById[url._id]), _fields));
                            }
                        });
                        if (!docs.length) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.client.bulk({
                                body: docs
                            })];
                    case 2:
                        urlsResult = _a.sent();
                        return [2 /*return*/, urlsResult.items.map(function (url) {
                                if (url.create && url.create.created) {
                                    return urlsById[url.create._id];
                                }
                                return null;
                            })];
                    case 3: return [2 /*return*/, []];
                }
            });
        });
    };
    /**
     * 存储当前的地址
     * @param queueItem  数据
     * @param esIndex    索引
     * @param esType     类型
     */
    EsStoreService.prototype.saveQueueItem = function (queueItem, esIndex, esType) {
        return __awaiter(this, void 0, void 0, function () {
            var docs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        docs = [];
                        if (!(queueItem && queueItem._id)) return [3 /*break*/, 2];
                        docs.push({
                            index: {
                                _index: esIndex,
                                _type: esType,
                                _id: queueItem._id
                            }
                        });
                        queueItem.status = "complete";
                        docs.push(this.pick(queueItem, _fields));
                        if (!docs.length) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.client.bulk({
                                body: docs
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [2 /*return*/, {}];
                }
            });
        });
    };
    /**
    * 存储当前的地址
    * @param result  数据
    * @param esIndex 索引
    * @param esType  类型
    */
    EsStoreService.prototype.saveResult = function (_id, result, esIndex, esType) {
        return __awaiter(this, void 0, void 0, function () {
            var docs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        docs = [];
                        if (!result) return [3 /*break*/, 2];
                        docs.push({
                            index: {
                                _index: esIndex,
                                _type: esType,
                                _id: _id
                            }
                        });
                        docs.push(result);
                        if (!docs.length) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.client.bulk({
                                body: docs
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [2 /*return*/, {}];
                }
            });
        });
    };
    /**
  * 存储当前的地址
  * @param result  数据
  * @param esIndex 索引
  * @param esType  类型
  */
    EsStoreService.prototype.createResult = function (_id, result, esIndex, esType) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!result) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.client.create({
                                index: esIndex,
                                type: esType,
                                id: _id,
                                body: result
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [2 /*return*/, {}];
                }
            });
        });
    };
    /**
     * 获取单个数据
     * @param param0
     * _id es的id
     * esIndex 索引
     * esType  类型
     */
    EsStoreService.prototype.getItem = function (_id, esIndex, esType) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.get({
                            id: _id,
                            index: esIndex,
                            type: esType
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    EsStoreService.prototype.scroll = function (esIndex, esType, scrollId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.$logger.debug("------------------------", scrollId, esIndex, esType);
                        if (!scrollId) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.client.scroll({
                                scrollId: scrollId,
                                scroll: "300s"
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [4 /*yield*/, this.client.search({
                            index: esIndex,
                            type: esType,
                            scroll: "300s"
                        })];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * 初始化
     * @param globalOptions 设置项
     */
    EsStoreService.prototype.init = function (globalOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.client = new elasticsearch_1.Client(globalOptions);
                        this.client.ping({
                            requestTimeout: 3000
                        }).then(function () {
                            _this.$logger.info("elasticsearh as well");
                        }, function (err) {
                            _this.$logger.error("elasticsearch cluster is down!", err);
                        });
                        return [4 /*yield*/, bluebird.delay(200)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this];
                }
            });
        });
    };
    /**
     * pick 字段
     * @param result 数据
     * @param fields 字段
     */
    EsStoreService.prototype.pick = function (result, fields) {
        var res = {};
        _.each(fields, function (field) {
            var val = _.pick(result, field);
            if (val && val[field] !== undefined) {
                res[field] = val[field];
            }
        });
        return res;
    };
    EsStoreService = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject("log")), __param(0, inversify_1.tagged("color", true)),
        __metadata("design:paramtypes", [Object])
    ], EsStoreService);
    return EsStoreService;
}());
exports.EsStoreService = EsStoreService;
//# sourceMappingURL=/srv/crawler.v5/packages/utils/maps/services/elastic/index.js.map