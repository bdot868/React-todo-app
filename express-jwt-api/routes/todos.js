const
  express = require('express'),
  Todo = require('../models/Todo.js'),
  todosRouter = new express.Router()

  todosRouter.route('/')
    .get((req,res) => {
      Todo.find({}, (err, todos) => {
        res.json(todos)
      })
    })
    .post((req, res) => {
      const newTodo = new Todo(req.body)
      newTodo.save((err, todo)=> {
        res.json({success: true, message: 'Todo created.', todo})
      })
    })

  todosRouter.route('/:id')
    .patch((req, res) => {
      Todo.findById(req.params.id, (err,todo) => {
        todo.completed = !todo.completed
        todo.save((err, todo) => {
          res.json({success: true, message: 'Todo updated.', todo})
        })
      })
    })

module.exports = todosRouter
