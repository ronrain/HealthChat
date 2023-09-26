import { Router } from 'express'
import * as symptomsCtrl from '../controllers/symptoms.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', symptomsCtrl.index)
router.get('/new', symptomsCtrl.new)
router.get('/:symptomId/edit', isLoggedIn, symptomsCtrl.edit)
router.get('/:symptomId', symptomsCtrl.show)
router.post('/', isLoggedIn, symptomsCtrl.create)
router.put('/:symptomId', isLoggedIn, symptomsCtrl.update)

export {
  router
}