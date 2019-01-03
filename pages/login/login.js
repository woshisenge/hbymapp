//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    phone:'',
    password:''
  },
  onLoad: function () {
		// 获取session_id
     util.login()
  },
  start:function(){
    util.navigateTo("../register/register");
  },
  forget: function () {
    util.navigateTo("../forgetPassword/forgetPassword");
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
		// 登录到数据库
    util.sendRequest('/wechat/applet/api/tologin_new', data, "POST", true, function (res){
      // 关联登录
      util.sendRequest('/wechat/applet/api/relation', data, 'POST', true, function (obj) {
        if (res.hasErrors) {
          wx.showModal({
            content: res.errorMessage,
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                return false
              }
            }
          })
          return false;
        }
        // 把登录信息存到本地缓存
        wx.setStorageSync('userInfo', res)
        wx.switchTab({
          url: '/pages/index/index'
        })
      })
    })
  },
  onShareAppMessage: util.gdForward
})
