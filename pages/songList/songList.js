// pages/songList/songList.js
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../../store/store'
import {
    // 获取歌曲列表
    get_songList,
    // 获取歌曲详情
    get_song,
    // 时间格式化
    formatDate,
    // 初始化歌曲格式
    initialList
} from '../../api/index.js';

Component({
    behaviors: [storeBindingsBehavior],
    /**
     * 页面的初始数据
     */
    data: {
        songList: [],
        backgroundCoverUrl: "",
        name: '',
        updateTime: ''
    },
    storeBindings: {
        store,
        actions: ['set_currentSong','set_songList']
    },
    methods:{
        /**
         * 生命周期函数--监听页面加载
         */
        onLoad: function (options) {
            get_songList(options.id).then(res => {
                const data = res.data.playlist;
                this.setData({
                    backgroundCoverUrl: data.coverImgUrl,
                    name: data.name,
                    updateTime: formatDate(data.updateTime, "YY年MM月DD日")
                });

                const list = data.trackIds;
                const ids = list.map(function (n) {
                    return n.id
                })
                return ids.join()
            }).then(res=>{
                return get_song(res)
            }).then(res =>{
                this.setData({
                    songList: initialList(res.data.songs)
                })
            })
        },

        ontap(data){
            let song = data.currentTarget.dataset.song;
            this.set_currentSong(song);
            this.set_songList(this.data.songList);
            wx.navigateTo({
                url:`/pages/paly/paly`
            })
        },
    },
})