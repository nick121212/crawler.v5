"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("crawler.v5.utils/dist/services/elastic/index");
const index_2 = require("crawler.v5.utils/dist/services/rabbitmq/index");
const inversify_1 = require("inversify");
const qs = require("qs");
const download_1 = require("./download");
const link_1 = require("./link");
const config = {
    "queueConfig": {
        "ignoreWWWDomain": false,
        "stripWWWDomain": false,
        "scanSubdomains": true,
        "host": "mp.weixin.qq.com",
        "initialProtocol": "https",
        "initialPort": 80,
        "stripQuerystring": false,
        "fetchConditions": [],
        "domainWhiteList": ["mp.weixin.qq.com"],
        "filterByDomain": true
    },
    "urls": ["https://mp.weixin.qq.com"]
};
let Test = class Test {
    constructor($downloader, $linker, $mq, $es) {
        // tslint:disable-next-line:max-line-length
        // this.$downloader.start("https://mmbiz.qpic.cn/mmbiz_png/slNte3rbPWMn8t2b40bgudkdHkriaWLO81UF3uLhl03iadI4zp77icjgpaIlYzH4OrJOoPkSiaicgroS2m6BPgS8qJg/640?", {}, "picdown").then((data) => {
        //     console.log(data);
        // });
        this.$downloader = $downloader;
        this.$linker = $linker;
        this.$mq = $mq;
        this.$es = $es;
        this.$mq.start("zzhao", {
            protocol: "amqp",
            hostname: "localhost",
            username: "crawler",
            password: "871233"
        }, (data) => __awaiter(this, void 0, void 0, function* () {
            // console.log(data, data.url, qs.parse(data.query));
            // throw new Error(data);
            return this.doDeal("https://mp.weixin.qq.com/cgi-bin/appmsg", {
                params: qs.parse(data.query),
                settings: {
                    header: {
                        // tslint:disable-next-line:max-line-length
                        cookie: "pgv_pvi=6837592064; RK=qL1iA9HrSN; pac_uid=1_289412378; ua_id=cCJ77PAk0D413i6LAAAAABGVH-OzHdfkTwLQWvxSAhw=; pgv_pvid=783149800; ptcz=48de22ffc6e8b094b93c54c12d35c128a1f71cc14e59dc6e341e83e9f56aad1f; tvfe_boss_uuid=08a9590898b95612; ptisp=ctc; pgv_si=s5213942784; pgv_info=ssid=s435497636&pgvReferrer=&ssi=s1570523465; rewardsn=; wxtokenkey=777; session_id=null; qqmusic_uin=; qqmusic_key=; qqmusic_fromtag=; vfwebqq=bdf1b33def5e870339489ed096745fa3070e6f22997c37174f0da29774eb6f99464bf1f23b28f094; cert=qcDEh36uof5ZmyJSxLfdWiw63xnXyFqi; master_key=Qju9A9FYAoSE5HAtNU9BBpnJW3baiz0qYWm+oGIIc2k=; o_cookie=289412378; gr_user_id=4124d708-628f-4334-bcd0-7e87683c4545; pt2gguin=o0289412378; uin=o0289412378; ptui_loginuin=289412378; rv2=80F662177EB4D5E8F7C7CA3791E33D560211F57FAE22B390F7; property20=1647D15872A6A8B2ADD7DE78BA453F8F05B68E3A75956136C42B839DA4D5142C3A1E622855F9E015; mm_lang=zh_CN; ticket_id=gh_2aaa7467eea1; noticeLoginFlag=1; sig=h010f056a9c50f88e332b384ae34fc9d6d81ac5b60da3989164b5ac249dc6072b4b4c386643f2e158e9; uuid=d53ae8f39075db0ebd8360c95f89c08f; ticket=ab85c758dd9e2d1113521d746b6b038e5f03e396; data_bizuin=3593600900; bizuin=3559601469; data_ticket=k4y2eJuGneTdrk3HAjDTaSFfG7AmCzb/mZfWvCohpPhs99Iv3gzl+s4EfAtYNuz4; slave_sid=cFJ0U1RoNVU1RHpkaWNBR0JESUFPMndoUGRBZk9ESHk4dWRwQnFWdEd2Q192YmpxMXU1ZFJpRklVSXZOVERWS01ROVJKd3FuQ1pQQ2szQVdrdHBmTnJ3dzhlc1d2d09lMFp3N0ZLeGM4dHZjS01tVmg3b09LQ1dRVFVVbmlNRm9KM3g1MHQ0UXZqMFhVcFBL; slave_user=gh_2aaa7467eea1; xid=0775b6f6ef8f9034001889bc4e8f9488; openid2ticket_ohP8x1tVpGoYUrRNIHTgWXD78NLw=tCurMnWh8XRrynHbHIXTMKWrSgLlp/A6X5ZwQSeB168="
                    }
                }
            });
        }), 1, 10000).then(() => {
            return this.$es.init({
                "host": "localhost:9200",
                // "log": [],
                "httpAuth": "",
                "sniffInterval": 30000,
                "requestTimeout": 20000,
                "keepAlive": true
            });
        }).then(() => {
            return this.doDeal("https://mp.weixin.qq.com/cgi-bin/appmsg", {
                params: {
                    token: 1498148810,
                    lang: "zh_CN",
                    f: "json",
                    ajax: 1,
                    random: 0.9634021943714353,
                    action: "list_ex",
                    begin: 0,
                    count: 5,
                    query: "",
                    fakeid: "MzA5MzkwNzM2OQ%3D%3D",
                    type: 9
                },
                settings: {
                    header: {
                        // tslint:disable-next-line:max-line-length
                        cookie: "pgv_pvi=6837592064; RK=qL1iA9HrSN; pac_uid=1_289412378; ua_id=cCJ77PAk0D413i6LAAAAABGVH-OzHdfkTwLQWvxSAhw=; pgv_pvid=783149800; ptcz=48de22ffc6e8b094b93c54c12d35c128a1f71cc14e59dc6e341e83e9f56aad1f; tvfe_boss_uuid=08a9590898b95612; ptisp=ctc; pgv_si=s5213942784; pgv_info=ssid=s435497636&pgvReferrer=&ssi=s1570523465; rewardsn=; wxtokenkey=777; session_id=null; qqmusic_uin=; qqmusic_key=; qqmusic_fromtag=; vfwebqq=bdf1b33def5e870339489ed096745fa3070e6f22997c37174f0da29774eb6f99464bf1f23b28f094; cert=qcDEh36uof5ZmyJSxLfdWiw63xnXyFqi; master_key=Qju9A9FYAoSE5HAtNU9BBpnJW3baiz0qYWm+oGIIc2k=; o_cookie=289412378; gr_user_id=4124d708-628f-4334-bcd0-7e87683c4545; pt2gguin=o0289412378; uin=o0289412378; ptui_loginuin=289412378; rv2=80F662177EB4D5E8F7C7CA3791E33D560211F57FAE22B390F7; property20=1647D15872A6A8B2ADD7DE78BA453F8F05B68E3A75956136C42B839DA4D5142C3A1E622855F9E015; mm_lang=zh_CN; ticket_id=gh_2aaa7467eea1; noticeLoginFlag=1; sig=h010f056a9c50f88e332b384ae34fc9d6d81ac5b60da3989164b5ac249dc6072b4b4c386643f2e158e9; uuid=d53ae8f39075db0ebd8360c95f89c08f; ticket=ab85c758dd9e2d1113521d746b6b038e5f03e396; data_bizuin=3593600900; bizuin=3559601469; data_ticket=k4y2eJuGneTdrk3HAjDTaSFfG7AmCzb/mZfWvCohpPhs99Iv3gzl+s4EfAtYNuz4; slave_sid=cFJ0U1RoNVU1RHpkaWNBR0JESUFPMndoUGRBZk9ESHk4dWRwQnFWdEd2Q192YmpxMXU1ZFJpRklVSXZOVERWS01ROVJKd3FuQ1pQQ2szQVdrdHBmTnJ3dzhlc1d2d09lMFp3N0ZLeGM4dHZjS01tVmg3b09LQ1dRVFVVbmlNRm9KM3g1MHQ0UXZqMFhVcFBL; slave_user=gh_2aaa7467eea1; xid=0775b6f6ef8f9034001889bc4e8f9488; openid2ticket_ohP8x1tVpGoYUrRNIHTgWXD78NLw=tCurMnWh8XRrynHbHIXTMKWrSgLlp/A6X5ZwQSeB168="
                    }
                }
            }).catch(console.error);
        });
    }
    doDeal(url, settings) {
        return __awaiter(this, void 0, void 0, function* () {
            const { params: { begin = 0 } = {} } = settings;
            const settings1 = Object.assign({}, settings, {
                params: Object.assign({}, settings.params, { begin: +begin + 5 })
            });
            const nextUrl = this.$linker.formatUrlsToUri([this.$downloader.getFullUrl(url, settings1)], {}, config.queueConfig);
            return this.$es.saveUrls(nextUrl, "zzhao", "urls").then((allowUrls) => {
                return this.$mq.addItemsToQueue(allowUrls);
            }).then(() => {
                return this.$downloader.start(url, Object.assign({}, settings));
            }).then((data) => {
                if (data.statusCode === 200) {
                    return data.responseBody;
                }
                throw new Error(data.responseBody);
            }).then((data) => __awaiter(this, void 0, void 0, function* () {
                const results = data.app_msg_list.map((d) => {
                    const link = this.$linker.formatUrlsToUri([d.link], {}, config.queueConfig);
                    d.id = link[0]._id;
                    return d;
                });
                for (const key in results) {
                    if (results.hasOwnProperty(key)) {
                        const element = results[key];
                        yield this.$es.saveResult(element.id, element, "zzh", "result");
                    }
                }
                return this.$es.saveUrls(this.$linker.formatUrlsToUri(results.map((d) => {
                    return d.link;
                }), {}, config.queueConfig), "article", "urls");
            }));
        });
    }
};
Test = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(download_1.Downloader)),
    __param(1, inversify_1.inject(link_1.Linker)),
    __param(2, inversify_1.inject(index_2.MQueueService)),
    __param(3, inversify_1.inject(index_1.EsStoreService)),
    __metadata("design:paramtypes", [download_1.Downloader,
        link_1.Linker,
        index_2.MQueueService,
        index_1.EsStoreService])
], Test);
exports.Test = Test;
//# sourceMappingURL=/srv/crawler.v5/packages/analysis/maps/zzhao.js.map