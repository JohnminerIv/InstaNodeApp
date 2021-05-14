#!/usr/bin/env node
const fse = require('fs-extra');
const path = require('path')

const srcDir = `${__dirname}/template`;


fse.copySync(srcDir, path.resolve('.'), { overwrite: true }, function (err) {
    if (err) {
        console.error(err);
    } else {
        console.log("success!");
    }
});

