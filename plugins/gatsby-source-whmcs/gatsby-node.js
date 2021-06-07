const { getProducts } = require("./fetchData")

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  const { createNode } = actions
  delete configOptions.plugins
  const createProductNode = product => {
    const nodeId = createNodeId(`whmcs-product-${product.id}`)
    const nodeContent = JSON.stringify(product)
    const nodeData = Object.assign({}, product, {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: "WHMCSProduct",
        content: nodeContent,
        contentDigest: createContentDigest(product),
      },
    })
    return nodeData
  }
  console.log(getProducts())
}
