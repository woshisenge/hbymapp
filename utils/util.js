var baseurl = require('baseurl.js')
/**
 * 格式化日期 yyyy-MM-dd
 */
const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-');
}

/**
 * 格式化时间 yyyy-MM-dd HH:mm:ss
 */
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
var getCurrentTime = function () {
  return formatTime(new Date());
}

var getCurrentDate = function () {
  return formatDate(new Date());
}

var getCurrentTimestamp = function () {
  return Date.parse(new Date());
}

/**
 * 格式化数字，单数字格式为：0X
 */
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 未登录状态码
 */
const noLoginCode = "-1";

/**
 * 未完善信息状态码
 */
const noCompleteCode = "-2";

/**
 * 缺少参数状态码
 */
const notAcceptCode = "406";
/**
 * 登录操作
 */
var login = function () {
	// console.log('login')
  wx.login({
    success: function (res) {
      if (res.code) {
        //发起网络请求
        sendRequest("/wechat/applet/api/login", { code: res.code }, "POST", true, function (obj) {
          // 把session_id存到本地
          wx.setStorageSync('session_id', obj.thirdSessionId)
          // console.log('session_id', wx.getStorageSync('session_id'))
          
        });
      } else {
        showError("获取用户信息失败，请重试！")
      }
    }
  })
}

/**
 * ldq 判断是否登录
 */
var ldqCheckLogin = function () {
  login()
  sendRequest("/wechat/applet/user/checklogin", {}, "POST", true, (res) => {
    if (!wx.getStorageSync('userInfo').USER_ID){
      wx.redirectTo({
        url: '/pages/login/login'
      })
      return false
    }
    if (res.hasErrors && res.errorMessage == 'relogin') {
      wx.redirectTo({
        url: '/pages/login/login'
      })
      return false
    }
  })
}
/**
 * gd 判断是否登录无返回按钮
 */
var gdCheckLogin = function () {
  login()
  // console.log(wx.getStorageSync('session_id'))
  sendRequest("/wechat/applet/user/checklogin", {}, "POST", true, (res) => {
    if (wx.getStorageSync('userInfo') == '') {
      wx.redirectTo({
        url: '/pages/login/login'
      })
      return false
    }
    if (res.hasErrors && res.errorMessage == 'relogin') {
      wx.redirectTo({
        url: '/pages/login/login'
      })
      return false
    }
  })
}
/**
 * ldq 判断是否是学生身份
 */
var ldqCheckStudent = function () {
  var userInfo = wx.getStorageSync('userInfo')
  if (userInfo.ROLE_ID && userInfo.ROLE_ID != 'sja4gc59bg') {
    wx.showModal({
      content: '该功能仅限学生使用',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
        }
      }
    })
    return false
  }
}
/**
 * gd 非一键填报  控制弹窗每天一次
 */
var popupShow = function (res) {
  var userInfo = wx.getStorageSync('userInfo')
  var that = this
  var USER_ID = userInfo.USER_ID
  sendRequest('/wechat/applet/api/wethereShare', {USER_ID: USER_ID }, "POST", true, (res) => {
    if (res.hasErrors) {
      console.log(res.errorMessage)
      return false
    }
    // var showDialog = true
    // if (res.data=='10000') {
    //   that.setData({
    //     showDialog: false
    //   })
    // }else{
    //   that.setData({
    //     showDialog: true
    //   })
    // }
  })
}
/**
 * gd 控制转发显示页面
 */
