// pages/person/basics/basics.js
var util = require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sexObjs: [],
    sexIndex: 0,
    birthday: "",
    user: { NICKNAME: "", SEX: "", BIRTHDAY: "", IDCARD: "", EMAIL: "", PHONE: "" }
  },
  bindPickerChange: function (e) {
    this.setData({
      sexIndex: e.detail.value
    })
  },
  bindDateChange: function (e) {
    this.setData({
      birthday: e.detail.value
    })
  },
  formSubmit: function (e) {
    e.detail.value.SEX = this.data.sexObjs[e.detail.value.SEX].DIC_ID;
    util.sendRequest("/plant/teacher/api/basic", e.detail.value, "POST", true, function (res) {
      console.log(res)
      wx.navigateBack({
        delta: 1
      });
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    util.sendRequest("/wechat/applet/dictionary/get", { code: "SEX" }, "POST", true, function (res) {
      var sexs = res.data;
      that.setData({
        sexObjs: sexs
      });

      util.sendRequest("/wechat/applet/user/getteachercomplete", {}, "POST", true, function (res) {
        var userTmp = { NICKNAME: "", SEX: "11", BIRTHDAY: "1990-12-12", IDCARD: "未设置", EMAIL: "未设置", PHONE: "未设置" };
        if (res.NICKNAME) {
          userTmp.NICKNAME = res.NICKNAME;
        }

        if (res.SEX) {
          userTmp.SEX = res.SEX;
          that.data.sexObjs.forEach(function (element, index) {
            if (element.DIC_ID == userTmp.SEX) {
              that.setData({
                sexIndex: index
              });
            }
          });
        }

        if (res.BIRTHDAY) {
          userTmp.BIRTHDAY = res.BIRTHDAY;
          that.setData({
            birthday: userTmp.BIRTHDAY
          });
        }

        if (res.IDCARD) {
          userTmp.IDCARD = res.IDCARD.substring(0, 3) + "*****" + res.IDCARD.substring(15, 18);
        }

        if (res.EMAIL) {
          userTmp.EMAIL = res.EMAIL.substring(0, 2) + "*********";
        }

        if (res.PHONE) {
          userTmp.PHONE = res.PHONE.substring(0, 3) + "****" + res.PHONE.substring(7, 11);
        }

        that.setData({
          user: userTmp
        });
      });
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