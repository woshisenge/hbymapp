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
      {src: utils.setStaticUrl("/static/ymplant/img/sye/banner/8.jpg"), url: "/pages/person/improve/improve", num: 1 },
      {src: utils.setStaticUrl("/static/ymplant/img/sye/banner/01.jpg"), url:"/pages/person/improve/improve",num:1},
      {src:utils.setStaticUrl("/static/ymplant/img/sye/banner/02.jpg"),url:"/pages/intelligence/intelligence",num:2},
      {src:utils.setStaticUrl("/static/ymplant/img/sye/banner/03.jpg"),url:"/pages/video/video"},
      {src:utils.setStaticUrl("/static/ymplant/img/sye/banner/04.png"),url:"/pages/consult/consult"}
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 4000,
    duration: 2000,
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
  onLoad: function () {
  },
  onReady: function() {
  },
  consultation:function(){
    var that = this;
    utils.sendRequest("/wechat/applet/user/checklogin", {}, "POST", true, function(res){
      if(!res.data){
        utils.showError("请先登录账号");
        return false;
      }
      utils.navigateTo("/pages/consult/consult")
    });
  },
  analog:function(){
    var that = this;
    utils.sendRequest("/wechat/applet/user/getrole", {}, "POST", true, function (res) {
      if(res.data != 1){
        utils.showError("仅有学生身份才能使用该功能！");
        return false;
      }
      else{
        utils.sendRequest("/wechat/applet/user/isexamed", {}, "POST", false, function (result) {
          if (result.data){
            utils.sendRequest("/wechat/applet/user/getvip", {}, "POST", false, function (obj) {
              if (obj.DATA == "UC") {
                utils.navigateTo("/pages/imitate/imitate");
              }
              else {
                utils.sendRequest("/wechat/applet/user/getbelongitems", {}, "POST", true, function (res) {
                  if (res.mntbk != 0) {
                    utils.navigateTo("/pages/imitate/imitate");
                  }
                  else {
                    wx.showModal({
                      title: '提示',
                      content: '您当前模拟填报次数为0,请激活已有会员卡或去充值升级会员',
                      cancelText: '手动激活',
                      confirmText: '去充值',
                      success: function (res) {
                        if (res.confirm) {
                          utils.navigateTo("/pages/person/improve/improve", { id: 1, user_id: res.USER_ID })
                        } else if (res.cancel) {
                          utils.navigateTo("/pages/person/member/member")
                        }
                      },
                      fail:function(){
                        
                      }
                    })
                  }
                })
              }
            })
          }
        else{
            utils.showError("请完善考生信息");
        }
    })
      }
    });
  },
  intelligence:function(){
    var that = this;
    utils.sendRequest("/wechat/applet/user/getrole", {}, "POST", true, function (res) {
      if (res.data != 1) {
        utils.showError("仅有学生身份才能使用该功能！");
        return false;
      }
      else {
        utils.sendRequest("/wechat/applet/user/isexamed", {}, "POST", false, function (result) {
          if (result.data) {
            utils.sendRequest("/wechat/applet/user/getvip", {}, "POST", false, function (obj) {
              var user_id = obj.USER_ID;
              if (obj.DATA == "UC") {
                utils.navigateTo("/pages/intelligence/intelligence");
              }
              else {
                utils.sendRequest("/wechat/applet/user/getbelongitems", {}, "POST", true, function (res) {
                  if (res.zntjk != 0) {
                    utils.navigateTo("/pages/intelligence/intelligence");
                  }
                  else {
                    // utils.showError("您当前智能推荐卡数为0，无法使用该功能！")
                    wx.showModal({
                      title: '提示',
                      content: '您当前智能推荐次数为0,请激活已有会员卡或去充值升级会员',
                      cancelText:'手动激活',
                      confirmText:'去充值',
                      success: function (res) {
                        if (res.confirm) {
                          utils.navigateTo("/pages/person/improve/improve", { id: 1, user_id: res.USER_ID})
                        } else if (res.cancel) {
                          utils.navigateTo("/pages/person/member/member")
                        }
                      }
                    })
                  }
                })
              }
            })
          }
          else {
            utils.showError("请完善考生信息");
          }
        })
      }
    });
    // var that = this;
    // var vip = that.data.vip;
    // if (that.data.role != 1) {
    //   utils.showError("您暂无权限使用该功能！")
    // }
    // else {
    //   if (that.data.zntjk != 0 || vip == "UC") {//模拟填报卡不为0
    //     utils.sendRequest("/wechat/applet/user/isexamed", {}, "POST", true, function (result) {
    //       if (result.data) {
    //         //完成考生信息的完善
    //         utils.navigateTo("/pages/intelligence/intelligence");
    //       }
    //       else {
    //         utils.showError("请完善考生信息");
    //       }
    //     });
    //   }
    //   else {
    //     utils.showError("您当前智能填报卡0张，请激活已有会员")
    //   }
    // }
  },
  school:function(){
    var that = this;
    utils.navigateTo("/pages/school/school")
  },
  major:function(){
      utils.navigateTo("/pages/major/major")
  },
  noticemore:function(e){
    // var that = this;
    // utils.sendRequest("/wechat/applet/news/addggnewsview", {}, "POST", false, function(res){
    //   that.setData({
    //     notice: []
    //   });
    // });
    utils.navigateTo("/pages/notice/notice")
  },
  phone:function(){
    utils.navigateTo("/pages/video/video")
  },
  teacher:function(){
    utils.navigateTo("/pages/table/table")
  },
  test:function(){
    utils.sendRequest("/wechat/applet/user/checklogin", {}, "POST", true, function (res) {
      if (!res.data) {
        utils.showError("请先登录账号");
        return false;
      }
      utils.navigateTo("/pages/teacher/teacher")
    });
    // utils.navigateTo("/pages/activity/activity")
  },
  newsmore:function(){
      utils.navigateTo("/pages/news/news")
  },
  activitymore:function(){  
    utils.navigateTo("/pages/activity/activity")
  },
  news:function(e){
    var a = e.currentTarget.dataset.id;
    utils.navigateTo('/pages/news/newscontent/newscontent', { a: a })
  },
  activity:function(e){
    var a = e.currentTarget.dataset.id;
    utils.navigateTo('/pages/activity/content/content', { a: a })
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
  onShow:function(e) {
    var that = this;
    utils.sendRequest_s('/wechat/applet/news/get', { NEWSTYPE: "1es852a5gv", pageSize: "5" }, 'POST', false, function (res) {
      that.setData({
        notice: that.toDto(res.data.results)
      });
    })
    utils.sendRequest_s('/wechat/applet/news/get', { NEWSTYPE: "opsmpn8psb", pageSize: "5" }, 'POST', false, function (res) {     
      that.setData({
        news: that.toDto(res.data.results)
      });
    })
    utils.sendRequest_s('/wechat/applet/news/get', { NEWSTYPE: "23wtostpu8", pageSize: "6" }, 'POST', false, function (res) {
      that.setData({
        activity: that.toDto(res.data.results)
      });
    });
    // utils.sendRequest("/wechat/applet/user/getvip", {}, "POST", false, function (obj) {
    //   that.setData({
    //     vip: obj.data
    //   })
    // })
    // utils.sendRequest("/wechat/applet/user/getbelongitems", {}, "POST", true, function (res) {
    //   that.setData({
    //     mntbk: res.mntbk,
    //     zntjk: res.zntjk
    //   })
    // })
    // utils.sendRequest("/wechat/applet/user/getrole", {}, "POST", false, function (res) {
    //   that.setData({
    //     role: res.data
    //   })
    // });

  },
  onShareAppMessage: function () {

  },
});