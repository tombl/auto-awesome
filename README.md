# auto-awesome
[![NPM](https://nodei.co/npm/auto-awesome-list.png?compact=true)](https://nodei.co/npm/auto-awesome-list/)

An automatic awesome list generator

## What is an awesome list?
See sindresorhus' [awesome manifesto](https://github.com/sindresorhus/awesome/blob/master/awesome.md) for what an awesome list is. They are basically curated lists of resources for developers.

## What does auto-awesome do?
This takes a bare bones markdown file and does the heavy lifting for turning it into an awesome list!
It adds 2 new things to the markdown syntax, table of contents tag, and a listing tag, which searches on GitHub for that piece of software and adds a description and link for it. 

### Example
If you want to see an example of this, look at [before.md](https://github.com/tomblcode/auto-awesome/blob/master/example/before.md), and [after.md](https://github.com/tomblcode/auto-awesome/blob/master/example/after.md).

## Usage
This can take quite some time for a large file, as it has to look up each item on the list.

*If you are getting an API rate limit error, your file is too big and/or you are re-running this fast. To authenticate to get a higher rate limit, generate a github token (even with minumum permissions), and set the `github_token` env variable to the token.*

### Syntax
This extends markdown with 2 more tags.
 - `!toc!` inserts a table of contents for all headings under it. *(you can only have one of these)*
 - `!!repo` searches GitHub for `repo` and inserts a link and description of it.
 - `!!user/repo` gets the link and description for the repo at `user/repo` on GitHub and inserts it.
 - `!!repo~name` gets the repo *(in the format seen above)*, and sets the name to `name`. *(by default it takes the repository name from GitHub, which sometimes fails in examples such as `npm/cli`)*

### API
Requiring `auto-awesome-list` after installing it with `npm install auto-awesome-list` returns a very simple function.
#### Usage
The first parameter of the function is a string containing the raw, input markdown. You can get this using fs, or other means.
The second parameter is a callback, that takes one parameter, the processed markdown file.
#### Example
```js
const autoAwesome = require("auto-awesome-list");
const md = // string with plain markdown
autoAwesome(md, data => {
    //...do whatever you want with the data
});
```
### CLI
Install with `npm install -g auto-awesome-list`
#### Usage
Reads input from stdin or the file in the passed parameter.
Outputs to stdout or the file listed in the '-o' argument.
#### Example
```sh
auto-awesome before.md -o after.md
```