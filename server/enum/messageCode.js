/**
 * 系统错误码枚举
 * @enum {number}
 * @default
 */
module.exports = {

  /** 成功 */
  SUCESS: 0,

  /** 失败 */
  FAIL: 201,

  /** 参数无效 */
  INFO_PARAM_INVALID: 1001,

  /** 重复创建 */
  INFO_CREATE_REPEAT: 1002,

  /** json错误 */
  ERROR_JSON: 500,

  /** 地区码无效 */
  ERROR_CODE_AREA: 2001
}
