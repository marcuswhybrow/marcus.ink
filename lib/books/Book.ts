import Person from './Person'

export type Book = {
  title: string
  subtitle?: string
  link?: string
  author?: string
  read: number
  own: number
  recommenders?: Person[]
}

export default Book
