/**
 * 处理html文本策越
 */
export class Strategy {
    /**
     * 转换成数字类型
     * @param reseult {Any}
     * @returns {String}
     */
    public doDeal(result: string) {
        let res = Number(result);

        if (Number.isNaN(res)) {
            res = 0;
        }

        return res;
    }
}

export default new Strategy();
