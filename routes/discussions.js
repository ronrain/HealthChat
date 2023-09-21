import { Router } from 'express'
import * as discussionCtrl from '../controllers/discussions.js'

const router = Router()

router.get('/', discussionCtrl.index)

export {
  router
}