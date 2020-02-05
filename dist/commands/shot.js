"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api = require("./../lib/Helper");
const path = require("path");
exports.command = 'shot';
exports.desc = 'take a qwant shot list !';
exports.builder = api.builder;
exports.handler = async function (argv) {
    const request = {
        config: path.isAbsolute(argv.config) ? argv.config : path.normalize(path.join(process.cwd(), argv.config)),
        'concurrency-jpg': argv['concurrency-jpg'],
        'concurrency-api': argv['concurrency-api'],
        query: argv.query,
        api: argv.api,
        lite: argv.lite,
        edu: argv.edu,
        egp: argv.egp,
        ecosia: argv.ecosia,
        bing: argv.bing,
        lilo: argv.lilo,
        pages: argv.pages,
        userAgent: argv.userAgent,
        resolutions: argv.resolutions,
        list: argv.list,
        basePath: path.isAbsolute(argv.path) ? argv.path : path.normalize(path.join(process.cwd(), argv.path)),
    };
    await api.takeAshot(request);
};
//# sourceMappingURL=shot.js.map