"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tracer_1 = require("tracer");
var config = require("config");
var logConfig = config.has("log") ? config.get("log") : {};
exports.colorLog = tracer_1.colorConsole(logConfig);
exports.log = tracer_1.console(logConfig);
//# sourceMappingURL=/srv/crawler.v5/packages/utils/maps/services/logs/index.js.map