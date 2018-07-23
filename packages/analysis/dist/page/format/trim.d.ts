/**
 * string值处理
 */
export declare class Strategy {
    /**
     * 开始处理文本,去掉左右空格,去掉中间空格,去掉制表符
     * @param   {String}  result       dom节点的值
     * @param   { lr:boolean, m:boolean }       settings
     * @returns {String}
     */
    doDeal(result: string, settings: {
        lr: boolean;
        m: boolean;
    }): string;
}
declare const _default: Strategy;
export default _default;
