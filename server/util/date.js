/**
 * date格式化
 * @param  {Date} date 需格式化日期对象
 * @param  {string} fmt  格式化
 * @example
 *  可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) * eg: * (new
 *  Date()).format("yyyy-MM-dd hh:mm:ss.S")==> 2006-07-02 08:09:04.423
 *  (new Date()).format("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
 *  (new Date()).format("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
 *  (new Date()).format("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
 *  (new Date()).format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 * @return {string}      字符串形式的日期
 */
exports.format = function (date, fmt) {
  var o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }
  var week = {
    '0': '周一',
    '1': '周二',
    '2': '周三',
    '3': '周四',
    '4': '周五',
    '5': '周六',
    '6': '周日'
  }

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (String(date.getFullYear())).substr(4 - RegExp.$1.length))
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '星期' : '周') : '') + week[String(date.getDay())])
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}
