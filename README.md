# HTML5页面调起原生APP
#### android、ios调起的方式
##### Schame + Android Itent
##### Schema ＋　Universal links（IOS9+）

#### 调用的方式
 <a href="ftnn:login">拉起手雷</a>
 <iframe src="ftnn:login"></iframe>
 window.location.href= "ftnn:login";
由于无法确定是否安装了客户端，因此通过window.location = schema的方式可能导致浏览器跳转到错误页；所以通过iframe.src或a.href载入schema是目前比较常见的方法；

####  特例：微信
<meta name="apple-itunes-app" content="app-id=,app-argument=">
#### 遇到的问题：不知道手机有没有安装app
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
