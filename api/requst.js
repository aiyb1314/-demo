export function requst(par){
    wx.showLoading({
        title:'请求中',
        mask:true
    })
    return new Promise(function(resolve,reject){
        wx.request({
            ...par,
            url:`https://api.mtnhao.com/${par.url}`,
            header: {
              'content-type': 'application/json' // 默认值
            },
            success (res) {
                resolve(res)
            },
            fail (error){
                reject(error)
            },
            complete(){
                wx.hideLoading()
            }
          })
    })
}
