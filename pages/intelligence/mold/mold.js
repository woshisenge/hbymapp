// pages/intelligence/mold/mold.js
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    anyChecked: false,
    buttonClicked: false,
    strRes:"",
    strResId:""
  },
  serviceValChange: function (e) {
    var strRes = "";
    var strResId = "";
    var mold = this.data.mold;
    var checkArr = e.detail.value;
    if (checkArr.length > 0 && checkArr[checkArr.length - 1] == "-1") {
      this.noneSelected();
      return false;
    }
    for (var i = 0; i < mold.length; i++) {
      if (checkArr.indexOf(i + "") != -1) {
        mold[i].checked = true;
        strRes += mold[i].NAME + ",";
        strResId += mold[i].DIC_ID + ",";
      } else {
        mold[i].checked = false;
      }
    }
    if (strRes != "") strRes = strRes.substring(0, strRes.length - 1);
    if (strResId != "") strResId = strResId.substring(0, strResId.length - 1);

    
    this.setData({
      mold: mold,
      anyChecked: false,
      strRes: strRes,
      strResId: strResId
    });
  }, 
  confirm:function(){
    var that = this;
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  //上一个页面

    prevPage.data["subjecttypes"] = that.data.strRes;
    prevPage.data["subjecttypes_id"] = that.data.strResId;
    prevPage.setData(prevPage.data);
    wx.navigateBack({
      delta: 1,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    util.sendRequest('/wechat/applet/dictionary/get', { code: 'SUBJECTTYPE' }, 'POST', false, function (res) {
      var result = new Array();
      res.data.forEach(function(element){
        if(element.NAME != "军事类" && element.NAME != "体育类" && element.NAME != "艺术类" && element.NAME != "其他类"){
          result.push(element)
        }
      }) 
      if (options.subjecttypes && options.subjecttypes != "") {
        var arr = options.subjecttypes.split(",");
        result.forEach(function (element) {
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
        mold: result
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
  onShareAppMessage: util.gdForward,
  noneSelected: function () {
    var that = this;
    var mold = that.data.mold;

    for (var i = 0; i < mold.length; i++) {
      mold[i].checked = false;
    }
    that.setData({
      anyChecked: true,
      mold: mold
    });
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  //上一个页面

    prevPage.data["subjecttypes"] = "";
    prevPage.data["subjecttypes_id"] = "";
    prevPage.setData(prevPage.data);
    if (!that.data.buttonClicked) {
      util.buttonClicked(that);
      wx.navigateBack({
        delta: 1
      });
    }
  }
})