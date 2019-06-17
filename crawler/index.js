const superagent = require('superagent');
const cheerio = require('cheerio');
const config = require('../config/main');

const superAgentRequest = function (url, methods, params = {}, data = {}) {
    return new Promise((resolve, reject) => {
        superagent(methods, url)
            .query(params)
            .send(data)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .end((err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res)
                }
            })
    })
};

const getWord = function(cb) {
    superAgentRequest(config.WORD_URL,'GET').then((res)=> {
        const $ = cheerio.load(res.text);
        const todayWord = $('#carousel-one>.carousel-inner>.item:nth-child(1)').find('.fp-one-cita').text().replace(/(^\s*)|(\s*$)/g, "");
        cb(todayWord)
    })
}

const getWeather = function (country,city,location,cb) {
    const url = config.WEATHER_BASE_URL + country + '/' + city + '/' + location;
    superAgentRequest(url,'GET').then((res)=> {
        const $ = cheerio.load(res.text);
        const weather = {
            type: $('.forecast>ul:nth-child(3)>li:nth-child(2)').text().replace(/(^\s*)|(\s*$)/g, ""),
            high: $('.forecast>ul:nth-child(3)>li:nth-child(3)').text().split('/')[0].replace(/(^\s*)|(\s*$)/g, ""),
            low: $('.forecast>ul:nth-child(3)>li:nth-child(3)').text().split('/')[1].replace(/(^\s*)|(\s*$)/g, ""),
            wind_type: $('.forecast>ul:nth-child(3)>li:nth-child(4)>em').text().replace(/(^\s*)|(\s*$)/g, ""),
            wind_num: $('.forecast>ul:nth-child(3)>li:nth-child(4)>b').text().replace(/(^\s*)|(\s*$)/g, ""),
            air: $('.forecast>ul:nth-child(3)>li:nth-child(5)>strong').text().replace(/(^\s*)|(\s*$)/g, "")
        }
        cb(weather)
    })
}
module.exports = {
    getWord,
    getWeather
}