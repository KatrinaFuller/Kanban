import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'
import AuthService from './AuthService'

Vue.use(Vuex)

//Allows axios to work locally or live
let base = window.location.host.includes('localhost:8080') ? '//localhost:3000/' : '/'

let api = Axios.create({
  baseURL: base + "api/",
  timeout: 3000,
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    activeBoard: {},
    lists: [],
    tasks: {},
    comments: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setBoards(state, boards) {
      state.boards = boards
    },
    setLists(state, payload) {
      state.lists = payload
    },
    setTasks(state, payload) {
      Vue.set(state.tasks, payload.listId, payload.tasks)
    },

  },
  actions: {
    //#region -- AUTH STUFF --
    async register({ commit, dispatch }, creds) {
      try {
        let user = await AuthService.Register(creds)
        commit('setUser', user)
        router.push({ name: "boards" })
      } catch (e) {
        console.warn(e.message)
      }
    },
    async login({ commit, dispatch }, creds) {
      try {
        let user = await AuthService.Login(creds)
        commit('setUser', user)
        router.push({ name: "boards" })
      } catch (e) {
        console.warn(e.message)
      }
    },
    async logout({ commit, dispatch }) {
      try {
        let success = await AuthService.Logout()
        if (!success) { }
        commit('resetState')
        router.push({ name: "login" })
      } catch (e) {
        console.warn(e.message)
      }
    },
    //#endregion


    //#region -- BOARDS --
    getBoards({ commit, dispatch }) {
      api.get('boards')
        .then(res => {
          commit('setBoards', res.data)
        })
    },
    addBoard({ commit, dispatch }, boardData) {
      api.post('boards', boardData)
        .then(serverBoard => {
          dispatch('getBoards')
        })
    },

    async removeBoard({ dispatch }, payload) {
      try {
        // debugger
        let res = await api.delete('/boards/' + payload)
        dispatch('getBoards')
        router.push({ name: "boards" })
      } catch (error) {
        console.error("store.js: removeBoard")
      }
    },

    async removeBoards({ dispatch }, payload) {
      try {
        debugger
        let res = await api.delete('/boards/' + payload._id)
        dispatch('getBoards')
        router.push({ name: "boards" })
      } catch (error) {
        console.error("store.js: removeBoards")
      }
    },

    //#endregion


    //#region -- LISTS --
    async getListsById({ commit, dispatch }, payload) {
      try {
        // let res = await api.get("lists") //get all lists in entire db (/api/boards/:id/lists)
        let res = await api.get(`/boards/${payload}/lists`)

        commit("setLists", res.data)

      } catch (error) {
        console.error('store.js: getListsById')
      }
    },

    async addList({ dispatch }, payload) {
      try {

        let res = await api.post("/lists", payload)
        dispatch("getListsById", payload.boardId)
      } catch (error) {
        console.error("store.js: addList")

      }
    },

    async removeList({ dispatch }, payload) {
      try {
        let res = await api.delete('/lists/' + payload._id)
        dispatch('getListsById', payload.boardId)
        // router.push({ name: "board" })
      } catch (error) {
        console.error("store.js: removeList")
      }
    },

    //#endregion

    // #region -- TASKS --

    async getTasksById({ commit, dispatch }, payload) {
      try {
        // let res = await api.get("lists") //get all lists in entire db (/api/boards/:id/lists)
        let res = await api.get(`/lists/${payload}/tasks`)

        commit("setTasks", { listId: payload, tasks: res.data })

      } catch (error) {
        console.error('store.js: getTasksById')
      }
    },

    async addTask({ dispatch }, payload) {
      try {
        let res = await api.post("/tasks", payload)
        dispatch("getTasksById", payload.listId)
      } catch (error) {
        console.error("store.js: addTask")

      }
    },

    async removeTask({ dispatch }, payload) {
      try {
        let res = await api.delete('/tasks/' + payload._id)
        dispatch('getTasksById', payload.listId)
        // router.push({ name: "board" })
      } catch (error) {
        console.error("store.js: removeTask")
      }
    },

    async moveTask({ dispatch }, payload) {
      try {
        let res = await api.put(`/tasks/${payload.taskId}`, payload)
        dispatch('getTasksById', payload.listId)
        dispatch('getTasksById', payload.currentListId)
      } catch (error) {
        console.error("store.js: moveTask")
      }
    },
    //#endregion

    //#region --comments--
    async addComment({ dispatch }, payload) {
      try {
        let res = await api.post(`/tasks/${payload.taskId}/comments`, payload)
        dispatch("getTasksById", payload.listId)
      } catch (error) {
        console.error("store.js: addComment")

      }
    },

    async removeComment({ dispatch }, payload) {
      try {
        let res = await api.put(`/tasks/${payload.taskId}/comments`, payload)
        dispatch('getTasksById', payload.listId)
      } catch (error) {
        console.error("store.js: removeComment")
      }
    }
    //#endregion

  }
})
