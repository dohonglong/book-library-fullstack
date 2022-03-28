import { Dispatch } from 'redux'
import axios from 'axios'

export type BookDocument = {
  _id: string
  name: string
  authors: string[]
  publishedYear: number
  publisher: string
}

export type User = {
  _id: string
  firstName: string
  lastName: string
  borrowBooks: BookDocument[]
  email: string
  isAdmin: boolean
}

type LoginSuccessAction = {
  type: 'LOGIN_SUCCESS'
  payload: User
}

export type Logout = {
  type: 'LOGOUT'
}

export type Actions = LoginSuccessAction | Logout

export const loginSuccess = (user: User): LoginSuccessAction => {
  return {
    type: 'LOGIN_SUCCESS',
    payload: user,
  }
}

export const logout = (): Logout => {
  return {
    type: 'LOGOUT',
  }
}
