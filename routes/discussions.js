import { Router } from 'express'
import * as discussionsCtrl from '../controllers/discussions.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', discussionsCtrl.index)
router.get('/new', discussionsCtrl.new)
router.get('/:discussionId/edit', isLoggedIn, discussionsCtrl.edit)
router.get('/:discussionId/replies/:replyId/edit', isLoggedIn, discussionsCtrl.editReply)
router.get('/:discussionId', discussionsCtrl.show)
router.post('/', isLoggedIn, discussionsCtrl.create)
router.post('/:discussionId/replies', isLoggedIn, discussionsCtrl.addReply)
router.post('/:discussionId/symptoms', discussionsCtrl.addToSymptoms)
router.put('/:discussionId/replies/:replyId', isLoggedIn, discussionsCtrl.updateReply)
router.put('/:discussionId', isLoggedIn, discussionsCtrl.update)
router.delete('/:discussionId/replies/:replyId', isLoggedIn, discussionsCtrl.deleteReply)
router.delete('/:discussionId', isLoggedIn, discussionsCtrl.delete)


export {
  router
}