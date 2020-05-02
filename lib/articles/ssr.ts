/* eslint-disable @typescript-eslint/no-var-requires */
import glob from 'glob'
import path from 'path'
import { getArticleFromMdx } from './runtime'
import Article from './Article'

export const getArticleFromSlug = (slug: string): Article => {
  const filePath = glob.sync(`./articles/**/*${slug}.mdx`)[0]
  return getArticleFromMdx(path.relative('./articles', filePath))
}

export const getArticles = (): Article[] =>
  Object.values(
    glob.sync(`./articles/**/*.mdx`).reduce((acc, filePath) => {
      const relPath = path.relative('./articles', filePath)
      const article = getArticleFromMdx(relPath)

      if (article._slug in acc)
        throw new Error(`Duplicate slug: ${article._slug}`)

      acc[article._slug] = article
      return acc
    }, {} as Record<string, Article>)
  ).sort((a, b) => b.created - a.created) // Newer first
