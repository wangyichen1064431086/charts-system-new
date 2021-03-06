import '../scss/main.scss';

import {queryDifferentReports} from './libs/queryFuncs.js';
import {requestDataForOneAd} from './libs/requestData';
import { keysArr, extractArrayForOneField, extractObjData, getOneAdIdImpFromCy, getRateArrForTwoArr } from './libs/handleGaData.js';
import { fetchOneFileAsync, fetchFileAsync } from './libs/fetch';

import {FullHeader} from '@ftchinese/ftc-header';

import setGlobOptionsForHighcharts from './chartsConfig/highcharts';

//import Papa from 'papaparse';
import simulateData from './simulateResponse/adMonitorOne';

FullHeader.init();

setGlobOptionsForHighcharts();

const inputElem = document.getElementById('inputAdid');
const inputErrorElem = inputElem.nextElementSibling;

let adId = getAdId();

function getAdId() {
  return location.search.replace(/.*adid=([0-9]+)/, '$1') || '606658';//默认值
  //test success:606666,606658
}

let runSimulate = false;
function proccessDataFunc(responseDataArr) {
  if(runSimulate) { 
    return;
  }
  console.log('responseDataArr:');
  console.log(JSON.stringify(responseDataArr));

  const responseData = responseDataArr[0];
  const datesArr = keysArr(responseData.reports[0]);
  if(datesArr.length === 0) {
    inputErrorElem.innerHTML = 'This adid has no data in ga';
    const chartsDivArr = Array.from(document.querySelectorAll('.chart'));
    chartsDivArr.forEach(elem => {
      elem.innerHTML = '';
    })

    return;
  }
  // console.log('datesArr:');
  // console.log(datesArr);
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
      text: `Request Counts for ${adId}`
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
      text: `Success Counts  ${adId}`
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
  /*
  const cbFuncForFetch = function(csvStr) {
    const papaResult = Papa.parse(csvStr, {
      header:true
    });
    console.log('papa result:');
    console.log(papaResult);
    let jsonData;
    if (papaResult.data && papaResult.data.length > 0) {
      jsonData = papaResult.data;
    } else {
      return;
    }
    const cyImpArr = getOneAdIdImpFromCy(jsonData, adId, datesArr);
    console.log(cyImpArr);
    const rateImpArr = getRateArrForTwoArr(requestCountArr, cyImpArr);
    const gapChart = new Highcharts.chart({
      chart: {
        //type: 'column',
        renderTo: 'gapCount'
      },
      title: {
        text: `Gap Between Ga Request & Cy for ${adId}` 
      },
      xAxis: {
        categories: datesArr
      },
      yAxis: [{
        title: {
          text: 'counts'
        }
      },{
        title: {
          text: 'rate'
        },
        labels: {
          format: '{value}%'
        },
        opposite: true
      }],
      tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y:.1f}</b><br/>',
        shared: true
      },
      series: [{
        type: 'column',
        name: 'Ga',
        yAxis: 0,
        data: requestCountArr
      },{
        type: 'column',
        name: 'Cy',
        yAxis: 0,
        data: cyImpArr
      },{
        type: 'spline',
        name: 'rate',
        yAxis: 1,
        data: rateImpArr
      }]
    });
    
  }
  */

  //fetchOneFileAsync('./chuanyang/cy.json', cbFuncForFetch); //json转csv的工具<https://www.npmjs.com/package/papaparse>
  //fetchFileAsync('./chuanyang/cynew.csv','text', cbFuncForFetch)
}

function clickFunc() {
  console.log(adId);
  adId = getAdId();
  const resultOfRequestDataForOneAd = requestDataForOneAd(adId);
  console.log(resultOfRequestDataForOneAd);
  const requestDataArr = [resultOfRequestDataForOneAd];

  queryDifferentReports(requestDataArr, proccessDataFunc);
}

inputElem.addEventListener('keyup', (e) => {
  e.preventDefault();
  if (e.keyCode === 13) { //如果按的是回车键，就执行url跳转
    const adIdFromInput = inputElem.value || '';
    if(!adIdFromInput) {
      inputErrorElem.innerHTML = '请输入有效的广告投放ID';
      return;
    }
    const search = location.search;
    if(search.match(/adid=[0-9]+/)) {
      console.log('1'); //用location.href比用location更保险
      location.href = location.href.replace(/adid=[0-9]+/,'adid='+adIdFromInput);
    } else {
      console.log('2');
      location.href = location.search ? (location.href + '&adid=' + adIdFromInput) : (location.href + '?adid=' + adIdFromInput);
    }
  }
})

function runSimlateFunc() {
  console.log('simulate run');
  proccessDataFunc(simulateData);
  runSimulate = true;
}


const simulateButton = document.getElementById('simulateSignin');
simulateButton.addEventListener('click', runSimlateFunc, false);

window.clickFunc = clickFunc;
