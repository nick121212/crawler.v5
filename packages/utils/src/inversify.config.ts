import { Container } from "inversify";
import { Tracer } from "tracer";

import { colorLog, log } from "./services/logs";
import { MQueueService } from "./services/rabbitmq";
import { EsStoreService } from "./services/elastic";
import { Jsonata, MomentFunc, CombineFunc, QsFunc, JparseFunc, IFunc } from "./services/jsonata";

const utilsContainer = new Container();

// log相关
utilsContainer.bind<Tracer.Logger>("log").toConstantValue(log).whenTargetTagged("color", false);
utilsContainer.bind<Tracer.Logger>("log").toConstantValue(colorLog).whenTargetTagged("color", true);
// jsonata 相关
utilsContainer.bind<IFunc>("func").to(CombineFunc);
utilsContainer.bind<IFunc>("func").to(MomentFunc);
utilsContainer.bind<IFunc>("func").to(QsFunc);
utilsContainer.bind<IFunc>("func").to(JparseFunc);
utilsContainer.bind<Jsonata>(Jsonata).toSelf();

// rabbitmq 相关
utilsContainer.bind<MQueueService>(MQueueService).toSelf();

// es 相关
utilsContainer.bind<EsStoreService>(EsStoreService).toSelf();

// const mq = utilsContainer.get(MQueueService);

// mq.start("test", {
//     protocol: "amqps",
//     hostname: "www.lait.tv",
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

export { utilsContainer };
