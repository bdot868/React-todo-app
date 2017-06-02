import axios from 'axios'
import jwt_decode from 'jwt-decode'

axios.defaults.baseURL = 'http://localhost:3001'

const clientAuth = {

  setTokenHeader: () => {
    const token = localStorage.getItem('token')
    if(token) {
      axios.defaults.headers.common['x-access-token'] = localStorage.getItem('token')
    }
  },

  signUp: (userInfo) => {
    return axios({
      url: '/api/users',
      method: 'post',
      data: userInfo
    })
  },

  logIn: (credentials) => {
    return axios({
      url: '/api/users/login',
      method: 'post',
      data: credentials
    })
    .then(res => {
      if(res.data.token) {
        localStorage.setItem('token', res.data.token)
        clientAuth.setTokenHeader()
        console.log("Decoded token:", jwt_decode(res.data.token))
        return jwt_decode(res.data.token)
      } else {
        return false
      }
    })
  },

  getCurrentUser: () => {
    const token = localStorage.getItem('token')
    return token ? jwt_decode(token) : null
  },

  logOut: () => {
    return new Promise((resolve) => {
      localStorage.clear()
      delete axios.defaults.headers.common['x-access-token']
      resolve("bye.")
    })
  },
  getTodos: () => {
    return axios({
      url: '/api/todos',
      method: 'get'
    })
  },

  addTodo: (newTodo) => {
    return axios({
      url: '/api/todos',
      method: 'post',
      data: newTodo
    })
  },

  deleteTodo: (id) => {
    return axios({
      url: `/api/todos/${id}`,
      method: 'delete'
    })
  },

  toggleCompleted: (id) => {
    return axios({
      url: `/api/todos/${id}`,
      method: 'patch'
    })
  }
}

clientAuth.setTokenHeader()
export default clientAuth
