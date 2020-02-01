import * as api from "i-want-a-shot";
export interface ArgvInterface extends api.ArgvInterface {
    list: Array<string>;
    config: object | null;
}
export interface RequestInterface extends api.RequestInterface {
    list: Array<string>;
    config: string | null;
}
export declare const builder: {
    config: {
        type: string;
        default: string;
    };
    query: {
        default: any[];
        type: string;
        description: string;
    };
} & {
    lite: {
        type: string;
        default: boolean;
        description: string;
    };
    api: {
        type: string;
        default: boolean;
        description: string;
    };
    edu: {
        type: string;
        default: boolean;
        description: string;
    };
    egp: {
        type: string;
        default: boolean;
        description: string;
    };
    bing: {
        type: string;
        default: boolean;
        description: string;
    };
    ecosia: {
        type: string;
        default: boolean;
        description: string;
    };
    pages: {
        type: string;
        default: number;
    };
    path: {
        type: string;
        default: string;
    };
    'user-agent': {
        type: string;
        default: string;
    };
    resolutions: {
        type: string;
        default: string[];
    };
};
export declare function takeAshot(request: RequestInterface): Promise<void>;
