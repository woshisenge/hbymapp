// pages/person/power/power.js
var util = require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    grids: [
      { src: '/images/quanxian01.png', title: '模拟填报',url:"/pages/analog/analog" },
      { src: '/images/quanxian02.png', title: '智能推荐',url:"/pages/intelligence/intelligence" },
      { src: '/images/quanxian03.png', title: '院校咨询',url:"/pages/consult/consult" },
      { src: '/images/quanxian04.png', title: '专家咨询'},
      { src: '/images/quanxian06.png', title: '性格测试' }, 
      { src: '/images/quanxian07.png', title: '名师大讲堂' },
    ],
    isReg: false,
    isLoaded: false,
    vipname: "普通会员"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    util.sendRequest("/wechat/applet/user/isvip", {}, "POST", true, function(res){
      that.setData({
        isLoaded: true,
        isReg: res.data
      });

      if(that.data.isReg) {
        util.sendRequest("/wechat/applet/user/getvip", {}, "POST", false, function (obj) {
          if (obj.data == "UA") {
            that.setData({
              vipname: "白银会员"
            });
          }
          else if (obj.data == "UB") {
            that.setData({
              vipname: "黄金会员"
            });
          }
          else if (obj.data == "UC") {
            that.setData({
              vipname: "黑钻会员"
            });
          }
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
  onShareAppMessage: function () {
  
  },
  formSubmitForReg: function(e) {
    util.sendRequest("/wechat/applet/user/vip", e.detail.value, "POST", true, function(res){
      util.showSuccess();
      wx.navigateBack({
        delta: 1
      })
    });
  }
})