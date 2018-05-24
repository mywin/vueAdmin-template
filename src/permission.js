import router from '@/router'
import store from '@/store'

// Progress 进度条
import NProgress from 'nprogress'
// Progress 进度条样式
import 'nprogress/nprogress.css'
import { Message } from 'element-ui'

const loginPath = '/login'
// 不重定向白名单
const whiteList = [loginPath]
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (store.state.user.token) {
    if (to.path === loginPath) {
      next('/')
    } else {
      next()
      /*
      if (!store.state.user.routes) {
        store.dispatch('user/GetInfo').then(response => {
          console.log(response)
          // 拉取用户信息
          next()
        }).catch((error) => {
          store.dispatch('user/FedLogout').then(() => {
            Message.error(error || 'Verification failed, please login again')
            next('/')
          })
        })
      } else {
        next()
      }
      */
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(loginPath)
    }
  }
})

router.afterEach(() => {
  // 结束Progress
  NProgress.done()
})
