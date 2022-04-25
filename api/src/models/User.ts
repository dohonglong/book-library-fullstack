/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

export type UserDocument = Document & {
  _id: string
  firstName: string
  lastName: string
  borrowBooks: string[]
  email: string
  isAdmin: boolean
}

const borrowBookSchema = new mongoose.Schema({
  book: {
    type: mongoose.Types.ObjectId,
    ref: 'Book',
  },
  borrowDate: {
    type: Date,
  },
  returnDate: {
    type: Date,
  },
})

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  borrowBooks: [borrowBookSchema],
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
})

export default mongoose.model<UserDocument>('User', userSchema)
