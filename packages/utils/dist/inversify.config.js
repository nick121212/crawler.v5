"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var logs_1 = require("./services/logs");
var rabbitmq_1 = require("./services/rabbitmq");
var elastic_1 = require("./services/elastic");
var jsonata_1 = require("./services/jsonata");
exports.utilsContainer = new inversify_1.Container();
exports.logs = new inversify_1.ContainerModule(function (bind) {
    bind("log").toConstantValue(logs_1.log).whenTargetTagged("color", false);
    bind("log").toConstantValue(logs_1.colorLog).whenTargetTagged("color", true);
});
exports.jsonata = new inversify_1.ContainerModule(function (bind) {
    bind("func").to(jsonata_1.CombineFunc);
    bind("func").to(jsonata_1.MomentFunc);
    bind("func").to(jsonata_1.QsFunc);
    bind("func").to(jsonata_1.JparseFunc);
    bind(jsonata_1.Jsonata).toSelf();
});
exports.mq = new inversify_1.ContainerModule(function (bind) {
    bind(rabbitmq_1.MQueueService).toSelf();
});
exports.es = new inversify_1.ContainerModule(function (bind) {
    bind(elastic_1.EsStoreService).toSelf();
});
exports.utilsContainer.load(exports.logs, exports.jsonata, exports.mq, exports.es);
// log相关
// jsonata 相关
// rabbitmq 相关
// es 相关
// const es1: EsStoreService = utilsContainer.get(EsStoreService);
// es1.init({
//     "host": "localhost:9200",
//     "httpAuth": "",
//     "sniffInterval": 30000,
//     "requestTimeout": 20000,
//     "keepAlive": true
// }).then(() => {
//     return es1.clearUrls("ddd");
// }).then(() => {
//     return es1.saveUrls([{
//         protocol: "https",
//         hostname: "mp.weixin.qq.com",
//         query: "token=1498148810&lang=zh_CN&f=json&ajax=1&random=0.9634021943714353&action=list_ex&begin=5&count=5&query=&fakeid=MzA5MzkwNzM2OQ%253D%253D&type=9",
//         port: 80,
//         path: "/cgi-bin/appmsg",
//         depth: 2,
//         url: "https://mp.weixin.qq.com/cgi-bin/appmsg?token=1498148810&lang=zh_CN&f=json&ajax=1&random=0.9634021943714353&action=list_ex&begin=5&count=5&query=&fakeid=MzA5MzkwNzM2OQ%253D%253D&type=9",
//         _id: "c30f5fb22b25482eaa5c268630663570"
//     }], "ddd", "urls");
// }).then((d: any) => {
//     console.log(d);
// }).catch((e: Error) => {
//     console.log("---------", e);
// });
// const mq = utilsContainer.get(MQueueService);
// mq.start("test", {
//     protocol: "amqps",
//     hostname: "localhost",
//     username: "crawler",
//     password: "871233"
// }, (data: any) => {
//     console.log(data);
//     if (data.a === 10) {
//         setTimeout(() => {
//             mq.destroy(true);
//         }, 1000);
//     }
//     return data;
// });
// console.log(mq.queueName);
//# sourceMappingURL=/srv/crawler.v5/packages/utils/maps/inversify.config.js.map