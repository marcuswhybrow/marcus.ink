import Link from 'next/link'
import styled from 'styled-components'

const Root = styled.div`
  z-index: 10000;
  position: fixed;
  top: 35px;
  left: 50%;
  width: 82px;
  height: 82px;
  margin-left: -41px;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  border-radius: 80px;

  @keyframes swash {
    0% {
      background-color: rgba(245, 245, 245, 0.4);
    }
    10% {
      background-color: rgba(225, 245, 245, 0.4);
    }
    20% {
      background-color: rgba(225, 225, 245, 0.4);
    }
    30% {
      background-color: rgba(245, 225, 225, 0.4);
    }
    40% {
      background-color: rgba(245, 225, 225, 0.4);
    }
    50% {
      background-color: rgba(245, 245, 225, 0.4);
    }
    60% {
      background-color: rgba(225, 245, 225, 0.4);
    }
    70% {
      background-color: rgba(225, 245, 245, 0.4);
    }
    80% {
      background-color: rgba(245, 245, 245, 0.4);
    }
  }

  a {
    animation: swash 600s infinite;

    display: inline-block;
    width: 80px;
    height: 80px;
    border-radius: 80px;
    background-color: rgba(245, 245, 245, 0.4);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(0, 0, 0, 0.5);
    text-decoration: none;
    text-align: center;
    font-size: 400%;
    text-transform: lowercase;
    overflow: hidden;
    line-height: 1em;

    transition: all 0.2s ease-in-out;

    color: rgba(0, 0, 0, 0.5);
    border-color: rgba(0, 0, 0, 0.5);

    &:hover {
      color: rgba(0, 0, 0, 0.8);
      border-color: rgba(0, 0, 0, 0.8);
    }
  }

  @media screen and (max-width: 700px), screen and (max-height: 499px) {
    top: 10px;
    a {
      width: 50px;
      height: 50px;
      font-size: 240%;
    }
  }
`

export const BackToArticles: React.FC = () => (
  <Root>
    <Link href="/">
      <a>M</a>
    </Link>
  </Root>
)

export default BackToArticles
