/**
 * @module libs 第三方库
 * @author xiedrsz
 * @since 2018.09.04
 */
export * from './config'

// 睡眠
export const sleep = (s) => {
  return new Promise((resolve, reject) => {
    let timer = setTimeout(() => {
      clearTimeout(timer)
      resolve('promise resolved')
    }, s)
  })
}
