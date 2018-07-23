import { Container } from "inversify";
import { Tracer } from "tracer";

import { colorLog, log } from "./services/logs";
import { MQueueService } from "./services/rabbitmq";
import { Jsonata, MomentFunc, CombineFunc, QsFunc, JparseFunc, IFunc } from "./services/jsonata";

const utilsContainer = new Container();

// log相关
utilsContainer.bind<Tracer.Logger>("log").toConstantValue(log).whenTargetTagged("color", false);
utilsContainer.bind<Tracer.Logger>("log").toConstantValue(colorLog).whenTargetTagged("color", true);

utilsContainer.bind<IFunc>("func").to(CombineFunc);
utilsContainer.bind<IFunc>("func").to(MomentFunc);
utilsContainer.bind<IFunc>("func").to(QsFunc);
utilsContainer.bind<IFunc>("func").to(JparseFunc);
utilsContainer.bind<Jsonata>(Jsonata).toSelf();
utilsContainer.bind<MQueueService>(MQueueService).toSelf();

const mq = utilsContainer.get(MQueueService);

mq.start("test", {
    protocol: "amqps",
    hostname: "www.lait.tv",
    username: "crawler",
    password: "871233"
}, (data: any) => {
    console.log(data);

    return data;
});

console.log(mq.queueName);

export { utilsContainer };
