import { BaseAnalysis } from "./base";
import { IQueueItem } from "../../models/queueitem";
export declare class AreaStrategy extends BaseAnalysis {
    /**
     * jQuery中可以获取一个元素，并进行缓存，加快之后的解析速度
     * @param   {Object}   queueItem queueitem
     * @param   {Object}   areas     区域
     * @returns {Promise}
     */
    doDeal(queueItem: IQueueItem, areas: Array<any>): Promise<any>;
}
