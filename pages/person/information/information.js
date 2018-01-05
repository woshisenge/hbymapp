// pages/person/information/information.js
var util = require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    majortypeObjs: [],
    provinceObjs: [],
    gradeObjs: [],
    majortypeIndex:0,
    gradeIndex: 0,
    user: {},
    province:"",
    province_id: ""

  },
  region:function(e){
    var that = this;
    util.navigateTo("/pages/person/information/content/content",{key: that.data.province_id})
  },
  formSubmit: function(e) {
    e.detail.value.MAJORTYPE = this.data.majortypeObjs[e.detail.value.MAJORTYPE].DIC_ID;
    e.detail.value.EXAMAREA = this.data.province_id;
    e.detail.value.GRADE = this.data.gradeObjs[e.detail.value.GRADE].DIC_ID;
    util.sendRequest("/wechat/applet/user/examinee", e.detail.value, "POST", true, function (res) {
      wx.navigateBack({
        delta: 1
      })
    });
  },
  bindPickerChange: function (e) {
    var that = this;
    if(e.currentTarget.id == "MAJORTYPE") {
      that.setData({
        majortypeIndex: e.detail.value
      });
    }
    else if (e.currentTarget.id == "GRADE") {
      that.setData({
        gradeIndex: e.detail.value
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    util.sendRequest("/wechat/applet/dictionary/get", {code: "MAJORTYPE"}, "POST", true, function(res) {
      that.setData({
        majortypeObjs: res.data
      });
    });

     util.sendRequest("/wechat/applet/dictionary/get", { code: "PROVINCE" }, "POST", true, function (res) {
       that.setData({
         provinceObjs: res.data
       });
     });

    util.sendRequest("/wechat/applet/dictionary/get", { code: "GRADE" }, "POST", true, function (res) {
      that.setData({
        gradeObjs: res.data
      });
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    util.sendRequest("/wechat/applet/user/getstudentexaminee", {}, "POST", true, function (res) {
      that.data.majortypeObjs.forEach(function (element, index) {
        if (element.DIC_ID == res.MAJORTYPE) {
          that.setData({
            majortypeIndex: index
          });
        }
      });

      that.data.provinceObjs.forEach(function (element, index) {
        if (element.DIC_ID == res.EXAMAREA) {
          that.setData({
            province: element.NAME,
            province_id: element.DIC_ID
          });
        }
      });

      that.data.gradeObjs.forEach(function (element, index) {
        if (element.DIC_ID == res.GRADE) {
          that.setData({
            gradeIndex: index
          });
        }
      });

      that.setData({
        user: res
      });
    });
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