// import mongoose from "mongoose"
// let Schema = mongoose.Schema
// let ObjectId = Schema.Types.ObjectId

// let _schema = new Schema({
//   content: { type: String, required: true },
//   taskId: { type: ObjectId, ref: 'Task', required: true }
// }, { timestamps: true })


// //TODO ask if we need this part (same as listService that was done for us)

// //CASCADE ON DELETE
// _schema.pre('deleteMany', function (next) {
//   //lets find all the lists and remove them
//   Promise.all([
//     //_taskService.deleteMany({ listId: this._conditions_id }),
//   ])
//     .then(() => next())
//     .catch(err => next(err))
// })

// //CASCADE ON DELETE
// _schema.pre('findOneAndRemove', function (next) {
//   //lets find all the lists and remove them
//   Promise.all([
//     // _taskRepo.deleteMany({ boardId: this._conditions._id })
//   ])
//     .then(() => next())
//     .catch(err => next(err))
// })

// export default class CommentService {
//   get respository() {
//     return mongoose.model('Comment', _schema)
//   }
// }