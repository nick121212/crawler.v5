import { analysisHtmlToJson } from "./page";
import { getAllowsUrls, formatUrlsToUri } from "./link";
import { downloadUrl } from "./download";
const config = {
    "pages": [{
            "key": "main-123",
            "path": "",
            "areas": [],
            "fieldKey": "",
            "fields": {
                "none": {
                    "data": [{
                            "key": "obj",
                            "selector": ["#ylNav2"],
                            "dealStrategy": "object",
                            "data": [{
                                    "key": "title",
                                    "selector": ["a.ylHdNavTt"],
                                    "methodInfo": { "text": [] },
                                    "dealStrategy": "normal"
                                }, {
                                    "key": "title-1",
                                    "selector": [".ylHdNavCon a"],
                                    "dealStrategy": "array",
                                    "data": [{
                                            "key": "",
                                            "selector": [],
                                            "methodInfo": { "text": [] },
                                            "dealStrategy": "normal"
                                        }]
                                }]
                        }, {
                            "key": "cur-text",
                            "dealStrategy": "or",
                            "data": [{
                                    "selector": [".zsTobTabUl .cur a"],
                                    "methodInfo": { "text": [] },
                                    "dealStrategy": "normal"
                                }, {
                                    "selector": [".key_main .key_ul .hover"],
                                    "methodInfo": { "text": [] },
                                    "dealStrategy": "normal"
                                }]
                        }]
                }
            },
            "enabled": true
        }],
    "queueItem": {
        "_id": "djlflds3opidu3ur",
        "responseBody": "",
        "url": "http://www.yaolan.com",
        "path": "/"
    }
};
const config1 = {
    "queueConfig": {
        "ignoreWWWDomain": false,
        "stripWWWDomain": false,
        "scanSubdomains": true,
        "host": "www.yaolan.com",
        "initialProtocol": "http",
        "initialPort": 80,
        "stripQuerystring": true,
        "fetchConditions": [],
        "domainWhiteList": ["(.*?).yaolan.com"],
        "filterByDomain": true
    },
    "urls": ["http://www.yaolan.com", "http://bbs.yaolan.com"]
};
downloadUrl("http://www.yaolan.com", {}).then((data) => {
    config.queueItem.responseBody = data.responseBody;
}).then(() => {
    return getAllowsUrls(config.queueItem, {
        "parseHTMLComments": false,
        "parseScriptTags": false,
        "allowedProtocols": ["http", "https"],
        "whitePathList": [{ "path": "/(.*?)", "enable": true }],
        "userAgent": "",
        "fetchWhitelistedMimeTypesBelowMaxDepth": false,
        "maxDepth": 0,
        "ignoreRobots": true
    }, config1.queueConfig);
}).then((allowUrls) => {
    console.log(allowUrls.length);
    return analysisHtmlToJson(config.queueItem, config.pages);
}).then((data) => {
    console.log(JSON.stringify(data));
    return formatUrlsToUri(["www.yaolan.com"], config.queueItem, config1.queueConfig);
}).then(console.log);
//# sourceMappingURL=/srv/crawler.v5/packages/analysis/maps/test.js.map