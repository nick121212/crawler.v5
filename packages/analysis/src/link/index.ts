import _ from "lodash";

import { IQueueItem } from "../models/queueitem";
import QueueSettings from "../models/queuesetting";
import { Queue } from "./queue";
import { DiscoverLinks } from "./discover";
import DiscoverSettings from "../models/discoversetting";

/**
 * 把地址转换成uri的格式
 * @param {String[]}       urls         地址
 * @param {IQueueItem}     queueItem    当前的地址
 * @param {QueueSettings}  queueConfig  地址合法性的规则
 */
export const formatUrlsToUri = (urls: string[], queueItem: IQueueItem, queueConfig: QueueSettings) => {
    const queue = new Queue(queueConfig);
    const allowUrls = _.map(urls, (url: string) => {
        return queue.queueURL(url, queueItem || {});
    });

    return _.filter(allowUrls, (q: any) => {
        return !!q;
    });
};

/**
 * 从queueItem的responseBody中提取合法的地址
 * @param  {IQueueItem}       queueItem       当前的地址
 * @param  {DiscoverSettings} discoverConfig  发现地址的规则
 * @param  {QueueSettings}    queueConfig     地址合法性的规则
 */
export const getAllowsUrls = async (queueItem: IQueueItem, discoverConfig: DiscoverSettings, queueConfig: QueueSettings): Promise<Array<IQueueItem>> => {
    let discoverLink = new DiscoverLinks(discoverConfig);
    let queue = new Queue(queueConfig);
    let urls: Array<string> = await discoverLink.discoverResources(queueItem);
    let allowUrls: Array<IQueueItem> = [];

    // url地址queue化
    urls.forEach((url: string) => {
        let q = queue.queueURL(url, queueItem || {});

        if (q) {
            allowUrls.push(q as IQueueItem);
        }
    });

    return allowUrls;
};
