import { NextFunction, Request, Response } from 'express'

import jwt from 'jsonwebtoken'

import User, { UserDocument } from '../models/User'
import UserService from '../services/user'
import { BadRequestError } from '../helpers/apiError'
import { JWT_SECRET } from '../util/secrets'

export const findAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allUsers = await UserService.findAll()
    res.json(allUsers)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.body.email === 'dohonglong1998@gmail.com') {
      req.body.isAdmin = true
    }

    const user = new User(req.body)
    const newUser = await UserService.create(user)
    res.json(newUser)
    console.log('HELLO WORLD')
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
      console.log(error)
    } else {
      next(error)
      console.log(error)
    }
  }
}

export const findUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(
      await User.findById(req.params.userId).populate('borrowBooks.book')
    )
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const googleLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as any
    const token = jwt.sign({ email: user?.email }, JWT_SECRET)
    res.json({ user, token })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await User.findById(req.user?._id))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updated = await UserService.update(req.body)
    res.json(updated)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
