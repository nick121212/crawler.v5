import { Base } from "./base";
import jsdom from "../html/jsdom";
export class Strategy extends Base {
    /**
     * case模式，必须配合switch来使用
     * 为了解决元素错位的问题，这里会使用特殊的解析方式
     * @param   {any}     queueItem 当前连接的配置数据
     * @param   {any}     data      解析的配置
     * @param   {any}     results   当前解析出来的数据
     * @param   {any}     $         当前的dom节点
     * @param   {any}     index     当前的数组索引
     * @returns Promise
     */
    doDeal(queueItem, data, results, $, index) {
        let promise = jsdom.doDeal(queueItem, data, $, index).then((res) => {
            if (!res.result || res.result.indexOf(res.data.match) < 0) {
                res = null;
            }
            else {
                res.result = results;
                res.$cur = res.$parent;
            }
            return res;
        });
        return promise;
    }
}
export default new Strategy();
//# sourceMappingURL=/srv/crawler.v5/packages/analysis/maps/page/analysis/case.js.map