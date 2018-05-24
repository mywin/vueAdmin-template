// .easy-mock.js
module.exports = {
  host: 'http://113.6.252.23:7300',
  // 产出到项目下的 api 目录，不用手动创建
  output: 'src/api',
  // 基于 easy-mock-templates 提供的 axios 模板
  template: './easymock',
  projects: [
    {
      // 例：58fef6ac5e43ae5dbea5eb53
      id: '5afe8114556479e77d329dc4',
      // 该项目下的 API 生成之后会被放到 api/user 目录下
      name: 'user'
    }
  ]
}
