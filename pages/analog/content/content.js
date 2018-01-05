// pages/analog/analogs/content/content.js
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    majors: [],
    param: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //SCHOOL_ID, MAJOR_ID
    var that = this;
    that.setData({
      param: options
    });
    util.sendRequest("/wechat/applet/report/getmajors", {SCHOOL_ID: options.school_id}, "POST", true, function(res) {
      if(options.selected && options.selected != "") {
        options.selected = options.selected.split(",");
        res.majors.every(function(element){//遍历所有专业
          options.selected.every(function(selectObj){//选取已选择的专业
            if(element.DIC_ID == selectObj) {
              element.checked = true;
              return false;
            }
            return true;
          });
          return true;
        });
      } 
      that.setData({
        majors: res.majors
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
  
  },
  checkboxChange: function (e) {
    var valueStr = "";
    var valurIdStr = "";

    var that = this;
    var majors = that.data.majors, values = e.detail.value;
    console.log(values);
    if(values.length > 6) {
      util.showError("最多选择6个专业");
      return false;
    }
    for (var i = 0, lenI = majors.length; i < lenI; ++i) {
      majors[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (majors[i].DIC_ID == values[j]) {
          majors[i].checked = true;
          valueStr += majors[i].NAME + ",";
          valurIdStr += majors[i].DIC_ID + ",";
          break;
        }
      }
    }

    that.setData({
      majors: majors
    });

    if(valueStr != "") {
      valueStr = valueStr.substring(0, valueStr.length - 1);
      valurIdStr = valurIdStr.substring(0, valurIdStr.length - 1);
    }
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  //上一个页面

    prevPage.data[that.data.param.key] = valueStr;
    prevPage.data[that.data.param.key + "_id"] = valurIdStr;
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.setData(prevPage.data);
  },
})