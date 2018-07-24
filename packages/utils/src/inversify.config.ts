import { Container, ContainerModule, interfaces } from "inversify";
import { Tracer } from "tracer";

import { colorLog, log } from "./services/logs";
import { MQueueService } from "./services/rabbitmq";
import { EsStoreService } from "./services/elastic";
import { Jsonata, MomentFunc, CombineFunc, QsFunc, JparseFunc, IFunc } from "./services/jsonata";

export const utilsContainer = new Container();

export const logs = new ContainerModule((bind: interfaces.Bind) => {
    bind<Tracer.Logger>("log").toConstantValue(log).whenTargetTagged("color", false);
    bind<Tracer.Logger>("log").toConstantValue(colorLog).whenTargetTagged("color", true);
});

export const jsonata = new ContainerModule((bind: interfaces.Bind) => {
    bind<IFunc>("func").to(CombineFunc);
    bind<IFunc>("func").to(MomentFunc);
    bind<IFunc>("func").to(QsFunc);
    bind<IFunc>("func").to(JparseFunc);
    bind<Jsonata>(Jsonata).toSelf();
});

export const mq = new ContainerModule((bind: interfaces.Bind) => {
    bind<MQueueService>(MQueueService).toSelf();
});

export const es = new ContainerModule((bind: interfaces.Bind) => {
    bind<EsStoreService>(EsStoreService).toSelf();
});

utilsContainer.load(logs, jsonata, mq, es);

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
// }).then((esStore: EsStoreService) => {
//     // esStore.getItem();

//     console.log(esStore);
// }).catch((e: Error) => {
//     console.log("---------",e);
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
