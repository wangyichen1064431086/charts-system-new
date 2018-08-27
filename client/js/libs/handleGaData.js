function keysArr (gaReport) {
  if (gaReport.data && gaReport.data.rows) {
    return gaReport.data.rows.map(row => row.dimensions ? row.dimensions[0] : []);//如果该row.dimensions[0]按照'ga:date'，那么得到的Key的数组就是按照时间从小到大排好序的
  }
  return []
}
/**
 * 
 * @param {Object} report :返回的reports中的其中一个
 * @return {String} 一个report所得的单一值
 */
function getOneValue(report) {
  try {
    return report.data.rows[0].metrics[0].values[0];
  } catch(err) {
    console.log('The data structure may be wrong:',err);
    return ''
  }
}
/**
 * 
 * @param {Object} report :返回的reports中的其中一个
 * @param {Array} keys:要提取的数据纬度值数组的提取依据主键数组
 */
function extractArrayForOneField(report, keys) {
  const reportUsefulDataArr = report.data.rows.map(item => {
    const key = item.dimensions ? item.dimensions[0] : 'nokey'; //'nokey'其实是不可能的，但是为了保险起见，暂时加上
    const value = (item.metrics && item.metrics[0] && item.metrics[0].values ) ? item.metrics[0].values[0] : '0';
    const numValue = parseInt(value, 10);
    return {
     key,
     value:numValue
    }
  });
  console.log('reportUrsefulDataArr:');
  console.log(reportUsefulDataArr);
  const reportUsefulDataObj = tranformArrayToObj(reportUsefulDataArr, 'key');
  return keys.map(key => (
    reportUsefulDataObj[key] ? reportUsefulDataObj[key]['value'] : '0'
  ));
}
/**
 * @description 根据ga响应原始数据集，得到想要的obj数据,一般用于给table用作数据集
 * @param {Array} gaResponseReports: ga响应原始数据集的reports字段值，即含有至多五个Obj的数组
 * @param {Array} propsArr：最终得到obj各属性名称组成的数组，其中第一个为 key的名称，第二个为reports[0]数值项的名称，第三个为reports[1]数值项的名称....
 * @param {Array} keys：主键值数组,最终数据集将按照keys数组的顺序程现。
 * @param {string} orderBy: 按照从多到少排序的字段，是propsArr中除key外的某一个
 * @return {Array}
 */
function extractObjData(gaResponseReports, propsArr, keys, orderBy) {
  const resultData = [];
  //console.log(gaResponseReports);
  keys.forEach(function(onekey) { //处理每个key,一个key对应一个最后数组数组的一项obj
    const oneObj = {};
    oneObj[propsArr[0]] = onekey; //该obj的第一个属性键为propsArr[0],值为key本身的值
    for (let [index, elem] of gaResponseReports.entries()) {//该obj剩下的属性值分别从这几个reports中获取
      const oneReportDataArray = elem.data.rows ||[];
      const thisField = propsArr[index+1];
      //console.log(oneReportDataArray);
      
      for(const datum of oneReportDataArray ) {
        if (datum.dimensions[0] == onekey) {
          oneObj[thisField] = Number(datum.metrics[0].values[0]);
        }
      }
      if(!oneObj[thisField]) {
        oneObj[thisField] = 0;
      }
    }

    resultData.push(oneObj);
  });
  if (!orderBy) {
    return resultData;
  }
  resultData.sort((a,b) => {
    // MARK - :sort方法是会改变原数组的
    if(a[orderBy] > b[orderBy]) {
      return -1;
    } else {
      return 1;
    }
  });
  return resultData;
}

/**
 * 
 * @param {Array} sourceArr 待转换的数组
 * @param {String} keyProp 待转换数组中每一项中的某一属性，将作为最终Obj的key值
 */
function tranformArrayToObj(sourceArr, keyProp) {
  const resultObj = {};
  sourceArr.forEach(item => {
    resultObj[item[keyProp]] = item;
  });
  return resultObj;
}


function merge2ObjBySumPropValue(obj1, obj2, sumPropArray) {
  for (let storyId in obj1) {
    if(obj2[storyId]) {
      const storyInfoInObj1 = obj1[storyId];
      const storyInfoInObj2 = obj2[storyId];

      for (let prop of sumPropArray) {
        if(storyInfoInObj2[prop] && typeof storyInfoInObj2[prop] === 'number') { //如果storyInfoInObj2有该prop
          if (storyInfoInObj1[prop] && typeof storyInfoInObj1[prop] === 'number') {//如果storyInfoInObj1有该prop
            storyInfoInObj1[prop]+=storyInfoInObj2[prop];
          } else {//如果storyInfoInObj1没有该prop
            storyInfoInObj1[prop] = storyInfoInObj2[prop];
          }
        }
      }
      delete obj2[storyId];//for循环完成后obj2就只剩obj1没有的storyId
    } //如果obj2不含该storyId，那直接就不处理
  }

  for (let storyId in obj2) {
    obj1[storyId] = obj2[storyId];
  }
  return obj1;

}

