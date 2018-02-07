// pages/news/newscontent/newscontent.js
var util = require("../../../utils/util");
var WxParse= require('../../../wxParse/wxParse.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  toDto: function (list) {
    if (!list) return list;
    list.forEach(function (obj) {
      if (obj.IMGURL) {
        obj.IMGURL = util.setStaticUrl(obj.IMGURL);
      }
      if (obj.MODIFYTIME) {
        obj.MODIFYTIME = util.formatDate(new Date(obj.MODIFYTIME));
      }
    });
    return list;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var id =options.a;
    console.log(options.a)
    util.sendRequest('/wechat/applet/news/get', { NEWSTYPE: "opsmpn8psb" }, 'POST', false, function (res) {
      var news = that.toDto(res.data.results);
      var imgReg = new RegExp("<img.*src\\s*=\\s*(.*?)[^>]*?>", "ig");
      var srcReg = new RegExp("src\\s*=\\s*\"?(.*?)(\"|>|\\s+)", "ig");
      for(var i=0;i<news.length;i++){
        if(news[i].NEWS_ID == id){
          var article=news[i].CONTENT;
          var arr;
          var results;
          var srcs = new Set();
          while(arr = imgReg.exec(article)){
            srcs.add(srcReg.exec(arr[0])[1]);
            srcReg.lastIndex = 0;
          }
          srcs.forEach(function(element){
            article = article.replace(element, util.setStaticUrl(element));
          });
           WxParse.wxParse('article', 'html', article, that, 5);
           that.setData({
             content: news[i]
           })
           
        } 
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