import { Options, Replies } from "amqplib";
import { Tracer } from "tracer";
/**
 * rabbitmq服务
 */
export declare class MQueueService {
    private $logger;
    queueName: string;
    private connection?;
    private channel?;
    private consume?;
    private exchange?;
    constructor($logger: Tracer.Logger);
    /**
    * 销毁队列
    * @param purge 是否清除数据
    */
    destroy(purge?: boolean): Promise<void>;
    /**
     * 初始化消费队列
     * 1. 初始化queue
     * 2. 创建exchange
     * 3. 创建queue
     * 4. 绑定queue的路由
     * 5. 开始消费
     * @param queueName      mq要消费的q名称
     * @param options        消息的消费方法
     * @param consumeMsg     回调方法
     * @param prefetch       每次获取的消息数量
     * @param delay          延迟时间
     */
    start(queueName: string, options: Options.Connect, consumeMsg: (msgData: any) => Promise<any>, prefech?: number, delay?: number): Promise<boolean>;
    /**
     * 初始化队列
     * @param rabbitmqConfig mq的配置
     */
    private initQueue;
    /**
     * 获取qName中的消息数量
     * @param qName 获得queue的消费数量
     */
    getQueueMessageCount(qName: string): Promise<Replies.AssertQueue>;
    /**
     * 数据入queue
     * @param items       要入queue的消息
     * @param routingKey  路由key
     */
    addItemsToQueue(items: Array<any>, routingKey?: string): boolean;
    /**
     * 提取queueItem
     * @param msg 消息体
     */
    private getQueueItemFromMsg;
}
