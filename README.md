# Wechaty的微信推送功能
使用wechaty实现定时对微信好友推送爬取的数据消息

![](https://img.wei ix zshields.io/badge/cheerio-1.0.0-green.svg)
![](https://img.shields.io/badge/chromium-2.1.1-green.svg)
![](https://img.shields.io/badge/nodeSchedule-1.3.2-green.svg)
![](https://img.shields.io/badge/qrcodeTerminal-0.12.0-green.svg)
![](https://img.shields.io/badge/superagent-5.1.0-green.svg)
![](https://img.shields.io/badge/wechaty-0.26.1-green.svg)

## 项目架构

config:配置项

修改config.js中的NICKNAME(用户名)，NAME(昵称)。

COUNTRY(国家),CITY(城市),LOCATION(具体街道位置——墨迹天气地址信息) 用户爬取指定地区的天气信息,从而向指定用户推送天气信息。

crawler: 爬虫目录

utils: 工具类

## 运行方式

```bash

npm install 

npm start

```
项目需要安装puppeteer, 请耐心等候。
