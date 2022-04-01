/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

export type BookDocument = Document & {
  _id: string
  name: string
  author: string[]
  publishedYear: number
  publisher: string
}

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    index: true,
  },
  author: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Author',
    },
  ],
  publishedYear: {
    type: Number,
    required: true,
  },
  publisher: {
    type: String,
  },
})

export default mongoose.model<BookDocument>('Book', bookSchema)
