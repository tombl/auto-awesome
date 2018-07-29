const autoAwesome = require("auto-awesome");
const argv = require('minimist')(process.argv.slice(2));

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