var gdForward = function (res) {
  var that = this;
  var aaa =1;
  var random1 = Math.round(Math.random() * 6);
  var random2 = Math.round(Math.random() * 4);
  if (random1 <= 1) {
    var title = '我是高三家长！正与大学招办老师聊天！你也来吧'
  } else if (random1 == 2) {
    var title = '我是高三家长！正帮孩子智能匹配大学，快试试吧'
  } else if (random1 == 3) {
    var title = '切勿因家长的疏忽让孩子与理想大学失之交臂！'
  } else if (random1 == 4) {
    var title = '传疯啦！80％河北高三家长都在用的智能选校系统'
  } else if (random1 >= 5) {
    var title = '报考大学 早规划！知己知彼！有的放矢！'
  }
  if (random2 <= 1) {
    var imageUrl = baseurl.content + "/static/ymplant/ldq-img/zhuanfa01.jpg"
  } else if (random2 == 2) {
    var imageUrl = baseurl.content +"/static/ymplant/ldq-img/zhuanfa02.jpg"
  } else if (random2 >= 3) {
    var imageUrl = baseurl.content +"/static/ymplant/ldq-img/zhuanfa03.jpg"
  }
  wx.showShareMenu({
    withShareTicket: true
  })
  var userInfo = wx.getStorageSync('userInfo')
  var USER_ID = userInfo.USER_ID
  sendRequest('/wechat/applet/api/wechatShare', { USER_ID: USER_ID }, "POST", true, (res) => {
    if (res.hasErrors) {
      console.log(res.errorMessage)
      return false
    }
  })
  var showDialog = true;
  if (!userInfo.VIP || userInfo.VIP =='高级体验会员') {
    that.setData({
      showDialog: false
    })
  }
  return {
    title: title,
    imageUrl: imageUrl,
    path: 'pages/index/index',
    success: function (res) {
      if (res.shareTickets) {
        var userInfo = wx.getStorageSync('userInfo')
        var USER_ID = userInfo.USER_ID
        sendRequest('/wechat/applet/api/wechatShare', {USER_ID: USER_ID}, "POST", true, (res) => {
          if (res.hasErrors) {
            console.log(res.errorMessage)
            return false
          }
        })
        var showDialog = true;
        if (!userInfo.VIP || userInfo.VIP == '高级体验会员') {
            that.setData({
              showDialog: false
            })
        }
      } else {
        wx.showModal({
          title: '对不起！',
          content: '您转发的是个人，请分享至家长群或同学群',
          showCancel: false,
        })
      }
    }
  }
}

/**
 * ldq 重新获取session
 */
// var upSession = function (data) {
// 	var userInfo = wx.getStorageSync('userInfo')
	
// 	wx.setStorageSync('userInfo', userInfo)
// }

/**
 * 完善信息操作
 */
var toComplete = function () {
	console.log('toComplete')
}

/**
 * 获取sessionId
 */
var getSessionId = function () {
  return getInfoFromStorage("session_id");
}

/**
 * 存储至本地缓存
 */
var setInfoToStorage = function (key, value) {
  wx.setStorageSync(key, value);
}

/**
 * 获取本地缓存内容
 */
var getInfoFromStorage = function (key) {
  try {
    return wx.getStorageSync(key);
  }
  catch (e) {
    console.log("获取" + key + "失败");
  }

  return undefined;
}

/**
 * 获取基础url
 */
var getBaseUrl = function () {
  return baseurl.content;
}

/**
 * 上传文件
 */
