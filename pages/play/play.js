// pages/paly/paly.js
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../../store/store'
const audio = wx.getBackgroundAudioManager()
Component({
    behaviors: [storeBindingsBehavior],
    /**
     * 组件的属性列表
     */
    storeBindings: {
        store,
        fields: ['currentSong', 'playSatu', 'playMode'],
        actions: ['nextSong','select_palyMode','prevSong']
    },
    data: {
        playMode_class: ''
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
        'currentSong': function(currentSong){
            if(Object.keys(currentSong).length === 0){
                wx.navigateBack()
            }
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        selectPlay() {
            audio.paused ? audio.play() : audio.pause();
        },
        on_playList() {
            const play_list = this.selectComponent('#play-list');
            play_list.open()
        },

    }

})