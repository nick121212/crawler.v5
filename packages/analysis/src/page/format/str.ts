/**
 * 处理html文本策越
 */
export class Strategy {
    /**
     * 返回字符串
     * @param   {any}    reseult 
     * @returns {String}
     */
    public doDeal(result: any) {
        if (result === null || result === undefined) {
            return "";
        }

        return result.toString();
    }
}

export default new Strategy();
