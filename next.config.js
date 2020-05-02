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
    const setAlias = (str) =>
      (config.resolve.alias[`@${str}`] = path.resolve(__dirname, str))
    
    setAlias('articles')
    setAlias('components')
    setAlias('pages')
    
    return config
  }
})