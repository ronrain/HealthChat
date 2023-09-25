import mongoose from "mongoose"

const Schema = mongoose.Schema

const symptomSchema = new Schema({
  name: {type: String, required: true}
}, {
  timestamps: true
})

const Symptom = mongoose.model('Performer', symptomSchema)

export {
  Symptom
}