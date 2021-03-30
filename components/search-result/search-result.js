// components/search-result/search-result.js
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../../store/store'
import { getSongDetail, initialSong, get_search_result } from "../../api/index"
Component({
    behaviors: [storeBindingsBehavior],
    /**
     * 组件的属性列表
     */
    storeBindings: {
        store,
        actions: ['addSong']
    },
    properties: {
        multimatch: Object,
        songList: Array,
        keyword: String,
        songCount: Number
    },
    observers: {
        'songList': function (songList) {
            this.setData({
                offset: songList.length
            })
        }
    },
    /**
     * 组件的初始数据
     */
    data: {
        offset: 0
    },
    /**
     * 组件的方法列表
     */
    methods: {
        paly(e) {
            let id = e.currentTarget.dataset.id;
            getSongDetail(id).then(res => {
                let song = res.data.songs[0];
                let newSong = initialSong(song);
                this.addSong(newSong)
                wx.navigateTo({
                    url: '/pages/paly/paly'
                })
            })

        },
        updata() {
            if (this.data.offset < this.data.songCount) {
                get_search_result(this.data.keyword, this.data.offset).then(res => {
                    let data = res.data;
                    if (data.code === 200) {
                        let addList = data.result.songs;
                        let newList = [...this.data.songList,...addList]
                        this.setData({
                            songList:newList
                        })
                    }
                })
            }

        }
    }
})
