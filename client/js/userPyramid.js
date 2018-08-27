import '../scss/main.scss';

import {queryDifferentReports} from './libs/queryFuncs.js';
import {requestDataForAllUser, requestDataForiPhoneAppUser,requestDataForAndroidAppUser,requestDataForWebUser} from './libs/requestData';

import { keysArr,getOneValue } from './libs/handleGaData.js'

import {FullHeader} from '@ftchinese/ftc-header';

FullHeader.init();

const requestDataArr = [requestDataForAllUser, requestDataForiPhoneAppUser,requestDataForAndroidAppUser,requestDataForWebUser];

function proccessDataFunc(responseDataArr) {
  const allUsers= Number(getOneValue(responseDataArr[0].reports[0]));

  // MARK:金字塔图:for iphoneApp
  const iPhoneAppAllUsers = Number(getOneValue(responseDataArr[1].reports[0]));//iPhoneApp用户数
  const iPhoneAppStandardUsers = Number(getOneValue(responseDataArr[1].reports[1]));//standard会员数
  const iPhoneAppPremiumUsers = Number(getOneValue(responseDataArr[1].reports[2]));//premium会员数

  const iPhoneAppRestUsers = iPhoneAppAllUsers-iPhoneAppStandardUsers-iPhoneAppPremiumUsers;//iPhoneApp用户中还未订阅的用户数，即金字塔第1级

  const iPhoneAppPyramidChart = new Highcharts.Chart({
    chart: {
        type: 'pyramid',
        renderTo: 'iphoneAppPyramid'
    },
    title: {
        text: 'Engagement pyramid for iPhoneApp'
    },
    plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b> ({point.y:,.0f})',
                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                softConnector: true
            },
            center: ['40%', '50%'],
            width: '80%'
        }
    },
    legend: {
        enabled: false
    },
    series: [{
      name: 'Unique users',
      data: [
          ['Rest Users', iPhoneAppRestUsers], 
          ['Standard Users', iPhoneAppStandardUsers],
          ['Premium Users',  iPhoneAppPremiumUsers]
      ]
    }]
  });


  //MARK:金字塔图 for AndroidApp
  const androidAppAllUsers = Number(getOneValue(responseDataArr[2].reports[0]));//总用户数
  console.log('androidAppAllUsers:', androidAppAllUsers);
  const androidAppStandardUsers = Number(getOneValue(responseDataArr[2].reports[1]));//standard会员数。即金字塔第2级
  console.log('androidAppStandardUsers:', androidAppStandardUsers);
  const androidAppPremiumUsers = Number(getOneValue(responseDataArr[2].reports[2]));//premium会员数。即金字塔第3级
  console.log('androidAppPremiumUsers:',androidAppPremiumUsers);

  const androidAppRestUsers = androidAppAllUsers - androidAppStandardUsers - androidAppPremiumUsers; //剩余用户数。即金字塔第1级
  
  const andoridAppPyramidChart = new Highcharts.Chart({
      chart: {
          type: 'pyramid',
          renderTo: 'androidAppPyramid'
      },
      title: {
          text: 'Engagement pyramid for AndroindApp'
      },
      plotOptions: {
          series: {
              dataLabels: {
                  enabled: true,
                  format: '<b>{point.name}</b> ({point.y:,.0f})',
                  color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                  softConnector: true
              },
              center: ['40%', '50%'],
              width: '80%'
          }
      },
      legend: {
          enabled: false
      },
      series: [{
          name: 'Unique users',
          data: [
              ['Rest Users', androidAppRestUsers], 
              ['Standard Users', androidAppStandardUsers],
              ['Premium Users',  androidAppPremiumUsers]
          ]
      }]
  });
  
}

function clickFunc() {
  queryDifferentReports(requestDataArr, processDataFunc);
}

window.clickFunc = clickFunc;