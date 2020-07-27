// 处理两个json 
/**
 * 处理两个json， 将Json2 中 与 Json1 key相同的赋值给 Json1
 * @param {*} Json1 
 * @param {*} Json2
 */
export function deal2Json(Json1, Json2){
  for (var x in Json1) {
    if (typeof (Json2[x]) != "undefined") {
      Json1[x] == Json2[x]
    }
  }
  return Json1
};

/**
 * 处理数据格式大小展示
 * @param {*} a 
 * @param {*} b 小数点后位数 ，默认2位
 */
export function formatBytes(a, b) {
  if (0 == a) return "0B";
  var c = 1024,
    d = b || 2,
    e = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    f = Math.floor(Math.log(a) / Math.log(c));
  return parseFloat((a / Math.pow(c, f)).toFixed(d)) + "" + e[f]
}