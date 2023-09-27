import { Symptom } from '../models/symptom.js'

function index(req, res) {
  Symptom.find({})
  .then(symptoms => {
    res.render('symptoms/index', {
      symptoms: symptoms,
      title: "Symptoms List"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function create(req, res) {
  req.body.author = req.user.profile._id
  Symptom.create(req.body)
  .then(symptom => {
    res.redirect('/symptoms')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function show(req, res) {
  Symptom.findById(req.params.symptomId)
  .populate("author")
  .then(symptom => {
    console.log('Symptom:', symptom)
    console.log('user:', req.user)
    res.render('symptoms/show', {
      symptom: symptom,
      title: "Symptoms"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
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
    res.redirect('/')
  })
}

function update(req, res) {
  Symptom.findByIdAndUpdate(req.params.symptomId)
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
    res.redirect('/')
  })
}

function deleteSymptom(req, res) {
  Symptom.findByIdAndDelete(req.params.symptomId)
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
    res.redirect('/')
  })
}

function newSymptom(req, res) {
  req.body.author = req.user.profile._id
  Symptom.find({})
  .then(symptoms => {
    res.render('symptoms/new', {
      title: 'Add Symptom',
      symptoms: symptoms,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

export {
  index,
  create,
  show,
  edit,
  update,
  deleteSymptom as delete,
  newSymptom as new,
}