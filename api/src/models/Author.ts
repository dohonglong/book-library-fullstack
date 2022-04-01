/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

export type AuthorDocument = Document & {
  _id: string
  firstName: string
  lastName: string
  books: string[]
}

const authorSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  books: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Book',
    },
  ],
})

export default mongoose.model<AuthorDocument>('Author', authorSchema)
