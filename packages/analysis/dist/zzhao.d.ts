import { EsStoreService } from "crawler.v5.utils/dist/services/elastic/index";
import { MQueueService } from "crawler.v5.utils/dist/services/rabbitmq/index";
import { Downloader } from "./download";
import { Linker } from "./link";
export declare class Test {
    private $downloader;
    private $linker;
    private $mq;
    private $es;
    constructor($downloader: Downloader, $linker: Linker, $mq: MQueueService, $es: EsStoreService);
    private doDeal;
}
