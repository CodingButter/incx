const fetch = require("node-fetch")
const queryString = require("query-string")
const { products } = require("./dummyData.js")

exports.getProducts = async city => {
  /**
   * @TODO fetch products from whmcs api
   */
  return products
}
