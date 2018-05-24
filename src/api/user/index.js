import instance from './instance'
import { convertRESTAPI } from '../util'

// 用户删除
function user_delete_post(opts) {
  return instance({
    method: 'post',
    url: '/user/delete',
    opts: opts
  })
}

// 完整的测试例子
function user_test_get(opts) {
  return instance({
    method: 'get',
    url: '/user/test',
    opts: opts
  })
}

// xxx
function test_list_get(opts) {
  return instance({
    method: 'get',
    url: '/test/list',
    opts: opts
  })
}

// 获取优惠券
function user_getCoupone_get(opts) {
  return instance({
    method: 'get',
    url: '/user/getCoupone',
    opts: opts
  })
}

// 用户退出
function user_logout_post(opts) {
  return instance({
    method: 'post',
    url: '/user/logout',
    opts: opts
  })
}

// 用户登录
function user_login_post(opts) {
  return instance({
    method: 'post',
    url: '/user/login',
    opts: opts
  })
}

// 啊实打实大
function restful_id_list_get(opts) {
  return instance({
    method: 'get',
    url: convertRESTAPI('/restful/:id/list', opts),
    opts: opts
  })
}

// 用户列表
function user_items_get(opts) {
  return instance({
    method: 'get',
    url: '/user/items',
    opts: opts
  })
}

// 用户信息
function user_info_get(opts) {
  return instance({
    method: 'get',
    url: '/user/info',
    opts: opts
  })
}
export {
  user_delete_post,
  user_test_get,
  test_list_get,
  user_getCoupone_get,
  user_logout_post,
  user_login_post,
  restful_id_list_get,
  user_items_get,
  user_info_get
}
