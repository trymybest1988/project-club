/**
 * 反转function的值
 * @param  {Function} fn 类似isNull这类的函数
 * @return {Function}      取反函数
 */
function reverse (fn) {
  return function () {
    return !fn.apply(null, Array.prototype.slice.call(arguments, 0))
  }
}

exports.reverse = reverse

