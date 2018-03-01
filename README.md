# HTML5 call native app
## 背景
为了提升app的曝光和app的用户新增，添加H5分享页的应用场景是必不可少的，但是各种平台环境不一，要如何兼容和策略处理。下面会一一说明

## 1. 页面调起原生app
- 调起原生 app，然后下载APP
- 不同平台的兼容和策略处理，比如微信,微博，QQ，QQ空间，浏览器


## 2. HTML5页面调起原生APP
#### android、ios调起的方式
##### Schame + Android Itent
##### Schema ＋　Universal links（IOS9+）

## 3.调用的方式
 ##### 3.1  使用A标签
 <a href="ftnn:login">拉起APP</a>
 ftnn:login是页面和App的协议
 ##### 3.2 使用iframe
 <iframe src="ftnn:login"></iframe>
 ftnn:login是页面和App的协议
 ##### 3.3 使用 window.location.href
 window.location.href= "ftnn:login";
 ftnn:login是页面和App的协议
 - 说明：由于无法确定是否安装了客户端，因此通过window.location = schema的方式可能导致浏览器跳转到错误页；所以通过iframe.src或a.href载入schema是目前比较常见的方法；
 - 代码实现
 
 ```
 export const locationCallAPP = (url, downloadUrl, ios9Type) => {
  location.href = url
  var timeout
  var t = Date.now()
  var interval = ios9Type ? 2500 : 1000
  timeout && clearTimeout(timeout)
  timeout = setTimeout(function() {
    if (Date.now() - t < interval + 1000) {
      location.href = downloadUrl
    }
  }, interval)
}

export const iframeCallAPP = (url, downloadUrl, ios9Type) => {
  console.log('[iframeCallAPP1]'+url)
  var timeout
  var t = Date.now()
  var interval = ios9Type ? 2500 : 2000
  timeout && clearTimeout(timeout)
  timeout = setTimeout(function () {
    if (Date.now() - t < interval+1000) {
       console.log('[iframeCallAPP2]'+downloadUrl)
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

 ```

##  4. 特殊场景说明
##### 微信
- 应用宝deeplink

##### 微博
- 中间提示页
    - 类似于“请在浏览器打开”

## 5. 遇到的问题：网页没有办法判断手机是否安装app
    尝试调起APP，如果不能，使用setTimeout进行下载，所以需要进行处理，如下图：
    $(document).on('visibilitychange webkitvisibilitychange', function() {
                var tag = document.hidden || document.webkitHidden;
                if (tag) {
                    clearTimeout(timer);
                }
            })

        $(window).on('pagehide', function() {
            clearTimeout(timer);
        })
        
当手机安装了App，能调起app后就不进行下载
没有安装App,过了一段时间，进行下载
## 6.ios universal link

## 7.客户端实现

## 8.文件结构说明

