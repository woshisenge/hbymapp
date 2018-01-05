var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var util = require('../../utils/util')
Page({
  data: {
    tabs: ["本科第一批", "本科第二批"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    b1Schools: [],
    b1Schools_1_index: -1,
    b1Schools_2_index: -1,
    b1Schools_3_index: -1,
    b1Schools_4_index: -1,
    b1Schools_5_index: -1,
    b1Schools_1_major: "",
    b1Schools_2_major: "",
    b1Schools_3_major: "",
    b1Schools_4_major: "",
    b1Schools_5_major: "",
    b1Schools_1_major_id: "",
    b1Schools_2_major_id: "",
    b1Schools_3_major_id: "",
    b1Schools_4_major_id: "",
    b1Schools_5_major_id: "",
    b2Schools: [],
    b2Schools_1_index: -1,
    b2Schools_2_index: -1,
    b2Schools_3_index: -1,
    b2Schools_4_index: -1,
    b2Schools_5_index: -1,
    b2Schools_6_index: -1,
    b2Schools_7_index: -1,
    b2Schools_8_index: -1,
    b2Schools_9_index: -1,
    b2Schools_10_index: -1,
    b2Schools_1_major: "",
    b2Schools_2_major: "",
    b2Schools_3_major: "",
    b2Schools_4_major: "",
    b2Schools_5_major: "",
    b2Schools_6_major: "",
    b2Schools_7_major: "",
    b2Schools_8_major: "",
    b2Schools_9_major: "",
    b2Schools_10_major: "",
    b2Schools_1_major_id: "",
    b2Schools_2_major_id: "",
    b2Schools_3_major_id: "",
    b2Schools_4_major_id: "",
    b2Schools_5_major_id: "",
    b2Schools_6_major_id: "",
    b2Schools_7_major_id: "",
    b2Schools_8_major_id: "",
    b2Schools_9_major_id: "",
    b2Schools_10_major_id: "",
    examinee: {},
    banner: util.setStaticUrl("/static/ymplant/images/tubiao3/2-1.jpg")
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });

    util.sendRequest("/wechat/applet/report/getschools", {}, "POST", true, function(res) {

      that.setData({
        b1Schools: res.b1schools,
        b2Schools: res.b2schools
      })
    });
    
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
    var that = this;
    util.sendRequest("/wechat/applet/user/getstudentexaminee", {}, "POST", true, function(res) {
      that.setData({
        examinee: res
      });
    });
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
  bindPickerChange: function(e) {
    var that = this;

    var curId = e.currentTarget.id;

    this.data[curId + "_index"] = e.detail.value;
    this.setData(this.data);
  },
  bindMajorSelect: function(e) {
    var curId = e.currentTarget.id;//控件id
    var curIndex = this.data[curId.replace("_major", "_index")];//选取学校的index
    if(curIndex == "-1") {
      util.showError("请选择院校");
      return false;
    }
    if(curId.substring(1, 2) == "1") {
      var school_id = this.data.b1Schools[curIndex].SCHOOL_ID;
    }
    else{
      var school_id = this.data.b2Schools[curIndex].SCHOOL_ID;
    }

    util.navigateTo("/pages/analog/content/content", { school_id: school_id, key: curId, selected: this.data[curId.replace("_major", "_major_id")]});
  },
  b1Submit: function() {
    var that = this;
    util.confirm({
      content: "确定要进行模拟填报？此次操作需消耗一张模拟填报卡",
      confirmFn: function() {
        var b1Schools_1_index = that.data.b1Schools_1_index;
        var b1Schools_2_index = that.data.b1Schools_2_index;
        var b1Schools_3_index = that.data.b1Schools_3_index;
        var b1Schools_4_index = that.data.b1Schools_4_index;
        var b1Schools_5_index = that.data.b1Schools_5_index;
        var b1Schools = that.data.b1Schools;

        var b1Schools_1_major_id = that.data.b1Schools_1_major_id;
        var b1Schools_2_major_id = that.data.b1Schools_2_major_id;
        var b1Schools_3_major_id = that.data.b1Schools_3_major_id;
        var b1Schools_4_major_id = that.data.b1Schools_4_major_id;
        var b1Schools_5_major_id = that.data.b1Schools_5_major_id;

        if (b1Schools_1_index == -1
          || b1Schools_2_index == -1
          || b1Schools_3_index == -1
          || b1Schools_4_index == -1
          || b1Schools_5_index == -1) {
          util.showError("院校选项不能为空");
          return false;
        }

        if (b1Schools_1_major_id == ""
          || b1Schools_2_major_id == ""
          || b1Schools_3_major_id == ""
          || b1Schools_4_major_id == ""
          || b1Schools_5_major_id == "") {
          util.showError("专业选项不能为空");
          return false;
        }
        var param = {};
        param.school1 = b1Schools[b1Schools_1_index].SCHOOL_ID;
        param.zye1 = b1Schools_1_major_id;

        param.school2 = b1Schools[b1Schools_2_index].SCHOOL_ID;
        param.zye2 = b1Schools_2_major_id;

        param.school3 = b1Schools[b1Schools_3_index].SCHOOL_ID;
        param.zye3 = b1Schools_3_major_id;

        param.school4 = b1Schools[b1Schools_4_index].SCHOOL_ID;
        param.zye4 = b1Schools_4_major_id;

        param.school5 = b1Schools[b1Schools_5_index].SCHOOL_ID;
        param.zye5 = b1Schools_5_major_id;

        param.flag = 1;
        param.handleFlag = 1;//1为模拟填报,2为智能推荐
        util.navigateTo("/pages/analog/result/result", param);
      }
    });
  },
  b2Submit: function() {
    var that = this;
    util.confirm({
      content: "确定要进行模拟填报？此次操作需消耗一张模拟填报卡",
      confirmFn: function () {
        var b2Schools_1_index = that.data.b2Schools_1_index;
        var b2Schools_2_index = that.data.b2Schools_2_index;
        var b2Schools_3_index = that.data.b2Schools_3_index;
        var b2Schools_4_index = that.data.b2Schools_4_index;
        var b2Schools_5_index = that.data.b2Schools_5_index;
        var b2Schools_6_index = that.data.b2Schools_6_index;
        var b2Schools_7_index = that.data.b2Schools_7_index;
        var b2Schools_8_index = that.data.b2Schools_8_index;
        var b2Schools_9_index = that.data.b2Schools_9_index;
        var b2Schools_10_index = that.data.b2Schools_10_index;
        var b2Schools = that.data.b2Schools;

        var b2Schools_1_major_id = that.data.b2Schools_1_major_id;
        var b2Schools_2_major_id = that.data.b2Schools_2_major_id;
        var b2Schools_3_major_id = that.data.b2Schools_3_major_id;
        var b2Schools_4_major_id = that.data.b2Schools_4_major_id;
        var b2Schools_5_major_id = that.data.b2Schools_5_major_id;
        var b2Schools_6_major_id = that.data.b2Schools_6_major_id;
        var b2Schools_7_major_id = that.data.b2Schools_7_major_id;
        var b2Schools_8_major_id = that.data.b2Schools_8_major_id;
        var b2Schools_9_major_id = that.data.b2Schools_9_major_id;
        var b2Schools_10_major_id = that.data.b2Schools_10_major_id;

        if (b2Schools_1_index == -1
          || b2Schools_2_index == -1
          || b2Schools_3_index == -1
          || b2Schools_4_index == -1
          || b2Schools_5_index == -1
          || b2Schools_6_index == -1
          || b2Schools_7_index == -1
          || b2Schools_8_index == -1
          || b2Schools_9_index == -1
          || b2Schools_10_index == -1) {
          util.showError("院校选项不能为空");
          return false;
        }

        if (b2Schools_1_major_id == ""
          || b2Schools_2_major_id == ""
          || b2Schools_3_major_id == ""
          || b2Schools_4_major_id == ""
          || b2Schools_5_major_id == ""
          || b2Schools_6_major_id == ""
          || b2Schools_7_major_id == ""
          || b2Schools_8_major_id == ""
          || b2Schools_9_major_id == ""
          || b2Schools_10_major_id == "") {
          util.showError("专业选项不能为空");
          return false;
        }
        var param = {};
        param.school1 = b2Schools[b2Schools_1_index].SCHOOL_ID;
        param.zye1 = b2Schools_1_major_id;

        param.school2 = b2Schools[b2Schools_2_index].SCHOOL_ID;
        param.zye2 = b2Schools_2_major_id;

        param.school3 = b2Schools[b2Schools_3_index].SCHOOL_ID;
        param.zye3 = b2Schools_3_major_id;

        param.school4 = b2Schools[b2Schools_4_index].SCHOOL_ID;
        param.zye4 = b2Schools_4_major_id;

        param.school5 = b2Schools[b2Schools_5_index].SCHOOL_ID;
        param.zye5 = b2Schools_5_major_id;

        param.school6 = b2Schools[b2Schools_6_index].SCHOOL_ID;
        param.zye6 = b2Schools_6_major_id;

        param.school7 = b2Schools[b2Schools_7_index].SCHOOL_ID;
        param.zye7 = b2Schools_7_major_id;

        param.school8 = b2Schools[b2Schools_8_index].SCHOOL_ID;
        param.zye8 = b2Schools_8_major_id;

        param.school9 = b2Schools[b2Schools_9_index].SCHOOL_ID;
        param.zye9 = b2Schools_9_major_id;

        param.school10 = b2Schools[b2Schools_10_index].SCHOOL_ID;
        param.zye10 = b2Schools_10_major_id;

        param.flag = 2;
        param.handleFlag = 1;//1为模拟填报,2为智能推荐
        util.navigateTo("/pages/analog/result/result", param);
      }
    });
  },
  toExaminee: function() {
    util.navigateTo("/pages/person/information/information");
  }
})