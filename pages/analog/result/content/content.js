// pages/analog/analogs/result/content/content.js
var util = require('../../../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    results: [],
    chance: 0,
    hidden: false
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
        style:"本一",
        arrId:"hjj4e5vr0c"
      })
    }
    if (options.index == 1) {
      arrId = "bdhsl11qtb"
      that.setData({
        style: "本二",
        arrId:"bdhsl11qtb"
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
      result.forEach(function (element) {
        if (element.MinPM == null) {
          element.MinPM = "---"
        }
        if (element.MaxPM == null) {
          element.MaxPM = "---"
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
        
        res.data.forEach(function(element){
          if (element.MINSCORETOTALCOUNT == null){
            element.MINSCORETOTALCOUNT = "---"
          }
          if (element.MAXSCORETOTALCOUNT == null) {
            element.MAXSCORETOTALCOUNT = "---"
          }
        })
        var results = that.data.results;
        if (res.data.length > 0) {
          var mjname = res.data[0].MJNAME;
          var mj_id = res.data[0].MAJOR_ID;
          var majorObj = { MJNAME: mjname, MAJORID: mj_id,scores: res.data };
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
        subject: options.subject,
        school_id: options.school_id
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
  collection: function (e) {
    var that = this;
    var param = {};
    param.SCHOOL_ID = that.data.school_id;
    param.SCHOOLNAME = that.data.name;
    param.MAJOR_ID = e.currentTarget.id;
    param.PROVINCE = that.data.region;
    param.MNCOLL_TYPE = e.currentTarget.dataset.chance;
    param.MJNAME = e.currentTarget.dataset.id;
    param.ARRANGMENT_ID = that.data.arrId;
    if (that.data.subject == "理科"){
      param.MAJORTYPE_ID = "r6j4mh69be"
    }
    if (that.data.subject == "文科"){
      param.MAJORTYPE_ID = "gjv044girc"
    }
    util.sendRequest("/wechat/applet/report/collection_mntb",param,"POST",false,function(res){
      util.showSuccess()
      var result = that.data.results;
      result.forEach(function(element){
        if (element.MAJORID == param.MAJOR_ID){
          element.hidden = true
        }
      })
      that.setData({
        results: result
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