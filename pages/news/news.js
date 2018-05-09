// pages/news/news.js
var util = require("../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop:0,
    isLoadingMore: false,//是否加载更多
    searchParam: { currentPage: 1 },//搜索参数
    news:[],
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
    
  },
  news:function(e){
    var a = e.currentTarget.id
    util.navigateTo('/pages/news/newscontent/newscontent', { a:a })
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
    that.pullGradeInfos();
    // util.sendRequest_s('/wechat/applet/news/get', { NEWSTYPE: "opsmpn8psb", currentPage:2}, 'POST', false, function (res) {
    //   that.setData({
    //     news2: that.toDto(res.data.results)
    //   });
    // })  
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
    if (!this.data.isLoadingMore) {
      this.setData({
        isLoadingMore: true
      });

      this.pullGradeInfos();
    }
  },
  //将页码置0
  clearCurPage: function () {
    var that = this;
    var param = that.data.searchParam;
    param.currentPage = 0;

    that.setData({
      searchParam: param
    });
  },
  //页码翻页
  addCurPage: function () {
    var that = this;
    var param = that.data.searchParam;
    if (param.currentPage) {
      param.currentPage = parseInt(param.currentPage) + 1;
    }
    else {
      param.currentPage = 2;
    }
    that.setData({
      searchParam: param
    });
  },
  /**
   * 更新参数
   */
  reloadSearchParam: function (param) {
    var that = this;
    var paramObj = that.data.searchParam;
    if (!paramObj.currentPage) paramObj.currentPage = 1;
    if (paramObj.currentPage <= param.totalPage) {
      that.addCurPage();//后台页码从0开始，前台页码从1开始

      that.setData({
        searchParam: paramObj
      });
    }

  },
  // 设置参数
  setSearchParam: function () {
    var that = this;
    var param = that.data.searchParam;
    param.NEWSTYPE = "opsmpn8psb";
    that.setData({
      searchParam: param
    })
  },
  setResults(list, isClear) {
    var that = this;
    var oldList = isClear ? [] : that.data.news;
    var newList = that.toDto(list);
    newList.forEach(function (index, element) {
      oldList.push(index);
    });
    return oldList;
  },
  pullGradeInfos: function (isClear) {
    var that = this;

    that.setSearchParam();
    util.sendRequest_s('/wechat/applet/news/get', that.data.searchParam, 'POST', false, function (res) {
      that.setData({
        news: that.setResults(res.data.results, isClear),
      });
      that.reloadSearchParam(res.data);
      that.setData({
        isLoadingMore: false
      });
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})