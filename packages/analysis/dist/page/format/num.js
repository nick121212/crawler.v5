/**
 * 处理html文本策越
 */
export class Strategy {
    /**
     * 转换成数字类型
     * @param reseult {Any}
     * @returns {String}
     */
    doDeal(result) {
        let res = Number(result);
        if (Number.isNaN(res)) {
            res = 0;
        }
        return res;
    }
}
export default new Strategy();
//# sourceMappingURL=/srv/crawler.v5/packages/analysis/maps/page/format/num.js.map