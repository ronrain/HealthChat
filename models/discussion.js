import mongoose from 'mongoose'

const Schema = mongoose.Schema

const discussionSchema = new Schema({
  topic: String,
  content: String,
  symptom: String,
  owner: {type: Schema.Types.ObjectId, ref: "Profile"}
}, {
  timestamps: true
})

const Discussion = mongoose.model('Discussion', discussionSchema)

export {
  Discussion
}