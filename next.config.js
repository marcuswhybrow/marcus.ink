/* eslint-disable */

const withMdxEnhanced = require('next-mdx-enhanced')
const images = require('remark-images')
const emoji = require('remark-emoji')

module.exports = withMdxEnhanced({
  layoutPath: 'src/layouts/markdown',
  defaultLayout: true,
  fileExtensions: ['mdx'],
  remarkPlugins: [images, emoji]
})(/* your normal nextjs config */)
