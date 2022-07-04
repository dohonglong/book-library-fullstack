import express from 'express'
import passport from 'passport'
import adminCheck from '../middlewares/adminCheck'

import {
  findAllUsers,
  findUserById,
  createUser,
  googleLogin,
} from '../controllers/user'

const router = express.Router()

// Every path we define here will get /api/v1/movies prefix
router.post('/', passport.authenticate('jwt', { session: false }), createUser)
router.get(
  '/all',
  passport.authenticate('jwt', { session: false }),
  adminCheck,
  findAllUsers
)
router.get(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  findUserById
)
router.post(
  '/google-login',
  passport.authenticate('google-id-token', { session: false }),
  googleLogin
)

export default router
