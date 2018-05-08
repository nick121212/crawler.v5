import "reflect-metadata";
import { Logs } from "./interfaces";
declare class ColorLogs implements Logs {
    private logger;
    constructor();
    info(msg: string): void;
}
export { ColorLogs };
