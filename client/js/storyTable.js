import  {queryDifferentReports} from './libs/queryFuncs.js';

import {requestDataForiPhoneAppStory} from './libs/requestData.js';

const requestDataArr = [requestDataForiPhoneAppStory];

async function processDataFunc(responseDataArr) {
  const labelKeys = responseDataArr[0].reports[0].data.rows.map(row => row.dimensions[0]);
  console.log(labelKeys);
}

var clickFunc = function() {
  queryDifferentReports(requestDataArr, processDataFunc);
}

