export function yyyymmdd(d = new Date(), isChinese, delimiter = '-') {
  var yyyy = d.getFullYear().toString()
  var mm = (d.getMonth() + 1).toString() // getMonth() is zero-based
  var dd = d.getDate().toString()
  var date
  if (isChinese) {
    date = yyyy + '年' + (mm[1] ? mm : '0' + mm[0]) + '月' + (dd[1] ? dd : '0' + dd[0]) + '日'
  } else {
    date = yyyy + delimiter + (mm[1] ? mm : '0' + mm[0]) + delimiter + (dd[1] ? dd : '0' + dd[0])
  }

  return date
}

export function yyyymm(d = new Date(), isChinese, delimiter = '-') {
  var yyyy = d.getFullYear().toString()
  var mm = (d.getMonth() + 1).toString()

  return yyyy + delimiter + (mm[1] ? mm : '0' + mm[0])
}

export function yymmddhhmm(d = new Date(), isChinese, delimiter = '-') {
  delimiter = delimiter || '-'
  var yy = d.getFullYear().toString()
  var mm = (d.getMonth() + 1).toString() // getMonth() is zero-based
  var dd = d.getDate().toString()
  var hh = d.getHours().toString()
  var MM = d.getMinutes().toString()

  if (isChinese) {
    return yy + '年' + (mm[1] ? mm : '0' + mm[0]) + '月' + (dd[1] ? dd : '0' + dd[0]) + '日 ' + (hh[1] ? hh : '0' + hh[0]) + ':' + (MM[1] ? MM : '0' + MM[0])
  }

  return yy + delimiter + (mm[1] ? mm : '0' + mm[0]) + delimiter + (dd[1] ? dd : '0' + dd[0]) + ' ' + (hh[1] ? hh : '0' + hh[0]) + ':' + (MM[1] ? MM : '0' + MM[0])
}

