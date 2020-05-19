/* eslint-disable @typescript-eslint/no-var-requires */
import { GetStaticPaths, GetStaticProps } from 'next'
import { getArticles, getArticleFromSlug } from '@lib/articles/ssr'
import { getArticleFromMdx } from '@lib/articles/runtime'
import DefaultLayout from '@layouts/default'
import styled from 'styled-components'

const HeroImage = styled.img`
  width: 100%;
`

const ArticleRoot = styled.article`
  line-height: 1.5em;
  color: rgba(0, 0, 0, 0.8);
  font-size: 110%;
  margin: 0 20px;
`

const Title = styled.h1`
  text-align: center;
  color: rgba(0, 0, 0, 0.5);
  font-size: 250%;
  font-weight: normal;
  line-height: 1.5em;
  margin: 0 40px;
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
      <ArticleRoot>
        {!image && (
          <Title dangerouslySetInnerHTML={{ __html: title.display }} />
        )}
        <Body />
      </ArticleRoot>
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
