import '../scss/main.scss';

import {queryDifferentReports} from './libs/queryFuncs.js';
import {requestDataForiPhoneAppUser, requestDataForiphoneAppUserBehavior} from './libs/requestData';

import { keysArr, getOneValue, extractArrayForOneField, averageOfArr} from './libs/handleGaData.js'

import {FullHeader} from '@ftchinese/ftc-header';
import setGlobOptionsForHighcharts from './chartsConfig/highcharts';

FullHeader.init();

setGlobOptionsForHighcharts();

const requestDataArr = [requestDataForiPhoneAppUser, requestDataForiphoneAppUserBehavior];

function proccessDataFunc(responseDataArr) {

  // MARK:图1 金字塔for iphoneApp
  const iPhoneAppAllUsers = Number(getOneValue(responseDataArr[0].reports[0]));//iPhoneApp用户数
  console.log('iPhoneAppAllUsers', iPhoneAppAllUsers);
  const iPhoneAppStandardUsers = Number(getOneValue(responseDataArr[0].reports[1]));//standard会员数
  console.log('iPhoneAppStandardUsers', iPhoneAppStandardUsers);
  const iPhoneAppPremiumUsers = Number(getOneValue(responseDataArr[0].reports[2]));//premium会员数
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


  //MARK: 图2 iPhoneApp display,tap checked,pop checked, buy seccess of standard, buy success of premium 条形图
  const keys = keysArr(responseDataArr[1].reports[0]);

  const iPhoneAppDisplayed = extractArrayForOneField(responseDataArr[1].reports[0], keys);
  const iPhoneAppTapChecked = extractArrayForOneField(responseDataArr[1].reports[1], keys);
  const iPhoneAppPopChecked = extractArrayForOneField(responseDataArr[1].reports[2], keys);
  const iPhoneAppBuySuccessOfStandard = extractArrayForOneField(responseDataArr[1].reports[3], keys);
  const iPhoneAppBuySuccessOfPremium = extractArrayForOneField(responseDataArr[1].reports[4], keys);
  console.log('iPhoneAppBuySuccessOfPremium:',iPhoneAppBuySuccessOfPremium);

  const iPhoneAppEngagementChart = new Highcharts.Chart({
      chart: {
          type: 'column',
          renderTo: 'iPhoneAppEngagement'
      },
      title: {
          text: 'Engagement Daily For iPhoneApp'
      },
      xAxis: {
          categories: keys,
          tickmarkPlacement: 'on',
          title: {
              enabled: false
          }
      },
      yAxis: {
          title: {
              text: 'Value'
          },
          //max: 100,
          //min: Math.min.apply(null, successRates)
      },
      tooltip: {
          pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y:.1f}</b><br/>',
          shared: true
      },
      series: [
      {
          name: 'Displayed'+' (Average: ' + averageOfArr(iPhoneAppDisplayed) +')',
          data: iPhoneAppDisplayed
      },{
          name: 'Tap Checked'+' (Average: ' + averageOfArr(iPhoneAppTapChecked) +')',
          data: iPhoneAppTapChecked
      },{
          name: 'Pop Checked'+' (Average: ' + averageOfArr(iPhoneAppPopChecked) +')',
          data: iPhoneAppPopChecked
      },{
          name: 'Standard'+' (Average: ' + averageOfArr(iPhoneAppBuySuccessOfStandard) +')',
          data: iPhoneAppBuySuccessOfStandard
      },{
          name: 'Premium'+' (Average: ' + averageOfArr(iPhoneAppBuySuccessOfPremium) +')',
          data: iPhoneAppBuySuccessOfPremium
      }],
      credits: {
          enabled: false
      },
      legend: {
          enabled: true
      }
  });


}

function clickFunc() {
  queryDifferentReports(requestDataArr, proccessDataFunc);
}

window.clickFunc = clickFunc;