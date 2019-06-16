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

const getWord = function() {
    superAgentRequest(config.WORD_URL,'GET').then((res)=> {
        const $ = cheerio.load(res.text);
        const todayWord = $('#carousel-one>.carousel-inner>.item:nth-child(1)').find('.fp-one-cita').text().replace(/(^\s*)|(\s*$)/g, "");
        console.log(todayWord)
        return todayWord
    })
}