import { ConfigOptions } from "elasticsearch";
import { Tracer } from "tracer";
export declare class EsStoreService {
    private $logger;
    private client;
    constructor($logger: Tracer.Logger);
    /**
     * 保存分析出来的链接地址
     * 先判断地址是不是已经在es中
     * 存在的话，则不存入queue中
     * @param urls     连接数组
     * @param esIndex  index
     * @param esType   type
     */
    saveUrls(urls: Array<any>, esIndex: string, esType: string): Promise<Array<any>>;
    /**
     * 存储当前的地址
     * @param queueItem  数据
     * @param esIndex    索引
     * @param esType     类型
     */
    saveQueueItem(queueItem: any, esIndex: string, esType: string): Promise<any>;
    /**
    * 存储当前的地址
    * @param result  数据
    * @param esIndex 索引
    * @param esType  类型
    */
    saveResult(_id: string, result: any, esIndex: string, esType: string): Promise<any>;
    /**
  * 存储当前的地址
  * @param result  数据
  * @param esIndex 索引
  * @param esType  类型
  */
    createResult(_id: string, result: any, esIndex: string, esType: string): Promise<any>;
    /**
     * 获取单个数据
     * @param param0
     * _id es的id
     * esIndex 索引
     * esType  类型
     */
    getItem(_id: any, esIndex: string, esType: string): Promise<import("../../../node_modules/.5.0.25@@types/elasticsearch/index").GetResponse<{}>>;
    scroll(esIndex: string, esType: string, scrollId: string): Promise<import("../../../node_modules/.5.0.25@@types/elasticsearch/index").SearchResponse<{}>>;
    /**
     * 初始化
     * @param globalOptions 设置项
     */
    init(globalOptions: ConfigOptions): Promise<EsStoreService>;
    /**
     * pick 字段
     * @param result 数据
     * @param fields 字段
     */
    private pick;
}
