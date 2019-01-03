var util = require("../../../../utils/util");
var WxParse = require('../../../../wxParse/wxParse.js');
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
      if (obj.CREATETIME) {
        obj.CREATETIME = util.formatDate(new Date(obj.CREATETIME));
      }
    });
    return list;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    util.sendRequest_s("/wechat/applet/school/getplanandrulesarticle", { SCHOOL_ID: options.school_id, ARTICLE_ID: options.id }, "POST", true, function (res) {
      for (var i = 0; i < res.data.length; i++) {
        article = res.data[0].CONTENT;
        var imgReg = /<img.*?(?:>|\/>)/gi;
        var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
        var article;
        var arr;
        var srcs = new Set();
        while (arr = imgReg.exec(article)) {
          srcs.add(srcReg.exec(arr[0])[1]);
          srcReg.lastIndex = 0;
        }
        srcs.forEach(function (element) {
          article = article.replace(element, util.setStaticUrl(element));
        });
        WxParse.wxParse('article', 'html', article, that, 5);
        that.setData({
          content: that.toDto(res.data)
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
  onShareAppMessage: util.gdForward
})