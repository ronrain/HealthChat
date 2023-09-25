import mongoose from 'mongoose'

const Schema = mongoose.Schema

const replySchema = new Schema({
  comment: String,
  isDoctor: Boolean,
  author: { type: Schema.Types.ObjectId, ref: "Profile" }
}, {
  timestamps: true
})

const discussionSchema = new Schema({
  topic: String,
  content: String,
  symptom: [{type: Schema.Types.ObjectId, ref: 'Symptom'}],
  author: { type: Schema.Types.ObjectId, ref: "Profile" },
  replies: [replySchema]
}, {
  timestamps: true
})

const Discussion = mongoose.model('Discussion', discussionSchema)

export {
  Discussion
}