import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as symptomsCtrl from '../controllers/symptoms.js'

const router = Router()

router.get('/new', symptomsCtrl.new)
router.post('/', isLoggedIn, symptomsCtrl.create)

export {
  router
}