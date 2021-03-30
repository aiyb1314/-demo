// pages/album/album.jsComponent
import { get_album, initialList } from '../../api/index'
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../../store/store'
Component({
    behaviors: [storeBindingsBehavior],
    data: {
        songList: [],
        name: "",
        coverImgUrl: "",
    },
    storeBindings: {
        store,
        actions: ['set_currentSong','set_songList']
    },
    methods: {
        onLoad(options) {
            // 获取专辑
            get_album(options.id).then(res => {
                var data = res.data;
                this.setData({
                    name:data.artist.name,
                    coverImgUrl:data.artist.img1v1Url,
                    songList:initialList(data.hotSongs)
                })
            })
        },
        ontap(data){
            let song = data.currentTarget.dataset.song;
            console.log(song);
            this.set_currentSong(song);
            this.set_songList(this.data.songList);
            wx.navigateTo({
                url:`/pages/paly/paly`
            })
        },
    }
})