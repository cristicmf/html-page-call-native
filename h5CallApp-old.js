;(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.H5CallApp = factory();
    }
})(this, function () {

    var ua = navigator.userAgent,
        UA_IOS_REG = /\b(iPad|iPhone|iPod)\b.*? OS ([\d_]+)/,
        UA_ANDROID_REG = /\bAndroid([^;]+)/,
        UA_WX_REG = /MicroMessenger/,
        UA_WEIBO_REG = /\bWeibo|__weibo__\d/,
        UA_QZONE_REG = /Qzone\//,
        UA_QQ_REG = /QQ\//;

    var util = {
    isIOS: UA_IOS_REG.test(ua),
    isIOS9: UA_IOS_REG.test(ua) && /OS 9/.test(ua),
    isIOS10: UA_IOS_REG.test(ua) && /OS 10/.test(ua),
    isAndroid: UA_ANDROID_REG.test(ua),
    isWx: UA_WX_REG.test(ua),
    isWeibo: UA_WEIBO_REG.test(ua),
    isQzone: UA_QZONE_REG.test(ua),
    isQQ: UA_QQ_REG.test(ua)
    }

    var schemaUrl='schemaUrl';


    var Urls = {
        getCallAPPUrl: function () {
            var detailUrl = util.isAndroid ? URL_DETAIL_ANDROID : URL_DETAIL_IOS;
            return detailUrl;
        },
        getDownloadUrl:function(){
            var downloadUrl = util.isAndroid ? URL_DOWNLOAD_ANDROID : URL_DOWNLOAD_IOS;
            return downloadUrl
        }
    };

    var Caller = function (el,data){
            //确定哪些平台是直接可以点击条状或者下载
            if (util.isWeibo || util.isQzone ) {
                    el.addEventListener('click', function(){
                        window.location = data.detailUrl;//data.downloadUrl
                    }, false);
            }
            else {
                el.setAttribute('href', 'javascript:');
                var timeout;
                /*
                * 1.有app的情况
                *   根据不同的平台可以以window.location跳转[平台间都有差异]
                *   或者是iframe方式进行跳转[平台间都有差异]
                * 2.没有app的情况
                *   有定时器，点击按钮能够进行直接下载app
                * */
                el.addEventListener('click', function() {
                    var t = Date.now();
                    var interval = util.isIOS9 ? 2500 : 1000;
                    timeout && clearTimeout(timeout);
                    timeout = setTimeout(function () {
                        if (Date.now() - t < interval + 200) {
                            location.href = data.downloadUrl;
                        }
                    }, interval);
                    if (util.isIOS9 || util.isIOS10) {
                        window.location = data.url
                    } else {
                        var iframe = document.createElement('iframe');
                        iframe.setAttribute('src', data.url);
                        iframe.setAttribute('style', 'display:none');
                        document.body.appendChild(iframe);
                        setTimeout(function () {
                            document.body.removeChild(iframe);
                        }, 200);
                    }
                });
            }
    };

    /*参数说明：
    * el  当前的选择器
    * param.detailUrl    调起详细地址
    * param.downloadUrl  app的下载地址
    * */
    new Caller(document.querySelector('#id'), {
        detailUrl: Urls.getCallAPPUrl(),
        downloadUrl: util.isAndroid ? URL_DOWNLOAD_ANDROID : URL_DOWNLOAD_IOS
    });

    return H5CallApp;
});

