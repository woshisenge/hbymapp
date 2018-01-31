// pages/intelligence/attribute/attribute.js
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
    var that = this;
    var strRes = "";
    var strResId = "";
    var attribute = this.data.attribute;
    var checkArr = e.detail.value;
    if (checkArr.length > 0 && checkArr[checkArr.length - 1] == "-1") {
      this.noneSelected();
      return false;
    }
    for (var i = 0; i < attribute.length; i++) {
      if (checkArr.indexOf(i + "") != -1) {
        attribute[i].checked = true;
        strRes += attribute[i].NAME + ",";
        strResId += attribute[i].DIC_ID + ",";
      } else {
        attribute[i].checked = false;
      }
    }
    if (strRes != "") strRes = strRes.substring(0, strRes.length - 1);
    if (strResId != "") strResId = strResId.substring(0, strResId.length - 1);
    that.setData({
      strRes: strRes,
      strResId: strResId,
      attribute: attribute,
      anyChecked: false
    })
    
  }, 
  confirm:function(){
    var that =this;
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  //上一个页面

    prevPage.data["properties"] = that.data.strRes;
    prevPage.data["properties_id"] = that.data.strResId;
    prevPage.setData(prevPage.data);
    wx:wx.navigateBack({
      delta: 1,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    util.sendRequest('/wechat/applet/dictionary/get', { code: 'SCPROPERTY' }, 'POST', false, function (res) {
      if (options.properties && options.properties != "") {
        var arr = options.properties.split(",");
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
        attribute: res.data
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
  
  },
  noneSelected: function () {
    var that = this;
    var attribute = that.data.attribute;

    for (var i = 0; i < attribute.length; i++) {
      attribute[i].checked = false;
    }
    that.setData({
      anyChecked: true,
      attribute: attribute
    });
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  //上一个页面

    prevPage.data["properties"] = "";
    prevPage.data["properties_id"] = "";
    prevPage.setData(prevPage.data);
    if (!that.data.buttonClicked) {
      util.buttonClicked(that);
      wx.navigateBack({
      delta: 1
    });
    }
  }
})