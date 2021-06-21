require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `Interconnecx`,
    description: `We provide Dedicated Servers and Colocation services`,
    author: `@codingbutter`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: `gatsby-source-whmcs`,
      options: {
        location: process.env.LOCATION,
        whmcspath: process.env.WHMCS_URL,
        username: process.env.WHMCS_USERNAME,
        password: process.env.WHMCS_PASSWORD,
        accesskey: process.env.WHMCS_ACCESS_KEY,
      },
    },
  ],
}
