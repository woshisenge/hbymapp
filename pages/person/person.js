// pages/person/person.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //用户头像
    logo:"/images/school.jpg",
    //信息完整度
    completeCount: 0,                              
    //高考分数
    examScore: 0,
    //账户余额
    valiablePocket: 0,
    //昵称
    nickname: "",
    //是否为vip
    isVip: false,
    //用户身份
    role: 0,
    vip: "/images/icon/putong.png"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  chooseImageTap: function () {
    let _this = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#f7982a",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            _this.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            _this.chooseWxImage('camera')
          }
        }
      }
    })

  },
  chooseWxImage:function (type) {
    var that = this;
    wx.chooseImage({
      sizeType: ['compressed'],
      sourceType: [type],
      success: function (res) {
        util.uploadFile("/wechat/applet/user/uploadhead", res.tempFilePaths[0], "HEADURL", {}, true, function(result){
          that.getUserInfo();
        });
      }
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
  onShow: function() {
    this.getUserInfo();
  },
  /**
   * 获取用户基本信息
   */
  getUserInfo: function() {
    var that = this;
    util.sendRequest("/wechat/applet/user/getrole", {}, "POST", false, function (res)     {
      var role=res.data
      if(role==1){
        util.sendRequest("/wechat/applet/user/getvip", {}, "POST", false, function(obj){
          if(obj.data == "UA") {
            that.setData({
              vip: "/images/icon/baiyin.png"
            });
          }
          else if(obj.data == "UB") {
            that.setData({
              vip: "/images/icon/gold.png"
            });
          }
          else if(obj.data == "UC") {
            that.setData({
              vip: "/images/icon/svip.png"
            });
          }
        });
        util.sendRequest("/wechat/applet/user/basic_student", {}, "POST", false, function (obj) {
          that.setData({
            logo: util.setStaticUrl(obj.complete.HEADURL),
            completeCount: obj.completeCount,
            nickname: obj.complete.NICKNAME ? obj.complete.NICKNAME : "暂无",
            examScore: obj.examinee.EXAMSCORE ? obj.examinee.EXAMSCORE : 0,
            valiablePocket: obj.pocket.BALANCE ? obj.pocket.BALANCE : 0
          });
        });
      }
      if(role==2){
        util.sendRequest("/wechat/applet/user/basic_teacher", {}, "POST", false, function (obj) {
          that.setData({
            logo2: util.setStaticUrl(obj.complete.HEADURL),
            completeCount2: obj.completeCount,
            nickname2: obj.complete.NICKNAME ? obj.complete.NICKNAME : "暂无",
            scname: obj.complete.SCNAME ? obj.complete.SCNAME : "暂无"
          })
        })
      }
      that.setData({
        role:role
      })
    })
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
  toExaminee: function() {
    util.navigateTo("/pages/person/information/information");
  },
  toPocket: function() {
    util.navigateTo("/pages/person/goods/goods");
  }
})