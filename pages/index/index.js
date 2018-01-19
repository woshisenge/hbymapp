//index.js
var WxParse = require('../../wxParse/wxParse.js');
var order = ['red', 'yellow', 'blue', 'green', 'red']
const app = getApp()
var utils = require('../../utils/util.js')
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // 首页轮播图 开始
    imgUrls: [
      utils.setStaticUrl("/static/ymplant/img/sye/banner/banner4.jpg"),
      utils.setStaticUrl("/static/ymplant/img/sye/banner/banner5.jpg"),
      utils.setStaticUrl("/static/ymplant/img/sye/banner/6.jpg"),
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    circular: true,
    vip:"",
    zntjk:"",
    mntbk:"",
    role:""
    // 首页轮播图 开始

    // 公告 开始

    // 公告 结束

  },
  noticecontent:function(e){
    var a = e.currentTarget.dataset.id;
      utils.navigateTo("/pages/notice/noticecontent/noticecontent",{a:a})
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onReady: function () {
    var that = this;
    utils.sendRequest('/wechat/applet/news/get', { NEWSTYPE: "opsmpn8psb", pageSize: "5" }, 'POST', false, function (res) {
      that.setData({
        news: that.toDto(res.data.results)
      });
    })
    utils.sendRequest('/wechat/applet/news/get', { NEWSTYPE: "23wtostpu8", pageSize: "6" }, 'POST', false, function (res) {
      that.setData({
        activity: that.toDto(res.data.results)
      });                        
    })
  },
  onShow: function() {
    var that = this;
    utils.sendRequest('/wechat/applet/news/get', { NEWSTYPE: "1es852a5gv", pageSize: "5" }, 'POST', false, function (res) {

      that.setData({
        notice: that.toDto(res.data.results)
      });
    })
    utils.sendRequest("/wechat/applet/user/getvip", {}, "POST", false, function (obj) {
      that.setData({
        vip: obj.data
      })
    })
    utils.sendRequest("/wechat/applet/user/getbelongitems", {}, "POST", true, function (res) {
      that.setData({
        mntbk: res.mntbk,
        zntjk: res.zntjk
      })
    })
    utils.sendRequest("/wechat/applet/user/getrole", {}, "POST", false, function (res) {
      that.setData({
        role:res.data
      })
    })
  },
  consultation:function(){
    utils.sendRequest("/wechat/applet/user/checklogin", {}, "POST", true, function(res){
      if(!res.data){
        utils.showError("请先登录账号");
        return false;
      }
      utils.navigateTo("../consult/consult")
    });
    
  },
  analog:function(){
    var that = this;
    var vip = that.data.vip;
    if(that.data.role != 1){
      utils.showError("只有学生方可模拟填报")
    }
    else{
      if ( that.data.mntbk != 0 || vip == "UC" ) {//模拟填报卡不为0
        utils.sendRequest("/wechat/applet/user/isexamed", {}, "POST", true, function (result) {
          console.log(result)
          if (result.data) {
            //完成考生信息的完善
            utils.navigateTo("/pages/imitate/imitate");
          }
          else {
            utils.showError("请完善考生信息");
          }
        });
      }
      else {
        utils.showError("您当前智能填报卡0张，请前往商城充值购买或激活已有会员")
      }
    }
  },
  intelligence:function(){
    var that = this;
    var vip = that.data.vip;
    if (that.data.role != 1) {
      utils.showError("只有学生方可智能推荐！")
    }
    else{
      if (that.data.zntjk != 0 || vip == "UC") {//模拟填报卡不为0
        utils.sendRequest("/wechat/applet/user/isexamed", {}, "POST", true, function (result) {
          if (result.data) {
            //完成考生信息的完善
            utils.navigateTo("/pages/intelligence/intelligence");
          }
          else {
            utils.showError("请完善考生信息");
          }
        });
      }
      else {
        utils.showError("您当前智能推荐卡为0张，请前往商城充值购买或激活已有会员")
    }
    }
  },
  school:function(){
    var that = this;
    utils.navigateTo("../school/school")
  },
  major:function(){
    
      utils.navigateTo("../major/major")
  },
  noticemore:function(e){
    var that = this;
    utils.sendRequest("/wechat/applet/news/addggnewsview", {}, "POST", false, function(res){
      that.setData({
        notice: []
      });
    });
  },
  phone:function(){
    utils.showError("系统正在维护中，该功能暂时无法使用~！")
  },
  teacher:function(){
    utils.showError("系统正在维护中，该功能暂时无法使用~！")
  },
  test:function(){
    utils.showError("系统正在维护中，如需使用请登录电脑端！")
  },
  newsmore:function(){
    
      utils.navigateTo("../news/news")
  },
  activitymore:function(){
    
    utils.navigateTo("../activity/activity")
  },
  news:function(e){
    var a = e.currentTarget.dataset.id;
    utils.navigateTo('../news/newscontent/newscontent', { a: a })
  },
  activity:function(e){
    var a = e.currentTarget.dataset.id;
    utils.navigateTo('../activity/content/content', { a: a })
  },
  toDto: function (list) {
    if (!list) return list;
    list.forEach(function (obj) {
      if (obj.IMGURL) {
        obj.IMGURL = utils.setStaticUrl(obj.IMGURL);
      }
        if (obj.MODIFYTIME){
          obj.MODIFYTIME = utils.formatDate(new Date(obj.MODIFYTIME));
        }
    });
    return list;
  },
  onLoad:function(e) {
    
  },
  onShareAppMessage: function () {

  },
});