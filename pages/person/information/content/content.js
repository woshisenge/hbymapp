// pages/person/information/content/content.js
var util = require('../../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    param: {},
    checked:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //options里有key这个键，控制对勾
    var that=this;
    util.sendRequest("/wechat/applet/dictionary/get", { code: "PROVINCE" }, "POST", true, function (res) {
      console.log(res)
      that.setData({
        provinceObjs: res.data
      });
    });
  },
  select:function(e){
    var that = this;

    var curId = e.currentTarget.id;
    
    var valueStr = "";
    that.data.provinceObjs.forEach(function (element) {
      if (element.DIC_ID == curId) {
        valueStr = element.NAME;
      }
    });
    var valurIdStr = curId;
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  //上一个页面

    prevPage.data.province = valueStr;
    prevPage.data.province_id = valurIdStr;
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.setData(prevPage.data);
    wx.navigateBack({
      delta: 1
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
  
  }
})