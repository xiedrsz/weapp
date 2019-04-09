// 校验类型
const checkType = {
  NotNull: /\S+/,
  NameC: /^[\u4E00-\u9FA5]+$/,
  NameE: /^[A-Za-z\s]+$/,
  Email: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
  TelePhone: /^[0-9]*$/
}

// 遍历对象
function each (obj, callback) {
  for (let i in obj) {
    if (callback.call(obj[i], i, obj[i]) === false) {
      break
    }
  }
}

// 单个检验
// Param item string 被检验值
// Param auth 测试对象
function checkItem (item, auth) {
  let reg = checkType[auth] || auth
  let type = toString.call(reg)
  if ((type === '[object Function]') || (type === '[object Object]')) {
    return reg(item)
  }
  if (item !== undefined && reg.test(item)) {
    return true
  }
  return false
}

/**
 * @class Check
 * @param {object} obj - 被校验对象
 * @param {object} props - 校验规则
 * @param {boolean} [isContinue = false] - 遇到错误后是否继续
 * @desc 数据校验类
 * @author xiedrsz
 * @since 2018.09.04
 */
class Check {
  constructor (obj, props, isContinue = false) {
    /**
     * @member {Array.<{label: string, msg: string}>}
     * @desc 消息列表
     */
    this.msgList = []
    this.flag = true
    let auth, messList, i, len, msg
    let self = this
    let checkObj = (obj, props, isContinue, index) => {
      each(props, (label, value) => {
        auth = value.auth
        messList = value.mess || [false]
        // 遇到对象数组
        if (toString.call(value) === '[object Array]') {
          let propArr = value[0]
          obj[label].forEach((item, index) => {
            checkObj(item, propArr, isContinue, index)
          })
          return true
        }

        // 正常情况
        len = auth.length
        for (i = 0; i < len; i++) {
          if (!checkItem(obj[label], auth[i])) {
            self.message = msg = (index !== undefined ? `${index}-` : '') + messList[i] || messList[0]
            self.msgList.push({label, msg})
            self.flag = false
            return isContinue
          }
        }
      })
    }
    checkObj(obj, props, isContinue)
  }

  /**
   * @desc 回调
   * @param {function} func - 错误处理函数.
   * @returns {(undefined|boolean)} 有错误则返回undefined, 没错误则返回 true
   */
  then (func) {
    if (!this.flag) {
      this.msgList.forEach(message => {
        func(message)
      })
    }
    return this.flag
  }
}

export default Check
