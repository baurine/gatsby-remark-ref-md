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
