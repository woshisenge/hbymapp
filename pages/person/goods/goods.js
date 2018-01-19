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
    var role = "";
    util.sendRequest("/wechat/applet/user/getvip", {}, "POST", false, function (obj) {
      that.setData({
        role:obj.data
      })
    })
    util.sendRequest("/wechat/applet/user/getbelongitems", {}, "POST", true, function (res) {
      console.log(res)
      if(that.data.role == "UC"){
        that.setData({
          BALANCE: res.BALANCE + "个",
          yxzxk: "无限",
          mntbk: "无限",
          zntjk: "无限"
        })
      } 
      else{
        that.setData({
          BALANCE: res.BALANCE +"个",
          yxzxk: res.yxzxk + "张",
          mntbk: res.mntbk + "张",
          zntjk: res.zntjk + "张"
        });      
      }
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