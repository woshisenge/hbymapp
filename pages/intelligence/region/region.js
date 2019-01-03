// pages/intelligence/region/region.js
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
    var style = this.data.style;
    var checkArr = e.detail.value;
    if (checkArr.length > 0 && checkArr[checkArr.length - 1] == "-1") {
      this.noneSelected();
      return false;
    }
    for (var i = 0; i < style.length; i++) {
      if (checkArr.indexOf(i + "") != -1) {
        style[i].checked = true;
        strRes += style[i].NAME + ",";
        strResId += style[i].DIC_ID + ",";
      } else {
        style[i].checked = false;
      }
    }

    if(strRes != "") strRes = strRes.substring(0, strRes.length - 1);
    if (strResId != "") strResId = strResId.substring(0, strResId.length - 1);

    
    this.setData({
      style: style,
      anyChecked: false,
      strRes: strRes,
      strResId: strResId
    });
  }, 
  confirm:function(){
    var that = this;
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  //上一个页面

    prevPage.data["provinces"] = that.data.strRes;
    prevPage.data["provinces_id"] = that.data.strResId;
    prevPage.setData(prevPage.data);
		console.log(prevPage.data)
    wx.navigateBack({
      delta: 1,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    util.sendRequest('/wechat/applet/dictionary/get', { code: 'PROVINCE' }, 'POST', false, function (res) {
      var result = new Array();
      res.data.forEach(function(element){
        if(element.NAME != "香港" && element.NAME != "澳门" && element.NAME !="台湾省"){
          result.push(element)
        } 
      })
      if (options.provinces && options.provinces != "") {
        var arr = options.provinces.split(",");
        result.forEach(function(element){
          for(var i = 0; i < arr.length; i++) {
            if(element.DIC_ID == arr[i]) {
              element.checked = true;
              break;
            }
          }
        });
      }
      else{
        that.setData({
          anyChecked: true
        });
      }

      that.setData({
        style: result
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
    var style = that.data.style;

    for (var i = 0; i < style.length; i++) {
      style[i].checked = false;
    }
    that.setData({
      anyChecked: true,
      style: style
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