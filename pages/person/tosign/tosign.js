// pages/person/tosign/tosign.js
var utils = require('../../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    integral:0,
    CODE:"",
    total_integral:0,
    index_1: utils.setStaticUrl("/static/ymplant/ldq-img/qd/qd_tb.jpg"),
    index_2: utils.setStaticUrl("/static/ymplant/ldq-img/qd/qd_zjf.jpg"),
    index_3: utils.setStaticUrl("/static/ymplant/ldq-img/qd/qd_djqk.jpg"),
    index_4: utils.setStaticUrl("/static/ymplant/ldq-img/qd/qd_hdgz.jpg"),
    index_5: utils.setStaticUrl("/static/ymplant/ldq-img/qd/qd_jpdh.jpg"),
    index_5_1: utils.setStaticUrl("/static/ymplant/ldq-img/qd/qd_xpd.jpg"),
    index_5_2: utils.setStaticUrl("/static/ymplant/ldq-img/qd/qd_zpg.jpg"),
    index_5_3: utils.setStaticUrl("/static/ymplant/ldq-img/qd/qd_tc.jpg"),
    index_5_4: utils.setStaticUrl("/static/ymplant/ldq-img/qd/qd_dfs.jpg"),
    index_5_5: utils.setStaticUrl("/static/ymplant/ldq-img/qd/qd_sb.jpg"),
    index_5_6: utils.setStaticUrl("/static/ymplant/ldq-img/qd/qd_xlb.jpg"),
    index_5_7: utils.setStaticUrl("/static/ymplant/ldq-img/qd/qd_bag.jpg"),
    index_5_8: utils.setStaticUrl("/static/ymplant/ldq-img/qd/qd_xlx.jpg"),
    index_6: utils.setStaticUrl("/static/ymplant/ldq-img/qd/qd_lxfs.jpg"),
    index_7: utils.setStaticUrl("/static/ymplant/ldq-img/qd/qd_jsq.jpg"),
    // 转发领积分 图片
    imageUrl: utils.setStaticUrl("/static/ymplant/ldq-img/qd/qd_zfdjf.jpg"),
    days:0,
    jifen:0,
    duihuan:[],
    hidden1:true,
    hidden2: true,
    address1:""

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
    if (userInfo){
      var that =this;
      var parma ={};
      parma.USER_ID = userInfo.USER_ID; 
      //查询初始值
      utils.sendRequest("/wechat/applet/user/getinfodata",parma, "POST", true, (res) => {
        console.log(res);
        if(res){
          that.setData({
            days: res.TOTALDAY,
            jifen: res.TOTAL_INTEGRAL
          })
        }
      })

      utils.sendRequest("/wechat/applet/user/getduihuan", parma, "POST", true, (res) => {

      that.setData({
        duihuan:that.toDto(res.data)
      })
      console.log("ls:",res)
        if (res.data.length>0){
          
      }
      })
      utils.sendRequest("/wechat/applet/user/getaddress", parma, "POST", true, (res) => {
        console.log("add:", res)
        that.setData({
          address1: res.ADDRESS
        })
      })
    }
  },
 
  

  // LS： 转发可以挣积分  积三分

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
    var userInfo = wx.getStorageSync('userInfo')
    if (!userInfo) {
      wx.redirectTo({
        url: '/pages/login/login'
      })
      return false;
    }
    if (userInfo) {
      var that = this;
      var user_id = userInfo.USER_ID;
      var title = '签到转发，得积分，换好礼';
      var imageUrl = this.data.imageUrl;
      wx.showShareMenu({
        //  withShareTicket: true
      })
      return {
        title: title,
        imageUrl: imageUrl,
        path: 'pages/person/tosign/tosign',
        success: function (res) {
          
        }
      }
    } 

  },
  // 返回首页
  backindex:function(){
    var that = this;
    wx.switchTab({
      url: '/pages/index/index'
    })
    // utils.ldqCheckLogin()
    // utils.navigateTo("/pages/index/index")
  },
  // LS：方法 点击签到  积一分  
  tosigns: function () {
    utils.gdCheckLogin()
    var userInfo = wx.getStorageSync('userInfo');
    var param = {};
    var that = this;
    var i = 1;
    param.CODE = i;
    if (!userInfo) {
      wx.redirectTo({
        url: '/pages/login/login'
      })
      return false;
    }
    utils.sendRequest("/wechat/applet/user/tosign", param, "POST", true, (res) => {
      console.log(res)
      if (res.hasErrors) {
        utils.showError(res.errorMessage)
        return false
      } else {
       
        wx.showModal({
          title: '提示',
          content: "签到成功",
          showCancel: false,
          success(res) {
            if (res.confirm) { }
          }
        })
        that.setData({
          days: res.TOTALDAY,
          jifen:res.TOTAL_INTEGRAL,
        })
      }
    })
  },
  getmore: function () {
    var userInfo = wx.getStorageSync('userInfo');
    if (!userInfo) {
      wx.redirectTo({
        url: '/pages/login/login'
      })
      return false;
    }
    // utils.gdCheckLogin()
    var param = {};
    var that = this;
    var i = 2;
    param.CODE = i;
    wx.showShareMenu({
      // withShareTicket: true

    })
    utils.sendRequest("/wechat/applet/user/tosign", param, "POST", true, function (res) {
      console.log(res);
      if (res.hasErrors) {
        utils.showError(res.errorMessage)
        return false
      } else {
        // wx.showModal({
        //   title: '提示',
        //   content: "积分+3",
        //   showCancel: false,
        //   success(res) {
        //     if (res.confirm) { }
        //   }
        // })
        setTimeout(function(){
          that.setData({
            days: res.TOTALDAY,
            jifen: res.TOTAL_INTEGRAL,
          })
        },5000)
      }

    })
  },

  duihuan:function(e){
    var userInfo = wx.getStorageSync('userInfo');
    var param = {};
    var that =this;
    var id = e.currentTarget.id
    if(userInfo){
      param.USER_ID = userInfo.USER_ID;
      param.id = id;
      utils.sendRequest("/wechat/applet/user/duihuan", param, "POST", true, function (res) {
        if (res.hasErrors) {
          utils.showError(res.errorMessage)
          return false
        } else {
          wx.showModal({
            title: '提示',
            content: "兑换成功，请在下方填写邮寄地址并确认！",
            showCancel: false,
            success(res) {
              if (res.confirm) { 
                utils.sendRequest("/wechat/applet/user/getduihuan", param, "POST", true, (res) => {
                  that.setData({
                    duihuan: that.toDto(res.data),
                    hidden1:true
                  })
                })
              }
            }
          })
        }
        
      })
      utils.sendRequest("/wechat/applet/user/getinfodata", param, "POST", true, (res) => {
        console.log(res);
        if (res) {
          that.setData({
            days: res.TOTALDAY,
            jifen: res.TOTAL_INTEGRAL
          })
        }
      })
     
      }else{
        wx.redirectTo({
        url: '/pages/login/login'
      })
      return false;
    }
    
  },
  inptaddress:function(e){
    var that =this;
    this.setData({
      address1:e.detail.value
    })
  },

  address:function(e){
    var userInfo = wx.getStorageSync('userInfo');
    var param = {};
    var that = this;
    var ADDRESS="";
    if (userInfo) {
      param.USER_ID = userInfo.USER_ID;
      param.ADDRESS = that.data.address1;
      utils.sendRequest("/wechat/applet/user/address", param, "POST", true, function (res) {
        if (res.hasErrors) {
          utils.showError(res.errorMessage)
          return false
        } else {
          wx.showModal({
            title: '提示',
            content: "地址已确认，稍后将寄出礼品！",
            showCancel: false,
            success(res) {
              that.setData({
                address1:res.data
              })
            }
          })
      }
      })
  }else{
      wx.redirectTo({
        url: '/pages/login/login'
      })
      return false;
  }
  }
})