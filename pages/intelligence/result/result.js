// pages/intelligence/content/content.js
var util = require('../../../utils/util.js');
var sliderWidth = 96;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["冲", "稳", "保","垫"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    listChong: [],
    listWen: [],
    listBao: [],
    listDian: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });

    util.sendRequest("/wechat/applet/report/reporting", options, "POST", true, function(res){
      var listChong = res.listChong;
      var listWen = res.listWen;
      var listBao = res.listBao;
      var listDian = res.listDian;

      var listChongOut = that.groupBySchool(listChong);
      var listWenOut = that.groupBySchool(listWen);
      var listBaoOut = that.groupBySchool(listBao);
      var listDianOut = that.groupBySchool(listDian);

      that.setData({
        listChong: listChongOut,
        listWen: listWenOut,
        listBao: listBaoOut,
        listDian: listDianOut
      });

      console.log(that.data.listChong);
    });
  },
  groupBySchool: function(list) {
    var listOut = [];
    var setObj = new Set();
    list.forEach(function (element) {
      setObj.add(element.SCHOOL_ID);
    });

    setObj.forEach(function (element) {
      var school = {};
      school.NAME = element.NAME;
      school.SCHOOL_ID = element;
      school.majors = [];
      list.forEach(function (arrObj) {
        if (element == arrObj.SCHOOL_ID) {
          if(!school.NAME) {
            school.NAME = arrObj.NAME;
          }
          var major = {};
          major.MJNAME = arrObj.MJNAME;
          major.MAJOR_ID = arrObj.MAJOR_ID;
          school.majors.push(major);
        }
      });

      listOut.push(school);
    });

    return listOut;
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
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
  showChong: function (e) {
    var that = this;
    var curId = e.currentTarget.dataset.id;
    var results = that.data.listChong;
    results.forEach(function (element) {
      if (element.SCHOOL_ID == curId) {
        if (element.checked)
          element.checked = false;
        else
          element.checked = true;
      }
    });
    that.setData({
      listChong: results
    })
  },
  showWen: function (e) {
    var that = this;
    var curId = e.currentTarget.dataset.id;
    var results = that.data.listWen;
    results.forEach(function (element) {
      if (element.SCHOOL_ID == curId) {
        if (element.checked)
          element.checked = false;
        else
          element.checked = true;
      }
    });
    that.setData({
      listWen: results
    })
  },
  showBao: function (e) {
    var that = this;
    var curId = e.currentTarget.dataset.id;
    var results = that.data.listBao;
    results.forEach(function (element) {
      if (element.SCHOOL_ID == curId) {
        if (element.checked)
          element.checked = false;
        else
          element.checked = true;
      }
    });
    that.setData({
      listBao: results
    })
    
  },
  showDian: function (e) {
    var that = this;
    var curId = e.currentTarget.dataset.id;
    var results = that.data.listDian;
    results.forEach(function (element) {
      if (element.SCHOOL_ID == curId) {
        if (element.checked)
          element.checked = false;
        else
          element.checked = true;
      }
    });
    that.setData({
      listDian: results
    })
  },
  toDail:function(e){
    var curId = e.currentTarget.id;
    curId = curId.split("_");
    var param = { SCHOOL_ID: curId[0], MAJOR_ID: curId[1]};
    util.navigateTo("/pages/intelligence/result/content/content", param);
  }
})