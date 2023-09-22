import { Discussion } from '../models/discussion.js'

function index(req, res) {
  Discussion.find({})
  .then(discussions => {
    res.render('discussions/index', {
      discussions,
      title: 'Discussion'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id
  Discussion.create(req.body)
  .then(taco => {
    res.redirect('/discussions')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/discussions')
  })
}

function show(req, res) {
  Discussion.findById(req.params.discussionId)
  .populate("owner")
  .then(discussion => {
    res.render('discussions/show', {
      discussion,
      title: "Displayed Discussion"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/discussions')
  })
}

export {
  index,
  create,
  show
}