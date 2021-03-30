// 时间格式化
export function formatDate(time, format = "YY-MM-DD hh:mm:ss") {
    var date = new Date(time);

    var year = date.getFullYear(),
        month = date.getMonth() + 1, //月份是从0开始的
        day = date.getDate(),
        hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds();
    var preArr = Array.apply(null, Array(10)).map(function (
        elem,
        index
    ) {
        return "0" + index;
    }); ////开个长度为10的数组 格式为 00 01 02 03

    var newTime = format
        .replace(/YY/g, year)
        .replace(/MM/g, preArr[month] || month)
        .replace(/DD/g, preArr[day] || day)
        .replace(/hh/g, preArr[hour] || hour)
        .replace(/mm/g, preArr[min] || min)
        .replace(/ss/g, preArr[sec] || sec);

    return newTime;
}
// 任意范围的随机整数生成函数
export const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// 转换时间格式
export function get_M_S(e) {
    var m;
    var s;
    m = Math.floor(e / 60);
    s = Math.floor(e % 60);
    if (s < 10) {
        s = "0" + s;
    }
    return m + ":" + s;
}