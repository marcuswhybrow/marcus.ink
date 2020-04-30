import Head from 'next/head'

export default (frontMatter): React.FC => {
  type DefaultArticleLayoutProps = {
    children: JSX.Element
  }

  const DefaultArticleLayout: React.FC<DefaultArticleLayoutProps> = ({
    children,
  }: DefaultArticleLayoutProps) => (
    <article>
      <Head>
        <title>{frontMatter.title}</title>
      </Head>
      {children}
      <p style={{ color: 'red' }}>This text is added by the template</p>
    </article>
  )

  return DefaultArticleLayout
}
