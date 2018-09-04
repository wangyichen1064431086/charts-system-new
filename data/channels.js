const urlPath = process.env.NODE_ENV === 'development' ? '/' : 'https://backyard.ftchinese.com/chartist/charts/';
const fileExt =  process.env.NODE_ENV === 'development' ? '' : '.html';

module.exports = [
  {
    "name": "用户转化",
    "url": `${urlPath}userpyramid/main${fileExt}`,
    "index":0,
    "subChannels":[
      {
        "name":"iphoneApp",
        "url": `${urlPath}userpyramid/iphoneapp${fileExt}`,
        "index":0
      },
      {
        "name":"androidApp",
        "url": `${urlPath}userpyramid/androidapp${fileExt}`,
        "index":1
      },
      {
        "name":"web",
        "url": `${urlPath}userpyramid/web${fileExt}`,
        "index":2
      }
    ]  
  },
  {
    "name": "付费文章",
    "url": `${urlPath}paidstory/main${fileExt}`,
    "index":1,
    "subChannels":[
      {
        "name":"iPhoneApp",
        "url":`${urlPath}paidstory/iphoneapp${fileExt}`,
        "index":0
      },
      {
        "name":"AndroidApp",
        "url":`${urlPath}paidstory/androidapp${fileExt}`,
        "index":1
      },
      {
        "name":"Web",
        "url":`${urlPath}paidstory/web${fileExt}`,
        "index":2
      }
    ]  
  },

  {
    "name": "广告监控",
    "url": `${urlPath}admonitor/main${fileExt}`,
    "index":2,
    "subChannels":[
      {
        "name":"Campain606955",
        "url": `${urlPath}admonitor/one${fileExt}?adid=606955`,
        "index":0
      },
      {
        "name":"Campain606835",
        "url": `${urlPath}admonitor/one${fileExt}?adid=606835`,
        "index":1
      },
      {
        "name":"Campain606986",
        "url": `${urlPath}admonitor/one${fileExt}?adid=606986`,
        "index":2
      },
      {
        "name":"SomeOther",
        "url": `${urlPath}admonitor/one${fileExt}`,
        "index":3
      }
    ]  
  },
]