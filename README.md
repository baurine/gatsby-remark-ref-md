# gatsby-remark-ref-md

A gatsby plugin to handle the link which refers to another markdown file in one markdown file.

## How it works

For example we have 2 markdown files, `a.md` and `b.md`, we refer the `b.md` in the `a.md`.

```md
// a.md

[b markdown file](./b.md)
```

The generated the html likes this:

```html
<a href="/b.md">b markdown file</a>
```

When we click the link, it will open the raw b.md content or just get 404, but in fact we expect to open the generated b.html.

So that why I write the plugin to help us automatically convert the link, after using this plugin, the generated html will like this:

```html
<a href="/b">b markdown file</a>
```

## How to use

I don't publish it to npm yet, so you need to copy or clone the whole project to your gatsby project's plugins folder.

    mkdir -p plugins
    cd plugins
    git clone git@github.com:baurine/gatsby-remark-ref-md.git

It is used with gatsby-transformer-remark / gatsby-remark-copy-linked-files / gatsby-remark-images together.

Config the gatsby-config.js.

```js
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-copy-linked-files`,
            options: {
              ignoreFileExtensions: ["md", "png", "jpg", "jpeg", "bmp", "tiff"],
            },
          },
          {
            // it will handle png/jpg/jpeg/bmp/tiff
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 600,
            },
          },
          `gatsby-remark-ref-md`,
          ...
        ],
      },
    },
```

## Principle

All code, easy to understand:

```js
const visit = require("unist-util-visit")

module.exports = ({ markdownAST }, pluginOptions = {}) => {
  visit(markdownAST, "link", node => {
    // console.log(node.url)
    if (node.url.startsWith("http")) {
      return
    }
    const ext = node.url.split(`.`).pop()
    if (ext === "md") {
      node.url = node.url.replace(/\.md$/, "")
    } else if (ext.startsWith("md#")) {
      node.url = node.url.replace(/\.md#/, "#")
    } else {
      return
    }
    // console.log(node.url)
  })
}
```

ref: [Remark Plugin Tutorial](https://www.gatsbyjs.org/docs/remark-plugin-tutorial/)
