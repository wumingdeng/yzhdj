import cfg from '../../static/webConfig.json'

var wxAuth = {    
	isweixin: function() {
        var ua = window.navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
            return true;
        } else {
            return false;
        }
    },
	auth:function() {
        var authPath = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + cfg.appId + '&redirect_uri=' + encodeURIComponent(cfg.webAddress) + '?page=' + localStorage.page + '&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect'
        console.log('授权地址:' + authPath)
        window.location.href = authPath
	}
}

export default wxAuth;