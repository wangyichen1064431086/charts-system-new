import {queryDifferentReports} from './libs/queryFuncs.js';

import {requestDataForiPhoneAppStory} from './libs/requestData.js';
import {renderDataToTable} from './libs/renderData.js';
import { keysArr, extractObjData, addPropsToData, divide, revenue } from './libs/handleGaData.js'
import {fetchMoreInfoOfOneStory, fetchMoreInfoOfStorys} from './libs/fetch.js';
import {formatDate} from './libs/handleDate';
import Table from '@ftchinese/ftc-table';

import '../scss/main.scss';


const requestDataArr = [requestDataForiPhoneAppStory];

async function processDataFunc(responseDataArr) {
  const responseData = responseDataArr[0]
  const labelKeys = keysArr(responseData.reports[0]);
  console.log(labelKeys);
  const objData = extractObjData(responseData.reports, ["story","disp","tap","buySucS","buySucP"],labelKeys,'buySucS');
  

  const storyIdArr = labelKeys.map(item => item.replace(/^premium\/([0-9]{9})/, '$1'));
  /*
  console.log('storyIdArr:');
  console.log(storyIdArr);
  console.log(objData);
  */
  const cbFunc = function(item) {
    return {
      id:item.id || '',
      title: item.cheadline || '',
      //pubdateRow: item.pubdate,
      pubdate: item.pubdate ? formatDate((parseInt(item.pubdate,10) + 28800) * 1000) : ''
    }
  }
  /*
  const testFetchArr0 = await fetchMoreInfoOfStorys(['001077916','001077952']);
  console.log(`testFetchArr0:`);
  console.log(testFetchArr0);
  */
  const moreInfoOfStories = await fetchMoreInfoOfStorys(storyIdArr, cbFunc);
  console.log(`moreInfoOfStories:`);
  console.log(moreInfoOfStories);

  const assignedObjData = objData.map(item => {
    item.id = item.story.replace(/^premium\/([0-9]{9})/, '$1');
    delete item.story;
    const moreInfoOfOneStory = moreInfoOfStories.filter(story => story.id === item.id);
    const resultOfmoreInfoOfOneStory = moreInfoOfOneStory.length === 1 ? moreInfoOfOneStory[0] : {};
    return Object.assign(item, resultOfmoreInfoOfOneStory);
  });

  console.log('assignedObjData:');
  console.log(assignedObjData);
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
  console.log(newObjData);

  renderDataToTable('storyOfIphoneApp', newObjData, ["id","title","pubdate","disp","tap","buySucS","buySucP","Conversion",'Revenue'], ["disp","tap","pop","buySucS","buySucP"]);
  new Table('#storyOfIphoneApp');

  
}

function clickFunc() {
  queryDifferentReports(requestDataArr, processDataFunc);
}

window.clickFunc = clickFunc;

