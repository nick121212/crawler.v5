// 正则，用来匹配页面中的地址
export const discoverRegex = [
    /\s(?:href|src)\s?=\s?([""]).*?\1/ig,
    /\s(?:href|src)\s?=\s?[^""\s][^\s>]+/ig,
    /\s?url\(([""]).*?\1\)/ig,
    /\s?url\([^""].*?\)/ig,
    // This could easily duplicate matches above, e.g. in the case of
    // href="http://example.com"
    /http(s)?\:\/\/[^?\s><\"\"]+/ig,
    // This might be a bit of a gamble... but get hard-coded
    // strings out of javacript: URLs. They"re often popup-image
    // or preview windows, which would otherwise be unavailable to us.
    // Worst case scenario is we make some junky requests.
    /^javascript\:[a-z0-9\$\_\.]+\([""][^""\s]+/ig,
    // Find srcset links
    (string) => {
        let result = /\ssrcset\s*=\s*([""])(.*)\1/.exec(string);
        return Array.isArray(result) ? String(result[2]).split(",").map(function (str) {
            return str.replace(/\s?\w*$/, "").trim();
        }) : "";
    },
    // Find resources in <meta> redirects. We need to wrap these RegExp"s in
    // functions because we only want to return the first capture group, not
    // the entire match. And we need two RegExp"s because the necessary
    // attributes on the <meta> tag can appear in any order
    (string) => {
        let match = string.match(/<\s*meta[^>]*http-equiv=[""]{0,1}refresh[""]{0,1}[^>]*content=[""]{0,1}[^"">]*url=([^"">]*)[""]{0,1}[^>]*>/i);
        return Array.isArray(match) ? [match[1]] : undefined;
    },
    (string) => {
        let match = string.match(/<\s*meta[^>]*content=[""]{0,1}[^"">]*url=([^"">]*)[""]{0,1}[^>]*http-equiv=[""]{0,1}refresh[""]{0,1}[^>]*>/i);
        return Array.isArray(match) ? [match[1]] : undefined;
    },
    (string) => {
        let match = string.match(/<\s*meta[^>]*content=[""]{0,1}[^"">]*url=([^"">]*)[""]{0,1}[^>]*http-equiv=[""]{0,1}refresh[""]{0,1}[^>]*>/i);
        return Array.isArray(match) ? [match[1]] : undefined;
    }
];
// 过滤掉静态资源
export const suffixs = [
    "ico",
    "png",
    "jpg",
    "jpeg",
    "gif",
    "ttf",
    "css"
];
// Matching MIME-types will be allowed to fetch further than max depth
export const whitelistedMimeTypes = [
    /^text\/(css|javascript|ecmascript)/i,
    /^application\/javascript/i,
    /^application\/x-font/i,
    /^application\/font/i,
    /^image\//i,
    /^font\//i
];
//# sourceMappingURL=/srv/crawler.v5/packages/analysis/maps/link/constant.js.map