import '../scss/main.scss';

import {queryDifferentReports} from './libs/queryFuncs.js';
import {requestDataForOneAd} from './libs/requestData';
import { keysArr, extractArrayForOneField, extractObjData, getOneAdIdImpFromCy } from './libs/handleGaData.js';
import { fetchOneFileAsync } from './libs/fetch';

import {FullHeader} from '@ftchinese/ftc-header/main.js';

import setGlobOptionsForHighcharts from './chartsConfig/highcharts';

FullHeader.init();

setGlobOptionsForHighcharts();

const inputElem = document.getElementById('inputAdid');
const adId = getAdId();

function getAdId() {
  const adIdFromUrl = location.search.replace(/.*adid=([0-9]+)/, '$1') || '';
  const adIdFromInput = inputElem.value || '';
  if(adIdFromInput) {
    if (adIdFromUrl) {
       //TODO:更新location.search
    }
    return adIdFromInput;
  }
  return adIdFromUrl || '606658'; //没有值，那么默认为此值
}


function processDataFunc(responseDataArr) {
  const responseData = responseDataArr[0];
  console.log('responseData:');
  console.log(responseData);
  const datesArr = keysArr(responseData.reports[0]);
  const requestCountArr = extractArrayForOneField(responseData.reports[0], datesArr);
  const successCountArr = extractArrayForOneField(responseData.reports[1], datesArr);
  const failCountArr = extractArrayForOneField(responseData.reports[2], datesArr);
  const successRetryCountArr = extractArrayForOneField(responseData.reports[3], datesArr);
  console.log('requestCountArr:');
  console.log(requestCountArr);
  const requestCountChart = new Highcharts.chart({
    chart: {
      type: 'column',
      renderTo: 'requestCount'
    },
    title: {
      text: 'Request Counts'
    },
    xAxis: {
      categories: datesArr
    },
    yAxis: {
      title: {
        text: 'counts'
      }
    },
    tooltip: {
      pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y:.1f}</b><br/>',
      shared: true
    },
    series: [{
      name: 'Request',
      data: requestCountArr
    }]
  });

  const successCountChart = new Highcharts.chart({
    chart: {
      type: 'column',
      renderTo: 'successCount'
    },
    title: {
      text: 'Success Counts'
    },
    xAxis: {
      categories: datesArr
    },
    yAxis: {
      title: {
        text: 'counts'
      }
    },
    tooltip: {
      pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y:.1f}</b><br/>',
      shared: true
    },
    series: [{
      name: 'Success',
      data: successCountArr
    }]
  });
  
  const cbFuncForFetch = function(result) {
    //console.log(result);
    const cyImpArr = getOneAdIdImpFromCy(result, adId, datesArr);
    console.log(cyImpArr);
    const gapChart = new Highcharts.chart({
      chart: {
        type: 'column',
        renderTo: 'gapCount'
      },
      title: {
        text: 'Success Counts'
      },
      xAxis: {
        categories: datesArr
      },
      yAxis: {
        title: {
          text: 'counts'
        }
      },
      tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y:.1f}</b><br/>',
        shared: true
      },
      series: [{
        name: 'Ga',
        data: requestCountArr
      },{
        name: 'Cy',
        data: cyImpArr
      }]
    });
    
  }
  fetchOneFileAsync('/chuanyang/pc.json', cbFuncForFetch);

}
function clickFunc() {
  console.log(adId);
  const resultOfRequestDataForOneAd = requestDataForOneAd(adId);
  console.log(resultOfRequestDataForOneAd);
  const requestDataArr = [resultOfRequestDataForOneAd];

  queryDifferentReports(requestDataArr, processDataFunc);
}

document.getElementById('inputAdid').addEventListener('keyup', (e) => {
  if (e.keyCode === 13) { //如果按的是回车键，就自动执行clickFunc
    clickFunc();
  }
})

window.clickFunc = clickFunc;