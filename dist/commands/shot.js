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
        basePath: argv.path,
    };
    console.log('request', request);
    await api.takeAshot(request);
};
//# sourceMappingURL=shot.js.map