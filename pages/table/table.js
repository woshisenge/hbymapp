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
    //转发图
    imageUrl1: util.setStaticUrl("/static/ymplant/ldq-img/zhuanfa01.jpg"),
    imageUrl2: util.setStaticUrl("/static/ymplant/ldq-img/zhuanfa02.jpg"),
    imageUrl3: util.setStaticUrl("/static/ymplant/ldq-img/zhuanfa03.jpg"),
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
    console.log('!!!')
    var that = this;
    that.setData({
      color:!that.data.color
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.pullGradeInfos();
    this.setData({
      showDialog: !this.data.showDialog
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // var that = this;
    console.log(123)
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
  onShareAppMessage: function (res) {
    var that = this;
    var random1 = Math.round(Math.random() * 6);
    var random2 = Math.round(Math.random() * 4);
    if (random1 <= 1) {
      var title = '我是高三家长！正帮孩子智能匹配理想大学和专业，快来试试吧！'
    } else if (random1 == 2) {
      var title = '我是高三家长，正和大学招办老师聊天！同学家长你也可以哟！'
    } else if (random1 == 3) {
      var title = '有一种家长叫别人的家长，他们在为自己的孩子规划大学志愿！'
    } else if (random1 == 4) {
      var title = '1000多所大学在河北历年招生专业数据详情！总有你要报考的大学！'
    } else if (random1 <= 5) {
      var title = '大学招办说——同样成绩600分，为何别人被录取，你却没考上？'
    }
    if (random2 <= 1) {
      var imageUrl = this.data.imageUrl1
    } else if (random2 == 2) {
      var imageUrl = this.data.imageUrl2
    } else if (random2 >= 3) {
      var imageUrl = this.data.imageUrl3
    }
    wx.showShareMenu({
      withShareTicket: true
    })
    return {
      title: title,
      imageUrl: imageUrl,
      path: 'pages/index/index',
      success: function (res) {
        console.log('成功')
        if (res.shareTickets) {
          that.setData({
            showDialog: !that.data.showDialog
          })
        }else{
          util.showError("请转发至群");
        }
      }
    }
  },
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