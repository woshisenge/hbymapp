// pages/person/helpgk/helpgk.js
var utils = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_id: "",
    USER_NAME: "",
    HELPS: 0,
    COUNTS: 0,
    TOTALCOUNT: 500,
    showDialog: false,
    hide1: true,
    hide2: false,
    id: "",
    code: "",
    consultation: utils.setStaticUrl("/static/ymplant/gd-img/ls_wxhelp1.jpg"),
    //助力转发图
    imageUrl: utils.setStaticUrl("/static/ymplant/ldq-img/wxhelp_zf.jpg"),
    index_1: utils.setStaticUrl("/static/ymplant/ldq-img/ls_wxhelp_01.jpg"),
    index_2: utils.setStaticUrl("/static/ymplant/ldq-img/ls_wxhelp_02.jpg"),

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var userInfo = wx.getStorageSync('userInfo');
    console.log(userInfo)
    console.log(options)
    if (options.id) {
      console.log("---我走这个接口了---")
      that.setData({
        COUNTS:options.counts,
        id:options.id
      })
      // utils.sendRequest('/wechat/applet/user/gethelp_counts', {
      //   id: options.id
      // }, "POST", true, (res) => {
      //   console.log("登陆后获取请求数据", res);
      //   that.setData({
      //     COUNTS: res.COUNTS
      //   })
      //   // this.data.COUNTS= res.COUNTS; 
      // })
      
    }else{
      console.log("---为登陆----")
      if (userInfo) {
        utils.sendRequest('/wechat/applet/user/gethelp_countsbyid', {

        }, "POST", true, (res) => {
          console.log(res);
          that.setData({
            COUNTS: res.COUNTS
          });
        })
        that.setData({
          hide1: false,
          hide2: true,
        })
      } 
      
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // var userInfo = wx.getStorageSync('userInfo')
    // console.log(userInfo)
    // var that = this;
    // if(userInfo){
    //   utils.sendRequest('/wechat/applet/user/gethelp_counts', { id: userInfo.USER_ID}, "POST", true, (res) => {
    //     console.log("登陆后获取请求数据", res);
    //     that.setData({
    //       COUNTS: res.COUNTS
    //     })
    //     // this.data.COUNTS= res.COUNTS; 
    //   })
    //   this.setData({
    //     hide1:false,
    //     hide2:true,
    //   })
    // }
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    var userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      var that = this;
      var user_id = userInfo.USER_ID;
      var title = '高考助力还差您一票！（助力卡片)';
      var imageUrl = this.data.imageUrl;
      wx.showShareMenu({
        withShareTicket: true
      })
      return {
        title: title,
        imageUrl: imageUrl,
        path: 'pages/person/helpgk/helpgk?counts=' + that.data.COUNTS + '&id=' + user_id,
        success: function(res) {
          if (res.shareTickets) {
            //请求接口 返回助力进度结果
          } else {
            wx.showModal({
              title: '对不起！',
              content: '您转发的是个人，请分享至家长群或同学群',
              showCancel: false,
            })
          }
        }
      }
    } else {
      wx.redirectTo({
        url: '/pages/login/login'
      })
    }
  },
  //ls：邀请好友助力方法  其实是转发 方法 并添加 发起者的USER_ID
  forhelp: function(e) {
    //发送助力邀请需要 登陆
    utils.ldqCheckLogin()
    var userInfo = wx.getStorageSync('userInfo');
    var that = this;
    console.log("636363", userInfo);

    wx.showShareMenu({
      withShareTicket: true
    })

    //ls：调用定制方法 转发请求助力 弹框提示 转发 即可参与活动
    utils.sendRequest("/wechat/applet/user/wxhelpme", {}, "POST", true, function(res) {
      console.log(res);
      if (!res.hasErrors) {

        wx.showModal({
          title: '提示',
          content: res.data,
          showCancel: false,
          success(res) {
            if (res.confirm) {

            }
          }
        })
        // utils.showDialog("邀请成功！");
      }
    })
  },
  forlogin: function(e) {
    wx.redirectTo({
      url: '/pages/login/login'
    })
  },


  //ls：2019.2.25 表单提交 需要验证 输入的助力码的 长度
  formSubmit: function(e) {
    var param = {};
    var USER_ID = e.detail.value;
    param.USER_ID = USER_ID.USER_ID;
    console.log(USER_ID);
    if (!param.USER_ID) {
      utils.showError("助力码不能为空！");
      return false;
    }
    // if(param.user_id){
    //   var str = param.user_id;
    //   if(str.lenght<10){
    //       utils.showError("助力码输入不完整");
    //   }
    // }
    else {
      var that = this;
      wx.login({
        success: function(res) {
          if (res.code) {
            console.log("ls_code1:", res.code);
            console.log("ls:param:", param);
            param.code = res.code;
            console.log("ls:param:", param);
            utils.sendRequest("/wechat/applet/user/wxhelp_friend", param, "POST", true, function(res) {
              if (res.hasErrors) {
                utils.showError(res.errorMessage)
                return false
              }
              console.log("12121212:", res);
              // if (res.hasErrors) {
              //   utils.showError(res.errorMessage);
              // } else {
              wx.showModal({
                title: '提示',
                content: res.CODE,
                showCancel: false,
                success(res) {
                  if (res.confirm) {}
                }
              })
              that.setData({
                COUNTS: res.COUNTS
              })

              // }
            })
            console.log("ls2:", that.data.code)
          }
        }
      })

    }
  }



})