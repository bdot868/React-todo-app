const
  mongoose = require('mongoose'),
  todoSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    body: String,
    completed: {type: Boolean, default: false}
  })

const Todo = mongoose.model('Todo', todoSchema)
module.exports = Todo
