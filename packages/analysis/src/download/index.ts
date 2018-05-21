// import { IQueueItem } from "../models/queueitem";
import { proxy } from "./proxy";

/**
 * 下载内容
 * @param queueItem 链接的信息
 * @param settings  设置
 * @param engine    使用engine
 */
export const downloadUrl = async (url: string, settings: any, engine = "request") => {
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

    let res = await proxy.execute("download", "download", {
        settings
    });

    return {
        header: res.headers,
        responseBody: res.body,
        statusCode: res.statusCode,
    };
};
