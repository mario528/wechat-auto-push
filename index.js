const {
    Wechaty
} = require('wechaty')
const qrcodeTerminal = require('qrcode-terminal')
const crawler = require('./crawler/index');
const schedule = require('node-schedule');
const config = require('./config/main')
const utils = require('./utils/utils')
var bot
let rule = new schedule.RecurrenceRule();
let list = [];
for (let i = 0; i < 60; i++) {
    list.push(i);
}
rule.second = list;
async function initSendMessage(cb) {
    let weather;
    let word;
    await crawler.getWeather(config.COUNTRY, config.CITY, config.LOCATION, (res) => {
        weather = res;
        crawler.getWord((res_word) => {
            word = res_word;
            let sendStr = utils.formatSendMsg(word, weather);
            cb(sendStr)
        });
    });
}
function onScean (qrcode,status) {
    console.log("---------------------",qrcode)
    qrcodeTerminal.generate(qrcode)
    const qrcodeImageUrl = [
        'https://api.qrserver.com/v1/create-qr-code/?data=',
        encodeURIComponent(qrcode),
    ].join('')
    console.log(qrcodeImageUrl)
}
async function pushMessage() {
    // schedule.scheduleJob(rule, () => {
    let contact = await bot.Contact.find({
        name: config.NICKNAME
    }) || await bot.Contact.find({
        alias: config.NAME
    })
    initSendMessage((res) => {
        contact.say(res)
    });
    // })
}
function onLogin (user) {
    console.log(`贴心小助理${user}登录了`)
    pushMessage();
}
bot = new Wechaty({
    name: 'myPushMsg'
})
bot.on('scan', onScean);
bot.on('login', onLogin);
bot.on('message',pushMessage);
bot.start().then(()=> {
    console.log('开始登录微信')
});