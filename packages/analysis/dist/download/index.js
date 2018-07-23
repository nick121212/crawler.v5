var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// import { IQueueItem } from "../models/queueitem";
import { proxy } from "./proxy";
/**
 * 下载内容
 * @param queueItem 链接的信息
 * @param settings  设置
 * @param engine    使用engine
 */
export const downloadUrl = (url, settings, engine = "request") => __awaiter(this, void 0, void 0, function* () {
    proxy.loadConfig({
        "engine": engine,
        "interfaces": [{
                "key": "download",
                "method": "get",
                "path": "",
                "title": ""
            }],
        "key": "download",
        "state": "html",
        "states": {
            "html": url
        },
        "title": "download下载接口",
    }, {});
    let res = yield proxy.execute("download", "download", {
        settings
    });
    return {
        header: res.headers,
        responseBody: res.body,
        statusCode: res.statusCode,
    };
});
//# sourceMappingURL=/srv/crawler.v5/packages/analysis/maps/download/index.js.map