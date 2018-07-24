import { injectable, inject, tagged } from "inversify";
import * as bluebird from "bluebird";
import * as _ from "lodash";
import { Client, ConfigOptions, GetResponse, SearchResponse } from "elasticsearch";
import { Tracer } from "tracer";

const _fields = [
    "protocol",
    "host",
    "query",
    "port",
    "path",
    "depth",
    "url",
    "crawlerCount",
    "errorCount",
    "error",
    "statusCode",
    "responseBody",
    "responseBodyText",
    "@timestamp",
    "status",
    "updatedAt"
];

@injectable()
export class EsStoreService {
    private client!: Client;

    constructor(@inject("log") @tagged("color", true) private $logger: Tracer.Logger) {
        this.$logger.info("elasticsearch constructor");
    }

    /**
     * 保存分析出来的链接地址
     * 先判断地址是不是已经在es中
     * 存在的话，则不存入queue中
     * @param urls     连接数组
     * @param esIndex  index
     * @param esType   type
     */
    public async saveUrls(urls: Array<any>, esIndex: string, esType: string): Promise<Array<any>> {
        const urlsById = _.keyBy(urls, "_id");
        const docs: Array<any> = [];

        this.$logger.debug("saveUrls", urls, esIndex, esType);

        _.forEach(urlsById, (_url: any, key: string) => {
            docs.push({
                _index: esIndex,
                _type: esType,
                _id: key
            });
        });
        // 判断链接是否存在

        if (!docs.length) {
            return [];
        }

        let resources = await this.client.mget({
            body: {
                docs: docs
            },
            storedFields: ["statusCode"]
        });

        // 如果不存在，则新建；
        let newUrls = _.filter(resources.docs, (doc: any) => {
            if (doc.error && doc.error.type === "index_not_found_exception") {
                return true;
            }
            if (doc.found === false) {
                return true;
            }

            return false;
        });

        docs.length = 0;
        // 保存新增的地址
        _.each(newUrls, (url) => {
            if (urlsById[url._id]) {
                docs.push({
                    create: {
                        _index: esIndex,
                        _type: esType,
                        _id: url._id
                    }
                });
                docs.push(this.pick(_.extend({ "@timestamp": Date.now(), status: "queued" }, urlsById[url._id]), _fields));
            }
        });
        if (docs.length) {
            let urlsResult = await this.client.bulk({
                body: docs
            });

            return urlsResult.items.map((result: any) => {
                if (result.create && (result.create.created || result.create.result === "created")) {
                    return urlsById[result.create._id];
                }

                return null;
            });
        }

        return [];
    }

    public async clearUrls(esIndex: string) {
        return this.client.indices.delete({
            index: esIndex
        });
    }

    /**
     * 存储当前的地址
     * @param queueItem  数据
     * @param esIndex    索引
     * @param esType     类型
     */
    public async saveQueueItem(queueItem: any, esIndex: string, esType: string): Promise<any> {
        let docs: Array<any> = [];

        if (queueItem && queueItem._id) {
            docs.push({
                index: {
                    _index: esIndex,
                    _type: esType,
                    _id: queueItem._id
                }
            });
            queueItem.status = "complete";
            docs.push(this.pick(queueItem, _fields));

            if (docs.length) {
                return await this.client.bulk({
                    body: docs
                });
            }
        }

        return {};
    }

    /**
    * 存储当前的地址
    * @param result  数据
    * @param esIndex 索引
    * @param esType  类型
    */
    public async saveResult(_id: string, result: any, esIndex: string, esType: string): Promise<any> {
        let docs: Array<any> = [];

        if (result) {
            docs.push({
                index: {
                    _index: esIndex,
                    _type: esType,
                    _id: _id
                }
            });

            docs.push(result);

            if (docs.length) {
                return await this.client.bulk({
                    body: docs
                });
            }
        }

        return {};
    }

    /**
  * 存储当前的地址
  * @param result  数据
  * @param esIndex 索引
  * @param esType  类型
  */
    public async createResult(_id: string, result: any, esIndex: string, esType: string): Promise<any> {
        if (result) {
            return await this.client.create({
                index: esIndex,
                type: esType,
                id: _id,
                body: result
            });
        }

        return {};
    }

    /**
     * 获取单个数据
     * @param param0
     * _id es的id
     * esIndex 索引
     * esType  类型
     */
    public async getItem(_id: any, esIndex: string, esType: string): Promise<GetResponse<any>> {
        return await this.client.get({
            id: _id,
            index: esIndex,
            type: esType
        });
    }

    /**
     * scroll 所有的记录
     * @param esIndex  index
     * @param esType   type
     * @param scrollId id
     */
    public async scroll(esIndex: string, esType: string, scrollId: string): Promise<SearchResponse<any>> {

        this.$logger.debug("------------------------", scrollId, esIndex, esType);

        if (scrollId) {
            return await this.client.scroll({
                scrollId: scrollId,
                scroll: "300s"
            });
        }

        return await this.client.search({
            index: esIndex,
            type: esType,
            scroll: "300s"
        });
    }

    /**
     * 初始化
     * @param globalOptions 设置项
     */
    public async init(globalOptions: ConfigOptions): Promise<EsStoreService> {
        this.client = new Client(globalOptions);

        await this.client.ping({
            requestTimeout: 3000
        }).then(() => {
            this.$logger.info("elasticsearh as well");
        }, (err: Error) => {
            this.$logger.error("elasticsearch cluster is down!", err);

            throw err;
        });

        await bluebird.delay(200);

        return this;
    }

    /**
     * pick 字段
     * @param result 数据
     * @param fields 字段
     */
    private pick(result: any, fields: Array<string>) {
        let res: any = {};

        _.each(fields, (field) => {
            let val: any = _.pick(result, field);

            if (val && val[field] !== undefined) {
                res[field] = val[field];
            }
        });

        return res;
    }
}
