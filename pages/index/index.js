//index.js
var WxParse = require('../../wxParse/wxParse.js');
var order = ['red', 'yellow', 'blue', 'green', 'red']
const app = getApp()
var utils = require('../../utils/util.js')
Page({
  data: {
    // motto: 'Hello World',
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // 首页轮播图 开始
    imgUrls: [ 
      //第一张banner 图是 志愿填报公益讲座
       { src: utils.setStaticUrl("/static/ymplant/gd-img/pro_jz_wechat.jpg"), url: "/pages/news/newscontent/newscontent" },
      { src: utils.setStaticUrl("/static/ymplant/ldq-img/wx_zzzs.jpg"), url: "/pages/autonomousEnrollment/autonomousEnrollment" },
      { src: utils.setStaticUrl("/static/ymplant/ldq-img/wx_banner03.jpg"), url: "/pages/intelligence/intelligence" },
      { src: utils.setStaticUrl("/static/ymplant/ldq-img/wx_gzdz.jpg"), url: "/pages/singleRecruit/singleRecruit" },
      { src: utils.setStaticUrl("/static/ymplant/ldq-img/wx_banner_zf.jpg"),url:""},
      { src: utils.setStaticUrl("/static/ymplant/ldq-img/wx_banner02.jpg"), url: "/pages/person/improve/improve" },
      { src: utils.setStaticUrl("/static/ymplant/ldq-img/wx_banner05.jpg"), url: "/pages/consult/consult" },
      { src: utils.setStaticUrl("/static/ymplant/ldq-img/wx_banner01.jpg"), url: "/pages/video/video" },
      { src: utils.setStaticUrl("/static/ymplant/ldq-img/wx_yxk.jpg"), url: "/pages/school/school" },
    ],
    huizhi: utils.setStaticUrl("/static/ymplant/img/huizhi.jpg"),
    indicatorDots: false,
    autoplay: true,
    interval: 4000,
    duration: 2000,
    circular: true,
    vip:"",
    zntjk:"",
    mntbk:"",
    role:"",
    index_1: utils.setStaticUrl("/static/ymplant/img/sye/banner/index_3.png"),
    index_2: utils.setStaticUrl("/static/ymplant/img/sye/banner/index_4.png"),
    index_3: utils.setStaticUrl("/static/ymplant/img/sye/banner/index_5.png"),
    index_4: utils.setStaticUrl("/static/ymplant/img/sye/banner/index_6.png"),
    index_5: utils.setStaticUrl("/static/ymplant/gd-img/ls_wxhelp1.jpg"),
    // 首页轮播图 开始

    // 公告 开始

    // 公告 结束
  },
  image:function(e){
    var that = this;
    var user_id = utils.getInfoFromStorage("user_id");
    var url = e.currentTarget.id;
    var userInfo = wx.getStorageSync('userInfo')
    if (url == "/pages/intelligence/intelligence") {
      // var userInfo = wx.getStorageSync('userInfo')
      // if (userInfo == '') {
      //   wx.navigateTo({
      //     url: '/pages/login/login'
      //   })
      //   return false
      // }
      utils.ldqCheckStudent()
      utils.navigateTo(url, { user_id: user_id, id: '2' })
    }
    if (url == "/pages/consult/consult") {
      utils.ldqCheckStudent()
      utils.navigateTo(url, { user_id: user_id, id: '2' })
    }
    if (url == "/pages/autonomousEnrollment/autonomousEnrollment") {
      utils.ldqCheckStudent()
      utils.navigateTo(url, { user_id: user_id, id: '2' })
    }
    if (url == "/pages/singleRecruit/singleRecruit") {
      utils.ldqCheckStudent()
      utils.navigateTo(url, { user_id: user_id, id: '2' })
    }
    if (url == "/pages/person/improve/improve") {
      utils.ldqCheckStudent()
      utils.navigateTo(url, { user_id: user_id, id: '2'})
    }
    if (url == "/pages/video/video") {
      utils.ldqCheckStudent()
      utils.navigateTo(url, { user_id: user_id, id: '2' })
    }
    if (url == "/pages/school/school") {
      utils.navigateTo(url, { user_id: user_id, id: '2' })
    }
    // LS:2019.1.15 banner图 跳转到 文章 专家讲座 
    if (url =="/pages/news/newscontent/newscontent"){
      utils.navigateTo(url, { a:'vr96965l5s'})
    }
  },

  toChar:function () {
    utils.ldqCheckLogin()
    utils.navigateTo("/pages/character/character");
  },
  // 2019.2.22 ls 助力高考 活动  方法  跳转新页面 为指定 用户助力  
  helpgk1:function(){
    utils.navigateTo("/pages/person/helpgk/helpgk");
  },

  advantage: function () {
    utils.ldqCheckLogin()
    utils.navigateTo("/pages/consult/consult");
  }, 
  // 跳转自主招生
  advantage1: function () {
    utils.ldqCheckLogin()
    utils.navigateTo("/pages/autonomousEnrollment/autonomousEnrollment");
  },
  // 跳转高职单招
  advantage2: function () {
    utils.ldqCheckLogin()
    utils.navigateTo("/pages/singleRecruit/singleRecruit");
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
    // var userInfo = wx.getStorageSync('userInfo')
  },
  onReady: function() {
  },
  //招办咨询 调用方法
  consultation:function(){
    //验证登录
    utils.ldqCheckLogin()
    utils.navigateTo("/pages/consult/consult")
  },
  //查看志愿 调用方法
  analog:function(){
    utils.ldqCheckLogin()
    var userInfo = wx.getStorageSync('userInfo')
    if (userInfo.ROLE_ID != 'sja4gc59bg') {
      utils.showError("仅有学生身份才能使用该功能！");
      return false
    }
		utils.navigateTo("/pages/imitate/imitate");
		return false
    // var that = this;
    // utils.sendRequest("/wechat/applet/user/getrole", {}, "POST", true, function (res) {
    //   if(res.data != 1){
    //     utils.showError("仅有学生身份才能使用该功能！");
    //     return false;
    //   }
    //   //
    //   // else {
    //   //   utils.sendRequest("/wechat/applet/user/isexamed", {}, "POST", false, function (result) {
    //   //     if (result.data){
    //   //       utils.sendRequest("/wechat/applet/user/getvip", {}, "POST", false, function (obj) {
    //   //         if (obj.DATA == "UC") {
    //   //           utils.navigateTo("/pages/imitate/imitate");
    //   //         }
    //   //         else {
    //   //           utils.sendRequest("/wechat/applet/user/getbelongitems", {}, "POST", true, function (res) {
    //   //             if (res.mntbk != 0) {
    //   //               utils.navigateTo("/pages/imitate/imitate");
    //   //             }
    //   //             else {
    //   //               wx.showModal({
    //   //                 title: '提示',
    //   //                 content: '您当前模拟填报次数为0,请激活已有会员卡或去充值升级会员',
    //   //                 cancelText: '手动激活',
    //   //                 confirmText: '去充值',
    //   //                 success: function (res) {
    //   //                   if (res.confirm) {
    //   //                     utils.navigateTo("/pages/person/improve/improve", { id: 1, user_id: res.USER_ID })
    //   //                   } else if (res.cancel) {
    //   //                     utils.navigateTo("/pages/person/member/member")
    //   //                   }
    //   //                 },
    //   //                 fail:function(){
                        
    //   //                 }
    //   //               })
    //   //             }
    //   //           })
    //   //         }
    //   //       })
    //   //     }
    //   //   	else{
    //   //       wx.showModal({
    //   //         title: '提示',
    //   //         content: '请完善个人信息',
    //   //         success: function (res) {
    //   //           if (res.confirm) {
    //   //             util.navigateTo("/pages/person/information/information")
    //   //           }
    //   //         }
    //   //       })
    //   //   	}
    // 	// 	})
    //   // }
    // })
  },
  intelligence:function(){
		// 判断是否登录
    utils.ldqCheckLogin()
    var that = this;
		var userInfo = wx.getStorageSync('userInfo')
    // if(userInfo == ''){
    //   wx.navigateTo({
    //     url: '/pages/login/login'
    //   })
    //   return false
    // }
		// 判断是否是学生
    if (userInfo.ROLE_ID && userInfo.ROLE_ID != 'sja4gc59bg') {
			utils.showError("该功能只有学生可以使用");
			return false
		}
		// 判断是否是vip
		// if (!userInfo.VIP) {
		// 	utils.showError("该功能只有VIP用户可以使用");
		// 	return false
		// }
		utils.navigateTo("/pages/intelligence/intelligence");

    // utils.sendRequest("/wechat/applet/user/getrole", {}, "POST", true, function (res) {
    //   if (res.data != 1) {
    //     utils.showError("仅有学生身份才能使用该功能！");
    //     return false;
    //   }
    //   else {
    //     utils.sendRequest("/wechat/applet/user/isexamed", {}, "POST", false, function (result) {
    //       if (result.data) {
    //         utils.sendRequest("/wechat/applet/user/getvip", {}, "POST", false, function (obj) {
    //           var user_id = obj.USER_ID;
    //           if (obj.DATA == "UC") {
    //             utils.navigateTo("/pages/intelligence/intelligence");
    //           }
    //           else {
    //             utils.sendRequest("/wechat/applet/user/getbelongitems", {}, "POST", true, function (res) {
    //               if (res.zntjk != 0) {
    //                 utils.navigateTo("/pages/intelligence/intelligence");
    //               }
    //               else {
    //                 // utils.showError("您当前智能推荐卡数为0，无法使用该功能！")
    //                 wx.showModal({
    //                   title: '提示',
    //                   content: '您当前智能推荐次数为0,请激活已有会员卡或去充值升级会员',
    //                   cancelText:'手动激活',
    //                   confirmText:'去充值',
    //                   success: function (res) {
    //                     if (res.confirm) {
    //                       utils.navigateTo("/pages/person/improve/improve", { id: 1, user_id: res.USER_ID})
    //                     } else if (res.cancel) {
    //                       utils.navigateTo("/pages/person/member/member")
    //                     }
    //                   }
    //                 })
    //               }
    //             })
    //           }
    //         })
    //       }
    //       else {
    //         wx.showModal({
    //           title: '提示',
    //           content: '请完善个人信息',
    //           success: function (res) {
    //             if (res.confirm) {
    //               util.navigateTo("/pages/person/information/information")
    //             }
    //           }
    //         })
    //       }
    //     })
    //   }
    // });
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
    utils.ldqCheckLogin()
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
    utils.ldqCheckLogin()
    utils.navigateTo("/pages/video/video")
  },
  teacher:function(){
    utils.ldqCheckLogin()
    // var userInfo = wx.getStorageSync('userInfo')
    // if (userInfo == '') {
    //   wx.navigateTo({
    //     url: '/pages/login/login'
    //   })
    //   return false
    // }
    utils.navigateTo("/pages/table/table")
  },
  test:function(){
    utils.ldqCheckLogin()
      utils.navigateTo("/pages/teacher/teacher")
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

  //2019.2.25 因为这个方法的存在所以每次进入小程序都得登陆  这里需要改动一下 （未完成 ）
  onShow:function(e) {
    var userInfo = wx.getStorageSync('userInfo')
    // 更新session
    if (userInfo.USER_ID){
      utils.sendRequest('/wechat/applet/api/refashSession', { USER_ID: userInfo.USER_ID }, "POST", true, function (res) {
        if (res.hasErrors) {
          if (res.errorMessage == 'relogin') {
            wx.showModal({
              content: '请重新登录',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  wx.redirectTo({
                    url: '/pages/login/login'
                  })
                }
              }
            })
          }
          console.log(res.errorMessage)
          return false
        }
        wx.setStorageSync('userInfo', res)
      })
    }
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
  onShareAppMessage: utils.gdForward,
});