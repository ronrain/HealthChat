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

export {
  index
}