export type Article = {
  _filePath: string
  _slug: string
  Body: React.ComponentType
  image: string
  title: {
    display: string
    head: string
  }
  description: string
  created: number
  dreamt?: number
  updated?: number
}

export default Article
