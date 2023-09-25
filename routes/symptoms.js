import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as symptomsCtrl from '../controllers/symptoms.js'

const router = Router()

router.get('/new', isLoggedIn, symptomsCtrl.new)
router.post('/', symptomsCtrl.create)

export {
  router
}