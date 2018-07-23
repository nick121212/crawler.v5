import { Base } from "./base";
export declare class Strategy extends Base {
    /**
     * 有些数据会出现在多个地方，一个地方匹配则返回
     * @param   {any}     queueItem 当前连接的配置数据
     * @param   {any}     data      解析的配置
     * @param   {any}     results   当前解析出来的数据
     * @param   {any}     $         当前的dom节点
     * @param   {any}     index     当前的数组索引
     * @returns {Promise}
     */
    doDeal(queueItem: any, data: any, results: any, $: any, index: number): Promise<any>;
}
declare const _default: Strategy;
export default _default;
