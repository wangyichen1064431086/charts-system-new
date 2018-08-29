const urlPath = process.env.NODE_ENV === 'development' ? '/' : 'https://backyard.ftchinese.com/chartist/charts-system-new/';
const fileExt =  process.env.NODE_ENV === 'development' ? '' : '.html';

module.exports = {
  "myTitle":"付费文章Engagement: iPhoneApp",

	"nav": {
    "indexForSelectedTopChannel": 0,
    "indexForSelectedSubChannel": 1,
    "topChannels": [
      {
        "name": "付费文章",
        "url": "#",
        "index":0,
        "subChannels":[
          {
            "name":"All",
            "url": `${urlPath}paidstory/all${fileExt}`,
            "index":0
          },
          {
            "name":"iPhoneApp",
            "url":`${urlPath}paidstory/iphoneapp${fileExt}`,
            "index":1
          },
          {
            "name":"AndroidApp",
            "url":`${urlPath}paidstory/androidapp${fileExt}`,
            "index":2
          },
          {
            "name":"Web",
            "url":`${urlPath}paidstory/web${fileExt}`,
            "index":3
          }
        ]  
      },
      {
        "name": "用户转化",
        "url": `${urlPath}userpyramid/main${fileExt}`,
        "index":1,
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
        "name": "广告监控",
        "url": "#",
        "index":2,
        "subChannels":[
          {
            "name":"Gap",
            "url": `${urlPath}admonitor/gap${fileExt}`,
            "index":0
          },
          {
            "name":"GapIndex",
            "url": `${urlPath}admonitor/gapindex${fileExt}`,
            "index":1
          }
        ]  
      },
    ]
  },

  "search": {
		"actionUrl":"/search/",
		"placeholderText":"输入年月日‘xxxx-xx-xx’可搜索该日存档"
	}
}
