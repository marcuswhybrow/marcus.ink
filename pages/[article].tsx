/* eslint-disable @typescript-eslint/no-var-requires */
import { GetStaticPaths, GetStaticProps } from 'next'
import { getArticles, getArticleFromSlug } from '@lib/articles/ssr'
import { getArticleFromMdx } from '@lib/articles/runtime'
import DefaultLayout from '@layouts/default'
import styled from 'styled-components'

const HeroImage = styled.img`
  width: 100%;
`

export type ArticleProps = {
  relPath: string
}

export const Article: React.FC<ArticleProps> = ({ relPath }: ArticleProps) => {
  const { Body, title, description, image } = getArticleFromMdx(relPath)
  return (
    <DefaultLayout title={title.head} description={description} image={image}>
      {image && (
        <div>
          <HeroImage src={image} />
        </div>
      )}
      <article>
        {!image && <h1 dangerouslySetInnerHTML={{ __html: title.display }} />}
        <Body />
      </article>
    </DefaultLayout>
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
