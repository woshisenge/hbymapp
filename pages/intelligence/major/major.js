// pages/intelligence/major/major.js
var util = require('../../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    anyChecked: false,
    majors: [],
    buttonClicked: false,
    inputShowed: false,
    inputVal: "",
    check:false,
    strRes:"",
    strResId:""
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    var that = this;
    this.setData({
      inputVal: "",
      inputShowed: false
    });
    var majors = that.data.majors;
    majors.forEach(function(element){
      element.check = false;
    })
    that.setData({
      majors:majors
    })
  },
  inputTyping: function (e) {
    var that = this;
    this.setData({
      inputVal: e.detail.value
    });
  },
  searchMajor:function(){
    var that = this;
    var majors = that.data.majors;
    for (var i = 0; i < majors.length; i++) {
      if (majors[i].NAME.indexOf(that.data.inputVal) >= 0) {
        majors[i].check = false;
      }
      else {
        majors[i].check = true;
      }
    }

    that.setData({
      majors: majors
    });
  },
  serviceValChange: function (e) {
    var strRes = "";
    var strResId = "";
    var majors = this.data.majors;
    var checkArr = e.detail.value;
    if (checkArr.length > 0 && checkArr[checkArr.length - 1] == "-1") {
      this.noneSelected();
      return false;
    }
    for (var i = 0; i < majors.length; i++) {
      if (checkArr.indexOf(i + "") != -1) {
        majors[i].checked = true;
        strRes += majors[i].NAME + ",";
        strResId += majors[i].DIC_ID + ",";
      } else {
        majors[i].checked = false;
      }
    }
    if (strRes != "") strRes = strRes.substring(0, strRes.length - 1);
    if (strResId != "") strResId = strResId.substring(0, strResId.length - 1);
    this.setData({
      majors: majors,
      anyChecked: false,
      strResId: strResId,
      strRes: strRes
    });
  }, 
  confirm:function(){
    var that = this;
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  //上一个页面

    prevPage.data["majors"] = that.data.strRes;
    prevPage.data["majors_id"] = that.data.strResId;
    prevPage.setData(prevPage.data);
    wx.navigateBack({
      delta: 1,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {//当前智能推荐只有本一和本二，所以不做专科校验
    var that = this;
    //CODE直接写本科专业
    util.sendRequest('/wechat/applet/major/getmajorsbyarrangment', {CODE: 'BMAJOR'}, 'POST', false, function(res){
      if (options.majors && options.majors != "") {
        var arr = options.majors.split(",");
        res.data.forEach(function (element) {
          for (var i = 0; i < arr.length; i++) {
            if (element.DIC_ID == arr[i]) {
              element.checked = true;
              break;
            }
          }
        });
      }
      else {
        that.setData({
          anyChecked: true
        });
      }
      that.setData({
        majors: res.data
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
  onShareAppMessage: util.gdForward,
  noneSelected: function () {
    var that = this;
    var majors = that.data.majors;

    for (var i = 0; i < majors.length; i++) {
      majors[i].checked = false;
    }
    that.setData({
      anyChecked: true,
      majors: majors
    });
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  //上一个页面

    prevPage.data["majors"] = "";
    prevPage.data["majors_id"] = "";
    prevPage.setData(prevPage.data);
    if (!that.data.buttonClicked) {
      util.buttonClicked(that);
      wx.navigateBack({
        delta: 1
      });
    }
  }
})