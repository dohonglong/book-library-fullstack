import Book, { BookDocument } from '../models/Book'
import { NotFoundError } from '../helpers/apiError'
import User from '../models/User'

const create = async (book: BookDocument): Promise<BookDocument> => {
  return book.save()
}

const findById = async (bookId: string): Promise<BookDocument> => {
  const foundBook = await Book.findById(bookId)

  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }

  return foundBook
}

const findAll = async (): Promise<BookDocument[]> => {
  return Book.find().sort({ name: 1, publishedYear: -1 })
}

const update = async (
  bookId: string,
  update: Partial<BookDocument>
): Promise<BookDocument | null> => {
  const foundBook = await Book.findByIdAndUpdate(bookId, update, {
    new: true,
  })

  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }

  return foundBook
}

const deleteBook = async (bookId: string): Promise<BookDocument | null> => {
  const foundBook = Book.findByIdAndDelete(bookId)

  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }

  return foundBook
}

const borrowBook = async (
  bookId: string,
  userId: string,
  borrowDate: Date,
  returnDate: Date
) => {
  const foundBorrowBook = await findById(bookId)
  const foundUser = await User.findById(userId)

  if (!foundUser || !foundBorrowBook) {
    throw new NotFoundError('Book or User not found')
  }

  //Check if borrowed book already exists
  const bookExist = (foundUser.borrowBooks as string[]).some(
    (id) => id === bookId
  )
  if (!bookExist) {
    const borrowBook = {
      book: bookId,
      borrowDate: borrowDate,
      returnDate: returnDate,
    }
    //Update and save the database
    foundUser.borrowBooks = [...foundUser.borrowBooks, borrowBook] as string[]
    foundUser.save()
  }

  return foundUser
}

export default {
  create,
  findById,
  findAll,
  update,
  deleteBook,
  borrowBook,
}
