import * as api from "i-want-a-shot"

export interface ArgvInterface extends api.ArgvInterface {
    list: Array<string>
}

export interface RequestInterface extends api.RequestInterface {
    list: Array<string>
}

export const builder = Object.assign({
    query: {
        default: [],
        type: 'array',
        description: 'Take a Shot List !'
    }
}, api.builder);

export async function takeAshot(request: RequestInterface): Promise<void> {

    if (request.query.length > 0) {
        const promises = [];
        for (var i = 0, j = request.query.length; i < j; i++) {
            const query = request.query[i];
            promises.push(
                api
                    .takeAshot({
                        api: request.api,
                        bing: request.bing,
                        ecosia: request.ecosia,
                        edu: request.edu,
                        egp: request.egp,
                        lilo: request.lilo,
                        lite: request.lite,
                        pages: request.pages,
                        query: query,
                        resolutions: request.resolutions,
                        userAgent: request.userAgent,
                        basePath: request.basePath,
                    }))
        }
        await Promise.all(promises)
    }
}
