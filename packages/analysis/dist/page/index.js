var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import _ from "lodash";
import pathToRegexp from "path-to-regexp";
import analysis from "./analysis";
/**
 * 解析html获取json数据
 * @param  {IQueueItem}       queueItem       当前的地址
 * @param  {Array<any>}       pages           页面的配置
 */
export const analysisHtmlToJson = (queueItem, pages) => __awaiter(this, void 0, void 0, function* () {
    if (!queueItem) {
        return [];
    }
    let results = [], rules = _.filter(pages, ({ path }) => {
        let pathToReg = pathToRegexp(path.toString(), []);
        return pathToReg.test(queueItem.path || "");
    });
    // 解析规则，分析页面中的字段
    if (rules.length && queueItem.responseBody) {
        for (let rule of rules) {
            results.push(yield analysis.doDeal(queueItem, rule));
        }
    }
    return results;
});
//# sourceMappingURL=/srv/crawler.v5/packages/analysis/maps/page/index.js.map