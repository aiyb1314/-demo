import { requst } from './index';
// 获取歌单详情
export function get_songList(id) {
    return requst({
        url: `playlist/detail?id=${id}`
    })
}
// 获取歌曲详情
export function get_song(ids){
    return requst({
        url: `song/detail?ids=${ids}`
    })
}
// 初始化歌曲列表格式
export const initialList = array =>{
    var newList = array.map(element => {
        return initialSong(element)
    });
    
    return newList;
}
// 初始化歌曲格式
export const initialSong = song => {
    var singer = _singer(song.ar);
    function _singer(array) {
       var data = array.map(element => {
           return element.name;
       });
       return data.join("/");
    }
    
    return {
       id: song.id,
       name: song.name,
       singer: singer,
       picUrl: song.al.picUrl,
       album: song.al.name,
       time: song.dt/1000,
       url: `https://music.163.com/song/media/outer/url?id=${song.id}.mp3`
    }
 }
