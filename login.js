let userInfoToken = '';
let locationUrl = '';
let isPreView = false;
let shareLink = [];
let aCode = 'ACODE';
let activityID = '';
let loadingToast = null;
let baseUrl = 'https://test-mp-server.bfemusic.com';
var headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json;charset=UTF-8',
    'Authorization': 'Bearer ',
    'OrganizationCode': ''
 };
function init(aData) {
    userInfoToken = localStorage.getItem("menber_center_token");
    let wxCode = this.getQueryVariable("code");
    headers.Authorization = 'Bearer ';
    if(userInfoToken){ //登录过
        headers.Authorization = headers.Authorization + userInfoToken;
        return Promise.resolve()
        // this.getButType();
    }else if(!userInfoToken && !wxCode){ //没有登录过  跳转微信授权
        closeLoading();
        window.location.replace(
            "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
            aData.appid +
            "&redirect_uri=" +
            encodeURIComponent(location.href) +
            "&response_type=code&scope=snsapi_userinfo&state=&component_appid="+ aData.marketComponentAppId +"#wechat_redirect"
        );
    }else if(!userInfoToken && wxCode){ //有code就去登录
        axios({
            method: 'get',
            url:  baseUrl + '/login/login?appid=' + aData.appid + '&code=' + wxCode,
        }).then(res => {
            localStorage.setItem('hasAccount',res.data.data.hasAccount);
            localStorage.setItem("menber_center_token",res.data.data.token);
            window.location.replace(locationUrl);
        }).catch(error => {
            closeLoading();
        });
    }
}

function fetchLocation(a_ID) {
    shareLink = [];
    showLoading();
    let sCodeRouterId = getQueryVariable('sCode'); 
    activityID = getQueryVariable(a_ID);
    if(sCodeRouterId){
        aCode = sCodeRouterId;
        isPreView = true;
    } else {
        let lUrl =  location.href;
        locationUrl =  lUrl.replace(location.search, "") ;
        shareLink.push(locationUrl);
        if(activityID){
            locationUrl += '?' + a_ID + '=' + activityID;
        }else{
            activityID = '';
        }
        shareLink.push(locationUrl);
    }
}

function getQueryVariable(variable){
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i=0;i<vars.length;i++) {
        let pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}
function showLoading() {
    if (!loadingToast) {
        loadingToast = vant.Toast.loading({
            message: "加载中...",
            mask: true,
            duration: 0,       // 持续展示 toast
        });
    }
}
function closeLoading() {
    if (loadingToast) {
        loadingToast.clear();
        loadingToast = null;
    }
}
function aass() {
    if (loadingToast) {
        loadingToast.clear();
        loadingToast = null;
    }
}