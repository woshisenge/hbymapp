// pages/school/schoolcontent/schoolcontent.js
var util=require("../../../utils/util")
var WxParse = require('../../../wxParse/wxParse.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["录取", "基本信息","学校简介"],
    activeIndex: 0,
    index:1,
    ckecked:true,
    icon:"/images/address.png",
    array:[],
    icon1: "/images/yuanxiao.png",
    checked:true,
    check:true,
    hidden:true,
    school_id:"",
    MAJORTYPE: "r6j4mh69be"
  },
 
  tabClick: function (e) {
    this.setData({
      activeIndex: e.currentTarget.id
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var id=options.a
    that.setData({
      school_id:options.a
    })
    util.sendRequest_s("/wechat/applet/school/getschoolinfo", { SCHOOL_ID: id }, "POST", true, function (res) {
      that.setData({
        subjecttypes: res.subjecttypes,
        properties: res.properties,
        logo: util.setStaticUrl(res.HEADURL),
        name: res.NAME,
        region: res.PROVINCE_VALUE,
        types: res.SCTYPE_VALUE,
        date:res.CREATEDATE,
        subject:res.SUBJECTION,
        school_id:res.SCHOOL_ID,
        address:res.ADDRESS
      })
    })
    util.sendRequest_s("/wechat/applet/school/getintroduction", { SCHOOL_ID: id }, "POST", true, function (res) {
      var content = res.CONTENT;
      WxParse.wxParse('content', 'html', content, that, 5);
    });
    util.sendRequest_s("/wechat/applet/school/getplanandrules", { SCHOOL_ID: id,SUBTITLE:"招生章程"}, "POST", true, function (res) {
      
      that.setData({
        rule:res.data
      })
    });
    util.sendRequest_s("/wechat/applet/major/getschoolmajorandplan", { SCHOOL_ID: id}, "POST", true, function (res) {
      that.setData({
        liberal:res.WEN,
        science:res.Li
      })
    })
    util.sendRequest_s("/wechat/applet/dictionary/get", { code:"MAJORTYPE"},"POST",true,function(res){
      that.setData({
        array:res.data                
      })
    })
    util.sendRequest_s("/wechat/applet/school/getschoolscore", { SCHOOL_ID: id, MAJORTYPE_ID: 'r6j4mh69be'}, "POST", true, function (res) {
      var grade = res.data;
      grade.forEach(function(element){
        if (element.MinPM == null){
          element.MinPM = "---"
        }
        if (element.MaxPM == null){
          element.MaxPM = "---"
        }
      })
      that.setData({
        grade: grade
      })
    })
  },
  rule:function(){
    var that =this;
    that.setData({
      checked:!that.data.checked
    })
  },
  
  ruleContent:function(e){
    var that = this;
    var id = e.currentTarget.id;
    var school_id = that.data.school_id;
    util.navigateTo("/pages/school/schoolcontent/rule/rule",{id:id,school_id:school_id})
  },
  
  contentshow:function(){
    var that=this
    that.setData({
      showView: (!that.data.showView)
    })
  },
  bindPickerChange: function (e) {
    var that = this
    var a = e.currentTarget.dataset.id
    var id = that.data.array[e.detail.value].DIC_ID
    util.sendRequest_s("/wechat/applet/school/getschoolscore", { SCHOOL_ID: a, MAJORTYPE_ID: id }, "POST", true, function (res) {
      var grade = res.data;
      grade.forEach(function (element) {
        if (element.MinPM == null) {
          element.MinPM = ""
        }
        if (element.MaxPM == null) {
          element.MaxPM = ""
        }
      })
      that.setData({
        grade: res.data,
        MAJORTYPE: id
      })
    })
    that.setData({
      index: e.detail.value
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
  
  }
})