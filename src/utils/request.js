import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
// 创建axios实例
const service = axios.create({
  // api的base_url
  // baseURL: process.env.BASE_API,
  // 请求超时时间
  timeout: 15000,
  headers: {
    'MDK-Version': '1.0'
  },
  validateStatus(status) {
    // 状态码大于200小于300或400时为true
    return (status >= 200 && status < 300)
  }
})

// request拦截器
service.interceptors.request.use(config => {
  config.headers['X-Token'] = store.getters['user/token']
  return config
}, error => {
  // Do something with request error
  // for debug
  console.log(error)
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    return response.data
    /*
    // code为非20000是抛错 可结合自己业务进行修改
    const result = response.data
    if (result.code !== 20000) {
      Message({
        message: result.message,
        type: 'error',
        duration: 5 * 1000
      })

      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (result.code === 50008 || result.code === 50012 || result.code === 50014) {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
    */
  },
  error => {
    const res = error.response
    const data = res.data
    switch (res.status) {
      case 400:
        if (data.code === 4001) {
          // 登录失败路由跳转
          console.log('登录失败')
        }
        break
      case 500:
        console.log(500)
        break
      default:
        // for debug
        console.log('err' + error)
        Message({
          message: error.message,
          type: 'error',
          duration: 5 * 1000
        })
        break
    }
    return Promise.reject(res.data)
  }
)

export default service
