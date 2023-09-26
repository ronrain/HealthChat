import mongoose from 'mongoose'

const Schema = mongoose.Schema

const symptomSchema = new Schema({
  name: { type: String, required: true },
  author: {type: Schema.Types.ObjectId, ref: "Profile"}
}, {
  timestamps: true
})

const Symptom = mongoose.model('Symptom', symptomSchema)

export {
  Symptom
}