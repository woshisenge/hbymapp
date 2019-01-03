// pages/forgetPassword/forgetPassword.js
var util = require('../../utils/util.js');
var codeTimer = null;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    codeHidden: true,
    timerNumber:60,
    phone:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getSMSCode: function () {
    var that = this;
    if (!that.data.phone || that.data.phone == null || that.data.phone == "") {
      util.showError("手机号码不能为空！");
      return false;
    }
    var reg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!reg.test(that.data.phone)) {//如果手机号码的格式与正则的不符合，就提醒
      util.showError("请检查获取验证码的手机号！");
      return false;
    }
    var data = {
      PHONE: that.data.phone
    }
        util.sendRequest("/wechat/applet/user/getsmscode", data, "POST", true, function (res) {
          that.setData({
            codeHidden: !that.data.codeHidden,
            timerNumber: 60
          });
          codeTimer = setInterval(that.codeTimerFn, 1000)
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
    var that = this;
    var param = e.detail.value;
    param.MAJORTYPE = that.data.style;
    if (param.PHONE == "") {
      util.showError("手机号不能为空");
      return false;
    }
    if (param.CODE == "") {
      util.showError("验证码不能为空");
      return false;
    }
    if (param.PASSWORD == "" || param.PASSWORD.length < 6) {
      util.showError("密码不能为空,且长度为 6 ~ 16 位");
      return false;
    }
    // param.CITY = that.data.thisCity.DIC_ID
    // param.COUNTY = that.data.thisCounty.DIC_ID
    // param.SCHOOL_BELONG = that.data.thisSchool.DIC_ID
    // param.SCHOOL_NAME = that.data.thisSchool.NAME
    // param.EXAMYEAR = that.data.thisYear.uid
    // console.log(param)
    util.sendRequest("/plant/api/forget2_new", param, "POST", true, function (res) {
      if (res.hasErrors) {
        console.log(res.errorMessage);
        util.showError(res.errorMessage);
        return false;
      }
      console.log(res)
      that.openAlert()
    });
  },
  openAlert: function () {
    wx.showModal({
      content: '重置成功,请重新登录',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          wx.navigateBack({
            delta: 1
          })
        }
      }
    });
  },
  inputPhone: function (e) {
    this.setData({
      phone: e.detail.value
    });
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
  onShareAppMessage: util.gdForward
})