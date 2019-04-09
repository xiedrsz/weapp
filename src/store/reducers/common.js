import { handleActions } from 'redux-actions'

export default handleActions({
  // 设置webView
  SET_WEBVIEW (state, action) {
    let {url, title} = action
    return {
      ...state,
      webCnf: {
        url,
        title
      }
    }
  }
}, {
  // webview
  webCnf: {
    url: 'https://www.baidu.com',
    title: '百度一下'
  }
})
