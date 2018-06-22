const urlPath = process.env.NODE_ENV === 'development' ? '/' : 'https://backyard.ftchinese.com/chartist/charts-system-new/';
const fileExt =  process.env.NODE_ENV === 'development' ? '' : '.html';

module.exports = {
  "myTitle":"广告监控：单个广告Gap",

  
	"nav": {
    "indexForSelectedTopChannel": 1,
    "indexForSelectedSubChannel": 0,
    "topChannels": [
      {
        "name": "付费文章",
        "url": "#",
        "index":0,
        "subChannels":[
          {
            "name":"All",
            "url": `${urlPath}all${fileExt}`,
            "index":0
          },
          {
            "name":"iPhoneApp",
            "url":`${urlPath}iphoneapp${fileExt}`,
            "index":1
          },
          {
            "name":"AndroidApp",
            "url":`${urlPath}androidapp${fileExt}`,
            "index":2
          },
          {
            "name":"Web",
            "url":`${urlPath}web${fileExt}`,
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
            "url": `#`,
            "index":0
          },
          {
            "name":"GapIndex",
            "url": `${urlPath}gapindex${fileExt}`,
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
