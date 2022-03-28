import express from 'express'
import passport from 'passport'

import {
  createUser,
  findUserById,
  googleLogin,
  findAllUsers,
} from '../controllers/user'
import adminCheck from '../middlewares/adminCheck'

const router = express.Router()

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
