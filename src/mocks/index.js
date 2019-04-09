/**
 * @module mocks 配置mocks
 * @author xiedrsz
 * @since 2018.09.04
 */
import wepy from 'wepy'
import Mock from 'mockjs'

import Apis from './Apis'
import { Server, Path } from './Path'
import userInfo from './userInfo'
import Check from '@/libs/check'
import _ from 'lodash'

const Responses = Object.assign({}, userInfo)

export default {
  install () {
    let request = wepy.request
    wepy.request = async obj => {
      // 校验
      let err = false
      let data = obj.data || {}
      let props = obj.props || {}
      let api = obj.api || ''
      let item = Path[api] || {}
      let path = item.path || ''
      let param = obj.param || item.param || []
      data = _.pick(data, param)
      props = _.pick(props, param)
      new Check(data, props).then(res => {
        err = res
      })
      if (err) {
        console.log(err)
        return Promise.reject(err)
      }
      if (~Apis.indexOf(api)) {
        return new Promise((resolve, reject) => {
          let pattern = Responses[api]
          let res = Mock.mock(pattern)
          resolve({
            ...res,
            Server: 'mocks'
          })
          // reject(false)
        })
      } else {
        obj.url = `${Server}${path}`
        obj.data = data
        if (api !== 'getOpenid') {
          // Todo 验证登录状态
          // await checkSession()
        }
        return request(obj)
      }
    }
  }
}
