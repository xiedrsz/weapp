import wepy from 'wepy'
import { getStore } from 'wepy-redux'

// 获取 store 实例
const store = getStore()

let common = {}
// 订阅，获取 userInfo
store.subscribe(() => {
  let state = store.getState()
  common = state.common
})

// 下载图片
export const downImgFile = () => {
  let openId = common.webCnf
  return wepy.request({
    api: 'downImgFile',
    data: {
      openId
    }
  }).then(res => {
    return res
  })
}
