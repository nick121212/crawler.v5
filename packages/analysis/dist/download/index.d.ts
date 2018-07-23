/**
 * 下载内容
 * @param queueItem 链接的信息
 * @param settings  设置
 * @param engine    使用engine
 */
export declare const downloadUrl: (url: string, settings: any, engine?: string) => Promise<{
    header: any;
    responseBody: any;
    statusCode: any;
}>;
