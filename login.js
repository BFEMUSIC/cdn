function init() {
    this.userInfoToken = localStorage.getItem("menber_center_token");
    let wxCode = this.getQueryVariable("code");
    this.headers.Authorization = 'Bearer ';
    if(this.userInfoToken){ //登录过
        this.headers.Authorization = this.headers.Authorization + this.userInfoToken;
        console.log('xx');
        return Promise.resolve()
    }else if(!this.userInfoToken && !wxCode){ //没有登录过  跳转微信授权
        this.closeLoading();
        window.location.replace(
            "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
            this.aData.appid +
            "&redirect_uri=" +
            encodeURIComponent(location.href) +
            "&response_type=code&scope=snsapi_userinfo&state=&component_appid="+ this.aData.marketComponentAppId +"#wechat_redirect"
        );
    }else if(!this.userInfoToken && wxCode){ //有code就去登录
        axios({
            method: 'get',
            url:  this.baseUrl + '/login/login?appid=' + this.aData.appid + '&code=' + wxCode,
        }).then(res => {
            localStorage.setItem("menber_center_token",res.data.data.token);
            window.location.replace(this.locationUrl);
        }).catch(error => {
            this.closeLoading();
        });
    }
}