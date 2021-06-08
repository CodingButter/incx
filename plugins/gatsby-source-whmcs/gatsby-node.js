const { getProducts } = require("./fetchData")

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  const { createNode } = actions

  const createProductNode = async product => {
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
    await createNode(nodeData)
    return
  }

  const products = await getProducts()
  
  await Promise.all(
    products.map(async product => await createProductNode(product))
  )
}
