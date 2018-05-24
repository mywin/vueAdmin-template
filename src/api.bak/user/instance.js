import { createAPI } from '../util'
import config from '../config'
const baseUrl = {
  mock: 'http://113.6.252.23:7300/mock/5afe8114556479e77d329dc4/ucenter',
  dev: '',
  pre: '',
  prod: ''
}[config.env || 'mock']
export default createAPI(baseUrl)
