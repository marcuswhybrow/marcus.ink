/* eslint-disable */
const path = require('path')

module.exports = require('@next/mdx')({
  options: {
    remarkPlugins: [
      require('remark-footnotes'),
      require('remark-external-links'),
      require('remark-containers'),
    ]
  }
})({
  // Next.js config
  webpack: (config) => {
    const setAlias = (str, target) =>
      (config.resolve.alias[`@${str}`] = path.resolve(__dirname, target || str))
    
    setAlias('articles')
    setAlias('components')
    setAlias('pages')
    setAlias('lib')
    setAlias('layouts', 'components/layouts')
    
    return config
  }
})