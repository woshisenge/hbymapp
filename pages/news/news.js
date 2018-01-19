// pages/news/news.js
var util = require("../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop:0,
    isLoadingMore: false,//是否加载更多
    searchParam: { currentPage: 1 }//搜索参数
  },

  /**
   * 生命周期函数--监听页面加载
   */
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
  lower:function(e){
    
  },
  scroll:function(){

  },
  onLoad: function (options) {
    var that=this;
    util.sendRequest('/wechat/applet/news/get', { NEWSTYPE: "opsmpn8psb"}, 'POST', false, function (res) {
      that.setData({
        news: that.toDto(res.data.results)
      });
    })  
  },
  news:function(e){
    var a = e.currentTarget.dataset.id
    util.navigateTo('../news/newscontent/newscontent', { a:a })
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
    // if (!this.data.isLoadingMore) {
    //   this.setData({
    //     isLoadingMore: true
    //   });

    //   this.pullSchoolInfos();
    // }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})