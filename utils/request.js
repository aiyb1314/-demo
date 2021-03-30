import config from './config'
export default  (url, data={}, method='GET') => {
  wx.showLoading({
    title: '正在加载',
    mask: true
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.mobileHost + url,
      data,
      method,
      header: {
        cookie: wx.getStorageSync('cookies')?wx.getStorageSync('cookies').find(item => item.indexOf('MUSIC_U') !== -1):''
      },
      success: (res) => {
        // console.log('请求成功: ', res);
        if(data.isLogin){// 登录请求
          // 将用户的cookie存入至本地
          wx.setStorage({
            key: 'cookies',
            data: res.cookies
          })
        }
        resolve(res.data); // resolve修改promise的状态为成功状态resolved
      },
      fail: (err) => {
        // console.log('请求失败: ', err);
        reject(err); // reject修改promise的状态为失败状态 rejected
      },
      complete:()=>{
          wx.hideLoading()
      }
    })
  })
  
}
