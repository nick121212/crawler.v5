// *   parseHTMLComments {boolean} 是否需要搜索comments中的url
// *   parseScriptTags   {boolean} 是否需要搜索标签中的url
// *   allowedProtocols  {array} 允许的协议的列表
// *   blackPathList     {array} 不用爬的路径
// *   whitePathList     {array} 路径白名单
// *   userAgent         {string} ua
// *   _robotsTxts       {Object} 机器人应答信息
// *   fetchWhitelistedMimeTypesBelowMaxDepth {Boolean}
// *   maxDepth          {number} 最大深度
// *   ignoreRobots      {boolean} 是否忽略机器人应答

export default interface DiscoverSettings {
    /**
     * 是否查找html中的评论
     */
    parseHTMLComments?: boolean;
    /**
     * 是否需要搜索标签中的url
     */
    parseScriptTags?: boolean;
    /**
     * 允许的协议的列表
     */
    allowedProtocols?: Array<string>;
    /**
     * 黑名单
     */
    blackPathList?: Array<{ path: string, enable: boolean }>;
    /**
     * 白名单
     */
    whitePathList?: Array<{ path: string, enable: boolean }>;
    /**
     * userAgent
     */
    userAgent?: string;
    /**
     * 机器人的文本
     */
    _robotsTxts?: Array<any>;
    /**
     * 忽略机器人应答
     */
    ignoreRobots?: boolean;
    /**
     * 爬取的最大深度
     * 如果为false，则忽略深度判断
     */
    fetchWhitelistedMimeTypesBelowMaxDepth?: boolean | number;
    /**
     * 爬取的最大深度
     */
    maxDepth?: number;
}
