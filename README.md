# auto-awesome
An automatic awesome list generator

## What is an awesome list?
See sindresorhus' [awesome manifesto](https://github.com/sindresorhus/awesome/blob/master/awesome.md) for what an awesome list is. They are basically curated lists of resources for developers.

## What does auto-awesome do?
This takes a bare bones markdown file and does the heavy lifting for turning it into an awesome list!
It adds 2 new things to the markdown syntax, a `!!toc` tag to insert a table of contents, powered by [markdown-toc](https://github.com/jonschlinkert/markdown-toc), and a `!!!whatever` tag, which searches on github for that piece of software and adds a description and link for it. It may not be perfect at searching, so you can also specify a repository with `!!!user/repo`. 

### Example
If you want to see an example of this, look at [before.md](https://github.com/tomblcode/auto-awesome/blob/master/example/before.md.txt), and [after.md](https://github.com/tomblcode/auto-awesome/blob/master/example/after.md).

## Usage
### Api
You can require `auto-awesome-list` on npm.
It returns a function that takes 2 arguments, data, and a callback.
#### Example
```js
const autoAwesome = require("auto-awesome-list");
const md = // string with plain markdown
autoAwesome(md, data => {
    //...do whatever you want with the data
});
```
