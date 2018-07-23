var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import _ from "lodash";
import { Queue } from "./queue";
import { DiscoverLinks } from "./discover";
/**
 * 把地址转换成uri的格式
 * @param {String[]}       urls         地址
 * @param {IQueueItem}     queueItem    当前的地址
 * @param {QueueSettings}  queueConfig  地址合法性的规则
 */
export const formatUrlsToUri = (urls, queueItem, queueConfig) => {
    const queue = new Queue(queueConfig);
    const allowUrls = _.map(urls, (url) => {
        return queue.queueURL(url, queueItem || {});
    });
    return _.filter(allowUrls, (q) => {
        return !!q;
    });
};
/**
 * 从queueItem的responseBody中提取合法的地址
 * @param  {IQueueItem}       queueItem       当前的地址
 * @param  {DiscoverSettings} discoverConfig  发现地址的规则
 * @param  {QueueSettings}    queueConfig     地址合法性的规则
 */
export const getAllowsUrls = (queueItem, discoverConfig, queueConfig) => __awaiter(this, void 0, void 0, function* () {
    let discoverLink = new DiscoverLinks(discoverConfig);
    let queue = new Queue(queueConfig);
    let urls = yield discoverLink.discoverResources(queueItem);
    let allowUrls = [];
    // url地址queue化
    urls.forEach((url) => {
        let q = queue.queueURL(url, queueItem || {});
        if (q) {
            allowUrls.push(q);
        }
    });
    return allowUrls;
});
//# sourceMappingURL=/srv/crawler.v5/packages/analysis/maps/link/index.js.map