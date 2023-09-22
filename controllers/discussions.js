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
  .populate([
    {path: 'owner'},
    {path: 'replies.author'}
  ])
  .then(discussion => {
    res.render('discussions/show', {
      title: "Displayed Discussion",
      discussion
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

function addReply(req, res) {
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
    const reply = discussion.replies.id(req.params.replyId)
    if (reply.author.equals(req.user.profile._id)) {
      res.render('discussions/editReply', {
        discussion, 
        comment,
        isDoctor,
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

export {
  index,
  create,
  show,
  edit,
  update,
  deleteDiscussion as delete,
  addReply,
  editReply
}