import '../scss/main.scss';

import {queryDifferentReports} from './libs/queryFuncs.js';
import {requestDataForAllUser, requestDataForiPhoneAppUser,requestDataForAndroidAppUser, requestDataForWebUser, requestDataForWebUserBehavior} from './libs/requestData';

import { keysArr, getOneValue, extractArrayForOneField, averageOfArr} from './libs/handleGaData.js'

import {FullHeader} from '@ftchinese/ftc-header';
import setGlobOptionsForHighcharts from './chartsConfig/highcharts';

FullHeader.init();

setGlobOptionsForHighcharts();

const requestDataArr = [requestDataForAllUser, requestDataForiPhoneAppUser,requestDataForAndroidAppUser, requestDataForWebUser, requestDataForWebUserBehavior];

function proccessDataFunc(responseDataArr) {

  //MARK:图1 金字塔图 for AndroidApp
  const allUsers= Number(getOneValue(responseDataArr[0].reports[0]));//三端总用户数
  const iPhoneAppAllUsers = Number(getOneValue(responseDataArr[1].reports[0]));//iPhoneApp用户数
  const androidAppAllUsers = Number(getOneValue(responseDataArr[2].reports[0]));//androidApp总用户数

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
          text: 'Web: Conversion Pyramid'
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
              ['Premium Users',  webPremiumUsers]
          ]
      }]
  });

  //MARK: 图2 androidApp display,tap checked,pop checked, buy seccess of standard, buy success of premium 条形图
  const keys = keysArr(responseDataArr[4].reports[0]);

  const webDisplayed = extractArrayForOneField(responseDataArr[4].reports[0], keys);
  const webTapChecked = extractArrayForOneField(responseDataArr[4].reports[1], keys);
  const webBuySuccessOfStandard = extractArrayForOneField(responseDataArr[4].reports[2], keys);
  const webBuySuccessOfPremium = extractArrayForOneField(responseDataArr[4].reports[3], keys);


  const androidAppEngagementChart = new Highcharts.Chart({
      chart: {
          type: 'column',
          renderTo: 'webEngagement'
      },
      title: {
          text: 'Web: Daily Engagement'
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
          name: 'Displayed'+' (Average: ' + averageOfArr(webDisplayed) +')',
          data: webDisplayed
      },{
          name: 'Tap Checked'+' (Average: ' + averageOfArr(webTapChecked) +')',
          data: webTapChecked
      },{
          name: 'Standard'+' (Average: ' + averageOfArr(webBuySuccessOfStandard) +')',
          data: webBuySuccessOfStandard
      },{
          name: 'Premium'+' (Average: ' + averageOfArr(webBuySuccessOfPremium) +')',
          data: webBuySuccessOfPremium
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