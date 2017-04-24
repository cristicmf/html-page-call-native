/**
 *通用url默认值
 * @type {Object}
 */
export const basicUrl = {
  ua: '',
  UA_IOS_REG: /\b(iPad|iPhone|iPod)\b.*? OS ([\d_]+)/,
  UA_ANDROID_REG: /\bAndroid([^;]+)/,
  UA_WX_REG: /MicroMessenger/,
  UA_WEIBO_REG: /\bWeibo|__weibo__\d/,
  UA_QZONE_REG: /Qzone\//,
  UA_QQ_REG: /QQ\//,
  URL_DOWNLOAD_DETAIL_ANDROID: 'xunleiapp://xunlei.com?',
  URL_DOWNLOAD_DETAIL_IOS: 'ithunder://m.xunlei.com?',
  URL_LIST_ANDROID_CALL: 'xunleiapp://xunlei.com',
  URL_LIST_IOS_CALL: 'ithunder://m.xunlei.com',
  URL_DOWNLOAD_ANDROID: 'http://m.down.sandai.net/mobile/thunder-5.33.2.4660-default-release-mobile_share_homepage_yingyongbao.apk',
  URL_DOWNLOAD_ANDROID_WX: 'http://a.app.qq.com/o/simple.jsp?pkgname=**',
  URL_DOWNLOAD_IOS: 'https://itunes.apple.com',
  URL_DOWNLOAD_IOS_WX: 'http://a.app.qq.com/o/simple.jsp?pkgname=**',
  URL_DOWNLOAD_PC: 'http://mobile.xunlei.com',
  shareTips: 'http://**/shareTips.html'
}

/**
 * 重新设置页面url信息
 * @param {object} urlMsg 参数
 * @return
 */

export const resetUrl = (urlMsg) => {
  const androidDetailUrl = urlMsg.androidCallappUrl.schema + urlMsg.androidCallappUrl.rounter + urlMsg.androidCallappUrl.param
  const iosDetailUrl = urlMsg.iosCallappUrl.schema + urlMsg.iosCallappUrl.rounter + urlMsg.iosCallappUrl.param
  const getDetailUrl = {
    ua: '',
    UA_IOS_REG: /\b(iPad|iPhone|iPod)\b.*? OS ([\d_]+)/,
    UA_ANDROID_REG: /\bAndroid([^;]+)/,
    UA_WX_REG: /MicroMessenger/,
    UA_WEIBO_REG: /\bWeibo|__weibo__\d/,
    UA_QZONE_REG: /Qzone\//,
    UA_QQ_REG: /QQ\//,
    URL_DOWNLOAD_DETAIL_ANDROID: androidDetailUrl,
    URL_DOWNLOAD_DETAIL_IOS: iosDetailUrl,
    URL_LIST_ANDROID_CALL: urlMsg.androidCallappUrl.schema,
    URL_LIST_IOS_CALL: urlMsg.iosCallappUrl.schema,
    URL_DOWNLOAD_ANDROID: urlMsg.androidCallappUrl.downloadUrl,
    URL_DOWNLOAD_ANDROID_WX: urlMsg.androidCallappUrl.yingyongbaoUrl,
    URL_DOWNLOAD_IOS: urlMsg.iosCallappUrl.downloadUrl,
    URL_DOWNLOAD_IOS_WX: urlMsg.iosCallappUrl.yingyongbaoUrl,
    URL_DOWNLOAD_PC: 'http://mobile.xunlei.com',
    shareTips: 'http://**/shareTips.html' + urlMsg.iosCallappUrl.param
  }
  return getDetailUrl
}

/**
 * 设置当前平台信息
 * @param  {string} ua
 * @param  {obj} appUrl
 * @return {obj} util
 */
