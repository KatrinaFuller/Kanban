// import _boardService from '../services/BoardService'
// import express from 'express'
// import TaskService from '../services/TaskService'
// import CommentService from '../services/CommentService'

// let _taskService = new TaskService().respository
// let _commentService = new CommentService().respository


// export default class CommentController {
//   constructor() {
//     this.router = express.Router()
//       .get('', this.getAll)
//       .get('/:id', this.getById)
//       .post('', this.create)
//       .put('/:id', this.edit)
//       .delete('/:id', this.delete)
//   }

//   async getAll(req, res, next) {
//     try {
//       let comment = await _commentService.find({})
//       return res.send(comment)
//     } catch (error) {
//       next(error)
//     }
//   }

//   async getById(req, res, next) {
//     try {
//       let comment = await _commentService.findById(req.params.id)
//       if (!comment) {
//         throw new Error('invalid id')
//       }
//       res.send(comment)
//     } catch (error) {
//       next(error)
//     }
//   }

//   async create(req, res, next) {
//     try {
//       let comment = await _commentService.create(req.body)
//       res.send(comment)
//     } catch (error) {
//       next(error)
//     }
//   }

//   async edit(req, res, next) {
//     try {
//       let comment = await _commentService.findOneAndUpdate({ _id: req.params.id, }, req.body, { new: true })
//       if (comment) {
//         return res.send(comment)
//       }
//       throw new Error("invalid id")
//     } catch (error) {
//       next(error)
//     }
//   }


//   async delete(req, res, next) {
//     try {
//       await _commentService.findByIdAndRemove({ _id: req.params.id })
//       res.send('deleted comment')
//     } catch (error) {
//       next(error)
//     }
//   }

// }