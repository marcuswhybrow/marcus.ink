import React, { useState } from 'react'
import Head from 'next/head'
import Book from '@components/Book'
import styled from 'styled-components'
import { bookData } from '@lib/books'

const Root = styled.div`
  margin: 100px;
  @media only screen and (max-width: 1200px) {
    margin: 50px;
  }
  @media only screen and (max-width: 700px) {
    margin: 20px;
  }
`
const BooksRoot = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  @media only screen and (max-width: 700px) {
    justify-content: center;
    margin: 0 20px;
  }
`
const TextField = styled.input`
  box-sizing: border-box;
  width: 100%;
  margin: 20px 0 40px;
  padding: 10px 20px;
  font-size: 400%;
  border: none;
  background-color: rgb(254, 100, 50);

  color: white;
  &::placeholder {
    color: white;
  }

  @media only screen and (max-width: 700px) {
    font-size: 200%;
  }
`
const FlexTail = styled.div`
  flex-grow: 99999;
  @media only screen and (max-width: 700px) {
    flex-grow: 0;
  }
`

const Books: React.FC = () => {
  const [filterText, setFilterText] = useState('')
  const lowerCaseFilterText = filterText.toLowerCase()

  return (
    <Root>
      <Head>
        <title>Reading List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TextField
        placeholder="search books?"
        value={filterText}
        onChange={(e): void => setFilterText(e.target.value)}
      />

      <BooksRoot>
        {bookData.map((book) => {
          for (const attr of [book.title, book.subtitle, book.author]) {
            if (attr && attr.toLowerCase().indexOf(lowerCaseFilterText) > -1)
              return <Book key={book.title} {...book} />
          }
        })}
        <FlexTail />
      </BooksRoot>
    </Root>
  )
}

export default Books
