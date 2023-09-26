import { Symptom } from '../models/symptom.js'

function newSymptom(req, res) {
  Symptom.find({})
  .then(symptoms => {
    res.render('symptoms/new', {
      title: 'Add Symptom',
      symptoms: symptoms,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/discussions")
  })
}

function create(req, res) {
  Symptom.create(req.body)
  .then(symptom => {
    res.redirect('/symptoms/new')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/symptoms/new')
  })
}

function editSymptom(req, res) {
  Symptom.findById(req.params.symptomId)
  .then(symptom => {
    const symp = symptom.id(req.params.commentId)
    if (comment.author.equals(req.user.profile._id)) {
      res.render('tacos/editComment', {
        taco, 
        comment,
        title: 'Update Comment'
      })
    } else {
      throw new Error('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/tacos')
  })
}

function index(req, res) {
  Symptom.find({})
  .then(symptoms => {
    res.render('symptoms/index', {
      symptoms:symptoms,
      title: "Symptoms List"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

export {
  newSymptom as new,
  create,
  index
}