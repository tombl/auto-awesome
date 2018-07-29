#!/usr/bin/env node
const autoAwesome = require("./index.js");
let argv1;
if (require("path").basename(process.argv[0], ".exe") === "node") {
    argv1 = process.argv.slice(2);
} else {
    argv1 = process.argv.slice(1);
}
const argv = require('minimist')(argv1);

if (argv.h || (argv._ == {} && process.stdin.isTTY)) {
    console.log("Creates an awesome list from a markdown file");
    console.log("Reads input from stdin or the file in the passed parameter");
    console.log("Outputs to stdout or the file listed in the '-o' argument");
}

function out(data) {
    if (argv.o) {
        require("fs").writeFileSync(argv.o, data);
    } else {
        console.log(data);
    }
}

if (process.stdin.isTTY) {
    autoAwesome(require("fs").readFileSync(argv._[0], "utf8"), out);
} else {
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (data) => {
        autoAwesome(data, out);
    });
}