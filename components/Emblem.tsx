import Link from 'next/link'
import styled from 'styled-components'

const Root = styled.div`
  z-index: 10000;
  position: fixed;
  top: 35px;
  left: 0;
  right: 0;
  text-align: center;

  @media screen and (max-height: 499px) {
    top: 10px;
  }

  a {
    display: inline-block;
    width: 80px;
    height: 80px;
    border-radius: 80px;
    background-color: rgba(245, 245, 245, 0.4);
    backdrop-filter: blur(5px);
    border: 1px solid rgba(0, 0, 0, 0.025);
    text-decoration: none;
    color: rgba(0, 0, 0, 0.06);
    text-align: center;
    font-size: 400%;
    font-weight: lighter;
    text-transform: lowercase;
    overflow: hidden;
    line-height: 1em;

    @media screen and (max-height: 499px) {
      width: 50px;
      height: 50px;
      font-size: 240%;
    }

    span {
      position: relative;
      left: 0px;
      top: 3px;
    }

    transition: all 0.2s ease-in-out;
    &:hover {
      color: rgba(0, 0, 0, 0.5);
      border-color: rgba(0, 0, 0, 0.5);
    }
`

export const BackToArticles: React.FC = () => (
  <Root>
    <Link href="/">
      <a>
        <span>M</span>
      </a>
    </Link>
  </Root>
)

export default BackToArticles
