import '../scss/main.scss';

import {queryDifferentReports} from './libs/queryFuncs.js';

import {requestDataForiPhoneAppStory} from './libs/requestData.js';
import {renderDataToTable} from './libs/renderData.js';
import { keysArr, extractObjData, addPropsToData, divide, revenue } from './libs/handleGaData.js'
import {fetchMoreInfoOfStorysAsync} from './libs/fetch.js';
import {formatDate} from './libs/handleDate';
import Table from '@ftchinese/ftc-table';
import {FullHeader} from '@ftchinese/ftc-header/main.js';


FullHeader.init();
const requestDataArr = [requestDataForiPhoneAppStory];

function processDataFunc(responseDataArr) {
  const responseData = responseDataArr[0]
  const labelKeys = keysArr(responseData.reports[0]);
  const objData = extractObjData(responseData.reports, ["story","disp","tap","buySucS","buySucP"],labelKeys,'buySucS');

  const assignedObjData = objData.map(item => {
    item.id = item.story.replace(/^ExclusiveContent\/premium\/([0-9]{9})/, '$1');
   
    return Object.assign(item, {
      title: 'waiting...',
      pubdate: 'waiting...'
    });

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
  console.log(newObjData);

  renderDataToTable('storyOfIphoneApp', newObjData, ["id","title","pubdate","disp","tap","buySucS","buySucP","Conversion",'Revenue'], ["disp","tap","pop","buySucS","buySucP", "Revenue"]);
  new Table('#storyOfIphoneApp');


  const storyIdArr = labelKeys.map(item => item.replace(/^ExclusiveContent\/premium\/([0-9]{9})/, '$1'));//TODO:变成50篇50篇地请求
  console.log('storyIdArr.length',storyIdArr.length);
  const tableElem = document.getElementById('storyOfIphoneApp');

  const cbFunc = function(moreInfoData) {
    const id = moreInfoData.id||'';
    const title = moreInfoData.cheadline || '标题缺失';
    const pubdate = moreInfoData.pubdate ? formatDate((parseInt(moreInfoData.pubdate,10) + 28800) * 1000) : ''
    
    if (id) {
      const targetTr = tableElem.querySelector(`[data-storyid="${id}"]`);
      const targetTitleTd = targetTr.querySelector('td:nth-child(2)');
      const targetPubdateTd = targetTr.querySelector('td:nth-child(3)');
      targetTitleTd.innerHTML = title;
      targetPubdateTd.innerHTML = pubdate;
    }
  }

  fetchMoreInfoOfStorysAsync(storyIdArr, cbFunc);
  
}

function clickFunc() {
  queryDifferentReports(requestDataArr, processDataFunc);
}

window.clickFunc = clickFunc;

