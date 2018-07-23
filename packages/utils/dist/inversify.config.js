"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var logs_1 = require("./services/logs");
var rabbitmq_1 = require("./services/rabbitmq");
var jsonata_1 = require("./services/jsonata");
var utilsContainer = new inversify_1.Container();
exports.utilsContainer = utilsContainer;
// log相关
utilsContainer.bind("log").toConstantValue(logs_1.log).whenTargetTagged("color", false);
utilsContainer.bind("log").toConstantValue(logs_1.colorLog).whenTargetTagged("color", true);
// jsonata 相关
utilsContainer.bind("func").to(jsonata_1.CombineFunc);
utilsContainer.bind("func").to(jsonata_1.MomentFunc);
utilsContainer.bind("func").to(jsonata_1.QsFunc);
utilsContainer.bind("func").to(jsonata_1.JparseFunc);
utilsContainer.bind(jsonata_1.Jsonata).toSelf();
// rabbitmq 相关
utilsContainer.bind(rabbitmq_1.MQueueService).toSelf();
//# sourceMappingURL=/srv/crawler.v5/packages/utils/maps/inversify.config.js.map