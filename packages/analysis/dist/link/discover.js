"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uri = require("urijs");
const _ = require("lodash");
const pathToRegexp = require("path-to-regexp");
const constant_1 = require("./constant");
class DiscoverLinks {
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
    constructor(settings) {
        this.settings = settings;
        this.settings = Object.assign({
            parseHTMLComments: false,
            parseScriptTags: false,
            allowedProtocols: ["http"],
            blackPathList: [],
            whitePathList: [],
            userAgent: `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5)
                        AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36
            `,
            _robotsTxts: [],
            fetchWhitelistedMimeTypesBelowMaxDepth: false,
            maxDepth: 0,
            ignoreRobots: true
        }, settings);
    }
    /**
     * 判断协议是否支持
     * @param   {string} url  链接地址
     * @returns {boolean}
     */
    protocolSupported(url) {
        let protocol, { allowedProtocols = [] } = this.settings;
        try {
            protocol = uri(url).protocol();
            if (!protocol) {
                protocol = "http";
            }
        }
        catch (e) {
            return false;
        }
        return allowedProtocols.reduce((prev, protocolCheck) => {
            return prev || protocolCheck.toLocaleLowerCase() === protocol.toLocaleLowerCase();
        }, true);
    }
    /**
     * 后缀是否支持
     * @param suffix {string} 链接地址前缀
     * @returns boolean
     */
    extendSupported(suffix) {
        return !constant_1.suffixs.some((value) => {
            return value === suffix.toLowerCase();
        });
    }
    /**
     * 路径是否支持
     * @param urlPath {string} 链接地址路径
     * @returns boolean
     */
    pathSupported(urlPath) {
        let res = false, { whitePathList } = this.settings;
        _.forEach(whitePathList, ({ path }) => {
            let pathToReg = pathToRegexp(path, []);
            res = pathToReg.test(urlPath);
            if (res) {
                return false;
            }
            return true;
        });
        return res;
    }
    /**
     * 去掉一些没用的URL
     * @param urlMatch {array} 链接数组
     * @param queueItem {object}
     * @returns {Array}
     */
    cleanExpandResources(urlMatch = [], queueItem = { url: "" }) {
        const { ignoreRobots } = this.settings;
        return urlMatch
            .map(this.cleanURL.bind(this, queueItem))
            .reduce((list, URL) => {
            try {
                URL = uri(decodeURIComponent(URL.toString()))
                    .absoluteTo(queueItem.url || "")
                    .normalize();
            }
            catch (e) {
                console.log(e.message);
                return list;
            }
            // url是否为空
            if (!URL.toString().length) {
                return list;
            }
            // 判断协议是否支持
            if (!this.protocolSupported(URL.toString())) {
                return list;
            }
            // maxDepth是否符合
            if (!this.depthAllowed(queueItem)) {
                return list;
            }
            // 后缀名是否支持
            if (!this.extendSupported(URL.suffix())) {
                return list;
            }
            // 路径是否需要爬
            if (!this.pathSupported(URL.path())) {
                return list;
            }
            // 判断是否在机器人应答的允许列表中
            if (!ignoreRobots && !this.urlIsAllowed(URL)) {
                return list;
            }
            // url是否已经存在列表中
            if (list.reduce(function (prev, current) {
                return prev || current === URL.toString();
            }, false)) {
                return list;
            }
            return list.concat(URL.toString());
        }, []);
    }
    /**
     * 清理文本中的一些信息
     * @param queueItem {Object}
     * @param URL       {String}
     * @returns {*|string}
     */
    cleanURL(queueItem, url) {
        let { protocol } = queueItem;
        if (!url) {
            return "";
        }
        return url
            .replace(/^(?:\s*href|\s*src)\s*=+\s*/i, "")
            .replace(/^\s*/, "")
            .replace(/^([""])(.*)\1$/, "$2")
            .replace(/^url\((.*)\)/i, "$1")
            .replace(/^javascript\:\s*([a-z0-9]*\([""](.*)[""]\))*.*/i, "$2")
            .replace(/^([""])(.*)\1$/, "$2")
            .replace(/^\((.*)\)$/, "$1")
            .replace(/^\/\//, protocol + "://")
            .replace(/\&amp;/gi, "&")
            .replace(/\&#38;/gi, "&")
            .replace(/\&#x00026;/gi, "&")
            .split("#")
            .shift()
            .trim();
    }
    /**
     * 深度是否允许爬取
     * @param queueItem
     * @returns {boolean|*}
     */
    depthAllowed(queueItem) {
        // let belowMaxDepth = this.fetchWhitelistedMimeTypesBelowMaxDepth;
        let { fetchWhitelistedMimeTypesBelowMaxDepth: belowMaxDepth = 0, maxDepth = 0 } = this.settings;
        if (typeof belowMaxDepth === "boolean") {
            belowMaxDepth = belowMaxDepth === false ? 0 : Infinity;
        }
        let whitelistedDepth = (queueItem.depth || 1) - belowMaxDepth;
        return maxDepth === 0 ||
            (queueItem.depth || 1) <= maxDepth ||
            whitelistedDepth <= maxDepth &&
                constant_1.whitelistedMimeTypes.some(function (mimeCheck) {
                    return mimeCheck.test(queueItem.stateData.contentType);
                });
    }
    /**
     * 判断链接是否合法
     * @param parsedURL {String} 链接
     * @returns {boolean}
     */
    urlIsAllowed(parsedURL) {
        if (typeof parsedURL === "object") {
            parsedURL = {
                protocol: parsedURL.protocol(),
                hostname: parsedURL.host(),
                port: parsedURL.port().toString(),
                path: parsedURL.path(),
                query: parsedURL.query()
            };
        }
        let { _robotsTxts = [], userAgent } = this.settings;
        let formattedURL = uri(parsedURL).normalize().href(), allowed = false;
        // The punycode module sometimes chokes on really weird domain
        // names. Catching those errors to prevent crawler from crashing
        try {
            allowed = _robotsTxts.reduce((result, robots) => {
                let allowed1 = robots.isAllowed(formattedURL, userAgent);
                return result !== undefined ? result : allowed1;
            }, undefined);
        }
        catch (error) {
            // URL will be avoided
        }
        // allowed !== undefined && console.log(`${formattedURL} is ${allowed === undefined ? "allow" : "disallow"}`);
        return allowed === undefined ? true : allowed;
    }
    /**
     * 发现页面中的链接
     * @param queueItem    {Object}
     * @returns {*}
     */
    discoverResources(queueItem = {}) {
        let { parseHTMLComments, parseScriptTags } = this.settings;
        if (!queueItem) {
            queueItem = {};
        }
        if (!queueItem.protocol) {
            queueItem.protocol = "http";
        }
        let { responseBody = "" } = queueItem;
        if (!parseHTMLComments) {
            responseBody = responseBody.replace(/<!--([\s\S]+?)-->/g, "");
        }
        if (!parseScriptTags) {
            responseBody = responseBody.replace(/<script(.*?)>([\s\S]*?)<\/script>/gi, "");
        }
        return constant_1.discoverRegex
            .reduce((list, regex) => {
            let resources = typeof regex === "function" ?
                regex(responseBody) :
                responseBody.match(regex) || [];
            return list.concat(this.cleanExpandResources(resources || [], queueItem));
        }, [])
            .reduce((list, check) => {
            if (list.indexOf(check) < 0) {
                return list.concat([check]);
            }
            return list;
        }, []);
    }
}
exports.DiscoverLinks = DiscoverLinks;
//# sourceMappingURL=/srv/crawler.v5/packages/analysis/maps/link/discover.js.map