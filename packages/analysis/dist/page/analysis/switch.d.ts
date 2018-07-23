import { Base } from "./base";
export declare class Strategy extends Base {
    /**
     * 为了解决元素错位的问题，这里会使用特殊的解析方式
     * 这里会选择一个匹配的元素，并获取值，用于case的匹配
     * @param   {any}     queueItem 当前连接的配置数据
     * @param   {any}     data      解析的配置
     * @param   {any}     results   当前解析出来的数据
     * @param   {any}     $         当前的dom节点
     * @param   {any}     index     当前的数组索引
     * @returns Promise
     */
    doDeal(queueItem: any, data: any, results: any, $: any, index: number): Promise<any>;
}
declare const _default: Strategy;
export default _default;
