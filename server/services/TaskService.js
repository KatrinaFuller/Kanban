import mongoose from "mongoose"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let _commentSchema = new Schema({
  content: { type: String, required: true },
  authorId: { type: ObjectId, ref: 'User', required: true }
}, { timestamps: true })

let _taskSchema = new Schema({
  description: { type: String, required: true },
  listId: { type: ObjectId, ref: 'List', required: true },
  authorId: { type: ObjectId, ref: 'List', required: true },
  boardId: { type: ObjectId, ref: 'Board', required: true },
  children: [_commentSchema]
}, { timestamps: true })

//TODO ask if we need this part (same as listService that was done for us)

//CASCADE ON DELETE
_taskSchema.pre('deleteMany', function (next) {
  //lets find all the lists and remove them
  Promise.all([
    //_taskService.deleteMany({ listId: this._conditions_id }),
  ])
    .then(() => next())
    .catch(err => next(err))
})

//CASCADE ON DELETE
_taskSchema.pre('findOneAndRemove', function (next) {
  //lets find all the lists and remove them
  Promise.all([
    // _taskRepo.deleteMany({ boardId: this._conditions._id })
  ])
    .then(() => next())
    .catch(err => next(err))
})

export default class TaskService {
  get respository() {
    return mongoose.model('Task', _taskSchema)
  }
}