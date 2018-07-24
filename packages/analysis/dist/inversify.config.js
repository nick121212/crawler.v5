"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const crawler_v5_utils_1 = require("crawler.v5.utils");
const modelproxy_1 = require("modelproxy");
const download_1 = require("./download");
const link_1 = require("./link");
const analysis_1 = require("./page/analysis");
const page_1 = require("./page");
const zzhao_1 = require("./zzhao");
const container = new inversify_1.Container();
inversify_1.decorate(inversify_1.injectable(), modelproxy_1.Compose);
inversify_1.decorate(inversify_1.injectable(), modelproxy_1.ModelProxy);
inversify_1.decorate(inversify_1.injectable(), modelproxy_1.BaseEngine);
const downloader = new inversify_1.ContainerModule((bind) => {
    bind("ModelProxyEngine").to(download_1.PhantomEngine);
    bind("ModelProxyEngine").to(download_1.RequestEngine);
    bind("ModelProxyEngine").to(download_1.SuperAgentEngine);
    bind("ModelProxyEngine").to(download_1.PicDownEngine);
    bind(modelproxy_1.ModelProxy).toSelf().inSingletonScope();
    bind(download_1.Downloader).toSelf().inSingletonScope();
});
const linker = new inversify_1.ContainerModule((bind) => {
    bind(link_1.Linker).toSelf().inSingletonScope();
});
const pager = new inversify_1.ContainerModule((bind) => {
    bind(analysis_1.AnalysisStrategy).toSelf().inSingletonScope();
    bind(page_1.HtmlPager).toSelf().inSingletonScope();
    bind(analysis_1.BaseAnalysis).toSelf();
    bind(analysis_1.AreaStrategy).toSelf().inSingletonScope();
    bind(analysis_1.ArrayStrategy).toSelf().inSingletonScope();
    bind(analysis_1.CaseStrategy).toSelf().inSingletonScope();
    bind(analysis_1.NormalStrategy).toSelf().inSingletonScope();
    bind(analysis_1.ObjectStrategy).toSelf().inSingletonScope();
    bind(analysis_1.OrStrategy).toSelf().inSingletonScope();
    bind(analysis_1.SwitchStrategy).toSelf().inSingletonScope();
});
container.load(downloader, linker, pager);
container.bind(zzhao_1.Test).toSelf();
const analysisContainer = inversify_1.Container.merge(crawler_v5_utils_1.utilsContainer, container);
analysisContainer.get(zzhao_1.Test);
exports.default = analysisContainer;
//# sourceMappingURL=/srv/crawler.v5/packages/analysis/maps/inversify.config.js.map