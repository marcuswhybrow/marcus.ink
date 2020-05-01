import { MDXProvider } from '@mdx-js/react'
import { AppProps } from 'next/app'

const mdComponents = {}

export const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => (
  <MDXProvider components={mdComponents}>
    <Component {...pageProps} />
  </MDXProvider>
)

export default App
