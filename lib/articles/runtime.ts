/* eslint-disable @typescript-eslint/no-var-requires */
import Article from './Article'
import path from 'path'

const dateStrFromFileName = (fileName: string): string =>
  `20${fileName.slice(0, 2)}-${fileName.slice(2, 4)}-${fileName.slice(4, 6)}`

export const getArticleFromMdx = (relPath: string): Article => {
  const {
    default: Body,
    meta: { title, description, created, updated },
  } = require(`@articles/${relPath}`)

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
