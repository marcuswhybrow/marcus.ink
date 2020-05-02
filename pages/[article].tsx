/* eslint-disable @typescript-eslint/no-var-requires */
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { getArticles, getArticleFromSlug } from '../lib/articles/ssr'
import { getArticleFromMdx } from '../lib/articles/runtime'

export type ArticleProps = {
  relPath: string
}

export const Article: React.FC<ArticleProps> = ({ relPath }: ArticleProps) => {
  const { Body, title, description } = getArticleFromMdx(relPath)
  return (
    <>
      <Head>
        <title>{title.head} | Marcus Whybrow</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Link href="/">
        <a>marcus.ink</a>
      </Link>
      <article>
        <h1 dangerouslySetInnerHTML={{ __html: title.display }} />
        <Body />
      </article>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => ({
  props: {
    relPath: getArticleFromSlug(context.params.article as string)._filePath,
  },
})

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: Object.values(getArticles()).map(({ _slug }) => ({
      params: { article: _slug },
    })),
    fallback: false,
  }
}

export default Article
