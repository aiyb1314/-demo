import {requst} from './index'
// mv推荐
export const get_mv_recommend = (limit,offset)=>{
    var _limit = limit || 30;
    var _offset = offset || 0;
    return requst({
        url:`mv/all?limit=${_limit}&offset=${_offset}`
    })
}
// 获取url地址
export const get_mv_url = id=>{
    return requst({
        url:`mv/url?id=${id}`
    })
}
// 获取mv详情
export const get_mv_detail = id=>{
    return requst({
        url: `mv/detail?mvid=${id}`
    })
}
// 相似mv
export const get_mv_similar = id=>{
    return requst({
        url: `simi/mv?mvid=${id}`
    })
}