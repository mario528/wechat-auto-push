const formatDate = function () {
    let weekList = ['日','一','二','三','四','五','六'];
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    let week = "星期"+ weekList[date.getDay()];
    const time = {
        year,month,day,week
    }
    return time;
}
const formatSendMsg = function (word,weather) {
    const date = formatDate();
    const str = `
今天是${date.year}年${date.month}月${date.day}日,${date.week}。
温度：最高气温${weather.high}, 最低气温${weather.low},天气:${weather.type}。风力:${weather.wind_type}${weather.wind_num}。 
${word}`
    console.log(str)
}
module.exports = {
    formatDate,
    formatSendMsg
}