import '../scss/main.scss';

import {queryDifferentReports} from './libs/queryFuncs.js';
import {requestDataForAllUser, requestDataForiPhoneAppUser,requestDataForAndroidAppUser,requestDataForWebUser} from './libs/requestData';

import { keysArr,getOneValue } from './libs/handleGaData.js'

import {FullHeader} from '@ftchinese/ftc-header';
import setGlobOptionsForHighcharts from './chartsConfig/highcharts';

import simulateData from './simulateResponse/userPyramid';
FullHeader.init();

setGlobOptionsForHighcharts();

const requestDataArr = [requestDataForAllUser, requestDataForiPhoneAppUser,requestDataForAndroidAppUser,requestDataForWebUser];

let runSimulate = false;

function proccessDataFunc(responseDataArr) {
  if(runSimulate) { //如果已经执行过模拟数据就不再执行真实数据,也不再执行模拟数据了
      return;
  }
  console.log('responseDataArr:');
  console.log(JSON.stringify(responseDataArr));
  const allUsers= Number(getOneValue(responseDataArr[0].reports[0]));
  console.log('allUsers:', allUsers);
  // MARK:金字塔图:for iphoneApp
  const iPhoneAppAllUsers = Number(getOneValue(responseDataArr[1].reports[0]));//iPhoneApp用户数
  console.log('iPhoneAppAllUsers', iPhoneAppAllUsers);
  const iPhoneAppStandardUsers = Number(getOneValue(responseDataArr[1].reports[1]));//standard会员数
  console.log('iPhoneAppStandardUsers', iPhoneAppStandardUsers);
  const iPhoneAppPremiumUsers = Number(getOneValue(responseDataArr[1].reports[2]));//premium会员数
  console.log('iPhoneAppPremiumUsers', iPhoneAppPremiumUsers);

  const iPhoneAppRestUsers = iPhoneAppAllUsers-iPhoneAppStandardUsers-iPhoneAppPremiumUsers;
  console.log('iPhoneAppRestUsers', iPhoneAppRestUsers);
  //iPhoneApp用户中还未订阅的用户数，即金字塔第1级

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

  //MARK: 金字塔图 for Web
  const webAllUsers = allUsers - androidAppAllUsers - iPhoneAppAllUsers ;//总用户数
  console.log('webAllUsers:', webAllUsers);
  const webStandardUsers = Number(getOneValue(responseDataArr[3].reports[0]));//standard会员数。即金字塔第2级
  console.log('webStandardUsers:', webStandardUsers);
  const webPremiumUsers = Number(getOneValue(responseDataArr[3].reports[1]));//premium会员数。即金字塔第3级
  console.log('webPremiumUsers:',webPremiumUsers);
  const webRestUsers = webAllUsers - webStandardUsers - webPremiumUsers; //剩余用户数。即金字塔第1级

  const webPyramidChart = new Highcharts.Chart({
      chart: {
          type: 'pyramid',
          renderTo: 'webPyramid'
      },
      title: {
          text: 'Engagement pyramid for Web'
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
              ['Rest Users', webRestUsers], 
              ['Standard Users', webStandardUsers],
              ['Premium Users', webPremiumUsers]
          ]
      }]
  });


  //MARK: 金字塔图 for all
  const allStandardUsers = iPhoneAppStandardUsers + androidAppStandardUsers + webStandardUsers;
  const allPremiumUsers = iPhoneAppPremiumUsers + androidAppPremiumUsers + webPremiumUsers;
  const allRestUsers = allUsers - allStandardUsers - allPremiumUsers;

  const  allPyramidChart = new Highcharts.Chart({
      chart: {
          type: 'pyramid',
          renderTo: 'allPyramid'
      },
      title: {
          text: 'Engagement pyramid for All'
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
              ['Rest Users', allRestUsers], 
              ['Standard Users', allStandardUsers],
              ['Premium Users',  allPremiumUsers]
          ]
      }]
  });

  
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

