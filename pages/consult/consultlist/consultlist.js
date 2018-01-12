// pages/consult/consultlist/consultlist.js
var util=require("../../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src1:"/images/school.jpg",
    name: "",
    region: "",
    types: "",
    vip:""
  },
  toDto: function (list) {
    if (!list) return list;
    list.forEach(function (obj) {
      if (obj.HEADURL) {
        obj.HEADURL = util.setStaticUrl(obj.HEADURL);
      }
      if (obj.LHEADURL) {
        obj.LHEADURL = util.setStaticUrl(obj.LHEADURL);
      }
    });
    return list;
  },
  chat:function(e){
    var that =this
    util.sendRequest("/wechat/applet/user/getrole", {}, "POST", true, function(res){
      if(res.data != 1) {
        util.showError("仅有学生身份方可在线咨询");
        return false;
      }
      
      if(that.data.vip == "UC"){
        var user_id = e.currentTarget.dataset.id;
        util.navigateTo("/pages/chatroom/chatroom", { user_id: user_id });
      }
      else{
        util.sendRequest("/wechat/applet/user/getbelongitems", {}, "POST", true, function (res) {
          var card = res.yxzxk;
          if (card <= 0) {
            util.showError("院校咨询卡数量不足！")
          }
          else {
            var user_id = e.currentTarget.dataset.id;
            util.navigateTo("/pages/chatroom/chatroom", { user_id: user_id });
          }
        })
      } 
    });
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var id = options.a
    util.sendRequest("/wechat/applet/complete_tea/get",{SCHOOL_ID:id},"POST",true,function(res){
      console.log(res.data)
      that.setData({
        teacher:that.toDto(res.data)
      })
    })
    util.sendRequest("/wechat/applet/school/getschoolinfo", { SCHOOL_ID: id},"POST",true,function(res){
      that.setData({
        logo: util.setStaticUrl(res.HEADURL),
        name:res.NAME,
        region: res.PROVINCE_VALUE,
        types: res.SCTYPE_VALUE

      })
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
    var that = this;
    util.sendRequest("/wechat/applet/user/getvip", {}, "POST", false, function (obj) {
      that.setData({
        vip: obj.data
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
  
  }
})