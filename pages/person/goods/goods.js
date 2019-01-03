// pages/person/goods/goods.js
var util = require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    role:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    util.sendRequest("/wechat/applet/user/getbelongitems", {}, "POST", true, function (res) {
      if (options.role == 1) {
        that.setData({
          BALANCE: res.BALANCE + "个",
          yxzxk: "无限",
          mntbk: "无限",
          zntjk: "无限"
        })
      }
      else {
        that.setData({
          BALANCE: res.BALANCE + "个",
          yxzxk: res.yxzxk,
          mntbk: res.mntbk,
          zntjk: res.zntjk
        });
      }
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
  onShareAppMessage: util.gdForward,
  pay:function(){
    util.navigateTo("/pages/person/goods/payment/payment")
  },
})
