const nodeEnv = process.env.NODE_ENV || '';
const urlPath = process.env.NODE_ENV === 'development' ? '/' : 'https://backyard.ftchinese.com/chartist/charts-system-new/';
const fileExt =  process.env.NODE_ENV === 'development' ? '' : '.html';
module.exports = {
  "myTitle":"付费文章Engagement: All Devices",

  
	"nav": {
    "indexForSelectedTopChannel": 0,
    "indexForSelectedSubChannel": 0,
    "topChannels": [
      {
        "name": "付费文章",
        "url": "#",
        "index":0,
        "subChannels":[
          {
            "name":"All",
            "url":"#",
            "index":0
          },
          {
            "name":"iPhoneApp",
            "url": nodeEnv === 'development' ? '/iphoneapp': "https://backyard.ftchinese.com/chartist/charts-system-new/iphoneapp.html",
            "index":1
          },
          {
            "name":"AndroidApp",
            "url": nodeEnv === 'development' ? '/androidapp': "https://backyard.ftchinese.com/chartist/charts-system-new/androidapp.html",
            "index":2
          },
          {
            "name":"Web",
            "url":nodeEnv === 'development' ? '/web': "https://backyard.ftchinese.com/chartist/charts-system-new/web.html",
            "index":3
          }
        ]  
      },
      {
        "name": "广告监控",
        "url": "#",
        "index":1,
        "subChannels":[
          {
            "name":"Gap",
            "url": `${urlPath}gap${fileExt}`,
            "index":0
          }
        ]  
      }
    ]
  },
  "search": {
		"actionUrl":"/search/",
		"placeholderText":"输入年月日‘xxxx-xx-xx’可搜索该日存档"
	}
}
