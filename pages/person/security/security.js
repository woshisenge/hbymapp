// pages/person/security/security.js
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isRealName: true,
    isPhone: true,
    isEmail: true,
    isTrade: true
  },
  loginpw:function(){
    util.navigateTo("../../person/security/loginpw/loginpw")
  },
  paymentpw:function(){
    util.navigateTo("../../person/security/paymentpw/paymentpw")
  },
  phone:function(){
    util.navigateTo("../../person/security/phone/phone")
  },
  email:function(){
    util.navigateTo("../../person/security/email/email")
  },
  authentication:function(){
    util.navigateTo("../../person/security/authentication/authentication")
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    var that = this;
    util.sendRequest("/wechat/applet/user/getsecurityinfo", {}, "POST", true, function(res){
      that.setData({
        isRealName: res.isRealName,
        isPhone: res.isPhone,
        isEmail: res.isEmail,
        isTrade: res.isTrade
      });
    });
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