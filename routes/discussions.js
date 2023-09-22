import { Router } from 'express'
import * as discussionsCtrl from '../controllers/discussions.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', discussionsCtrl.index)
router.post('/', isLoggedIn, discussionsCtrl.create)
router.get('/:discussionId', discussionsCtrl.show)

export {
  router
}