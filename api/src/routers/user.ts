import express from 'express'

import { createUser, findUserById } from '../controllers/user'

const router = express.Router()

router.post('/', createUser)
router.get('/:userId', findUserById)

export default router
