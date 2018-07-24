import { EsStoreService } from "crawler.v5.utils/dist/services/elastic/index";
import { MQueueService } from "crawler.v5.utils/dist/services/rabbitmq/index";
import { injectable, inject } from "inversify";

import { Downloader } from "./download";
import { Linker } from "./link";

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


// process.on("UnhandledPromiseRejection", console.log);

@injectable()
export class Test {
    constructor(
        @inject(Downloader) private $downloader: Downloader,
        @inject(Linker) private $linker: Linker,
        @inject(MQueueService) private $mq: MQueueService,
        @inject(EsStoreService) private $es: EsStoreService
    ) {
        $mq.start("yaolan", {
            protocol: "amqp",
            hostname: "localhost",
            username: "crawler",
            password: "871233"
        }, async (data: any) => {
            return this.doDeal(data.url).then((d: any) => {
                return d;
            }).catch((() => void (0)));
        }, 1, 3000).then(() => {
            return this.doDeal("http://www.yaolan.com").catch((() => void (0)));
        });
    }

    private async doDeal(url: string) {
        return this.$downloader.start(url, {}).then((data: any) => {
            config.queueItem.responseBody = data.responseBody;

            return this.$linker.getAllowsUrls(config.queueItem, {
                "parseHTMLComments": false,
                "parseScriptTags": false,
                "allowedProtocols": ["http", "https"],
                "whitePathList": [{ "path": "/(.*?)", "enable": true }],
                "userAgent": "",
                "fetchWhitelistedMimeTypesBelowMaxDepth": false,
                "maxDepth": 0,
                "ignoreRobots": true
            }, config1.queueConfig);
        }).then((allowUrls: any[]) => {
            return this.$es.init({
                "host": "localhost:9200",
                "log": [],
                "httpAuth": "",
                "sniffInterval": 30000,
                "requestTimeout": 20000,
                "keepAlive": true
            }).then(() => {
                return allowUrls;
            });
        }).then(async (allowUrls: any[]) => {

            await this.$es.saveUrls(allowUrls, "yaolan", "urls");

            return this.$mq.addItemsToQueue(allowUrls);
        });
    }
}
