import Link from 'next/link'
import { getArticles } from '../lib/articles/ssr'
import { GetStaticProps } from 'next'

export type IndexProps = {
  articles: { slug: string; title: string }[]
}

export const Index: React.FC<IndexProps> = ({ articles }: IndexProps) => (
  <>
    <h1>marcus.ink</h1>
    <ul>
      {articles.map(({ slug, title }) => {
        return (
          <li key={slug}>
            <Link href="/[article]" as={`/${slug}`}>
              <a dangerouslySetInnerHTML={{ __html: title }} />
            </Link>
          </li>
        )
      })}
    </ul>
  </>
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
