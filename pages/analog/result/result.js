// pages/analog/analogs/result/result.js
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    results: [],
    param:""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      param:options
    })
    if(options.handleFlag == "1") {//模拟填报结果
      util.sendRequest("/wechat/applet/report/zy", options, "POST", true, function (res) {
          that.setData({
            results: res.data
          });
      });
    }  
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
  toDetails: function(e) {
    var that = this;
    var curId = e.currentTarget.id;
    var school_id = e.currentTarget.dataset.id
    var param= that.data.param;
    param.id = curId;
    param.school_id = school_id;
    util.navigateTo("/pages/analog/result/content/content",param);
  }
})