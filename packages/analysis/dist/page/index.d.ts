import { AnalysisStrategy } from "./analysis";
import { IQueueItem } from "../models/queueitem";
export declare class HtmlPager {
    private analysis;
    /**
     * 构造函数
     * @param  {AnalysisStrategy} analysis 分析代码用类
     */
    constructor(analysis: AnalysisStrategy);
    /**
     * 解析html获取json数据
     * @param  {IQueueItem}       queueItem       当前的地址
     * @param  {Array<any>}       pages           页面的配置
     * @returns {Promise<any[]>}
     */
    htmlToJson(queueItem: IQueueItem, pages: Array<any>): Promise<any[]>;
}
