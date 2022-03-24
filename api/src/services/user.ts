import User, { UserDocument } from '../models/User'

const create = async (userDocument: UserDocument) => {
  return await User.create(userDocument)
}

const findAll = async () => {
  return await User.find()
}

export default { findAll, create }
