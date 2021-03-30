//app.js
import { store } from './store/store'
const audio = wx.getBackgroundAudioManager()
App({
    onLaunch: function () {
        audio.onPlay(() => {
            store.set_playSatu(true)
        })
        audio.onPause(() => {
            store.set_playSatu(false)
        })
        audio.onEnded(() => {
            if (store.playMode === "loop") {
                let initalObj = Object.assign({}, store.currentSong);
                store.set_currentSong(initalObj)
            }else{
                store.nextSong()
            }
        })
        audio.onStop(() => {
            store.set_playSatu(false)
            console.log('发生问题停止');
        })
    },
    globalData: {
        userInfo: null
    }
})