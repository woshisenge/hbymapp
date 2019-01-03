// pages/notice/notice.js
var util = require("../../utils/util")
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
        obj.MODIFYTIME = util.formatTime(new Date(obj.MODIFYTIME));
      }
      if (obj.CREATETIME){
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
    util.sendRequest_s('/wechat/applet/news/get', { NEWSTYPE: "1es852a5gv"}, 'POST', false, function (res) {
      var affiche = that.toDto(res.data.results);
      var notices=new Array();
      notices.push(affiche[0])
      that.setData({
        news: notices,
        notice: affiche
      });
    })
  },
  notice:function(e){
    var a = e.currentTarget.dataset.id
    util.navigateTo('../notice/noticecontent/noticecontent', { a: a })
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