import {requst} from './index'
export const get_album = id => {
    return requst({
        url:`artists?id=${id}`
    })
}