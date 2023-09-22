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
  .then(discussion => {
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

function edit(req, res) {
  Discussion.findById(req.params.discussionId)
  .then(discussion => {
    res.render('discussions/edit', {
      discussion,
      title: "Edit Discussion"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/discussions')
  })
}

function update(req, res) {
  Discussion.findById(req.params.discussionId)
  .then(discussion => {
    if (discussion.owner.equals(req.user.profile._id)) {
      discussion.updateOne(req.body)
      .then(()=> {
        res.redirect(`/discussions/${discussion._id}`)
      })
    } else {
      throw new Error('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/discussions`)
  })
}

function deleteDiscussion(req, res) {
  Discussion.findById(req.params.discussionId)
  .then(discussion => {
    if (discussion.owner.equals(req.user.profile._id)) {
      discussion.deleteOne()
      .then(() => {
        res.redirect('/discussions')
      })
    } else {
      throw new Error ('🚫 Not authorized 🚫')
    }   
  })
  .catch(err => {
    console.log(err)
    res.redirect('/discussions')
  })
}

export {
  index,
  create,
  show,
  edit,
  update,
  deleteDiscussion as delete
}