import '../scss/main.scss';

import {queryDifferentReports} from './libs/queryFuncs.js';
import {requestDataForAndroidAppUser, requestDataForAndroidAppUserBehavior} from './libs/requestData';

import { keysArr, getOneValue, extractArrayForOneField, averageOfArr} from './libs/handleGaData.js'

import {FullHeader} from '@ftchinese/ftc-header';
import setGlobOptionsForHighcharts from './chartsConfig/highcharts';

FullHeader.init();

setGlobOptionsForHighcharts();

const requestDataArr = [requestDataForAndroidAppUser, requestDataForAndroidAppUserBehavior];

function proccessDataFunc(responseDataArr) {

  //MARK:图1 金字塔图 for AndroidApp
  const androidAppAllUsers = Number(getOneValue(responseDataArr[0].reports[0]));//总用户数
  console.log('androidAppAllUsers:', androidAppAllUsers);
  const androidAppStandardUsers = Number(getOneValue(responseDataArr[0].reports[1]));//standard会员数。即金字塔第2级
  console.log('androidAppStandardUsers:', androidAppStandardUsers);
  const androidAppPremiumUsers = Number(getOneValue(responseDataArr[0].reports[2]));//premium会员数。即金字塔第3级
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

  //MARK: 图2 androidApp display,tap checked,pop checked, buy seccess of standard, buy success of premium 条形图
  const keys = keysArr(responseDataArr[2].reports[0]);

  const androidAppDisplayed = extractArrayForOneField(responseDataArr[2].reports[0], keys);
  const androidAppTapChecked = extractArrayForOneField(responseDataArr[1].reports[1], keys);
  const androidAppBuySuccessOfStandard = extractArrayForOneField(responseDataArr[1].reports[2], keys);
  const androidAppBuySuccessOfPremium = extractArrayForOneField(responseDataArr[1].reports[3], keys);


  const androidAppEngagementChart = new Highcharts.Chart({
      chart: {
          type: 'column',
          renderTo: 'androidAppEngagement'
      },
      title: {
          text: 'Engagement Daily For androidApp'
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
          name: 'Displayed'+' (Average: ' + averageOfArr(androidAppDisplayed) +')',
          data: androidAppDisplayed
      },{
          name: 'Tap Checked'+' (Average: ' + averageOfArr(androidAppTapChecked) +')',
          data: androidAppTapChecked
      },{
          name: 'Standard'+' (Average: ' + averageOfArr(androidAppBuySuccessOfStandard) +')',
          data: androidAppBuySuccessOfStandard
      },{
          name: 'Premium'+' (Average: ' + averageOfArr(androidAppBuySuccessOfPremium) +')',
          data: androidAppBuySuccessOfPremium
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