// pages/activity/content/content.js
var util = require("../../../utils/util");
var WxParse = require('../../../wxParse/wxParse.js');
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
    var that=this
    var id=options.a;
    util.sendRequest_s("/wechat/applet/news/getnewsbyid",{ NEWS_ID:id },"POST",false,function(res){
      var imgReg = /<img.*?(?:>|\/>)/gi;
      var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
      var article=res.CONTENT;
      res.MODIFYTIME = util.formatDate(new Date(res.MODIFYTIME))
      var arr;
      var results;
      var srcs = new Set();
      while (arr = imgReg.exec(article)) {
        srcs.add(srcReg.exec(arr[0])[1]);
        srcReg.lastIndex = 0;
      }
      srcs.forEach(function (element) {
        article = article.replace(element, util.setStaticUrl(element));
      });
      WxParse.wxParse('article', 'html', article, that, 20);
      that.setData({
        content: res
      })
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