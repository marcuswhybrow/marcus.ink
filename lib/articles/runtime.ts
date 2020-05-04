/* eslint-disable @typescript-eslint/no-var-requires */
import Article from './Article'
import path from 'path'

const dateStrFromFileName = (fileName: string): string =>
  `20${fileName.slice(0, 2)}-${fileName.slice(2, 4)}-${fileName.slice(4, 6)}`

export const getArticleFromMdx = (relPath: string): Article => {
  const article = require(`@articles/${relPath}`)
  const Body = article.default

  const exports = (keys: string): void => {
    let result = article
    try {
      for (const key of keys.split('.')) result = result[key]
    } catch (err) {
      throw new Error(`Must export "${keys}" in ${relPath}`)
    }
    if (!result) throw new Error(`"${keys}" cannot be undefined in ${relPath}`)
  }

  exports('meta')
  exports('meta.title')
  exports('meta.description')

  const { title, description, created, updated } = article.meta

  const fileName = path.basename(relPath, '.mdx')
  const slug = fileName.replace(/^\d{6}-/, '')

  if (!title) throw new Error(`${relPath} must export meta.title`)
  if (!description) throw new Error(`${relPath} must export a meta.description`)

  const [headTitle, displayTitle] = ((): [string, string] => {
    if (typeof title === 'string') return [title, title]
    return [title.head, title.page]
  })()

  return {
    _filePath: relPath,
    _slug: slug,
    Body,
    title: {
      display: displayTitle,
      head: headTitle,
    },
    description,
    created: Date.parse(created || dateStrFromFileName(fileName)),
    updated: Date.parse(updated),
  }
}
