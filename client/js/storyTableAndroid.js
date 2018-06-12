import {queryDifferentReports} from './libs/queryFuncs.js';

import {requestDataForAndroidAppStory} from './libs/requestData.js';
import {renderDataToTable} from './libs/renderData.js';
import { keysArr, extractObjData, addPropsToData, divide, revenue } from './libs/handleGaData.js'
import {fetchMoreInfoOfOneStory, fetchMoreInfoOfStorys} from './libs/fetch.js';
import {formatDate} from './libs/handleDate';
import Table from '@ftchinese/ftc-table';
import {FullHeader} from '@ftchinese/ftc-header/main.js';

import '../scss/main.scss';

FullHeader.init();
const requestDataArr = [requestDataForAndroidAppStory];

async function processDataFunc(responseDataArr) {
  const responseData = responseDataArr[0]
  const labelKeys = keysArr(responseData.reports[0]);
  console.log(labelKeys);
  const objData = extractObjData(responseData.reports, ["story","disp","tap","buySucS","buySucP"],labelKeys,'buySucS');
  

  const storyIdArr = labelKeys.map(item => item.replace(/^ExclusiveContent\/premium\/([0-9]{9})$/, '$1'));
  console.log('storyIdArr:');
  console.log(storyIdArr);
  
  const cbFunc = function(item) {
    return {
      id:item.id || '',
      title: item.cheadline || '',
      pubdate: item.pubdate ? formatDate((parseInt(item.pubdate,10) + 28800) * 1000) : ''
    }
  }

  const moreInfoOfStories = await fetchMoreInfoOfStorys(storyIdArr, cbFunc);
  console.log('moreInforOfStories:');
  console.log(moreInfoOfStories)

  const assignedObjData = objData.map(item => {
    item.id = item.story.replace(/^ExclusiveContent\/premium\/([0-9]{9})$/, '$1');
    delete item.story;
    if (moreInfoOfStories.length > 0) {
      const moreInfoOfOneStory = moreInfoOfStories.filter(story => story.id === item.id);
      const resultOfmoreInfoOfOneStory = moreInfoOfOneStory.length > 0 ? moreInfoOfOneStory[0] : {};
      return Object.assign(item, resultOfmoreInfoOfOneStory);
    }
    return item;
  });


  const newObjData = addPropsToData(assignedObjData, [{
    operateFunc:divide,
    prop1:"buySucS",
    prop2:"disp",
    propNew:"Conversion"
  },{
    operateFunc: revenue,
    prop1:'buySucS',
    prop2:'buySucP',
    propNew: 'Revenue'
  }]);

  renderDataToTable('storyOfAndroidApp', newObjData, ["id","title","pubdate","disp","tap","buySucS","buySucP","Conversion",'Revenue'], ["disp","tap","pop","buySucS","buySucP", "Revenue"]);
  new Table('#storyOfAndroidApp');

  
}

function clickFunc() {
  queryDifferentReports(requestDataArr, processDataFunc);
}

window.clickFunc = clickFunc;

