import { IQueueItem } from "../models/queueitem";
/**
 * 解析html获取json数据
 * @param  {IQueueItem}       queueItem       当前的地址
 * @param  {Array<any>}       pages           页面的配置
 */
export declare const analysisHtmlToJson: (queueItem: IQueueItem, pages: any[]) => Promise<any[]>;
