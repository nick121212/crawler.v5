import { colorConsole, console, Tracer } from "tracer";
import * as config from "config";

const logConfig: any = config.has("log") ? config.get("log") : {};

export const colorLog: Tracer.Logger = colorConsole(logConfig);
export const log: Tracer.Logger = console(logConfig);
