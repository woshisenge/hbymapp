// pages/person/security/phone/phone.js
var util = require('../../../../utils/util.js')
var codeTimer = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    codeHidden: true,
    timerNumber: 60,
		oldPhone: '',
    phone: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		var userInfo = wx.getStorageSync('userInfo')
		// console.log(userInfo)
		// 判断是否登录
		util.checkLogin()
		this.setData({
			oldPhone: userInfo.PHONE
		})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  inputPhone: function(e) {
    this.setData({
      phone: e.detail.value
    });
  },
  //获取短信验证码
  getSMSCode: function () {
    var that = this;
    if(!that.data.phone || that.data.phone == null || that.data.phone == ""){
      util.showError("新手机号不能为空！");
      return false;
    }
    util.sendRequest("/wechat/applet/user/getsmscode", { PHONE: that.data.phone }, "POST", true, function (res) {
      that.setData({
        codeHidden: !that.data.codeHidden,
        timerNumber: 60
      });

      codeTimer = setInterval(that.codeTimerFn, 1000);
    });
    

  },
  codeTimerFn: function () {
    var that = this;
    that.setData({
      timerNumber: that.data.timerNumber - 1
    });

    if (that.data.timerNumber == 0) {
      clearInterval(codeTimer);
      codeTimer = null;

      that.setData({
        codeHidden: !that.data.codeHidden
      });
    }
  },
  formSubmit: function (e) {
		util.sendRequest("/wechat/applet/user/binding/phone_new", e.detail.value, "POST", true, function (res) {
			wx.showModal({
				content: '保存成功',
				showCancel: false,
				success: function (res) {
					if (res.confirm) {
						// 跳转
						wx.navigateBack({
							delta: 1
						})
					}
				}
			})
    })
  },
})