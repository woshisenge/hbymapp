// pages/analog/analogs/result/result.js
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    results: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if(options.handleFlag == "1") {//模拟填报结果
      util.sendRequest("/wechat/applet/report/zy", options, "POST", true, function (res) {
        console.log(res);
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
  show: function (e) {
    var that = this;
    var curId = e.currentTarget.id;
    var results = that.data.results;
    results.forEach(function (element) {
      if (element[0].SCHOOL_ID == curId) {
        if (element[0].checked)
          element[0].checked = false;
        else
          element[0].checked = true;
      }
    });
    that.setData({
      results: results
    })
  },
  toDetails: function(e) {
    var curId = e.currentTarget.id;
    curId = curId.split("_");//id的格式为：院校id_专业id_chance
    var param = {SCHOOL_ID: curId[0], MAJOR_ID: curId[1], chance: curId[2]};

    util.navigateTo("/pages/analog/result/content/content", param);
  }
})