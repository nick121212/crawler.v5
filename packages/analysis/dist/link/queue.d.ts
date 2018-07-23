import { IQueueItem } from "../models/queueitem";
import QueueSettings from "../models/queuesetting";
export declare class Queue {
    private settings;
    /**
     * 构造函数
     * @param settings {object}
     *   ignoreWWWDomain   boolean       是否忽略www域名
     *   scanSubdomains    boolean       是否需要搜索子域名
     *   stripWWWDomain    boolean       是否严格的www域名
     *   host              string        当前的域名
     *   initialProtocol   string        默认协议
     *   initialPort       string        默认端口
     *   stripQuerystring  boolean       过滤掉参数
     *   fetchConditions   array         过滤地址条件数组
     *   domainWhiteList   array<string> 域名白名单
     *   filterByDomain    boolean       是否开启过滤域名白名单
     */
    constructor(settings: QueueSettings);
    /**
     * 去掉没用的搜索字符(^)
     * @param   {String} url 地址
     * @returns {String}
     */
    removeUselessStr(url: string): string;
    /**
     * 去掉queryString
     * @param   {String} url  地址
     * @returns {String}
     */
    removeQuerystring(url: string): string;
    /**
     * 处理链接
     * @param   {String}         url     地址
     * @param   {Object|String}  context 上级地址
     * @returns {*}
     */
    processURL(url: string, context: any): IQueueItem | null;
    /**
     * 存储链接到queue
     * @param   {String}     url        地址
     * @param   {QueueItem}  queueItem  地址的源信息
     * @returns {*}
     */
    queueURL(url: string | IQueueItem, queueItem: IQueueItem): boolean | IQueueItem;
    /**
     * 判定域名是否合法
     * @param host    {String}
     * @returns {boolean|*}
     */
    domainValid(hostname: string): boolean | undefined;
}
