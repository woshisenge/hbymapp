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
    var major = options.scores.split(",");
    var chance = options.chance.split(",");
    for (var i=0; i < major.length;i++){
      util.sendRequest("/wechat/applet/major/getmajorbyschool", { SCHOOL_ID: options.school_id, MAJOR_ID: major[i] }, "POST", true, function (res) {
        console.log(res)
        res.data.forEach(function(element){
          if (element.MINSCORETOTALCOUNT == null){
            element.MINSCORETOTALCOUNT = ""
          }
          if (element.MAXSCORETOTALCOUNT == null) {
            element.MAXSCORETOTALCOUNT = ""
          }
        })
        var results = that.data.results;
        if (res.data.length > 0) {
          var mjname = res.data[0].MJNAME;
          var majorObj = { MJNAME: mjname, scores: res.data };
          chance.forEach(function(element){
             majorObj.chance = element
          })
          results.push(majorObj);
        }
        that.setData({
          results: results
        });
      })
    }
    that.setData({
        subject: options.subject
      })
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