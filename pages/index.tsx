import Link from 'next/link'

export const Index: React.FC = () => (
  <>
    <h1>marcus.ink</h1>
    <ul>
      <li>
        <Link href="/start-close-in">
          <a>Start Close In</a>
        </Link>
      </li>
    </ul>
  </>
)

export default Index
