import styled, { createGlobalStyle } from 'styled-components'
import Head from 'next/head'
import Emblem from '@components/Emblem'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
  html {
    overflow-y: scroll;
  }
`

const Root = styled.div`
  margin: 130px auto 100px;
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;

  line-height: 1.6em;
  color: rgba(0, 0, 0, 0.8);
  font-size: 110%;

  @media screen and (max-width: 700px), screen and (max-height: 499px) {
    margin: 60px auto 80px;
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
      <title>{!!title ? `${title} | Marcus Whybrow` : `Marcus Whybrow`} </title>
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
