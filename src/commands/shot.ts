import * as api from "./../lib/Helper"
import * as path from "path"

exports.command = 'shot'
exports.desc = 'take a qwant shot list !'
exports.builder = api.builder;
exports.handler = async function (argv: api.ArgvInterface) {

    const request: api.RequestInterface = {
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