export const platForm = (ua, appUrl) => {
  const util = {
    listUrl: '',
    downUrl: '',
    detailUrl: '',
    wxUrl: appUrl.URL_DOWNLOAD_ANDROID_WX,
    shareMiddleUrl: appUrl.shareTips,
    pcUrl: appUrl.URL_DOWNLOAD_PC,
    dataJson: '',
    isIOS: appUrl.UA_IOS_REG.test(ua),
    isIOS9: appUrl.UA_IOS_REG.test(ua) && /OS 9/.test(ua),
    isIOS10: appUrl.UA_IOS_REG.test(ua) && /OS 10/.test(ua),
    isAndroid: appUrl.UA_ANDROID_REG.test(ua),
    isWx: appUrl.UA_WX_REG.test(ua),
    isWeibo: appUrl.UA_WEIBO_REG.test(ua),
    isQzone: appUrl.UA_QZONE_REG.test(ua),
    isQQ: appUrl.UA_QQ_REG.test(ua)
  }
  return util
}
/**
 * 获取页面的详细信息
 * @param  {obj} util
 * @param  {obj} appUrl
 * @return {obj}
 */
export const getDetailPageCallUrl = (util, appUrl) => {
  util.detailUrl = util.isAndroid ? appUrl.URL_DOWNLOAD_DETAIL_ANDROID : appUrl.URL_DOWNLOAD_DETAIL_IOS
  return util
}

/**
 * 设置公共地址，如首页和下载地址
 * @param  {obj} util
 * @param  {obj} appUrl
 * @return {obj} util
 */
export const getCommonUrl = (util, appUrl) => {
  util.shareUrl = appUrl.shareTips
  util.wxUrl = ''
  if (util.isIOS) {
    util.listUrl = appUrl.URL_LIST_IOS_CALL
    util.downUrl = appUrl.URL_DOWNLOAD_IOS
    if (util.isWeibo) {
      util.shareUrl = appUrl.shareTips
      util.downUrl = appUrl.URL_DOWNLOAD_IOS
    } else {
      if (util.isWx || util.isQQ || util.isQzone) {
        util.wxUrl = appUrl.URL_DOWNLOAD_IOS_WX
        util.downUrl = appUrl.URL_DOWNLOAD_IOS_WX
      }
    }
  } else {
    if (util.isAndroid) {
      util.listUrl = appUrl.URL_LIST_ANDROID_CALL
      util.downUrl = appUrl.URL_DOWNLOAD_ANDROID
      if (util.isWx) {
        util.wxUrl = appUrl.URL_DOWNLOAD_ANDROID_WX
        util.shareUrl = appUrl.shareTips
      }
    } else {
      util.listUrl = appUrl.URL_DOWNLOAD_PC
      util.downUrl = appUrl.URL_DOWNLOAD_PC
    }
  }
  return util
}
/**
 * 微信调起方式
 * @param url
 * @param downloadUrl
 * @constructor
 */
export const WxCallAPP = (url, downloadUrl, type) => {
  console.log('[window.location.href]' + url)
  // window.location.href = url
  window.location = url
}
/**
 * iframe调起app
 * @param url
 * @param downloadUrl
 */
export const iframeCallAPP = (url, downloadUrl, ios9Type) => {
  console.log('[iframeCallAPP]')
  var timeout
  var t = Date.now()
  var interval = ios9Type ? 2500 : 1000
  timeout && clearTimeout(timeout)
  timeout = setTimeout(function () {
    if (Date.now() - t < interval + 1000) {
      location.href = downloadUrl
    }
  }, interval)
  if (ios9Type) {
    location.href = url
  }
  var docNode = document
  var iframe = docNode.createElement('iframe')
  iframe.setAttribute('src', url)
  // iframe.setAttribute('target', '_self');
  iframe.setAttribute('style', 'display:none')
  docNode.body.appendChild(iframe)
  setTimeout(function () {
    docNode.body.removeChild(iframe)
  }, 200)
}
/**
 * location方式调起app
 * @param url
 * @param downloadUrl
 */
export const locationCallAPP = (url, downloadUrl, ios9Type) => {
  console.log('[locationCallAPP]', url)
  location.href = url
  var timeout
  var t = Date.now()
  var interval = ios9Type ? 2500 : 1000
  timeout && clearTimeout(timeout)
  timeout = setTimeout(function () {
    if (Date.now() - t < interval + 1000) {
      location.href = downloadUrl
    }
  }, interval)
}
/**
 * 设置平台的调起方式
 * @param  {obj} platfromData
 * @return {[type]}
 */
