const {
    Wechaty
} = require('wechaty')
const crawler = require('./crawler/index');
const schedule = require('node-schedule');
const config = require('./config/main')
const utils = require('./utils/utils')
let rule = new schedule.RecurrenceRule();
let list = [];
for (let i = 0; i < 60; i++) {
    list.push(i);
}
rule.second = list;
schedule.scheduleJob(rule, () => {
    initSendMessage()
})
async function initSendMessage() {
    let weather;
    let word;
    await crawler.getWeather(config.COUNTRY, config.CITY, config.LOCATION, (res) => {
        weather = res;
        crawler.getWord((res_word) => {
            word = res_word;
            utils.formatSendMsg(word, weather)
        });
    });
}