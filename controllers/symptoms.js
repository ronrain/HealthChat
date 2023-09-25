import { Symptom } from '../models/symptom.js'

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
  create
}