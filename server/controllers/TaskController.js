import _boardService from '../services/BoardService'
import express from 'express'
import { Authorize } from '../middleware/authorize.js'
import ListService from '../services/ListService'
import TaskService from '../services/TaskService'

let _taskService = new TaskService().respository
let _listService = new ListService().respository

export default class TaskController {
  constructor() {
    this.router = express.Router()
      .use(Authorize.authenticated)
      .get('', this.getAll)
      .get('/:id', this.getById)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
      .use(this.defaultRoute)
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


  async create(req, res, next) {
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