import _boardService from '../services/BoardService'
import express from 'express'
import { Authorize } from '../middleware/authorize.js'
import TaskService from '../services/TaskService'
import CommentService from '../services/CommentService'

let _taskService = new TaskService().respository
let _commentService = new CommentService().respository

export default class TaskController {
  constructor() {
    this.router = express.Router()
      // .use(Authorize.authenticated)
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/comments', this.getComments)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }

  async getAll(req, res, next) {
    try {
      let task = await _taskService.find({})
      return res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      let task = await _taskService.findById(req.params.id)
      if (!task) {
        throw new Error('invalid id')
      }
      res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async getComments(req, res, next) {
    try {
      let comment = await _commentService.find({ boardId: req.params.id })
      return res.send(comment)
    } catch (error) {
      next(error)
    }
  }


  async create(req, res, next) {
    req.body.authorId = req.session.uid
    try {
      let task = await _taskService.create(req.body)
      res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      let task = await _taskService.findOneAndUpdate({ _id: req.params.id, }, req.body, { new: true })
      if (task) {
        return res.send(task)
      }
      throw new Error("invalid id")
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      await _taskService.findByIdAndRemove({ _id: req.params.id })
      res.send('deleted task')
    } catch (error) {
      next(error)
    }
  }

}