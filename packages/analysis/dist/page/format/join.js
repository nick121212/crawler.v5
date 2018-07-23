/**
 * 处理html文本策越
 */
export class Strategy {
    /**
     * null转换"""
     * @param {any}             reseult
     * @param { join: string }  $1
     * @returns {String}
     */
    doDeal(result, { join }) {
        try {
            return result.join(join || ",");
        }
        catch (e) {
            // return result;
        }
        return result;
    }
}
export default new Strategy();
//# sourceMappingURL=/srv/crawler.v5/packages/analysis/maps/page/format/join.js.map