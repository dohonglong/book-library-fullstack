import { Request, Response, NextFunction } from 'express'
import { ForbiddenError } from '../helpers/apiError'

const adminCheck = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user
  if (user?.isAdmin) {
    next()
  } else {
    throw new ForbiddenError()
  }
}

export default adminCheck