var uploadFile = function (url, file, name, formData, loadingType, successFn, errorFn, completeFn) {
  wx.checkSession({
    success: function () {
      var session_id = getSessionId();//本地取存储的sessionID
      if (session_id) {
        var header = { 'content-type': 'application/x-www-form-urlencoded', 'Cookie': 'new.cookie.id=' + session_id };
      }
      else {
        var header = { 'content-type': 'application/x-www-form-urlencoded' };
      }
      if (url.indexOf(getBaseUrl()) < 0) {
        if (url.indexOf("/") == 0) {
          url = getBaseUrl() + url;
        }
        else {
          url = getBaseUrl() + "/" + url;
        }
      }
      if (url.indexOf("?") > 0) {
        url += "&ajax=true";
      }
      else {
        url += "?ajax=true";
      }
      if (loadingType) {
        wx.showLoading({
          title: "请稍后",
          mask: true
        })
			}
			console.log(url)
			console.log(file)
			console.log(name)
			console.log(formData)
			console.log(header)
      wx.uploadFile({
        url: url,
        filePath: file,
        name: name,
        formData: formData,
        header: header,
        success: function (res) {
          console.log('999', res)
          if (loadingType) {
            wx.hideLoading();
          }
          if (res.data.hasErrors) {
            // 需要登录，详情查看后台LoginIntercetor
            if (res.data.errorCode == noLoginCode)
              login();
            else if (res.data.errorCode == noCompleteCode)
              toComplete();
            else if (res.data.errorCode == notAcceptCode)
              console.error("接口：" + url + "缺少参数");
            else
              showError(res.data.errorMessage);
            return false;
          }
          if (successFn)
            successFn(res.data);
        },
        fail: function (res) {
					console.log(res)
          if (loadingType) {
            wx.hideLoading();
          }
          showError("网络连接错误，请稍后重试");
          if (errorFn) {
            errorFn(res.data);
          }
        },
        complete: function () {
        }
      })
    },
    fail: function () {
      login();
    }
  });
}

/**
 * url: 填写子url即可，例如：完整url为：http://xx.com/api/demo，则url填写为/api/demo即可，baseUrl参见util.js -> baseUrl
 * param: 请求参数
 * sendType: （需大写）有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
 * loadingType (选填)为true则显示loading，反之不显示
 * successFn: （选填）成功处理函数，若返回出错，则不执行该函数，由本方法自行处理
 * errorFn: （选填）失败处理函数，如：超时等问题，本方法已处理提示操作 
 */
var sendRequest = function (url, param, sendType, loadingType, successFn, errorFn) {
  wx.checkSession({
    success: function () {
      var session_id = getSessionId();//本地取存储的sessionID
			// console.log(session_id)
      if (session_id) {
        var header = { 'content-type': 'application/x-www-form-urlencoded', 'Cookie': 'new.cookie.id=' + session_id };
        // console.log(session_id)
      }
      else {
        var header = { 'content-type': 'application/x-www-form-urlencoded' };
      }
      if (url.indexOf(getBaseUrl()) < 0) {
        if (url.indexOf("/") == 0) {
          url = getBaseUrl() + url;
        }
        else {
          url = getBaseUrl() + "/" + url;
        }
      }
      if (url.indexOf("?") > 0) {
        url += "&ajax=true";
      }
      else {
        url += "?ajax=true";
      }
      if (loadingType) {
        wx.showLoading({
          title: "请稍后",
          mask: true
        });
      }
      wx.request({
        url: url,
        data: param,
        method: sendType,
        header: header,
        success: function (res) {
          if (loadingType) {
            wx.hideLoading();
          }
          if (res.data.hasErrors) {
            //需要登录，详情查看后台LoginIntercetor
            if (res.data.errorCode == noLoginCode){
							// 该方法因微信官网改动而废弃
              // login()
            }
						// 原先的逻辑注释掉
            // else if (res.data.errorCode == noCompleteCode){
            //   toComplete();
            // }
            else if (res.data.errorCode == notAcceptCode) {
							console.error("接口：" + url + "缺少参数");
						}
            else {
							// console.log(111)
              // showError(res.data.errorMessage);
              // return false;
						}
          }
          if (successFn)
            successFn(res.data);
        },
        fail: function (res) {
          if (loadingType) {
            wx.hideLoading();
          }
          // showError("网络连接错误，请稍后重试");
          if (errorFn)
            errorFn(res.data);
        },
        complete: function () {

        }
      })
    },
    fail: function () {
      login()
    }
  })
}
//不查登录态的请求
/**
 * url: 填写子url即可，例如：完整url为：http://xx.com/api/demo，则url填写为/api/demo即可，baseUrl参见util.js -> baseUrl
 * param: 请求参数
 * sendType: （需大写）有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
 * loadingType (选填)为true则显示loading，反之不显示
 * successFn: （选填）成功处理函数，若返回出错，则不执行该函数，由本方法自行处理
 * errorFn: （选填）失败处理函数，如：超时等问题，本方法已处理提示操作 
 */
