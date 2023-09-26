import { Router } from 'express'
import * as symptomsCtrl from '../controllers/symptoms.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/new', symptomsCtrl.new)
router.post('/', symptomsCtrl.create)

export {
  router
}