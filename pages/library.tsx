import DefaultLayout from '@layouts/default'
import kindleData from '@data/kindle.json'
import { GetStaticProps } from 'next'
import styled from 'styled-components'

const Books = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const Book = styled.div`
  height: 100px;
  min-width: 50px;
  img {
    height: 100px;
  }
`

export type Book = {
  img: string
  title: string
  url: string
}

export type LibraryProps = {
  kindleBooks: Book[]
}

export const Library: React.FC<LibraryProps> = ({
  kindleBooks,
}: LibraryProps) => {
  return (
    <DefaultLayout>
      <h1>Kindle</h1>
      <Books>
        {kindleBooks.map(({ img, title, url }) => (
          <Book key={url}>
            <a
              href={url}
              title={title}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={img} />
            </a>
          </Book>
        ))}
      </Books>
    </DefaultLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      kindleBooks: kindleData.map(({ ASIN, Title }) => ({
        img: `https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=${ASIN}&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=SL250`,
        url: `https://smile.amazon.co.uk/dp/${ASIN}`,
        title: Title,
      })),
    },
  }
}

export default Library
