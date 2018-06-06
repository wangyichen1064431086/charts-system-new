import {queryDifferentReports} from './libs/queryFuncs.js';

import {requestDataForiPhoneAppStory} from './libs/requestData.js';
import {renderDataToTable} from './libs/renderData.js';
import { keysArr, extractObjData, addPropsToData, divide, revenue } from './libs/handleGaData.js'
import {fetchMoreInfoOfOneStory} from './libs/fetch.js';
import Table from '@ftchinese/ftc-table';

import '../scss/main.scss';


const requestDataArr = [requestDataForiPhoneAppStory];

async function processDataFunc(responseDataArr) {
  const responseData = responseDataArr[0]
  const labelKeys = keysArr(responseData.reports[0]);
  console.log(labelKeys);
  const objData = extractObjData(responseData.reports, ["story","disp","tap","buySucS","buySucP"],labelKeys,'buySucS');
  const newObjData = addPropsToData(objData, [{
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

  renderDataToTable('storyOfIphoneApp', newObjData, ["story","disp","tap","buySucS","buySucP","Conversion",'Revenue'], ["disp","tap","pop","buySucS","buySucP"]);
  new Table('#storyOfIphoneApp');

  const testFetch = await fetchMoreInfoOfOneStory('001077916');
  console.log('testFetch:');
  console.log(testFetch);
}

function clickFunc() {
  queryDifferentReports(requestDataArr, processDataFunc);
}

window.clickFunc = clickFunc;

