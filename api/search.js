import { requst } from './index';
// 获取歌曲详情
export const getSongDetail = id => {
    return requst({
        url:`song/detail?ids=${id}`
    })
 }
//获取搜索建议
export const getSearchRecom = flag => {
    return requst({
        url: `search/suggest?keywords=${flag}&type=mobile`
    })
}
// 获取综合搜索结果（mv,歌手）
export const getmultimatch = flag => {
    return requst({
        url: `search/multimatch?keywords=${flag}`
    })
}
// 获取热门搜索列表
export const get_search_hotList = () => {
    return requst({
        url: `search/hot`
    })
}
// 获取搜索结果
export const get_search_result = (keyWord,offset) => {
    if(!offset){
        var offset = 0
    }
    
    return requst({
        url: `search?keywords=${keyWord}&offset=${offset}`
    })
}

// 获取搜索历史
export const get_song_history = () => {
    return new Promise(function (resolve, reject) {
        wx.getStorage({
            key: 'songList',
            success(res) {
                resolve(res.data)
            },
            fail(error) {
                reject(error)
            },
        })
    })
}
// 设置localstorage搜索历史
export const set_song_history = array => {
    wx.setStorage({
        key: "songList",
        data: array
    })
}
// 删除设置localstorage搜索历史
export const clear_song_history = () => {
    wx.removeStorage({
        key: 'songList'
    })
}
// 将搜索结果添加到localstorage中
export const add_search_history = array => {
    var songList = wx.getStorageSync('songList') || [];
    var index = songList.indexOf(array);
    if (index != -1) {
        songList.splice(index, 1);
    } else if (songList.length >= 10) {
        songList.splice(songList.length - 1, 1)
    }
    songList.unshift(array);
    set_song_history(songList);
}