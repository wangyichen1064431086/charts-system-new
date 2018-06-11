function formatDate(timestamp) {
  const theDate = new Date(timestamp);
  const year = String(theDate.getFullYear());
  const monthRow = String(theDate.getMonth() + 1);
  const month = monthRow.length === 2 ? monthRow : '0' + monthRow;
  const dateRow = String(theDate.getDate());
  const date = dateRow.length === 2 ? dateRow : '0' + dateRow;
  return '' + year + month + date;
}

export {formatDate}