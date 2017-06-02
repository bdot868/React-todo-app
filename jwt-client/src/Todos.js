import React, {Component} from 'react'
import clientAuth from './clientAuth.js'

class Todos extends Component {

  state = {
    todos: []
  }

  componentDidMount(){
    //make a call to retrieve todos...
    clientAuth.getTodos().then(res => {
      this.setState({
        todos: res.data
      })
    })
  }

  _addTodo(evt){
    evt.preventDefault()
    const newTodo = {
      body: this.refs.body.value
    }
    clientAuth.addTodo(newTodo).then(res => {
      this.setState({
        todos: [
          ...this.state.todos,
          res.data.todo
        ]
      })
      this.refs.body.value = ''
    })
  }

  _deleteTodo(id){
    clientAuth.deleteTodo(id).then((res => {
      this.setState({
        todos: this.state.todos.filter((todo) => {
          return todo._id !== id
        })
      })
    }))
  }

  _toggleCompleted(id){
    clientAuth.toggleCompleted(id).then((res => {
      const todoIndex = this.state.todos.findIndex((todo) => {
        return todo._id === id
      })
      this.setState({
        todos: [
          ...this.state.todos.slice(0, todoIndex),
          res.data.todo,
          ...this.state.todos.slice(todoIndex + 1)
        ]
      })
    }))
  }

  render() {
    console.log(this.state.todos)
    const todos = this.state.todos.map((todo, i) => {
      return (
        <li key={i}>
          <button onClick={this._toggleCompleted.bind(this, todo._id)}>
            Mark{todo.completed ? 'Incomplete' : 'Complete'}
          </button>
          {todo.body}
          <button onClick={this._deleteTodo.bind(this, todo._id)}>X</button>
        </li>
      )
    })
    return (
      <div className='Todos'>
        <h1>Todos View</h1>
        <form onSubmit={this._addTodo.bind(this)}>
          <input type='text' placeholder='New Todo' ref='body' />
          <button type='submit'>Add Todo</button>
        </form>
        <ul>{todos}</ul>
      </div>
    )
  }
}

export default Todos
