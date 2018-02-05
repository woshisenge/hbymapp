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
    //用户身份
    role: 0,
    vip:"",
    isVip:"",
    user_id:""
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
    util.sendRequest("/wechat/applet/user/isvip",{},"POST",false,function(res){
       that.setData({
         isVip:res.data
       })
    })
    util.sendRequest("/wechat/applet/user/getvip", {}, "POST", false, function (obj) {
      var vip = obj.data;
      if(vip == "UC"){
        vip = 1
      }
      else{
        vip = 0
      }
      that.setData({
        vip: obj.data
      })
    })
    util.sendRequest("/wechat/applet/user/getrole", {}, "POST", false, function (res)     {      
      var role=res.data
      if(role==1){   
        util.sendRequest("/wechat/applet/user/basic_student", {}, "POST", false, function (obj) {
          that.setData({
            logo: util.setStaticUrl(obj.complete.HEADURL),
            region: obj.complete.EXAMAREA_VALUE ? obj.complete.EXAMAREA_VALUE : "暂无",
            subject: obj.complete.MAJORTYPE_VALUE ? obj.complete.MAJORTYPE_VALUE : "暂无",
            grade: obj.complete.EXAMSCORE ? obj.complete.EXAMSCORE : "暂无",
            nickname: obj.complete.NICKNAME ? obj.complete.NICKNAME : "暂无",
            user_id: obj.complete.USER_ID
          });
        });
      }
      if(role==2){
        util.sendRequest("/wechat/applet/user/basic_teacher", {}, "POST", false, function (obj) {
          that.setData({
            logo2: util.setStaticUrl(obj.complete.HEADURL),
            nickname2: obj.complete.NICKNAME ? obj.complete.NICKNAME : "暂无",
            scname: obj.complete.SCNAME ? obj.complete.SCNAME : "暂无",
            work: obj.complete.JOBDATE_VALUE ? obj.complete.JOBDATE_VALUE : "暂无"
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
  goods:function(){
    var that= this;
    var role = that.data.vip;
    util.navigateTo("/pages/person/goods/goods", { role: role})
  },
  power:function(){
    var that = this;
    wx.showModal({
      content: '是否已经购买会员卡？',
      confirmText: "立即购买",
      cancelText: "已购买",
      success: function (res) {
        if (res.confirm) {
          util.navigateTo("/pages/person/improve/improve",{user_id:that.data.user_id})
        } else {
          util.navigateTo("/pages/person/member/member")
        }
      }
    });
  },
  toExaminee: function() {
    util.navigateTo("/pages/person/information/information");
  },
  toPocket: function() {
    util.navigateTo("/pages/person/goods/goods");
  }
})