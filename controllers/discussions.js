import { Discussion } from '../models/discussion.js'

function newDiscussion(req, res) {
  res.render('discussions/new', {
    title: 'Add Discussion'
  })
}

function index(req, res) {
  Discussion.find({})
  .then(discussions => {
    res.render('discussions/index', {
      discussions,
      title: 'All Discussions'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function create(req, res) {
  req.body.author = req.user.profile._id
  req.body.isDoctor = !!req.body.isDoctor
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
  .populate([
    {path: 'author'},
    {path: 'replies.author'}
  ])
  .then(discussion => {
    res.render('discussions/show', {
      title: "Discussion Detail",
      discussion: discussion
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
      req.body.isDoctor = !!req.body.isDoctor
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
    if (discussion.author.equals(req.user.profile._id)) {
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

function addReply(req, res) {
  req.body.isDoctor = !!req.body.isDoctor
  Discussion.findById(req.params.discussionId)
  .then(discussion => {
    req.body.author = req.user.profile._id
    discussion.replies.push(req.body)
    discussion.save()
    .then(() => {
      res.redirect(`/discussions/${discussion._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/discussions')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/discussions')
  })
}

function editReply(req, res) {
  Discussion.findById(req.params.discussionId)
  .then(discussion => {
    const replies = discussion.replies.id(req.params.replyId)
    if (replies.author.equals(req.user.profile._id)) {
      console.log(replies)
      res.render('discussions/editReply', {
        discussion, 
        replies,
        title: 'Update Reply'
      })
    } else {
      throw new Error('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/discussions')
  })
}

function updateReply(req, res) {
  Discussion.findById(req.params.discussionId)
  .then(discussion => {
    const replies = discussion.replies.id(req.params.replyId)
    if (replies.author.equals(req.user.profile._id)) {
      req.body.isDoctor = !!req.body.isDoctor
      replies.set(req.body)
      discussion.save()
      .then(() => {
        res.redirect(`/discussions/${discussion._id}`)
      })
      .catch(err => {
        console.log(err)
        res.redirect('/discussions')
      })
    } else {
      throw new Error('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/discussions')
  })
}

function deleteReply(req, res) {
  Discussion.findById(req.params.discussionId)
  .then(discussion => {
    const replies = discussion.replies.id(req.params.replyId)
    if (replies.author.equals(req.user.profile._id)) {
      discussion.replies.remove(replies)
      discussion.save()
      .then(() => {
        res.redirect(`/discussions/${discussion._id}`)
      })
      .catch(err => {
        console.log(err)
        res.redirect('/discussions')
      })
    } else {
      throw new Error('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/discussions')
  })
}

export {
  newDiscussion as new,
  index,
  create,
  show,
  edit,
  update,
  deleteDiscussion as delete,
  addReply,
  editReply,
  updateReply,
  deleteReply
}