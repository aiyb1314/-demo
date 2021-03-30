// components/play_list/play_list.js
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../../store/store'
Component({
    behaviors: [storeBindingsBehavior],
    /**
     * 组件的初始数据
     */
    data: {
        display: false,
        playMode_class: ''
    },

    storeBindings: {
        store,
        fields: ['songList', 'currentIndex', 'currentSong','playMode'],
        actions: ['set_currentSong', 'select_palyMode','deleteSong','emptySongList']
    },
    observers: {
        'playMode': function (playMode) {
            var _class;
            switch (playMode) {
                case "loop":
                    _class = "icon-loop-2";
                    break;
                case "queue":
                    _class = "icon-liebiaoxunhuan";
                    break;
                case "random":
                    _class = "icon-suijixunhuan";
                    break;
                default:
                    break;
            }
            this.setData({
                playMode_class: _class
            })
        },
        'songList': function(songList){
            if(songList.length === 0){
                this.setData({
                    display:false
                })
            }
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        close() {
            this.setData({
                display: false
            })
        },
        open() {
            this.setData({
                display: true
            })
        },
        selectSong(data) {
            let song = data.currentTarget.dataset.song;
            this.set_currentSong(song);
        },
        _deleteSong(data){
            let index = data.currentTarget.dataset.index;
            this.deleteSong(index)
        }
    },
    options: {
        styleIsolation: 'apply-shared'
    }
})
