 /**
   * @description:发出数个ReportRequest对象不同的请求，所有请求都完成后得到响应数据，再处理响应数据并绘图。  适用于ReportRequest对象的dateRange、viewId不同的情况

   * @param {Array} requestDataArr 用于存储数个ReportRequest对象,来自具体展示页面设置的全局常量。
   * @param {Function} processDataFunc 用于根据responseDataArr进行可视化展示
   */
function queryDifferentReports(requestDataArr, processDataFunc) {
 
  const  requestNum = requestDataArr.length;
  let requestIndex = 0;
  const responseDataArr = [];

  const oneRequest = function() {
    const requestData = requestDataArr[requestIndex];
    gapi.client.request({
      path: '/v4/reports:batchGet',
      root: 'https://analyticsreporting.googleapis.com/',
      method: 'POST',
      body: {
        reportRequests:requestDataArr[requestIndex]
      }
    }).then(function(response) {
      requestIndex++;
      responseDataArr.push(response.result);
      
      if (requestIndex < requestNum) {
        oneRequest();
      } else {
        processDataFunc(responseDataArr);
      }
      

    }, console.error.bind(console));
  }

  oneRequest();
}

export {queryDifferentReports};