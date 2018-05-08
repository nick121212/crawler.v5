import _ from "lodash";

/**
 * string值处理
 */
export class Strategy {
    /**
     * 开始处理文本,去掉左右空格,去掉中间空格,去掉制表符
     * @param   {String}  result       dom节点的值
     * @param   { lr:boolean, m:boolean }       settings
     * @returns {String}
     */
    public doDeal(result: string, settings: { lr: boolean, m: boolean }): string {
        if (_.isString(result)) {
            if (settings.lr === false) {
                result = _.trim(result);
            }

            if (settings.m === false) {
                result = result.replace(/<\/?.+?>/g, "");
                result = result.replace(/[\r\n]/g, "");
            }
        }

        return result;
    }
}

export default new Strategy();
