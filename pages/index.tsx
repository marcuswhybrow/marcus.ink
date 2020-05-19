import Link from 'next/link'
import { getArticles } from '@lib/articles/ssr'
import { GetStaticProps } from 'next'
import styled from 'styled-components'
import DefaultLayout from '@layouts/default'

const Articles = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 100%;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.5;
  text-align: center;

  li {
    margin-bottom: 12px;
    position: relative;
  }

  a {
    text-decoration: none;
    /* font-weight: bolder; */
    text-transform: lowercase;
    color: rgba(0, 0, 0, 0.5);
  }
  a:hover {
    color: limegreen;
  }
`

const HeroImage = styled.a`
  display: block;
  margin: 0 auto 20px;
  width: 75%;
  cursor: pointer;
  img {
    width: 100%;
  }
`

const LatestArticle = styled.li`
  a {
    font-size: 100%;
    font-weight: bold;
    text-transform: lowercase;
    letter-spacing: 1px;
  }
`

export type IndexProps = {
  latestArticle: { slug: string; title: string; image: string }
  articles: { slug: string; title: string }[]
}

export const Index: React.FC<IndexProps> = ({
  latestArticle,
  articles,
}: IndexProps) => (
  <DefaultLayout title="Articles" description="Articles by Marcus Whybrow">
    <Link href="/[article]" as={`/${latestArticle.slug}`}>
      <HeroImage>
        <img src={latestArticle.image} />
      </HeroImage>
    </Link>

    <Articles>
      <LatestArticle>
        <Link href="/[article]" as={`/${latestArticle.slug}`}>
          <a dangerouslySetInnerHTML={{ __html: latestArticle.title }} />
        </Link>
      </LatestArticle>
      {articles.map(({ slug, title }) => (
        <li key={slug}>
          <Link href="/[article]" as={`/${slug}`}>
            <a dangerouslySetInnerHTML={{ __html: title }} />
          </Link>
        </li>
      ))}
    </Articles>
  </DefaultLayout>
)

export const getStaticProps: GetStaticProps = async () => {
  const [latestArticle, ...articles] = getArticles()
  return {
    props: {
      latestArticle: {
        title: latestArticle.title.display,
        slug: latestArticle._slug,
        image: latestArticle.image,
      },
      articles: articles.map(({ _slug, title }) => ({
        slug: _slug,
        title: title.display,
      })),
    },
  }
}

export default Index
