import { Router } from 'express'
import * as symptomsCtrl from '../controllers/symptoms.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', symptomsCtrl.index)
router.get('/new', isLoggedIn, symptomsCtrl.new)
router.get('/:symptomId', symptomsCtrl.show)
router.get('/:symptomId/edit', isLoggedIn, symptomsCtrl.edit)
router.post('/', isLoggedIn, symptomsCtrl.create)
router.put('/:symptomId', isLoggedIn, symptomsCtrl.update)
router.delete('/:symptomId', isLoggedIn, symptomsCtrl.delete)

export {
  router
}