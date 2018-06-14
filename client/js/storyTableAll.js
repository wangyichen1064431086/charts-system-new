import '../scss/main.scss';

import {queryDifferentReports} from './libs/queryFuncs.js';

import {requestDataForiPhoneAppStory, requestDataForAndroidAppStory, requestDataForWebStory} from './libs/requestData.js';
import {renderDataToTable} from './libs/renderData.js';
import { keysArr, extractObjData, tranformArrayToObj,merge2ObjBySumPropValue, mergeMultiObj, addPropsToData, divide, revenue } from './libs/handleGaData.js'
import {fetchMoreInfoOfStorysAsync} from './libs/fetch.js';
import {formatDate} from './libs/handleDate';
import Table from '@ftchinese/ftc-table';
import {FullHeader} from '@ftchinese/ftc-header/main.js';



FullHeader.init();

const requestDataArr = [requestDataForiPhoneAppStory, requestDataForAndroidAppStory, requestDataForWebStory];

function processDataFunc(responseDataArr) {
  const transformedObjDataArr = responseDataArr.map(responseData => {
    const labelKeys = keysArr(responseData.reports[0]);
    const arrData = extractObjData(responseData.reports, ["story","disp","tap","buySucS","buySucP"], labelKeys);
    const handledIdArrData = arrData.map(item => {
      const storyStr = item.story;
      if (/^ExclusiveContent\/premium\/[0-9]{9}$/.test(storyStr)) {//iPhoneAppData & AndroidAppData
        item.id = item.story.replace(/^ExclusiveContent\/premium\/([0-9]{9})$/, '$1');
      } else if (/^ExclusiveContent\/story\/[0-9]{9}$/.test(storyStr)) {//WebData
        item.id = item.story.replace(/^ExclusiveContent\/story\/([0-9]{9})$/, '$1');
      } else {
        item.id = item.story;
      }
      delete item.story;
      return item;
    });
    const transformedObjData = tranformArrayToObj(handledIdArrData, 'id');
    return transformedObjData;
  });
  
  const mergedObj = mergeMultiObj(merge2ObjBySumPropValue, transformedObjDataArr, ["disp","tap","buySucS","buySucP"]);


  const mergedArr = Object.values(mergedObj);
  const assignedMergedArr = mergedArr.map(item => {
    return Object.assign(item, {
      title: 'waiting...',
      pubdate: 'waiting...'
    });
  });


  const newObjData = addPropsToData(assignedMergedArr, [{
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

  renderDataToTable('storyOfAll', newObjData, ["id","title","pubdate","disp","tap","buySucS","buySucP","Conversion",'Revenue'], ["disp","tap","pop","buySucS","buySucP", "Revenue"]);
  new Table('#storyOfAll');

  const storyIdArr = newObjData.map(item => item.id);
  const tableElem = document.getElementById('storyOfAll');
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