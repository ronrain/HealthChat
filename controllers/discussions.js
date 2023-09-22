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
  req.body.author = req.user.profile._id
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
  .populate("author")
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
    if (discussion.author.equals(req.user.profile._id)) {
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
    if (discussion.o.equals(req.user.profile._id)) {
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

function createReply(req, res) {
  Movie.findById(req.params.discussionId)
  .then(discussion => {
    discussion.replies.push(req.body)
    discussion.save()
    .then(() => {
      res.redirect(`/discussions/${discussion._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

export {
  index,
  create,
  show,
  edit,
  update,
  deleteDiscussion as delete,
  createReply
}