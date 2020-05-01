/* eslint-disable */
const path = require('path')

module.exports = require('@next/mdx')({
  options: {
    remarkPlugins: [
      require('remark-images'),
      require('remark-emoji'),
      require('remark-footnotes'),
      require('remark-external-links'),
    ]
  }
})({
  // Next.js config
  webpack: (config) => {
    const makeAlias = (str) =>
      (config.resolve.alias[`@${str}`] = path.resolve(__dirname, str))
    
    makeAlias('articles')
    makeAlias('components')
    makeAlias('pages')
    
    return config
  }
})