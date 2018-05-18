export interface IQueueItem extends uri.URIOptions {
    depth?: number;
    url?: string;
    _id?: string;
    stateData?: any;
    responseBody?: string;
}