var sendRequest_s = function (url, param, sendType, loadingType, successFn, errorFn) {
     var header = { 'content-type': 'application/x-www-form-urlencoded' };
      if (url.indexOf(getBaseUrl()) < 0) {
        if (url.indexOf("/") == 0) {
          url = getBaseUrl() + url;
        }
        else {
          url = getBaseUrl() + "/" + url;
        }
      }
      if (url.indexOf("?") > 0) {
        url += "&ajax=true";
      }
      else {
        url += "?ajax=true";
      }
      if (loadingType) {
        wx.showLoading({
          title: "请稍后",
          mask: true
        });
      }
      wx.request({
        url: url,
        data: param,
        method: sendType,
        header: header,
        success: function (res) {
          if (loadingType) {
            wx.hideLoading();
          }
          if (res.data.hasErrors) {
            //需要登录，详情查看后台LoginIntercetor
            if (res.data.errorCode == noLoginCode) {
              login()
            }

            else if (res.data.errorCode == noCompleteCode) {
              toComplete();
            }

            else if (res.data.errorCode == notAcceptCode)
              console.error("接口：" + url + "缺少参数");
            else
              showError(res.data.errorMessage);

            return false;
          }
          if (successFn)
            successFn(res.data);
        },
        fail: function (res) {
          if (loadingType) {
            wx.hideLoading();
          }
          // showError("网络连接错误，请稍后重试");
          if (errorFn)
            errorFn(res.data);
        },
        complete: function () {

        }
      })
}
// 解决异步问题
function wxPromisify(fn) {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        resolve(res)
      }

      obj.fail = function (res) {
        reject(res)
      }

      fn(obj)
    })
  }
}
/**
 * 错误提示框
 * msg: 提示内容
 */
var showError = function (msg, url) {
  wx.showModal({
    title: '提示',
    content: msg,
    showCancel: false,
    success: function(){
      if(url) {
        navigateTo(url);
      }
    }
  })
}

/**
 * 成功提示框
 */
var showSuccess = function () {
  wx.showToast({
    title: '成功',
    icon: 'success',
    duration: 2000
  })
}
/*解决连续跳转bug
 */
var  buttonClicked = function(self) {
  self.setData({
    buttonClicked: true
  })
  setTimeout(function () {
    self.setData({
      buttonClicked: false
    })
  }, 500)
}
/**
 * 保留当前页面，跳转到应用内的某个页面，使用wx.navigateBack可以返回到原页面。
 * url：跳转页面url
 * param： 请求参数
 * successFn: 成功处理函数（选填）
 * failFn: 失败处理函数（选填）
 * completeFn: 完成处理函数（选填）
 */
var navigateTo = function (url, param, successFn, failFn, completeFn) {
  url = setParamToUrl(url, param);
  wx.showLoading({
    title: "请稍后",
    mask: true
  });
  wx.navigateTo({
    url: url,
    success: function () {
      if (successFn)
        successFn();
    },
    fail: function () {
      console.error("页面跳转失败");
      if (failFn)
        failFn();
    },
    complete: function () {
      wx.hideLoading();
      if (completeFn)
        completeFn();
    }
  });

}

/**
 * 关闭当前页面，跳转到应用内的某个页面。
 */
var redirectTo = function (url, param, successFn, failFn, completeFn) {
  url = setParamToUrl(url, param);
  wx.showLoading({
    title: "请稍后",
    mask: true
  });
  wx.redirectTo({
    url: url,
    success: function () {
      if (successFn)
        successFn();
    },
    fail: function () {
      console.error("页面跳转失败");
      if (failFn)
        failFn();
    },
    complete: function () {
      wx.hideLoading();
      if (completeFn)
        completeFn();
    }
  });
}

