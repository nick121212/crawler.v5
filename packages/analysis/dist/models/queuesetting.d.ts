export default interface QueueSettings {
    ignoreWWWDomain?: boolean;
    scanSubdomains?: boolean;
    stripWWWDomain?: boolean;
    host?: string;
    initialProtocol?: string;
    initialPort?: number;
    domainWhiteList?: Array<any>;
    fetchConditions?: Array<any>;
    filterByDomain?: boolean;
    stripQuerystring?: boolean;
    allowQueryParams?: Array<string>;
    urlEncoding?: string;
}