export const selectCallAPP = (platfromData) => {
  const url = platfromData.detailUrl
  const downloadUrl = platfromData.downUrl
  const shareUrl = platfromData.shareUrl
  const wxUrl = platfromData.wxUrl
  switch (true) {
    case platfromData.isIOS && platfromData.isWx:
      console.log('[platfromData.isIOS && platfromData.isWx]')
      WxCallAPP(wxUrl, downloadUrl, platfromData.isIOS)
      break
    case platfromData.isIOS && platfromData.isWeibo:
      console.log('[platfromData.isIOS && platfromData.isWeibo]')
      locationCallAPP(shareUrl, downloadUrl, platfromData.isIOS9)
      break
    case platfromData.isIOS && platfromData.isQQ:
      console.log('[platfromData.isIOS && platfromData.isQQ]')
      iframeCallAPP(url, downloadUrl, platfromData.isIOS9)
      break
    case platfromData.isIOS && platfromData.isQzone:
      console.log('[platfromData.isIOS && platfromData.isQzone]')
      iframeCallAPP(url, downloadUrl, platfromData.isIOS9)
      break
    case platfromData.isIOS9:
      console.log('[platfromData.isIOS9]')
      iframeCallAPP(url, downloadUrl, platfromData.isIOS9)
      break
    case platfromData.isIOS10:
      console.log('[platfromData.isIOS9]')
      iframeCallAPP(url, downloadUrl, platfromData.isIOS10)
      break
    case platfromData.isIOS:
      console.log('[platfromData.isIOS]')
      locationCallAPP(url, downloadUrl, platfromData.isIOS9)
      break
    case platfromData.isAndroid && platfromData.isWx:
      console.log('[platfromData.isAndroid && platfromData.isWx]')
      locationCallAPP(wxUrl, wxUrl, platfromData.isAndroid)
      break
    case platfromData.isAndroid && platfromData.isWeibo:
      console.log('[platfromData.isAndroid && platfromData.isWeibo]')
      locationCallAPP(shareUrl, downloadUrl, platfromData.isAndroid)
      break
    case platfromData.isAndroid && platfromData.isQzone:
      console.log('[platfromData.isAndroid && platfromData.isQzone]')
      locationCallAPP(url, downloadUrl, platfromData.isAndroid)
      break
    case platfromData.isAndroid && platfromData.isQQ:
      console.log('[platfromData.isAndroid && platfromData.isQQ]')
      locationCallAPP(url, downloadUrl, platfromData.isAndroid)
      break
    case platfromData.isAndroid:
      console.log('[platfromData.isAndroid]')
      locationCallAPP(url, downloadUrl, platfromData.isAndroid)
      break
    default:
      break
  }
}

/**
 * 设置调起当前分享APP平台信息，设置调起平台的详细地址,选择调起app的方式
 * @param  {obj} ua
 * @param  {urlMsg} urlMsg
 * @return {[type]}
 * 详情页传参数
 */
export const callApp = (param) => {
  let ua = window.navigator.userAgent
  let urlMsg = {}
  if ((param !== null) && param.iosCallappUrl && param.androidCallappUrl && param.iosCallappUrl.schema !== '' && (param.androidCallappUrl.schema !== '')) {
    urlMsg = param
  } else {
    urlMsg = {
      iosCallappUrl: {
        schema: 'xllive://xunlei.com/',
        rounter: '?',
        param: '',
        yingyongbaoUrl: 'http://a.app.qq.com/o/simple.jsp?pkgname=',
        downloadUrl: 'https://itunes.apple.com'
      },
      androidCallappUrl: {
        schema: 'xunleiapp://xunlei.com/',
        rounter: 'hotResource?',
        param: 'type=5',
        yingyongbaoUrl: 'http://a.app.qq.com/o/simple.jsp?pkgname=',
        downloadUrl: 'http://m.down.sandai.net/MobileThunder/Android_5.34.2.4700/XL9_AD_login.apk'
      }
    }
  }

  const appUrl = resetUrl(urlMsg)
  const platFormMsg = platForm(ua, appUrl)
  const commonUrlMsg = getCommonUrl(platFormMsg, appUrl)
  const detailUrlMsg = getDetailPageCallUrl(commonUrlMsg, appUrl)
  selectCallAPP(detailUrlMsg)
}

export const setPlatfrom = () => {
  let ua = window.navigator.userAgent
  const platFormMsg = platForm(ua, basicUrl)
  return platFormMsg
}
