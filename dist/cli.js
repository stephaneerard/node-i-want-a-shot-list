#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargs = require("yargs");
const path = require("path");
yargs
    .commandDir(path.join(__dirname, './commands'), { recurse: true })
    .help()
    .version()
    .demandCommand(1)
    .argv;
//# sourceMappingURL=cli.js.map