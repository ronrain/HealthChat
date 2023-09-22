import { Router } from 'express'
import * as discussionsCtrl from '../controllers/discussions.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', discussionsCtrl.index)
router.get('/:discussionId', discussionsCtrl.show)
router.get('/:discussionId/edit', isLoggedIn, discussionsCtrl.edit)
router.post('/', isLoggedIn, discussionsCtrl.create)
router.post('/:discussionId/reviews', discussionsCtrl.createReply)
router.put('/:discussionId', isLoggedIn, discussionsCtrl.update)
router.delete('/:discussionId', isLoggedIn, discussionsCtrl.delete)


export {
  router
}