import { IQueueItem } from "../models/queueitem";
import DiscoverSettings from "../models/discoversetting";
export declare class DiscoverLinks {
    private settings;
    /**
     * 构造函数
     * @param settings  {object}
     *   parseHTMLComments {boolean} 是否需要搜索comments中的url
     *   parseScriptTags   {boolean} 是否需要搜索标签中的url
     *   allowedProtocols  {array} 允许的协议的列表
     *   blackPathList     {array} 不用爬的路径
     *   whitePathList     {array} 路径白名单
     *   userAgent         {string} ua
     *   _robotsTxts       {Object} 机器人应答信息
     *   fetchWhitelistedMimeTypesBelowMaxDepth {Boolean}
     *   maxDepth          {number} 最大深度
     *   ignoreRobots      {boolean} 是否忽略机器人应答
     */
    constructor(settings: DiscoverSettings);
    /**
     * 判断协议是否支持
     * @param   {string} url  链接地址
     * @returns {boolean}
     */
    protocolSupported(url: string): boolean;
    /**
     * 后缀是否支持
     * @param suffix {string} 链接地址前缀
     * @returns boolean
     */
    extendSupported(suffix: string): boolean;
    /**
     * 路径是否支持
     * @param urlPath {string} 链接地址路径
     * @returns boolean
     */
    pathSupported(urlPath: string): boolean;
    /**
     * 去掉一些没用的URL
     * @param urlMatch {array} 链接数组
     * @param queueItem {object}
     * @returns {Array}
     */
    cleanExpandResources(urlMatch?: any, queueItem?: IQueueItem): any;
    /**
     * 清理文本中的一些信息
     * @param queueItem {Object}
     * @param URL       {String}
     * @returns {*|string}
     */
    cleanURL(queueItem: IQueueItem, url: any): string;
    /**
     * 深度是否允许爬取
     * @param queueItem
     * @returns {boolean|*}
     */
    depthAllowed(queueItem: IQueueItem): boolean;
    /**
     * 判断链接是否合法
     * @param parsedURL {String} 链接
     * @returns {boolean}
     */
    urlIsAllowed(parsedURL: string | any): boolean;
    /**
     * 发现页面中的链接
     * @param queueItem    {Object}
     * @returns {*}
     */
    discoverResources(queueItem?: IQueueItem): Array<any>;
}
