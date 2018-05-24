import * as api from '@/api/user'
export default {
  namespaced: true,
  getters: {
    name: state => state.name,
    token: state => state.token,
    avatar: state => state.avatar,
    routes: state => state.routes
  },
  state: {
    token: null,
    name: null,
    avatar: null,
    routes: null
  },
  mutations: {
    SET(state, object) {
      for (const key in object) {
        if (object instanceof Object) {
          if (state.hasOwnProperty(key)) {
            state[key] = object[key]
          }
        }
      }
    },
    DEL(state, keys) {
      if (keys instanceof Array) {
        keys.find(key => {
          if (state.hasOwnProperty(key)) {
            state[key] = ''
          }
        })
      }
    }
  },
  actions: {
    // 登录
    Login({ commit }, { username, password }) {
      return new Promise((resolve, reject) => {
        api.user_login_post({
          username: username.trim(),
          password: password
        }).then(res => {
          commit('SET', res.result)
          resolve()
        }).catch(err => {
          console.log(err)
          reject(err)
        })
      })
    },
    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        api.user_info_get({
          params: {
            token: state.token
          }
        }).then(res => {
          resolve(res.result)
        })
      })
    },
    // 获取用户信息
    GetItems({ commit, state }, options) {
      return new Promise((resolve, reject) => {
        api.user_items_get({
          params: {
            token: state.token,
            ...options
          }
        }).then(res => {
          resolve(res.result)
        })
      })
    },
    // 获取用户信息
    DeleteItems({ commit, state }, ids) {
      return new Promise((resolve, reject) => {
        api.user_delete_post({
          params: { ids }
        }).then(res => {
          resolve(res.result)
        })
      })
    },

    // 登出
    Logout({ commit, state }) {
      return new Promise((resolve, reject) => {
        api.user_logout_post(state.token).then((res) => {
          commit('DEL', ['token', 'routes'])
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端登出
    FedLogout({ commit }) {
      return new Promise(resolve => {
        commit('DEL', ['token'])
        resolve()
      })
    }
  }
}
