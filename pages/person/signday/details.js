// pages/person/signday/details.js
var utils = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:'',
    duihuan:[],

  },
  toDto: function (list) {
    if (!list) return list;
    list.forEach(function (obj) {
      if (obj.CREATETIME) {
        obj.CREATETIME = utils.formatDate(new Date(obj.CREATETIME));
      }
    });
    return list;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo = wx.getStorageSync('userInfo')
    if(userInfo){
      var that = this;
      var parma ={};
      parma.USER_ID = userInfo.USER_ID;
      console.log(parma);
      utils.sendRequest("/wechat/applet/user/getaddress",parma,'POST',true,(res) =>{
        console.log("ls_address:",res)
        if(res.ADDRESS){
          that.setData({
            address:res.ADDRESS
          })
        }else{
          that.setData({
            address:"您未添加邮寄地址，请在签到活动页面编辑邮寄地址！"
          })
        }
      })
      utils.sendRequest("/wechat/applet/user/getduihuan", parma, "POST", true, (res) => {

        that.setData({
          duihuan: that.toDto(res.data)
        })
        console.log("ls:", res)
        if (res.data.length > 0) {

        }
      })
    }
    //页面加载 需要 查询后台 获取 签到奖品列表 
      
    // 获取收货地址  可以修改
    


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