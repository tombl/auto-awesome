const octokit = require("@octokit/rest")();
const toc = require("markdown-toc");

const punctuation = [".", "!", ",", "?"];
function getEntry(name, callback) {
    if (name === "NOT_FOUND") {
        callback(" - ⚠️ Item not found. Try a direct link to the repo and check your spelling.");
        return;
    }
    octokit.repos.get({ // get the repo's data
        owner: name.split("/")[0],
        repo: name.split("/")[1]
    }, (error, result) => {
        if (error) throw error;
        let description = result.data.description;
        if (!punctuation.includes(description[description.length - 1])) {
            description += "."; // add a "." if it doesn't end in punctuation
        }
        const link = result.data.html_url;
        const linkName = name.split("/")[1];
        callback(` - [${linkName}](${link}) - ${description}`); // return a markdown representation of the data
    });
}

function getRepo(name, callback) {
    if (name.indexOf("/") !== -1) {
        callback(name); // name is already a repo
    } else {
        octokit.search.repos({ // get the repo from github
            q: name,
            order: "desc",
            per_page: 1,
            page: 1
        }, (error, result) => {
            if (error) throw error;
            callback(result.data.items[0] === undefined ? "NOT_FOUND" : result.data.items[0].full_name);
        });
    }
}

function parseMD(md, callback) {
    md = md.split("!!toc"); // Add table of contents
    if (md.length > 2) {
        throw "More than 1 instance of !!toc detected, please remove all but one";
    }
    md = md.join("## Table of Contents\n\n" + toc(md[1]).content);
    md = md.replace(/\r/g, ""); // Strip all \r's from the text
    md = md.split("\n");
    let entriesToParse = 0;
    let parsedEntries = 0;
    md.forEach((item, i) => {
        if (item.startsWith("!!!")) {
            entriesToParse++;
            getRepo(item.slice(3), repo => {
                getEntry(repo, entry => {
                    md[i] = entry;
                    parsedEntries++;
                    if (parsedEntries === entriesToParse) {
                        md = md.join("\n");
                        callback(md);
                    }
                });
            });
        }
    });
}

module.exports = parseMD;
