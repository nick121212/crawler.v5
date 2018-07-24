import _ from "lodash";
import { injectable, inject, tagged } from "inversify";
import { Tracer } from "tracer";

import { IQueueItem } from "../models/queueitem";
import QueueSettings from "../models/queuesetting";
import { Queue } from "./queue";
import { DiscoverLinks } from "./discover";
import DiscoverSettings from "../models/discoversetting";

@injectable()
export class Linker {

    /**
     * 构造函数
     * @param  {Trace.Logger} $logger 日志服务
     */
    constructor(@inject("log") @tagged("color", true) private $logger: Tracer.Logger) {
        this.$logger.info("linker constructor");
    }

    /**
     * 把地址转换成uri的格式
     * @param {String[]}       urls         地址
     * @param {IQueueItem}     queueItem    当前的地址
     * @param {QueueSettings}  queueConfig  地址合法性的规则
     */
    public formatUrlsToUri(urls: string[], queueItem: IQueueItem, queueConfig: QueueSettings) {
        const queue = new Queue(queueConfig);
        const allowUrls = _.map(urls, (url: string) => {
            return queue.queueURL(url, queueItem || {});
        });

        this.$logger.debug("formatUrlsToUri", allowUrls);

        return _.filter(allowUrls, (q: any) => {
            return !!q;
        });
    }

    /**
     * 从queueItem的responseBody中提取合法的地址
     * @param  {IQueueItem}       queueItem       当前的地址
     * @param  {DiscoverSettings} discoverConfig  发现地址的规则
     * @param  {QueueSettings}    queueConfig     地址合法性的规则
     */
    public async getAllowsUrls(queueItem: IQueueItem, discoverConfig: DiscoverSettings, queueConfig: QueueSettings): Promise<Array<IQueueItem>> {
        const discoverLink = new DiscoverLinks(discoverConfig);
        const queue = new Queue(queueConfig);
        const urls: Array<string> = await discoverLink.discoverResources(queueItem);
        const allowUrls: Array<IQueueItem> = [];

        // url地址queue化
        urls.forEach((url: string) => {
            const q = queue.queueURL(url, queueItem || {});

            if (q) {
                allowUrls.push(q as IQueueItem);
            }
        });

        this.$logger.debug("getAllowsUrls", urls, allowUrls);

        return allowUrls;
    }
}
