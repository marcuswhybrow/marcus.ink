import { GetStaticPaths, GetStaticProps } from 'next'
import glob from 'glob'
import fs from 'fs'
import path from 'path'
import Head from 'next/head'
import Link from 'next/link'

export type ArticleProps = {
  mdxFilePath: string
}

export const Article: React.FC<ArticleProps> = ({
  mdxFilePath,
}: ArticleProps) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const document = require(`@articles/${mdxFilePath}`)
  const ArticleBody = document.default

  if (!document.title) throw new Error(`${mdxFilePath} must export a title`)

  if (!document.description)
    throw new Error(`${mdxFilePath} must export a description`)

  const [headTitle, pageTitle] = ((): [string, string] => {
    if (typeof document.title === 'string')
      return [document.title, document.title]
    return [document.title.head, document.title.page]
  })()

  const headDescription = document.description

  return (
    <>
      <Head>
        <title>{headTitle}</title>
        <meta name="description" content={headDescription} />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Link href="/">
        <a>marcus.ink</a>
      </Link>
      <article>
        <h1 dangerouslySetInnerHTML={{ __html: pageTitle }} />
        <ArticleBody />
      </article>
    </>
  )
}

const CACHE = '.cache'
const slugCache = (slug: string): string => path.join(CACHE, slug)

export const getStaticProps: GetStaticProps = async (context) => {
  const mdxFilePath = fs.readFileSync(
    slugCache(context.params.article as string),
    'utf8'
  )
  return { props: { mdxFilePath } as ArticleProps }
}

export const getStaticPaths: GetStaticPaths = async () => {
  fs.mkdirSync(CACHE, { recursive: true })
  return {
    paths: Object.values(
      glob.sync(`./articles/**/*.mdx`).reduce((acc, filePath) => {
        const fileName = path.basename(filePath, '.mdx')
        const slug = fileName.replace(/^\d{6}-/, '')
        if (slug in acc) throw new Error(`Duplicate path: ${slug}`)
        acc[slug] = { params: { article: slug } }
        fs.writeFileSync(slugCache(slug), path.relative('./articles', filePath))
        return acc
      }, {})
    ),
    fallback: false,
  }
}

export default Article
