import _ from "lodash";
import pathToRegexp from "path-to-regexp";

import analysis from "./analysis";
import { IQueueItem } from "../models/queueitem";

/**
 * 解析html获取json数据
 * @param  {IQueueItem}       queueItem       当前的地址
 * @param  {Array<any>}       pages           页面的配置
 */
export const analysisHtmlToJson = async (queueItem: IQueueItem, pages: Array<any>) => {
    if (!queueItem) {
        return [];
    }

    let results: Array<any> = [],
        rules = _.filter(pages, ({ path }) => {
            let pathToReg = pathToRegexp(path.toString(), []);

            return pathToReg.test(queueItem.path || "");
        });

    // 解析规则，分析页面中的字段
    if (rules.length && queueItem.responseBody) {
        for (let rule of rules) {
            results.push(await analysis.doDeal(queueItem, rule));
        }
    }

    return results;
};
