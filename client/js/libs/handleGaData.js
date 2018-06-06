function keysArr (gaReport) {
  if (gaReport.data && gaReport.data.rows)
  return gaReport.data.rows.map(row => row.dimensions ? row.dimensions[0] : []);
}

/**
 * @description 根据ga响应原始数据集，得到想要的obj数据,一般用于给table用作数据集
 * @param {Array} gaResponseReports: ga响应原始数据集的reports字段值，即含有至多五个Obj的数组
 * @param {Array} propsArr：最终得到obj各属性名称组成的数组，其中第一个为 key的名称，第二个为reports[0]数值项的名称，第三个为reports[1]数值项的名称....
 * @param {Array} keys：主键值数组,最终数据集将按照keys数组的顺序程现。
 * @param {string} orderBy: 按照从多到少排序的字段，是propsArr中除key外的某一个
 */
function extractObjData(gaResponseReports, propsArr, keys, orderBy) {
  const resultData = [];
  keys.forEach(function(onekey) { //处理每个key,一个key对应一个最后数组数组的一项obj
    const oneObj = {};
    oneObj[propsArr[0]] = onekey; //该obj的第一个属性键为propsArr[0],值为key本身的值
    for (let [index, elem] of gaResponseReports.entries()) {//该obj剩下的属性值分别从这几个reports中获取
      const oneReportDataArray = elem.data.rows;
      const thisField = propsArr[index+1];
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
export { keysArr, extractObjData, addPropsToData, divide, revenue };