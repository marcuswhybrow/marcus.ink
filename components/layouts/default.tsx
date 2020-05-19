import styled, { createGlobalStyle } from 'styled-components'
import Head from 'next/head'
import Emblem from '@components/Emblem'

const GlobalStyle = createGlobalStyle`
  html {
    overflow-y: scroll;
  }
`

const Root = styled.div`
  max-width: 800px;
  margin: 130px auto 100px;
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;

  @media screen and (max-height: 499px) {
    margin: 80px auto 80px;
  }

  .footnotes {
    font-size: 80%;
    color: #777;
    margin-top: 40px;

    hr {
      display: none;
    }

    ol {
      padding: 0 0 0 20px;
    }
  }
`

export type DefaultProps = React.PropsWithChildren<{
  title?: string
  description?: string
  image?: string
}>

export const Default: React.FC<DefaultProps> = ({
  title,
  description,
  image,
  children,
}: DefaultProps) => (
  <Root>
    <GlobalStyle />
    <Head>
      <title>{title} | Marcus Whybrow</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Head>
    <Emblem />
    {children}
  </Root>
)

export default Default
