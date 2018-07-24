import { Tracer } from "tracer";
import { IQueueItem } from "../models/queueitem";
import QueueSettings from "../models/queuesetting";
import DiscoverSettings from "../models/discoversetting";
export declare class Linker {
    private $logger;
    /**
     * 构造函数
     * @param  {Trace.Logger} $logger 日志服务
     */
    constructor($logger: Tracer.Logger);
    /**
     * 把地址转换成uri的格式
     * @param {String[]}       urls         地址
     * @param {IQueueItem}     queueItem    当前的地址
     * @param {QueueSettings}  queueConfig  地址合法性的规则
     */
    formatUrlsToUri(urls: string[], queueItem: IQueueItem, queueConfig: QueueSettings): (boolean | IQueueItem)[];
    /**
     * 从queueItem的responseBody中提取合法的地址
     * @param  {IQueueItem}       queueItem       当前的地址
     * @param  {DiscoverSettings} discoverConfig  发现地址的规则
     * @param  {QueueSettings}    queueConfig     地址合法性的规则
     */
    getAllowsUrls(queueItem: IQueueItem, discoverConfig: DiscoverSettings, queueConfig: QueueSettings): Promise<Array<IQueueItem>>;
}
