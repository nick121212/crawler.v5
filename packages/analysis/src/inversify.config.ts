import { Container, ContainerModule, interfaces, decorate, injectable } from "inversify";
import { utilsContainer } from "crawler.v5.utils";
import { BaseEngine, Compose, ModelProxy } from "modelproxy";

import { Downloader, PhantomEngine, RequestEngine, SuperAgentEngine, PicDownEngine } from "./download";
import { Linker } from "./link";
import {
    AnalysisStrategy, BaseAnalysis, AreaStrategy, ArrayStrategy, CaseStrategy,
    NormalStrategy, ObjectStrategy, OrStrategy, SwitchStrategy
} from "./page/analysis";
import { HtmlPager } from "./page";

const container = new Container();

decorate(injectable(), Compose);
decorate(injectable(), ModelProxy);
decorate(injectable(), BaseEngine);

const downloader = new ContainerModule((bind: interfaces.Bind) => {
    bind<BaseEngine<any>>("ModelProxyEngine").to(PhantomEngine);
    bind<BaseEngine<any>>("ModelProxyEngine").to(RequestEngine);
    bind<BaseEngine<any>>("ModelProxyEngine").to(SuperAgentEngine);
    bind<BaseEngine<any>>("ModelProxyEngine").to(PicDownEngine);

    bind<ModelProxy>(ModelProxy).toSelf().inSingletonScope();
    bind<Downloader>(Downloader).toSelf().inSingletonScope();
});

const linker = new ContainerModule((bind: interfaces.Bind) => {
    bind<Linker>(Linker).toSelf().inSingletonScope();
});

const pager = new ContainerModule((bind: interfaces.Bind) => {
    bind<AnalysisStrategy>(AnalysisStrategy).toSelf().inSingletonScope();
    bind<HtmlPager>(HtmlPager).toSelf().inSingletonScope();
    bind<BaseAnalysis>(BaseAnalysis).toSelf();

    bind<BaseAnalysis>(AreaStrategy).toSelf().inSingletonScope();
    bind<BaseAnalysis>(ArrayStrategy).toSelf().inSingletonScope();
    bind<BaseAnalysis>(CaseStrategy).toSelf().inSingletonScope();
    bind<BaseAnalysis>(NormalStrategy).toSelf().inSingletonScope();
    bind<BaseAnalysis>(ObjectStrategy).toSelf().inSingletonScope();
    bind<BaseAnalysis>(OrStrategy).toSelf().inSingletonScope();
    bind<BaseAnalysis>(SwitchStrategy).toSelf().inSingletonScope();
});

container.load(downloader, linker, pager);

export default Container.merge(utilsContainer, container);
