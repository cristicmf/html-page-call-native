import { callApp } from './callapp'
import { getAge, getAstro, dateBeforeAfter, convertIntToStr, convertStrToInt, getDate } from './formatDateTime'

/**
* @function getParams 获取URL地址
* @param  {String} key = '' {字段名}
* @return {String|Null}
*/
const getParams = (key = '') => {
  if (key === '') {
    return null
  }
  const params = location.search.substring(1).split('&')
  const length = params.length
  for (let i = 0; i < length; i++) {
    const param = params[i].split('=')
    if (param[0] === key) {
      return param[1]
    }
  }
  return null
}
/**
 * 计算当期
 * @param  {[type]} count [description]
 * @return {[type]}       [description]
 */
const formatNumber = (count) => {
  // 数值超过一万时单位显示为万，保留1位小数。小数为0时，不显示小数
  if (count === undefined || count === null) {
    return 0
  }
  let formatCount = count
  if (count < 10000) {
    formatCount = count
  } else {
    count = (count / 10000).toFixed(1)
    formatCount = (count % 1 === 0 ? count : count) + '万'
  }
  return formatCount
}

export const addBodyStyle = () => {
  // ipad 样式兼容
  var ua = navigator.userAgent.toLowerCase()
  if (/pad/.test(ua)) {
    document.querySelector('body').classList.add('ispad')
  }
  // 区分ios和安卓端
  if ((ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1)) {
    console.log('[bAndroid it is Android]')
    document.querySelector('body').classList.add('isandroid')
    console.log(document.querySelector('body').classList)
  }
}

export {
  callApp,
  getParams,
  getAge, // 获取年龄
  getAstro, // 获取星座
  dateBeforeAfter, // 多少之前
  convertIntToStr, // 0s转成00:00
  convertStrToInt, // 00:00转成0s
  formatNumber,
  getDate // timestamp转成 y年m月d日
}
