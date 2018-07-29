# auto-awesome
An automatic awesome list generator

## What is an awesome list?
See sindresorhus' [awesome manifesto](https://github.com/sindresorhus/awesome/blob/master/awesome.md) for what an awesome list is. They are basically curated lists of resources for developers.

## What does auto-awesome do?
This takes a bare bones markdown file and does the heavy lifting for turning it into an awesome list!
It adds 2 new things to the markdown syntax, a `!!toc` tag to insert a table of contents, powered by [markdown-toc](https://github.com/jonschlinkert/markdown-toc), and a `!!!whatever` tag, which searches on github for that piece of software and adds a description and link for it. It may not be perfect at searching, so you can also specify a repository with `!!!user/repo`. 
You may need to do a few minor tweaks at the end as this isn't perfect, such as the fact that in the example, `npm` is called `cli` as that is what the repo is called.

### Example
If you want to see an example of this, look at [before.md](https://github.com/tomblcode/auto-awesome/blob/master/example/before.md.txt), and [after.md](https://github.com/tomblcode/auto-awesome/blob/master/example/after.md).

## Usage
This can take quite some time for a large file, as it has to look up each item on the list.
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