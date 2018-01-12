// pages/analog/analogs/result/content/content.js
var util = require('../../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    results: [],
    chance: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var arrId = "";
    if (options.index == 0) {
      arrId = "hjj4e5vr0c"
      that.setData({
        style:"本一"
      })
    }
    if (options.index == 1) {
      arrId = "bdhsl11qtb"
      that.setData({
        style: "本二"
      })
    }
    console.log(options)
    console.log(arrId)
    util.sendRequest("/wechat/applet/school/getschoolinfo",{SCHOOL_ID:options.school_id}, "POST", true, function(res){
      that.setData({
        logo: util.setStaticUrl(res.HEADURL),
        name: res.NAME,
        types: res.SCTYPE_VALUE,
        region: res.PROVINCE_VALUE,
        properties: res.properties,
        subjecttypes: res.subjecttypes
      })
    })
    util.sendRequest("/wechat/applet/school/getschoolscore", { SCHOOL_ID: options.school_id, MAJORTYPE_ID: options.MAJORTYPE }, "POST", true, function (res) {
      var result = res.data;
      console.log(res.data)
      result.forEach(function (obj) {
        if (obj.ARRANGMENT_ID == arrId) {
          obj.checked = false;
        }
        else {
          obj.checked = true;
        }
      })
      that.setData({
        grade: result
      })
    });
    util.sendRequest("/wechat/applet/report/zy", options, "POST", true, function(res){
      var results = res.data
      for (var i = 0; i < results.length; i++){
        if(i == options.id){
          that.setData({
            results: results[i]
          });
        }
      }
      that.setData({
        subject: options.subject
      })
    });
  },
  toDto: function (list) {
    if (!list) return list;
    list.forEach(function (obj) {
      if (obj.HEADURL) {
        obj.HEADURL = util.setStaticUrl(obj.HEADURL);
      }
      if (obj.LHEADURL) {
        obj.LHEADURL = util.setStaticUrl(obj.LHEADURL);
      }
    });
    return list;
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