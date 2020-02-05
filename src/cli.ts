#!/usr/bin/env node

import * as yargs from 'yargs';
import * as path from 'path';

yargs
    .commandDir(path.join(__dirname, './commands'), {recurse: true})
    .help()
    .version()
    .demandCommand(1)
    .argv;
