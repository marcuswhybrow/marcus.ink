import Head from 'next/head'
import path from 'path'

export type FrontMatter = Partial<{
  __resourcePath: string
  title:
    | string
    | {
        head: string
        page: string
      }
  description: string
}>

export default (frontMatter: FrontMatter): React.FC => {
  type DefaultArticleLayoutProps = {
    children: JSX.Element
  }

  const DefaultArticleLayout: React.FC<DefaultArticleLayoutProps> = ({
    children,
  }: DefaultArticleLayoutProps) => {
    const relPath = path.relative(
      './src/pages',
      `/${frontMatter.__resourcePath}`
    )

    if (!frontMatter.title)
      throw new Error(`The frontmatter in ${relPath} must define a "title"`)

    if (!frontMatter.description)
      throw new Error(
        `The frontmatter in ${relPath} must define a "description"`
      )

    const [headTitle, pageTitle] = ((): [string, string] => {
      if (typeof frontMatter.title === 'string')
        return [frontMatter.title, frontMatter.title]
      return [frontMatter.title.head, frontMatter.title.page]
    })()
    const headDescription = frontMatter.description

    return (
      <>
        <Head>
          <title>{headTitle}</title>
          <meta name="description" content={headDescription} />
          <meta name="robots" content="index, follow" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <p>
          &larr; <a href="/">marcus.ink</a>
        </p>
        <article>
          <h1 dangerouslySetInnerHTML={{ __html: pageTitle }} />
          {children}
        </article>
      </>
    )
  }

  return DefaultArticleLayout
}
