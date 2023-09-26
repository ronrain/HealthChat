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
  req.body.author = req.user.profile._id
  Symptom.create(req.body)
  .then(symptom => {
    res.redirect('/symptoms/new')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/symptoms/new')
  })
}

function edit(req, res) {
  Symptom.findById(req.params.symptomId)
  .then(symptom => {
    res.render('symptoms/edit', {
      symptom: symptom,
      title: "Edit Symptom"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/symptoms')
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

function update(req, res) {
  Symptom.findById(req.params.symptomId)
  .then(symptom => {
    if (symptom.author.equals(req.user.profile._id)) {
      symptom.updateOne(req.body)
      .then(()=> {
        res.redirect(`/symptoms/${symptom._id}`)
      })
    } else {
      throw new Error('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/symptoms`)
  })
}

function show(req, res) {
  Symptom.findById(req.params.symptomId)
  .populate("author")
  .then(symptom => {
    res.render('symptoms/show', {
      symptom: symptom,
      title: "Symptoms"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/symptoms')
  })
}

function deleteSymptom(req, res) {
  Symptom.findById(req.params.symptomId)
  .then(symptom => {
    if (symptom.author.equals(req.user.profile._id)) {
      symptom.deleteOne()
      .then(() => {
        res.redirect('/symptoms')
      })
    } else {
      throw new Error ('🚫 Not authorized 🚫')
    }   
  })
  .catch(err => {
    console.log(err)
    res.redirect('/symptoms')
  })
}
export {
  newSymptom as new,
  create,
  index,
  edit,
  update,
  show,
  deleteSymptom as delete
}