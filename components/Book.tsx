import React from 'react'
import { Book as BookType } from '@lib/books'
import styled from 'styled-components'

const BookRoot = styled.div`
  display: inline-block;
  margin: 10px;
  position: relative;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  &:hover {
    transform: scale(2);
    z-index: 10000;
    box-shadow: 50px 50px 100px rgba(0, 0, 0, 1);
    animation: hover 5s infinite;
  }
  &:hover img {
    box-shadow: -20px -20px 100px rgba(255, 255, 255, 0.2);
  }
  &:hover .avatars {
    display: none;
  }
  opacity: 0.2;
  transform: scale(0.5);
  filter: grayscale(0.9);
  transition: opacity 1s;

  &.read {
    opacity: 1;
    filter: grayscale(0);
    transform: scale(1);
  }

  &:hover {
    opacity: 1;
    filter: grayscale(0);
    transform: scale(1);
  }

  @keyframes hover {
    0% {
      transform: scale(2);
    }
    50% {
      transform: scale(2) translateY(-2px);
    }
    100% {
      transform: scale(2);
    }
  }
`
const AvatarGroup = styled.div`
  position: absolute;
  bottom: 7px;
  right: 7px;
  flex-direction: row-reverse;
`

const AvatarRoot = styled.div`
  position: relative;
  border: none;
  height: 32px;
  width: 32px;
  overflow: hidden;
  border-radius: 32px;

  &:nth-child(even) {
    bottom: 5px;
  }
`

const AvatarImg = styled.img`
  width: 32px;
`

type AvatarProps = {
  src: string
  alt: string
  [key: string]: any
}

const Avatar: React.SFC<AvatarProps> = ({
  src,
  alt,
  ...props
}: AvatarProps) => (
  <AvatarRoot {...props}>
    <AvatarImg src={src} alt={alt} />
  </AvatarRoot>
)

const Img = styled.img`
  display: block;
  height: 150px;
`

const Book: React.FC<BookType> = ({
  title,
  link,
  read,
  recommenders,
}: BookType) => {
  const kebabCaseTitle = title
    .toLowerCase()
    .replace(/[^(\w|\s|\-)]/g, '')
    .replace(/ /g, '-')
  const imageSrc = `/images/books/${kebabCaseTitle}.jpg`
  return (
    <BookRoot className={read >= 1 ? 'read' : ''}>
      <a href={link} target="_blank noopener noreferrer">
        <Img src={imageSrc} alt={title} />
      </a>
      <AvatarGroup className="avatars">
        {recommenders &&
          recommenders.map((person, id) => (
            <Avatar
              key={person.fullName}
              src={person.avatar}
              alt={person.fullName}
              title={person.fullName}
              style={{ zIndex: id + 1 }}
            />
          ))}
      </AvatarGroup>
    </BookRoot>
  )
}

export default Book
