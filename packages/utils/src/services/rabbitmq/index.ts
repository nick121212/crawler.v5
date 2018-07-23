import { connect, Connection, Channel, Options, Replies, Message } from "amqplib";
import { Tracer } from "tracer";
import bluebird from "bluebird";
// import * as _ from "lodash";
import { injectable, inject, tagged } from "inversify";

// import { SettingModel } from "../models/setting";

/**
 * rabbitmq服务
 */
@injectable()
export class MQueueService {
    public queueName = "";

    private connection?: Connection = undefined;
    private channel?: Channel = undefined;
    private consume?: Replies.Consume = undefined;
    private exchange?: Replies.AssertExchange = undefined;

    constructor(@inject("log") @tagged("color", true) private $logger: Tracer.Logger) {
        this.$logger.info("mq constructor");

    }

    /**
    * 销毁队列
    * @param purge 是否清除数据
    */
    public async destroy(purge = false): Promise<void> {
        try {
            if (this.channel) {
                await this.channel.nackAll(true);
                if (this.consume) {
                    await this.channel.cancel(this.consume.consumerTag);
                }

                if (purge) {
                    await this.channel.deleteQueue(this.queueName);
                }

                await this.channel.close();
            }

            if (this.connection) {
                await this.connection.close();
            }

            this.channel = undefined;
            this.connection = undefined;
            this.consume = undefined;
            this.exchange = undefined;

            this.$logger.info("queue 正常停止了！");
        } catch (e) {
            this.$logger.error("queue 停止出错了", e);
        }
    }

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
    public async start(queueName: string, options: Options.Connect, consumeMsg: (msgData: any) => Promise<any>, prefech = 3, delay = 1000) {
        let queue: Replies.AssertQueue;

        this.queueName = queueName;

        try {
            const channel = await this.initQueue(options);

            this.exchange = await channel.assertExchange("amqp.topic", "topic", { durable: true });
            queue = await this.getQueueMessageCount(this.queueName);

            if (this.exchange) {
                await channel.bindQueue(queue.queue, this.exchange.exchange, queueName);
            }
            await channel.prefetch(prefech || 3);

            this.$logger.info(`开始消费queue:${queue.queue}`);

            // 1. 序列化queue的消息
            // 2. 调用消费方法
            this.consume = await channel.consume(queue.queue, async (msg: Message | null) => {
                let msgData: any;

                // 如果queue的msg不能正常序列化，则丢弃掉当前消息
                try {
                    msgData = await this.getQueueItemFromMsg(msg as any);
                } catch (e) {
                    if (this.channel) {
                        this.channel.nack(msg as any);
                    }

                    return;
                }

                await bluebird.delay(delay || 1000);

                try {
                    await consumeMsg(msgData);

                    this.$logger.info("爬取成功！");
                    if (this.channel) {
                        this.channel.ack(msg as any);
                    }
                } catch (err) {
                    this.$logger.error("爬取失败！", err);
                    if (this.channel) {
                        this.channel.nack(msg as any);
                    }
                }
                return null;
            }, { noAck: false, exclusive: false });
        } catch (err) {
            this.$logger.error("爬取失败！", err);
            return false;
        }

        return queue.consumerCount + queue.messageCount === 0;
    }

    /**
     * 初始化队列
     * @param rabbitmqConfig mq的配置
     */
    private async initQueue(connOptions: Options.Connect, options: any = {}): Promise<Channel> {
        if (this.channel) {
            return this.channel;
        }

        this.connection = await connect(connOptions, options);
        this.channel = await this.connection.createConfirmChannel();

        this.channel.on("error", (err) => {
            this.$logger.error("channel error!", err);
        });
        this.channel.on("close", () => {
            this.$logger.info("channel closed!");
        });

        return this.channel;
    }

    /**
     * 获取qName中的消息数量
     * @param qName 获得queue的消费数量
     */
    public async getQueueMessageCount(qName: string): Promise<Replies.AssertQueue> {
        if (!this.channel) {
            throw new Error("没有建立channel！");
        }

        return await this.channel.assertQueue(qName, { durable: true, exclusive: false });
    }

    /**
     * 数据入queue
     * @param items       要入queue的消息
     * @param routingKey  路由key
     */
    public addItemsToQueue(items: Array<any>, routingKey?: string) {
        let rtn = true;

        if (!this.channel) {
            throw new Error("没有建立channel连接！");
        }

        items.forEach((item) => {
            if (this.exchange && this.channel) {
                let push = this.channel.publish(this.exchange.exchange, routingKey || this.queueName, new Buffer(JSON.stringify(item)), {});

                rtn = rtn && push;
            }
        });

        return rtn;
    }

    /**
     * 提取queueItem
     * @param msg 消息体
     */
    private async getQueueItemFromMsg(msg: Message): Promise<any> {
        let queueItem;

        try {
            queueItem = JSON.parse(msg.content.toString());
        } catch (e) {
            throw e;
        }

        return queueItem;
    }
}
