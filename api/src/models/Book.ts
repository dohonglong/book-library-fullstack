/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

export type BookDocument = Document & {
  _id: string
  name: string
  authors: string[]
  publishedYear: number
  publisher: string
}

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    index: true,
  },
  publishedYear: {
    type: Number,
    required: true,
  },
  authors: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Author',
    },
  ],
  publisher: {
    type: String,
  },
})

export default mongoose.model<BookDocument>('Book', bookSchema)
