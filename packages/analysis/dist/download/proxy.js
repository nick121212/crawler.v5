import { ModelProxy } from "modelproxy";
// import { PhantomEngine } from "./engines/phantom";
import { SuperAgentEngine } from "./engines/superagent";
import { RequestEngine } from "./engines/request";
export const proxy = new ModelProxy();
// const phantom = new PhantomEngine();
const superagent = new SuperAgentEngine();
const request = new RequestEngine();
proxy.addEngines({
    // [phantom.engineName]: phantom,
    [superagent.engineName]: superagent,
    [request.engineName]: request,
});
//# sourceMappingURL=/srv/crawler.v5/packages/analysis/maps/download/proxy.js.map