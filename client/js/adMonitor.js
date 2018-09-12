import '../scss/main.scss';

import {queryDifferentReports} from './libs/queryFuncs.js';

import {requestDataForAds} from './libs/requestData.js';
import {renderDataToTable} from './libs/renderData.js';
import { keysArr, extractObjData, addPropsToData, divide, revenue, extractArrayForOneField, topDataByOneField } from './libs/handleGaData.js'
import {fetchMoreInfoOfStorysAsync} from './libs/fetch.js';
import {formatDate} from './libs/handleDate';
import Table from '@ftchinese/ftc-table';
 /*TODO:增加ftc-table功能:
 1. 关键字段可以有链接跳转
 2. 字段值有高、中、低颜色区分
 */
import {FullHeader} from '@ftchinese/ftc-header/main.js';

import simulateData from './simulateResponse/adMonitor';

FullHeader.init();
const requestDataArr = [requestDataForAds];

let runSimulate = false;

function proccessDataFunc(responseDataArr) {
  if(runSimulate) { //如果已经执行过模拟数据就不再执行真实数据,也不再执行模拟数据了
    return;
  }
  console.log('responseDataArr:');
  console.log(JSON.stringify(responseDataArr));

  const responseData = responseDataArr[0];
  const labelKeys = keysArr(responseData.reports[0]);



  const requestCountArr = extractArrayForOneField(responseData.reports[0], labelKeys);

  const keyAndRequestObjArr = labelKeys.map((item, index) => (
    {
      adName: item,
      request: requestCountArr[index]
    }
  ));
  console.log('keyAndRequestObjArr:');
  console.log(keyAndRequestObjArr);
  
  const requestTop30Arr = topDataByOneField(keyAndRequestObjArr, 'request', 30);
  const requestTop30AdNameArr = requestTop30Arr.map(item => (
    item.adName
  ));

  const objData = extractObjData(responseData.reports, ["adName","request","success","fail","sucOnRetry"], requestTop30AdNameArr);
  console.log(objData);
  objData.forEach(item => {
    const adNum = item.adName.replace(/.*\(([0-9]+)\)/,'$1');
    item.adName = `<a href="https://backyard.ftchinese.com/chartist/charts-system-new/gap.html?adid=${adNum}">${adNum}</a>`
  })

  const newObjData = addPropsToData(objData, [{
    operateFunc:divide,
    prop1:"success",
    prop2:"request",
    propNew:"successRate"
  },{
    operateFunc: divide,
    prop1:'fail',
    prop2:'request',
    propNew: 'failRate'
  },{
    operateFunc: divide,
    prop1:'sucOnRetry',
    prop2:'request',
    propNew: 'sucOnRetryRate'
  }]);
  console.log(newObjData);

  renderDataToTable('adMonitorIndex', newObjData, ["adName","request","success","fail","sucOnRetry",'successRate', 'failRate', 'sucOnRetryRate'], ['successRate', 'failRate', 'sucOnRetryRate']);
  new Table('#adMonitorIndex');
}

function runSimlateFunc() {
  console.log('simulate run');
  proccessDataFunc(simulateData);
  runSimulate = true;
}

function clickFunc() {
queryDifferentReports(requestDataArr, proccessDataFunc, runSimlateFunc);
}


const simulateButton = document.getElementById('simulateSignin');
simulateButton.addEventListener('click', runSimlateFunc, false);

window.clickFunc = clickFunc;