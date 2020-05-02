import styled from 'styled-components'
import Head from 'next/head'

const Root = styled.div`
  max-width: 800px;
  margin: 100px auto;
  font-family: Arial, Helvetica, sans-serif;

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
}>

export const Default: React.FC<DefaultProps> = ({
  title,
  description,
  children,
}: DefaultProps) => (
  <Root>
    <Head>
      <title>{title} | Marcus Whybrow</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    {children}
  </Root>
)

export default Default
