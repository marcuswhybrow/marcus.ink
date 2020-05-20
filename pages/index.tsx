import { getArticles } from '@lib/articles/ssr'
import { GetStaticProps } from 'next'
import DefaultLayout from '@layouts/default'
import ReactDOMServer from 'react-dom/server'
import { Article, ArticleProps } from '@components/Article'

export type IndexProps = {
  articles: ArticleProps[]
}

export const Index: React.FC<IndexProps> = ({ articles }: IndexProps) => {
  return (
    <DefaultLayout description="Articles by Marcus Whybrow">
      {articles.map((article) => (
        <Article {...article} key={article.slug} withH2 />
      ))}
    </DefaultLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      articles: getArticles().map(
        ({ _slug, title, image, Body }) =>
          ({
            slug: _slug,
            title: title.display,
            image: image || null,
            Body: ReactDOMServer.renderToString(<Body />),
          } as ArticleProps)
      ),
    },
  }
}

export default Index