/**
 * 关闭所有页面，打开到应用内的某个页面。
 */
var reLaunch = function (url, param, successFn, failFn, completeFn) {
  url = setParamToUrl(url, param);
  wx.showLoading({
    title: "请稍后",
    mask: true
  });
  wx.reLaunch({
    url: url,
    success: function () {
      if (successFn)
        successFn();
    },
    fail: function () {
      showError("网络请求超时，请稍后再试");
      if (failFn)
        failFn();
    },
    complete: function () {
      wx.hideLoading();
      if (completeFn)
        completeFn();
    }
  });
}

/**
 * 将param以get形式添加到url中
 */
var setParamToUrl = function (url, param) {
  if (param) {
    var attrArr = Object.keys(param);
    if (attrArr) {
      attrArr.forEach(function (value) {
        if (url.indexOf("?") >= 0)
          url += "&" + value + "=" + param[value];
        else
          url += "?" + value + "=" + param[value];
      });
    }
  }

  return url;
}

var setStaticUrl = function (url) {
  return baseurl.content + url;
}

/**
 * 确认框
 * option为配置对象
 */
var confirm = function (option) {
  var title = option.title ? option.title : "提示";
  var content = option.content ? option.content : "";
  var confirmText = option.confirmText ? option.confirmText : "确认";
  var cancleText = option.cancleText ? option.cancleText : "取消";
  var confirmFn = option.confirmFn ? option.confirmFn : function () { };
  var cancleFn = option.cancleFn ? option.cancleFn : function () { };
  wx.showModal({
    title: title,
    content: content,
    confirmText: confirmText,
    cancelText: cancleText,
    success: function (res) {
      if (res.confirm) {
        confirmFn(res);
      } else {
        cancleFn(res);
      }
    }
  });
}
var switchTab = function (options) {
  options.url = options.url ? options.url : "";
  options.success = options.successFn ? options.successFn : function () { };
  options.fail = options.failFn ? options.failFn : function () { };
  options.complete = options.completeFn ? options.completeFn : function () { };
  wx.switchTab(options);
}