function mergeMultiObj(merge2ObjFunc, objArr, sumPropArray) {
  return objArr.reduce((obj1, obj2) => merge2ObjBySumPropValue(obj1, obj2, sumPropArray));
}
/**
 * @description 为已经处理好的数据集添加新属性，新属性由已有属性值计算得到
 * @param {Array:[Obj,Obj,Obj]} data
 * @param {Array:[Obj,Obj,Obj]} addPropsArr 
 *    @param {Function} Obj.operateFunc 操作函数
 *    @param {String} Obj.prop1 第一个被操作数在数据集中的属性名称
 *    @param {String} Obj.prop2 第二个被操作数在数据集中的属性名称
 *    @param {String} Obj.propNew 操作后的结果在数据集中的属性名称
*/
function addPropsToData(data, addPropsArr) {
  return data.map(datum => {
    for (const item of addPropsArr) {
      const operatedNum1 = datum[item.prop1];
      const operatedNum2 = datum[item.prop2];
      const propNewValue = item.operateFunc(operatedNum1, operatedNum2);
      datum[item.propNew] = propNewValue;
    }
    return datum;
  });
}

/**
 * @description 得到两数组对应index值的比例组成的数组
 * @param {Array} arr1
 * @param {Array} arr2
 */
function getRateArrForTwoArr(arr1, arr2) {
  if (arr1.length === 0 || arr2.length === 0 || arr1.length !== arr2.length) {
    return;
  }
  return arr1.map((item, index) => (
    Math.round((item / arr2[index]) * 10000) / 100
  ))
}

/**
 * @description 对对象数组根据某一个属性值进行从高到底排序，并取得前若干项组成的数组
 * @param {Array} objArr [Obj, Obj, Obj]
 * @param {String} sortedField 数组中每项的Obj中准备以为排序标准的属性名称
 * @param {Num} topNum  要取得前多少项
 * @returns objArr中对每项根据sortedField排序后的前topNum项组成的数组
 */
function topDataByOneField(objArr, sortedField, topNum) {
  const filteredObjArr = objArr.filter(item => {
    if (item[sortedField] === undefined) {
      return false;
    } else {
      return true;
    }
  });
  if (filteredObjArr.length === 0) {
    return [];
  }

  filteredObjArr.sort((itemA, itemB) => {
    if (itemA[sortedField] > itemB[sortedField]) { //大项在前，从大到小排序
      return -1;
    } else {
      return 1
    }
  });//NOTE:sort是就地排序，改变原数组

  if (filteredObjArr.length > topNum) {
    return filteredObjArr.slice(0, topNum);
  } else {
    return filteredObjArr;
  }
}
/*********处理传漾data*******/
function getOneAdIdImpFromCy(sourceData, adId, keys) {
  const usefulDataArr = sourceData.filter(
    item => item['投放ID'] == adId
  ).map(
    item => {
      const date = item['日期'].replace(/-/g, '');
      const imp = parseInt(item['显示数'], 10) || 0;
      return {
        date,
        imp
      }
    }
  );
  console.log('usefulDataArr:');
  console.log(usefulDataArr);
 
  const usefulDataObj = tranformArrayToObj(usefulDataArr, 'date');

  return keys.map( key => (
    usefulDataObj[key] ? usefulDataObj[key]['imp'] : 0
  ));
}

/*** 数据计算方法 ***/
/**
 * 得到两数之商，结果是百分比的数，保留两位小数
 * @param {Number} a 被除数
 * @param {Number} b 除数--除数为0返回NaN
 */
function divide(a,b) {
  return Math.round(a/b * 10000)/100;
}

/**
 * @description 计算总收入
 * @param {Number} standardNum 标准会员卖出次数
 * @param {Number} premiumNum 高端会员卖出次数
 */
function revenue(standardNum, premiumNum) {
  return standardNum * 198 + premiumNum * 1998
}


export { 
  keysArr, 
  extractArrayForOneField,
  extractObjData, 
  tranformArrayToObj,
  merge2ObjBySumPropValue,
  mergeMultiObj, 
  addPropsToData, 
  divide, 
  revenue,
  getOneAdIdImpFromCy,
  getRateArrForTwoArr,
  topDataByOneField,

  getOneValue
};