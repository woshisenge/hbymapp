// pages/video/play/play.js
var util = require("../../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options.id)
    var id = options.id;

    util.sendRequest("/wechat/applet/news/expertvideoplaybyid", { NEWS_ID:id, SUBTITLE: "专家视频" }, "POST", true, function (res) {
      for(var i= 0; i<res.data.length;i++){
        var article = res.data[0].CONTENT;
        var videoReg = /<video.*?(?:>|\/>)/gi;
        var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
        var arr = videoReg.exec(article)
        var src = srcReg.exec(arr)
        that.setData({
          src: util.setStaticUrl(src[1])
        })
      }  
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
  
  }
})