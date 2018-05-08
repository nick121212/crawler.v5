import "reflect-metadata";
import { injectable } from "inversify";
import { colorConsole, Tracer } from "tracer";

import { Logs } from "./interfaces"

@injectable()
class ColorLogs implements Logs {
    private logger: Tracer.Logger;

    constructor() {
        this.logger = colorConsole();
    }

    public info(msg: string) {
        this.logger.error(msg);
    }
}

export { ColorLogs };