// pages/table/table.js
var util = require('../../utils/util.js')
Page({
//
  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    // array: ["2017", "2016"],
    array: ["2018", "2017"],
    index: 0,
    tabs: ['文科', '理科'],
    activeIndex: 0,
    grade: [],//分数结果
    isLoadingMore: false,//是否加载更多
    searchParam: { currentPage: 1 },//搜索参数
    color:true,
    scrolltop:1200,
    text:true,
    showDialog: false,
    //banner图
    consultation: util.setStaticUrl("/static/ymplant/ldq-img/wx_yfyd.jpg"),
  },
  // 切换年份
  bindPickerChange: function (e) {
    var that = this;
    this.setData({
      index: e.detail.value
    })
    that.clearCurPage();
    that.pullGradeInfos(true);
  },
  // 切换文理
  tabClick: function (e) {
    var that = this;
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    that.clearCurPage();
    that.pullGradeInfos(true);
  },
  // 显示输入框
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  // 隐藏输入框
  hideInput: function () {
    var that = this;
    that.setData({
      inputVal: "",
      inputShowed: false,
    });
  },
  // 清空输入框内容
  clearInput: function () {
    var that = this;
    var param = that.data.searchParam;
    param.SCORE = "";
    that.setData({
      inputVal: "",
      inputShowed: false,
      text:true
    });
    that.clearCurPage();
    that.pullGradeInfos(true);
  },
  // 输入框的值发生变化
  inputTyping: function (e) {
    var that = this;
    this.setData({
      inputVal: e.detail.value
    });
  },
  // 点击搜索
  setSearchStorage: function () {
    var that = this;
    that.setData({
      text:false
    })
    that.clearCurPage();
    that.pullGradeInfos(true);
  },
  // 
  scroll: function () {
    var that = this;
    that.setData({
      color:!that.data.color
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.ldqCheckLogin()
    var that = this;
    var userInfo = wx.getStorageSync('userInfo')
    that.pullGradeInfos();
    if (!userInfo.VIP && userInfo.ROLE_ID == 'sja4gc59bg') {
      var USER_ID = userInfo.USER_ID
      util.sendRequest('/wechat/applet/api/wethereShare', { USER_ID: USER_ID }, "POST", true, (res) => {
        if (res.hasErrors) {
          console.log(res.errorMessage)
          return false
        }
        var showDialog = true
        if (res.data == '10000') {
          that.setData({
            showDialog: false
          })
        } else {
          that.setData({
            showDialog: true
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // var that = this;
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (res) {

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
    if (!this.data.isLoadingMore) {
      this.setData({
        isLoadingMore: true,
      });

      this.pullGradeInfos();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage:util.gdForward,
  // 将页码置0
  clearCurPage: function () {
    var that = this;
    var param = that.data.searchParam;
    param.currentPage = 0;

    that.setData({
      searchParam: param
    });
  },
  // 页码翻页
  addCurPage: function () {
    var that = this;
    var param = that.data.searchParam;
    if (param.currentPage) {
      param.currentPage = parseInt(param.currentPage) + 1;
    }
    else {
      param.currentPage = 2;
    }
    that.setData({
      searchParam: param
    });
  },
  // 设置参数
  setSearchParam: function () {
    var that = this;
    var param = that.data.searchParam;
    if (that.data.activeIndex == 0) {
      param.MAJORTYPE_ID = "gjv044girc";
    }
    if (that.data.activeIndex == 1) {
      param.MAJORTYPE_ID = "r6j4mh69be"
    }
    if (that.data.index == 0) {
      param.YEAR_ID = "hyrykl72va"
    }
    if (that.data.index == 1) {
      param.YEAR_ID = "1mwv56c01z"
    }
    if (that.data.inputVal)
      param.SCORE = that.data.inputVal;
    that.setData({
      searchParam: param
    })
  },
  /**
   * 更新参数
   */
  reloadSearchParam: function (param) {
    var that = this;
    var paramObj = that.data.searchParam;
    if (!paramObj.currentPage) paramObj.currentPage = 1;
    if (paramObj.currentPage <= param.totalPage) {
      that.addCurPage();//后台页码从0开始，前台页码从1开始

      that.setData({
        searchParam: paramObj
      });
    }

  },
  setResults(list, isClear) {
    var that = this;
    var oldList = isClear ? [] : that.data.grade;
    var newList = list;
    newList.forEach(function (index, element) {
      oldList.push(index);
    });
    return oldList;
  },
  /**
   * 拉取新数据
   */
  pullGradeInfos: function (isClear) {
    var that = this;

    that.setSearchParam();
    util.sendRequest_s('/wechat/applet/school/getrankings', that.data.searchParam, 'POST', false, function (res) {
      that.setData({
        grade: that.setResults(res.data.results, isClear),
      });
      that.reloadSearchParam(res.data);
      that.setData({
        isLoadingMore: false
      });
    });
  }
})