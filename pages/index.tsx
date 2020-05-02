import Link from 'next/link'
import { getArticles } from '@lib/articles/ssr'
import { GetStaticProps } from 'next'
import styled from 'styled-components'
import DefaultLayout from '@layouts/default'

const Name = styled.h1`
  font-family: 'Courier New', Courier, monospace;
  font-weight: normal;
  margin-top: 100px;
`

const Articles = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 100%;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.5;

  li {
    margin-bottom: 10px;
    position: relative;
  }

  a {
    text-decoration: none;
    color: #111;
  }
  a:hover {
    color: limegreen;
  }
`

export type IndexProps = {
  articles: { slug: string; title: string; created: number }[]
}

export const Index: React.FC<IndexProps> = ({ articles }: IndexProps) => (
  <DefaultLayout title="Articles" description="Articles by Marcus Whybrow">
    <Name>Articles</Name>
    <Articles>
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
  return {
    props: {
      articles: getArticles().map(({ _slug, title }) => ({
        slug: _slug,
        title: title.display,
      })),
    },
  }
}

export default Index
