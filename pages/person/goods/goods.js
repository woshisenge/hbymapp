// pages/person/goods/goods.js
var util = require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pocket: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  pay:function(){
     util.navigateTo("/pages/person/goods/payment/payment")
  },
  consult:function(){
    util.showError("系统正在维护中，该功能暂时无法使用~！")
  },
  intelligence:function(){
    util.showError("系统正在维护中，该功能暂时无法使用~！")
  },
  analog:function(){
    util.showError("系统正在维护中，该功能暂时无法使用~！")
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
    util.sendRequest("/wechat/applet/user/getbelongitems", {}, "POST", true, function (res) {
      that.setData({
        pocket: res
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
  onShareAppMessage: function () {
  
  }
})