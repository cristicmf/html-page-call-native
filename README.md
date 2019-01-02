# HTML5 call native app
## 1. 背景

为了提升app的曝光和app的用户新增，添加H5分享页的应用场景是必不可少的，但是各种平台环境不一，要如何兼容和策略处理。

### 1.1 背景知识说明：
- `JsBridge`: 一种用来连接Web和Native的技术方案，让Native端(Swift, OC, Java)和Web端(JavaScript)可以互相调用。
- `webview`: Native组件，有类似浏览器的功能。

所以混合开发的本质就是将一些 `Native` 的 `UI` 替换成`webview` ，`webview` 的内容可以由前端开发，和开发Web App差不多，而和Web App相比，这些webview里的html5页面需要和Native`通信`。

### 1.2 Native调用Js

ios通过 `webview` 的 `stringByEvaluatingJavaScriptFromString`实现，本质是调用window下的方法。

```
// Swift
webview.stringByEvaluatingJavaScriptFromString("Math.random()")  
// OC
[webView stringByEvaluatingJavaScriptFromString:@"Math.random();"];
```


android
通过 `webview` 的 `loadUrl` 进行调用。

```
// 调用js中的JSBridge.trigger方法
webView.loadUrl("javascript:JSBridge.trigger('webviewReady')");  
```

### 1.3 Js调用Native
ios
通过`拦截webview`里的请求来实现。通过`Web和Native约定好的自定义协议`(在ios里叫`scheme`)进行通信。
android和ios一样通过自定义协议进行通信。

安卓可以直接向webview中注入全局对象，所以注入后，页面里的`Js可以直接调用`。
安卓的`webview层`还可以重写`prompt`, `console.log`, `alert`这三个方法。

### 1.4 本文章主要内容：

```
1. 调起原生`app`，然后`下载APP`
2. 不同平台的兼容和策略处理，比如微信,微博，QQ，QQ空间，浏览器
3. 在原生app的webview中，页面调用原生的接口
4. 其他框架的比较
5. Native App和混合式页面比较
```

---

## 2. HTML5页面调起原生APP
`android`、`ios` 调起的方式
2. Schame + Android Itent
3. Schema ＋　Universal links（IOS9+）

### 2.3 调用的方式

协议说明:
```
[scheme]://[host]/[path]?[query]
[scheme]://[host]/[path]?param1=1&param2=2 是页面和App的协议
```

例子：

```
协议:protoxxx://share/page/?type=2
```

##### 1.  使用A标签
 <a href="protoxxx://share/page/?type=2">拉起APP</a>
 protoxxx://share/page/?type=2是页面和App的协议
 
##### 2. 使用iframe
 <iframe src="protoxxx://share/page/?type=2"></iframe>
 protoxxx://share/page/?type=2是页面和App的协议
 
##### 3. 使用 window.location.href
 ```
 window.location.href= "protoxxx://share/page/?type=2";
 ```
 说明：
 由于无法确定是否安装了客户端，因此通过window.location = schema的方式可能导致浏览器跳转到错误页；所以通过iframe.src或a.href载入schema是目前比较常见的方法；



### 2.4 代码实现
 
#### 2.4.1 location 拉起方式
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
```
#### 2.4.2 iframe 方式
```
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
说明：

---

###  2.5 特殊场景说明
特殊app的场景，需要采用特定的处理策略，例如：微信、微博

1.微信
- 应用宝deeplink

2. 微博
- 中间提示页：类似于微信中常见的“请在浏览器打开”


### 2.6 遇到的问题：网页没有办法判断手机是否安装app

尝试调起APP，如果不能，使用setTimeout进行下载，所以需要进行处理，如下图：
 
 ```
    $(document).on('visibilitychange webkitvisibilitychange', function() {
                var tag = document.hidden || document.webkitHidden;
                if (tag) {
                    clearTimeout(timer);
                }
            })

        $(window).on('pagehide', function() {
            clearTimeout(timer);
        })
        
```       

说明：

```
1. 当手机安装了App，能调起app后就不进行下载
2. 没有安装App,过了一段时间，进行下载
```

### 2.8 ios universal link


## 3. 混合开发
混合开发的本质就是将一些 `Native` 的 `UI` 替换成`webview` ，`webview` 的内容可以由前端开发，和开发Web App差不多，而和Web App相比，这些webview里的html5页面需要和Native`通信`。详细内容见第一章节。

### H5 接入 App通常有两种方式
#### 3.1 在线H5  

这是最常见的一种方式。需要提前约定好scheme和页面url,并将H5代码部署到服务器上。当用WebView 加载并打开URL，即可访问页面。

##### 优点:

```

- 独立性强，有非常独立的开发/调试/更新/上线能力；
- 资源放在服务器上，完全不会影响客户端的包体积；
- 接入成本很低，完全的热更新机制。
- 页面更新，不依赖于客户端

```

##### 缺点:

```

- 完全的网络依赖，在离线的情况下无法打开页面；
- 首屏加载速度依赖于网络，网络较慢时，首屏加载也较慢；

```

通常，这种方式更适用在一些比较轻量级的页面上，例如一些帮助页、提示页、使用攻略等页面。这些页面的特点是功能性不强，不太需要复杂的功能协议，且不需要离线使用。在一些第三方页面接入上，也会使用这种方式。

#### 3.2 内置包H5

本地化页面，需要提前约定好scheme和页面url,并将代码进行打包后下发到客户端，并由客户端直接解压到本地储存中。

###### 优点:
- 页面代码本地化，首屏加载速度快，用户体验更好；
- 可以不依赖网络，离线运行；

###### 缺点：
- 开发流程/更新机制复杂化，需要客户端，甚至服务端的共同协作；
- 会相应的增加`App`包体积；
- 更新页面代码，需要客户端发版

该方法适用于缓存一般不会改的公用代码库和一些版本。
这两种接入方式均有优缺点，根据不同场景进行选择。

---

## 4. React Native 框架
React Native使你只使用JavaScript也能编写原生移动应用。 它在设计原理上和React一致，通过声明式的组件机制来搭建丰富多彩的用户界面。React Native产出的并不是`混合应用`,最终产品是一个真正的移动应用，从使用感受上和用Objective-C或Java编写的应用相比几乎是无法区分的。 React Native所使用的基础UI组件和原生应用完全一致。

### 4.1 开发环境搭建
##### 推荐安装

```
- Node （v8.3 以上版本）
- watchman
- React Native 命令行工具
- JDK （1.8版本）
- Andriod Studio。

```

安卓开发见[具体操作详情](https://reactnative.cn/docs/getting-started/)

###### 说明：
可以使用任何编辑器来开发应用（编写 js 代码），但你仍然必须安装 Android Studio 来获得编译 Android 应用所需的工具和环境。可以使用模拟器、真机进行开发和测试。（推荐使用vscode开发js、连接使用真机）


###### 注意点：

```
1. 使用SDK1.8版本，否则会失败
2. 配置ANDROID_HOME，请每次操作完，务必检查
```

### 4.2 组件
项目架构或者组件分层类似于react.js，但是一些特殊的组件也是存在差异

#### 需要关注
1. 图片资源的引入，在android和ios端有差异


### 4.3 其他
1. 集成到原有react native，需要留意原来的版本

## 5. Weex框架



## 6. Native App和混合式页面比较

## 7. 注意事项 

###### 参数传递方式
由于 WebView 对 URL 会有长度的限制，当需要传递的参数过长时，可能会导致被截断，例如传递base64或者传递大量数据时。


## 8.参考

---
- 目前只支持vue2.0版本
- add new version

