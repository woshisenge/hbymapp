//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    phone:'',
    password:''
  },
  onLoad: function () {
    console.log()
  },
  start:function(){
    util.navigateTo("../register/register");
  },
  bindUsername: function(e) {
    this.setData({
      phone: e.detail.value
    });
  },
  bindPassword: function (e) {
    this.setData({
      password: e.detail.value
    });
  },
  showTopTips:function(){
		var data = {
			PHONE: this.data.phone,
			PASSWORD: this.data.password
		}
		console.log(data)
		// 登录成功
    util.sendRequest('/wechat/applet/api/tologin_new', data, "POST", true, function (res){
			if (res.hasErrors) {
				console.log(res.errorMessage);
				return false;
			}
			// 把登录信息存到本地缓存
			wx.setStorageSync('userInfo', res)
			wx.switchTab({
				url: '/pages/person/person'
			})
    })
  }
})
