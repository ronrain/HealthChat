import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/new', isLoggedIn, symptomsCtrl.new)

export {
  router
}