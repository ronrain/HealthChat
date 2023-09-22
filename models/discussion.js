import mongoose from 'mongoose'

const Schema = mongoose.Schema

const replySchema = new Schema({
  author: {type: Schema.Types.ObjectId},
  content: String,
  isDoctor: Boolean
}, {
  timestamps: true
})

const discussionSchema = new Schema({
  topic: String,
  content: String,
  symptom: String,
  author: {type: Schema.Types.ObjectId, ref: "Profile"},
  replies: [replySchema]
}, {
  timestamps: true
})

const Discussion = mongoose.model('Discussion', discussionSchema)

export {
  Discussion
}