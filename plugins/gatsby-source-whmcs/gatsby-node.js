const fetch = require("node-fetch")
const querystring = require("querystring")
//const whmcs = require("node-whmcs")
exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  const { createNode } = actions
  const { whmcspath, username, password, accesskey, location } = configOptions
  console.log(configOptions)

  const getProducts = async () => {
    const params = querystring.stringify({
      username,
      password,
      accesskey,
      action: "GetProducts",
      responsetype: "json",
    })

    let results = await fetch(`${whmcspath}/includes/api.php?${params}`)
    let json = await results.json()
    return json.products.product
  }

  const createProductNode = async product => {
    const productNameSplit = product.name
      .replace(" ", "")
      .toLowerCase()
      .trim()
      .split("-")
    product.city = productNameSplit[0]
    product.producttype = productNameSplit[1]
    if (product.city == location) {
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
  }

  const products = await getProducts()

  await Promise.all(products.map(async product => createProductNode(product)))
}
/*
exports.onCreateNode = async ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  console.log(node)
  if (node.internal.type === `WHMCSProduct`) {
    console.log(node)
    const city = node.internal.name.split("-")[0].trim().toLowerCase()

    await createNodeField({
      node,
      name: `city`,
      value: city,
    })
  }
}
*/
