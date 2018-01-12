// pages/imitate/school/content/content.js
var util=require("../../../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
  school:[],
  index:"",
  inputVal:"",
  checked:false
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
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {

    var that = this;
    this.setData({
      inputVal: e.detail.value
    });
    var school = that.data.school;
    for (var i = 0; i < school.length; i++) {
      if (school[i].NAME.indexOf(that.data.inputVal) > 0) {
        school[i].checked = false;
      }
      else {
        school[i].checked = true;
      }
    }

    that.setData({
      school: school
    });
  },
  setSearchStorage: function (e) {
    var that = this;
    
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      index:options.index
    })
  },
  school:function(e){
    var that = this;

    var curId = e.currentTarget.id;

    var valueStr = "";
    that.data.school.forEach(function (element) {
      if (element.SCHOOL_ID == curId) {
        valueStr = element.NAME;
      }
    });
    var valurIdStr = curId;
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  //上一个页面

    prevPage.data.school_1 = valueStr;
    prevPage.data.school_1_id = valurIdStr;
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.setData(prevPage.data);
    if (!that.buttonClicked) {
      util.buttonClicked(that);
      wx.navigateBack({
        delta: 1
      });
    }
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
    var that = this;
    var index = that.data.index
    util.sendRequest("/wechat/applet/report/getschools", {}, "POST", true, function (res) {
      if (index == 0) {
        that.setData({
          school: res.b1schools,
          index: index
        })
      }
      if (index == 1) {
        that.setData({
          school: res.b2schools,
          index: index
        })
      }
    })
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