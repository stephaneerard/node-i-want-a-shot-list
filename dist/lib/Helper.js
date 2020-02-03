"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const api = require("i-want-a-shot");
const fs = require("fs-extra");
exports.builder = Object.assign({
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
async function takeAshot(request) {
    if (request.query.length > 0 || request.config) {
        const config = await (async () => {
            if (request.config) {
                if ('.json' === path.extname(request.config)) {
                    console.log('loading from json %s', request.config);
                    return JSON.parse((await fs.readFile(request.config)).toString());
                }
                else if ('.js' === path.extname(request.config)) {
                    console.log('loading from js %s', request.config);
                    const loadedModule = require(request.config);
                    if (loadedModule.config && 'function' === typeof loadedModule.config) {
                        const config = await require(request.config).config();
                        console.log(config);
                        if (config instanceof Promise) {
                            return await config;
                        }
                        return config;
                    }
                }
            }
            return false;
        })();
        const promises = (() => {
            const _p = [];
            for (let i = 0, j = request.query.length; i < j; i++) {
                const query = request.query[i];
                const payload = {
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
                };
                console.log(JSON.stringify(payload, null, 4));
                _p.push(api.takeAshot(payload));
            }
            return _p;
        })();
        await Promise.all(promises);
    }
}
exports.takeAshot = takeAshot;
//# sourceMappingURL=Helper.js.map