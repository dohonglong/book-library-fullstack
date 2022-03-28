import { NotFoundError } from '../helpers/apiError'
import User, { UserDocument } from '../models/User'

const create = async (userDocument: UserDocument) => {
  return await userDocument.save()
}

const findAll = async () => {
  return await User.find()
}

const findOrCreate = async (parsedToken: any) => {
  const found = await User.findOne({ email: parsedToken.payload.email })

  if (!found) {
    const user = new User({
      firstName: parsedToken.payload.given_name,
      lastName: parsedToken.payload.family_name,
      email: parsedToken.payload.email,
    })
    return await user.save()
  }

  return found
}

const findByEmail = async (email: string) => {
  const found = await User.findOne({ email })
  if (!found) {
    throw new NotFoundError('User not found')
  }

  return found
}

const update = async (update: UserDocument) => {
  const updated = await User.findByIdAndUpdate(update._id, update)
  return updated
}

export default { findAll, create, findOrCreate, findByEmail, update }
