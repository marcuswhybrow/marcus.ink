/* eslint-disable */
const glob = require('glob')
const path = require('path')

const withMdxEnhanced = require('next-mdx-enhanced')

module.exports = withMdxEnhanced({
  layoutPath: 'src/layouts/markdown',
  defaultLayout: true,
  fileExtensions: ['mdx'],
  remarkPlugins: [
    require('remark-images'),
    require('remark-emoji'),
    require('remark-footnotes'),
    require('remark-external-links')
  ],
})({
  exportPathMap: async (defaultPathMap) => {
    const pathMap = {
      ...defaultPathMap
    }

    // Maps article slugs to the site root
    glob
      .sync('./src/pages/articles/**/*.mdx')
      .forEach((file) => {
        const relPath = path.relative('./src/pages', file)
        const oldUri = `/${relPath.slice(0, -4)}`
        const basename = path.basename(file, '.mdx')
        const slug = basename.replace(/^\d{6}-/, '')
        const newUri = `/${slug}`

        // Do not override existing routes
        // `next dev` requires glob file search as defaultPathMap will be empty
        if (newUri in pathMap || glob.sync(`./src/pages/${slug}.*`).length > 0)
          throw new Error(`Duplicate path: ${newUri}`)
        
        delete pathMap[oldUri]
        pathMap[newUri] = { page: oldUri }
      })

    return pathMap
  },
})