var getUUID = function () {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
}
var parseEmoji = function (msg) {
  if (typeof Emoji === 'undefined' || typeof Emoji.map === 'undefined') {
    return msg;
  } else {
    var emoji = Emoji,
      reg = null;
    var msgList = [];
    var objList = [];
    for (var face in emoji.map) {
      if (emoji.map.hasOwnProperty(face)) {
        while (msg.indexOf(face) > -1) {
          msg = msg.replace(face, "^" + emoji.map[face] + "^");
        }
      }
    }
    var ary = msg.split('^')
    var reg = /^e.*g$/
    for (var i = 0; i < ary.length; i++) {
      if (ary[i] != '') {
        msgList.push(ary[i])
      }
    }
    for (var i = 0; i < msgList.length; i++) {
      if (reg.test(msgList[i])) {
        var obj = {}
        obj['data'] = msgList[i]
        obj['type'] = 'emoji'
        objList.push(obj)
      } else {
        var obj = {}
        obj['data'] = msgList[i]
        obj['type'] = 'txt'
        objList.push(obj)
      }
    }
    return objList;
  }
}
var Emoji = {
  path: '../../images/faces/',
  map: {
    '[):]': 'ee_1.png',
    '[:D]': 'ee_2.png',
    '[;)]': 'ee_3.png',
    '[:-o]': 'ee_4.png',
    '[:p]': 'ee_5.png',
    '[(H)]': 'ee_6.png',
    // '[:@]': 'ee_7.png',
    '[:s]': 'ee_8.png',
    '[:$]': 'ee_9.png',
    '[:(]': 'ee_10.png',
    '[:\'(]': 'ee_11.png',
    '[:|]': 'ee_12.png',
    '[(a)]': 'ee_13.png',
    '[8o|]': 'ee_14.png',
    '[8-|]': 'ee_15.png',
    // '[+o(]': 'ee_16.png',
    '[<o)]': 'ee_17.png',
    '[|-)]': 'ee_18.png',
    // '[*-)]': 'ee_19.png',
    '[:-#]': 'ee_20.png',
    '[:-*]': 'ee_21.png',
    '[^o)]': 'ee_22.png',
    '[8-)]': 'ee_23.png',
    '[del]': 'btn_del.png',
    '[(|)]': 'ee_24.png',
    '[(u)]': 'ee_25.png',
    '[(S)]': 'ee_26.png',
    '[(*)]': 'ee_27.png',
    '[(#)]': 'ee_28.png',
    '[(R)]': 'ee_29.png',
    '[({)]': 'ee_30.png',
    '[(})]': 'ee_31.png',
    '[(k)]': 'ee_32.png',
    '[(F)]': 'ee_33.png',
    '[(W)]': 'ee_34.png',
    '[(D)]': 'ee_35.png',
    '[del]': 'btn_del.png'
  }
}
var EmojiObj = {
  path: '../../images/faces/',
  map1: {
    '[):]': 'ee_1.png',
    '[:D]': 'ee_2.png',
    '[;)]': 'ee_3.png',
    '[:-o]': 'ee_4.png',
    '[:p]': 'ee_5.png',
    '[(H)]': 'ee_6.png',
    '[:s]': 'ee_8.png',
  },
  map2: {
    '[:$]': 'ee_9.png',
    '[:(]': 'ee_10.png',
    '[:\'(]': 'ee_11.png',
    '[:|]': 'ee_12.png',
    '[(a)]': 'ee_13.png',
    '[(#)]': 'ee_28.png',
    '[8o|]': 'ee_14.png'
  },
  map3: {
    '[(D)]': 'ee_35.png',
    '[<o)]': 'ee_17.png',
    '[|-)]': 'ee_18.png',
    '[8o|]': 'ee_14.png',
    '[:-#]': 'ee_20.png',
    '[:|]': 'ee_12.png',
    '[del]': 'del.png'
  },
  map4: {
    '[:-*]': 'ee_21.png',
    '[^o)]': 'ee_22.png',
    '[8-)]': 'ee_23.png',
    '[(|)]': 'ee_24.png',
    '[(u)]': 'ee_25.png',
    '[(S)]': 'ee_26.png',
    '[(*)]': 'ee_27.png'
  },
  map5: {
    
    '[(R)]': 'ee_29.png',
    '[({)]': 'ee_30.png',
    '[(})]': 'ee_31.png',
    '[(k)]': 'ee_32.png',
    '[(F)]': 'ee_33.png',
    '[(D)]': 'ee_34.png',
    '[del]': 'del.png'
  },
  map6: {
    
    
  }
}
module.exports = {
  formatDate: formatDate,
  formatTime: formatTime,
  formatNumber: formatNumber,
  showError: showError,
  sendRequest: sendRequest,
  sendRequest_s: sendRequest_s,
  showSuccess: showSuccess,
  login: login,
  getInfoFromStorage: getInfoFromStorage,
  setInfoToStorage: setInfoToStorage,
  ldqCheckLogin: ldqCheckLogin,
  gdCheckLogin: gdCheckLogin,
  ldqCheckStudent: ldqCheckStudent,
  toComplete: toComplete,
  setStaticUrl: setStaticUrl,
  navigateTo: navigateTo,
  redirectTo: redirectTo,
  reLaunch: reLaunch,
  uploadFile: uploadFile,
  confirm: confirm,
  switchTab: switchTab,
  getSessionId: getSessionId,
  getUUID: getUUID,
  getCurrentTimestamp: getCurrentTimestamp,
  getCurrentTime: getCurrentTime,
  getCurrentDate: getCurrentDate,
  EmojiObj: EmojiObj,
  Emoji: Emoji,
  parseEmoji: parseEmoji,
  wxPromisify: wxPromisify,
  gdForward: gdForward,
  popupShow:popupShow,
}

