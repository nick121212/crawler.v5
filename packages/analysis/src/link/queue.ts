import * as uri from "urijs";
import * as _ from "lodash";
import * as qs from "qs";
import * as pathToRegexp from "path-to-regexp";

import { IQueueItem } from "../models/queueitem";
import QueueSettings from "../models/queuesetting";

const md5 = require("blueimp-md5");
const QUEUE_ITEM_INITIAL_DEPTH = 1;

export class Queue {
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
    constructor(private settings: QueueSettings) {
        this.settings = Object.assign({
            ignoreWWWDomain: true,
            scanSubdomains: false,
            stripWWWDomain: true,
            host: "",
            initialProtocol: "http",
            initialPort: 80,
            domainWhiteList: [],
            fetchConditions: [],
            filterByDomain: true,
            stripQuerystring: true,
            allowQueryParams: []
        }, settings);
    }

    /**
     * 去掉没用的搜索字符(^)
     * @param   {String} url 地址
     * @returns {String}
     */
    public removeUselessStr(url: string): string {
        if (url.indexOf("^") > -1) {
            url = url.substr(0, url.indexOf("^"));
        }
        if (url.indexOf(encodeURIComponent("^")) > -1) {
            url = url.substr(0, url.indexOf(encodeURIComponent("^")));
        }
        return url;
    }

    /**
     * 去掉queryString
     * @param   {String} url  地址
     * @returns {String}
     */
    public removeQuerystring(url: string): string {
        // url = decode
        if (url.indexOf("?") > -1) {
            return url.substr(0, url.indexOf("?"));
        }

        return url;
    }

    /**
     * 处理链接
     * @param   {String}         url     地址
     * @param   {Object|String}  context 上级地址
     * @returns {*}
     */
    public processURL(url: string, context: any): IQueueItem | null {
        let newURL: any,
            { initialProtocol, host, initialPort, stripQuerystring, stripWWWDomain, allowQueryParams } = this.settings;

        if (!context || typeof context !== "object" || !context.url) {
            context = {
                url: initialProtocol + "://" +
                    host + ":" +
                    initialPort + "/",
                depth: QUEUE_ITEM_INITIAL_DEPTH
            };
        }
        // If the URL didn't contain anything, don't fetch it.
        if (!(url && url.replace(/\s+/ig, "").length)) {
            return null;
        }
        // 去掉querystring
        if (stripQuerystring === true) {
            url = this.removeQuerystring(url);
        }
        // 去掉www域名中的www
        if (stripWWWDomain && url.match(/https?\:\/\/(www\.).*/i)) {
            url = url.replace("www.", "");
        }

        url = this.removeUselessStr(url);

        try {
            newURL = uri(url).absoluteTo(context.url).normalize();
            // if (this.urlEncoding === "iso8859") {
            //     newURL = newURL.iso8859();
            // }

            let queryString = newURL.query();

            // 只留下需要的querystring
            if (allowQueryParams && allowQueryParams.length && queryString) {
                let noSparse = qs.parse(queryString);

                newURL.query("");
                _.each(allowQueryParams, (qp) => {
                    if (noSparse[qp]) {
                        newURL.addQuery(qp, noSparse[qp]);
                    }
                });
            }
        } catch (e) {
            return null;
        }

        return {
            protocol: newURL.protocol() || "http",
            hostname: newURL.hostname(),
            port: newURL.port() || 80,
            path: newURL.path(),
            query: newURL.query(),
            depth: (context.depth || 0) + 1,
            url: newURL.toString(),
            _id: ""
        };
    }

    /**
     * 存储链接到queue
     * @param   {String}     url        地址
     * @param   {QueueItem}  queueItem  地址的源信息
     * @returns {*}
     */
    public queueURL(url: string | IQueueItem, queueItem: IQueueItem): boolean | IQueueItem {
        let parsedURL: any = typeof url === "object" ? url : this.processURL(url, queueItem),
            { fetchConditions = [] } = this.settings;

        if (!parsedURL) {
            return false;
        }

        if (!queueItem) {
            queueItem = parsedURL;
        }

        // 赋值一个ID
        queueItem._id = md5(queueItem.url || "");

        let fetchDenied = fetchConditions.reduce((prev, callback) => {
            return prev || !callback(parsedURL, queueItem);
        }, false);

        if (fetchDenied) {
            return false;
        }

        // Check the domain is valid before adding it to the queue
        if (this.domainValid(parsedURL.hostname)) {
            return {
                protocol: parsedURL.protocol,
                hostname: parsedURL.hostname,
                query: parsedURL.query,
                port: parsedURL.port,
                path: parsedURL.path,
                depth: parsedURL.depth,
                url: parsedURL.url,
                _id: md5(parsedURL.url)
            };
        } else {
            // console.log("域名不正确", parsedURL.hostname);
        }

        return false;
    }

    /**
     * 判定域名是否合法
     * @param host    {String}
     * @returns {boolean|*}
     */
    public domainValid(hostname: string) {
        let { domainWhiteList, ignoreWWWDomain, filterByDomain, host = "", scanSubdomains } = this.settings;
        let domainInWhitelist = (host1: string) => {
            // 没有没有设置域名白名单，或则数据为空
            // 直接返回false
            if (!domainWhiteList || !domainWhiteList.length) {
                return false;
            }
            // 遍历域名白名单
            return !!domainWhiteList.reduce((prev, cur) => {
                // 如果已经找到，则直接返回
                if (prev) {
                    return prev;
                }

                if (host1 === cur) {
                    return true;
                }

                // 正则匹配
                let pathToReg = pathToRegexp(cur, []);
                let res = pathToReg.test(host1);

                if (res) {
                    return true;
                }

                // 忽略域名的匹配，则直接返回true
                if (ignoreWWWDomain && host1 === cur.replace(/^www\./i, "")) {
                    return true;
                }

                // 不匹配，返回false
                return false;
            }, false);
        };
        let isSubdomainOf = (subdomain: string, host1: string) => {
            subdomain = subdomain.toLowerCase();
            host1 = host1.toLowerCase();
            // If we're ignoring www, remove it from both
            // (if www is the first domain component...)
            if (ignoreWWWDomain) {
                subdomain = subdomain.replace(/^www./ig, "");
                host1 = host1.replace(/^www./ig, "");
            }
            // They should be the same flipped around!
            return subdomain.split("").reverse().join("").substr(0, host1.length) === host1.split("").reverse().join("");
        };

        if (ignoreWWWDomain) {
            hostname = hostname.replace(/^www\./i, "");
        }

        return !filterByDomain ||
            // Or if the domain is just the right one, return true.
            hostname === host ||
            // Or if we're ignoring WWW subdomains, and both domains,
            // less www. are the same, return true.
            (ignoreWWWDomain && host.replace(/^www\./i, "") === hostname.replace(/^www\./i, "")) ||
            // Or if the domain in question exists in the domain whitelist,
            // return true.
            domainInWhitelist(hostname) ||
            // Or if we're scanning subdomains, and this domain is a subdomain
            // of the crawler's set domain, return true.
            (scanSubdomains && isSubdomainOf(hostname, host));
    }
}
