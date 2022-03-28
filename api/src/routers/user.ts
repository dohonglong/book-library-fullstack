import express from 'express'
import passport from 'passport'

import {
  createUser,
  findUserById,
  googleLogin,
  findAllUsers,
  getProfile,
  updateUser,
} from '../controllers/user'
import adminCheck from '../middlewares/adminCheck'

const router = express.Router()

router.post('/', passport.authenticate('jwt', { session: false }), createUser)
router.post(
  '/google-login',
  passport.authenticate('google-id-token', { session: false }),
  googleLogin
)

router.put('/', passport.authenticate('jwt', { session: false }), updateUser)

router.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  getProfile
)
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

export default router
