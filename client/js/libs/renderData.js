function renderDataToTable(tableId, data, fields,statisticFields) {
  const tableElem = document.getElementById(tableId);
  const theadElem = tableElem.querySelector('thead') || document.createElement('thead');
  const tbodyElem = tableElem.querySelector('tbody') || document.createElement('tbody');

  let ths = '';
  for(const item of fields) {
    if(typeof data[0][item] == 'number') {
      if(statisticFields.includes(item)) {
        ths+=`<th aria-sort='none' data-ftc-table--datatype="numeric" data-ftc-table--tostatistic class="ftc-table__cell--numeric">${item}</th>`;
      } else {
        ths+=`<th aria-sort='none' data-ftc-table--datatype="numeric" class="ftc-table__cell--numeric">${item}</th>`;
      }
    
    } else {
      ths+=`<th aria-sort='none'>${item}</th>`;
    }
  }

  theadElem.innerHTML = ths;
  tableElem.appendChild(theadElem);

  for(const item of data) {
    let tds = '';
    for(const field of fields) {
      if(typeof item[field] === 'number') {
        tds += `<td class="ftc-table__cell--numeric">${item[field]}</td>`;
      } else {
        tds += `<td>${item[field]}</td>`;
      }
    };
    const tableTr = document.createElement('tr');
    tableTr.innerHTML = tds;
    tbodyElem.appendChild(tableTr);
  }

  tableElem.appendChild(tbodyElem);

}

export {renderDataToTable};