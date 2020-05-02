export type Article = {
  _filePath: string
  _slug: string
  Body: React.ComponentType
  title: {
    display: string
    head: string
  }
  description: string
  created: number
  updated?: number
}

export default Article
