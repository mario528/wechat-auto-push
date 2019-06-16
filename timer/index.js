const timer = require('node-schedule');
function setTimer (time,cb) {
    timer.scheduleJob(time,cb);
}
module.exports = {
    setTimer
}