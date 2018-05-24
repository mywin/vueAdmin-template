import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import tagsView from './modules/tagsView'
// import getters from './getters'
import createPersistedState from 'vuex-persistedstate'
import Cookies from 'js-cookie'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    app,
    user,
    tagsView
  },
  // getters,
  plugins: [
    createPersistedState({
      key: 'store',
      paths: [
        // 'user'
      ],
      storage: {
        getItem: key => Cookies.get(key),
        setItem: (key, value) => Cookies.set(key, value, { expires: 3 }),
        removeItem: key => Cookies.remove(key)
      }
    })
  ]
})
export default store
