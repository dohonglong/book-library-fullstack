import express from 'express'
import passport from 'passport'

import { findAllUsers, createUser, googleLogin } from '../controllers/user'

const router = express.Router()

// Every path we define here will get /api/v1/movies prefix
router.post(
  '/google-login',
  passport.authenticate('google-id-token', { session: false }),
  googleLogin
)
router.get('/', findAllUsers)
router.post('/', createUser)

export default router
