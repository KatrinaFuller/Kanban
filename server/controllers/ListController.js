import _boardService from '../services/BoardService'
import express from 'express'
import { Authorize } from '../middleware/authorize.js'
import ListService from '../services/ListService'
import { runInNewContext } from 'vm'
import TaskService from '../services/TaskService'

let _listService = new ListService().respository
let _taskService = new TaskService().respository

export default class ListController {
  constructor() {
    this.router = express.Router()
      .get('', this.getAll)
      .get('/:id', this.getListsById)
      .get('/:id/tasks', this.getTasks)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }
  async getAll(req, res, next) {
    try {
      let list = await _listService.find({})
      return res.send(list)
    } catch (error) {
      next(error)
    }
  }
  async getListsById(req, res, next) {
    try {
      let list = await _listService.findById(req.params.id)
      if (!list) {
        throw new Error('invalid id')
      }
      res.send(list)
    } catch (error) {
      next(error)
    }
  }

  async getTasks(req, res, next) {
    try {
      let task = await _taskService.find({ listId: req.params.id })
      return res.send(task)
    } catch (error) {
      next(error)
    }
  }


  async create(req, res, next) {
    req.body.authorId = req.session.uid
    try {
      let list = await _listService.create(req.body)
      res.send(list)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      let list = await _listService.findOneAndUpdate({ _id: req.params.id, }, req.body, { new: true })
      if (list) {
        return res.send(list)
      }
      throw new Error("invalid id")
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      await _listService.findByIdAndRemove({ _id: req.params.id })
      res.send('deleted list')
    } catch (error) {
      next(error)
    }
  }

}