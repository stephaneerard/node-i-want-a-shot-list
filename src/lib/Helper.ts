import * as path from "path"
import * as api from "i-want-a-shot"
import * as fs from "fs-extra"

export interface ArgvInterface extends api.ArgvInterface {
    list: Array<string>
    config: object | null
}

export interface RequestInterface extends api.RequestInterface {
    list: Array<string>
    config: string | null
}

export const builder = Object.assign({
    config: {
        type: 'string',
        default: path.join(process.cwd(), 'config.json')
    },
    query: {
        default: [],
        type: 'array',
        description: 'Take a Shot List !'
    }
}, api.builder);

export async function takeAshot(request: RequestInterface): Promise<void> {

    if (request.query.length > 0) {

        const config: RequestInterface = await (async () => {
            if (request.config) {
                const json = JSON.parse((await fs.readFile(request.config)).toString());
                return json;
            }
            return false;
        })();


        const promises = [];
        for (var i = 0, j = request.query.length; i < j; i++) {
            const query = request.query[i];
            promises.push(
                api
                    .takeAshot({
                        api: config ? config.api : request.api,
                        bing: config ? config.bing : request.bing,
                        ecosia: config ? config.ecosia : request.ecosia,
                        edu: config ? config.edu : request.edu,
                        egp: config ? config.egp : request.egp,
                        lilo: config ? config.lilo : request.lilo,
                        lite: config ? config.lite : request.lite,
                        pages: config ? config.pages : request.pages,
                        query: config ? config.query : query,
                        resolutions: config ? config.resolutions : request.resolutions,
                        userAgent: config ? config.userAgent : request.userAgent,
                        basePath: config ? config.userAgent : request.basePath,
                    }))
        }
        await Promise.all(promises)
    }
}
