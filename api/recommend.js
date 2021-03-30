import { requst } from './index'

export function getrecommend() {
    return requst({
        url: 'personalized?limit=9'
    })
}

export function get_swiper(){
    return requst({
        url: 'banner'
    })
}