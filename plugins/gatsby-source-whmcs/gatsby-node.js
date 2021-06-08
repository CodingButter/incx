const { getProducts } = require("./fetchData")

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  const { createNode } = actions

  const createProductNode = async product => {
    const nodeId = createNodeId(`whmcs-product-${product.pid}`)
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
    return await createNode(nodeData)
  }

  const products = await getProducts()

  await Promise.all(products.map(async product => createProductNode(product)))
}
