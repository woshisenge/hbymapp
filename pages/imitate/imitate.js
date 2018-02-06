var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var util = require('../../utils/util')
Page({
  data: {
    tabs: ["本科第一批", "本科第二批"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    b1Schools: [],
    b1Schools_1_id: "",
    b1Schools_2_id: "",
    b1Schools_3_id: "",
    b1Schools_4_id: "",
    b1Schools_5_id: "",
    b1Schools_major_1_id: "",
    b1Schools_major_2_id: "",
    b1Schools_major_3_id: "",
    b1Schools_major_4_id: "",
    b1Schools_major_5_id: "",
    b2Schools: [],
    b2Schools_1_id: "",
    b2Schools_2_id: "",
    b2Schools_3_id: "",
    b2Schools_4_id: "",
    b2Schools_5_id: "",
    b2Schools_6_id: "",
    b2Schools_7_id: "",
    b2Schools_8_id: "",
    b2Schools_9_id: "",
    b2Schools_10_id: "",
    b2Schools_major_1_id: "",
    b2Schools_major_2_id: "",
    b2Schools_major_3_id: "",
    b2Schools_major_4_id: "",
    b2Schools_major_5_id: "",
    b2Schools_major_6_id: "",
    b2Schools_major_7_id: "",
    b2Schools_major_8_id: "",
    b2Schools_major_9_id: "",
    b2Schools_major_10_id: "",
    param:{},
    subject:"",
    MAJORTYPE: "",
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

  },
  toExaminee:function(){
    util.navigateTo("/pages/person/information/information")
  },
  school:function(e){
    var that = this;
    var index = that.data.activeIndex;
    var school_id = e.currentTarget.id;
    var major_id = school_id.replace("Schools","Schools_major");
      util.navigateTo("/pages/imitate/school/school", { index: index, school_id: school_id, major_id: major_id }) 
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
    util.sendRequest("/wechat/applet/user/getstudentexaminee", {}, "POST", true, function (res) {
      that.setData({
        examinee: res,
        MAJORTYPE: res.MAJORTYPE,
        subject: res.MAJORTYPE_VALUE
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
  b1Submit: function () {
    var that = this;
    if (that.data.b1Schools_1_id == ""
      || that.data.b1Schools_2_id == ""
      || that.data.b1Schools_3_id == ""
      || that.data.b1Schools_4_id == ""
      || that.data.b1Schools_5_id == "") {
      util.showError("院校选项不能为空");
      return false;
    }
    else{
    util.confirm({
      content: "确定要进行模拟填报？此次操作需消耗一张模拟填报卡",
      confirmFn: function () {
        var b1Schools_1_id = that.data.b1Schools_1_id;
        var b1Schools_2_id = that.data.b1Schools_2_id;
        var b1Schools_3_id = that.data.b1Schools_3_id;
        var b1Schools_4_id = that.data.b1Schools_4_id;
        var b1Schools_5_id = that.data.b1Schools_5_id;
        var b1Schools = that.data.b1Schools;

        var b1Schools_major_1_id = that.data.b1Schools_major_1_id;
        var b1Schools_major_2_id = that.data.b1Schools_major_2_id;
        var b1Schools_major_3_id = that.data.b1Schools_major_3_id;
        var b1Schools_major_4_id = that.data.b1Schools_major_4_id;
        var b1Schools_major_5_id = that.data.b1Schools_major_5_id;

        
        var param = {};
        param.school1 = b1Schools_1_id;
        param.zye1 = b1Schools_major_1_id;

        param.school2 = b1Schools_2_id;
        param.zye2 = b1Schools_major_2_id;

        param.school3 = b1Schools_3_id;
        param.zye3 = b1Schools_major_3_id;

        param.school4 = b1Schools_4_id;
        param.zye4 = b1Schools_major_4_id;

        param.school5 = b1Schools_5_id;
        param.zye5 = b1Schools_major_5_id;
        param.flag = 1;
        param.handleFlag = 1;//1为模拟填报,2为智能推荐
        param.index = that.data.activeIndex;
        param.subject = that.data.subject;
        param.MAJORTYPE = that.data.MAJORTYPE;

        util.navigateTo("/pages/analog/result/result", param);
      }
    });
    }
  },
  b2Submit: function () {
    var that = this;
    if (b2Schools_1_id == ""
      || b2Schools_2_id == ""
      || b2Schools_3_id == ""
      || b2Schools_4_id == ""
      || b2Schools_5_id == ""
      || b2Schools_6_id == ""
      || b2Schools_7_id == ""
      || b2Schools_8_id == ""
      || b2Schools_9_id == ""
      || b2Schools_10_id == "") {
      util.showError("院校选项不能为空");
      return false;
    }
    else{
    util.confirm({
      content: "确定要进行模拟填报？此次操作需消耗一张模拟填报卡",
      confirmFn: function () {
        var b2Schools_1_id = that.data.b2Schools_1_id;
        var b2Schools_2_id = that.data.b2Schools_2_id;
        var b2Schools_3_id = that.data.b2Schools_3_id;
        var b2Schools_4_id = that.data.b2Schools_4_id;
        var b2Schools_5_id = that.data.b2Schools_5_id;
        var b2Schools_6_id = that.data.b2Schools_6_id;
        var b2Schools_7_id = that.data.b2Schools_7_id;
        var b2Schools_8_id = that.data.b2Schools_8_id;
        var b2Schools_9_id = that.data.b2Schools_9_id;
        var b2Schools_10_id = that.data.b2Schools_10_id;
        var b2Schools = that.data.b2Schools;

        var b2Schools_major_1_id = that.data.b2Schools_major_1_id;
        var b2Schools_major_2_id = that.data.b2Schools_major_2_id;
        var b2Schools_major_3_id = that.data.b2Schools_major_3_id;
        var b2Schools_major_4_id = that.data.b2Schools_major_4_id;
        var b2Schools_major_5_id = that.data.b2Schools_major_5_id;
        var b2Schools_major_6_id = that.data.b2Schools_major_6_id;
        var b2Schools_major_7_id = that.data.b2Schools_major_7_id;
        var b2Schools_major_8_id = that.data.b2Schools_major_8_id;
        var b2Schools_major_9_id = that.data.b2Schools_major_9_id;
        var b2Schools_major_10_id = that.data.b2Schools_major_10_id;
        var param = {};
        param.school1 = b2Schools_1_id;
        param.zye1 = b2Schools_major_1_id;

        param.school2 = b2Schools_2_id;
        param.zye2 = b2Schools_major_2_id;

        param.school3 = b2Schools_3_id;
        param.zye3 = b2Schools_major_3_id;

        param.school4 = b2Schools_4_id;
        param.zye4 = b2Schools_major_4_id;

        param.school5 = b2Schools_5_id;
        param.zye5 = b2Schools_major_5_id;

        param.school6 = b2Schools_6_id;
        param.zye6 = b2Schools_major_6_id;

        param.school7 = b2Schools_7_id;
        param.zye7 = b2Schools_major_7_id;

        param.school8 = b2Schools_8_id;
        param.zye8 = b2Schools_major_8_id;

        param.school9 = b2Schools_9_id;
        param.zye9 = b2Schools_major_9_id;

        param.school10 = b2Schools_10_id;
        param.zye10 = b2Schools_major_10_id;
        
        
        param.flag = 2;
        param.handleFlag = 1;//1为模拟填报,2为智能推荐
        param.index = that.data.activeIndex;
        param.subject = that.data.subject;
        param.MAJORTYPE = that.data.MAJORTYPE;
        util.navigateTo("/pages/analog/result/result", param);
      }
    });
    }
  },
})