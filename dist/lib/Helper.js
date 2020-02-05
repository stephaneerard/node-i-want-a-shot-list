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
    if (0 == request.query.length && !request.config) {
        console.log('Nothing to do here.');
        return;
    }
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
                    if (config instanceof Promise) {
                        const promisedConfig = await config;
                        return promisedConfig;
                    }
                    return config;
                }
                else {
                    console.log('"%s" module does not provide a .config object or ():Promise<object>');
                    process.exit(1);
                }
            }
        }
        return false;
    })();
    if (0 === request.query.length && config.query)
        request.query = config.query;
    api.configure({ concurrency_api: request['concurrency-api'], concurrency_jpg: request['concurrency-jpg'] });
    const promises = (() => {
        const _p = [];
        for (let i = 0, j = request.query.length; i < j; i++) {
            const query = request.query[i];
            if (!query)
                continue;
            const payload = {
                api: config && config.api ? config.api : request.api,
                bing: config && config.bing ? config.bing : request.bing,
                ecosia: config && config.ecosia ? config.ecosia : request.ecosia,
                'concurrency-api': config && config['concurrency-api'] ? config['concurrency-api'] : request['concurrency-api'],
                'concurrency-jpg': config && config['concurrency-jpg'] ? config['concurrency-jpg'] : request['concurrency-jpg'],
                edu: config && config.edu ? config.edu : request.edu,
                egp: config && config.egp ? config.egp : request.egp,
                lilo: config && config.lilo ? config.lilo : request.lilo,
                lite: config && config.lite ? config.lite : request.lite,
                pages: config && config.pages ? config.pages : request.pages,
                query: query,
                resolutions: config && config.resolutions ? config.resolutions : request.resolutions,
                userAgent: config && config.userAgent ? config.userAgent : request.userAgent,
                basePath: config && config.userAgent ? config.userAgent : request.basePath,
                'delay-ms': config && config['delay-ms'] ? config['delay-ms'] : request['delay-ms'],
            };
            _p.push(api.takeAshot(payload));
        }
        return _p;
    })();
    await Promise.all(promises);
}
exports.takeAshot = takeAshot;
//# sourceMappingURL=Helper.js.map