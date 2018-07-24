import _ from "lodash";
import pathToRegexp from "path-to-regexp";
import { injectable, inject } from "inversify";

import { AnalysisStrategy } from "./analysis";
import { IQueueItem } from "../models/queueitem";

@injectable()
export class HtmlPager {

    /**
     * 构造函数
     * @param  {AnalysisStrategy} analysis 分析代码用类
     */
    constructor(@inject(AnalysisStrategy) private analysis: AnalysisStrategy) { }

    /**
     * 解析html获取json数据
     * @param  {IQueueItem}       queueItem       当前的地址
     * @param  {Array<any>}       pages           页面的配置
     * @returns {Promise<any[]>}
     */
    public async htmlToJson(queueItem: IQueueItem, pages: Array<any>): Promise<any[]> {
        if (!queueItem) {
            return [];
        }

        const results: Array<any> = [],
            rules = _.filter(pages, ({ path }) => {
                const pathToReg = pathToRegexp(path.toString(), []);

                return pathToReg.test(queueItem.path || "");
            });

        // 解析规则，分析页面中的字段
        if (rules.length && queueItem.responseBody) {
            for (const rule of rules) {
                results.push(await this.analysis.doDeal(queueItem, rule));
            }
        }

        return results;
    }
}
