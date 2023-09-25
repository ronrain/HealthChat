import { Symptom } from '../models/symptom.js'

function newSymptom(req, res) {
  Symptom.find({})
  .then(symptoms => {
    res.render('discussions/new', {
      symptoms: symptoms,
      title: 'Add Symptom'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/discussions')
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

export {
  newSymptom as new,
  create
}