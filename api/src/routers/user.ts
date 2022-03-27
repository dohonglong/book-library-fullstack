import express from 'express'

import {
  createUser,
  findUserById,
  googleLogin,
  findAllUsers,
} from '../controllers/user'

const router = express.Router()

router.post('/', createUser)
router.get('/all', findAllUsers)
router.get('/:userId', findUserById)
router.post('/google-login', googleLogin)

export default router
