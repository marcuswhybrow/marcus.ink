import Link from 'next/link'
import styled from 'styled-components'

const ArticleRoot = styled.article`
  width: 700px;
  max-width: 700px;
  margin: 0 auto;
  font-family: Arial, Helvetica, sans-serif;

  line-height: 1.8em;
  color: rgba(0, 0, 0, 0.8);
  font-size: 100%;

  @media screen and (max-width: 700px), screen and (max-height: 499px) {
    width: 100%;
    font-size: 100%;
    line-height: 1.4em;
  }
`

const ArticleLink = styled.a`
  display: block;
  cursor: pointer;

  text-decoration: none;
  color: rgba(0, 0, 0, 0.5);

  &:hover {
    h1,
    h2 {
      color: limegreen;
    }
  }

  img {
    display: block;
    width: 95%;
    margin: 30px auto;
  }

  h1,
  h2 {
    margin: 30px 100px 30px;
    text-align: center;
    color: rgba(0, 0, 0, 0.5);
    font-size: 250%;
    font-weight: 100;
    line-height: 1.6em;

    transition: all 0.2s ease-in-out;
  }

  @media screen and (max-width: 700px), screen and (max-height: 499px) {
    img {
      margin: 0px auto;
    }
    h1,
    h2 {
      margin: 20px 15px 20px;
      font-size: 150%;
      line-height: 1.3em;
      text-align: left;
    }
  }
`
const ArticleBody = styled.div`
  margin: 0 80px;

  p {
    text-indent: 2em;
    margin: 0;
  }

  a {
    text-decoration: none;
    color: rgba(0, 0, 0, 0.8);
    border-bottom: 1px dashed rgba(0, 0, 0, 0.3);

    &:hover {
      color: rgba(0, 0, 0, 1);
      border-bottom: 1px dashed rgba(0, 0, 0, 0.2);
    }
  }

  .poetry {
    margin: 1.6em;
    /* line-height: 1.4em; */
    font-size: 100%;
    p {
      text-indent: 0;
      margin-bottom: 1.6em;
    }
  }

  .footnotes {
    font-size: 80%;
    color: #777;
    margin-top: 40px;
    line-height: 1.5em;

    hr {
      display: none;
    }

    ol {
      padding: 0 0 0 20px;
    }
  }

  @media screen and (max-width: 700px), screen and (max-height: 499px) {
    margin: 0px auto;
    max-width: 520px;

    p {
      font-size: 80%;
      line-height: 1.4em;
      text-indent: 0;
      margin: 0 15px 12px 15px;
    }
  }
`

export type ArticleProps = {
  slug: string
  title: string
  image: string | null
  Body: React.ComponentType | string
  withH2?: boolean
}

export const Article: React.SFC<ArticleProps> = ({
  slug,
  title,
  image,
  Body,
  withH2,
  ...props
}: ArticleProps) => (
  <ArticleRoot {...props}>
    <Link href="/[article]" as={`/${slug}`}>
      <ArticleLink>
        {!!image ? (
          <img src={image} />
        ) : !!withH2 ? (
          <h2 dangerouslySetInnerHTML={{ __html: title }} />
        ) : (
          <h1 dangerouslySetInnerHTML={{ __html: title }} />
        )}
      </ArticleLink>
    </Link>
    {typeof Body === 'string' ? (
      <ArticleBody dangerouslySetInnerHTML={{ __html: Body }} />
    ) : (
      <ArticleBody>
        <Body />
      </ArticleBody>
    )}
  </ArticleRoot>
)

export default Article
