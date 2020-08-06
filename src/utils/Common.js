

// 本地搜索
export class SearchCondition {
  constructor(key, val) {
    this.key = key;
    this.val = val;
  }
  
  key = ""; // 字段key
  val = ""; // 字段值
  
  getKey() {
    return this.key;
  }
  
  getVal() {
    return this.val;
  }
}
export class SearchFromLocal {
  constructor(list = []) {
    this.list = list;
  }
  
  /**
   *
   * @param conditions
   * @returns {Array}
   * Array<SearchCondition>
   */
  getList(conditions = []) {
    if (!this.list) return [];
    
    let result = [];
    for (let info of this.list) {
      for (let item of conditions) {
        if (info[item.getKey()].indexOf(item.getVal()) >= 0) {
          result.push(info);
          break;
        }
      }
    }
    return result;
  }
}

// 格式化时间
export class FormatDate {
  now = "";
  
  constructor(now) {
    this.now = now;
  }
  
  getYear() {
    return (this.now.getYear()+1900).toString()
  }
  
  getMonth() {
    let month = this.now.getMonth()+1;
    return (month<10 ? "0"+month : month.toString());
  }
  
  getDay() {
    let date = this.now.getDate();
    return (date<10 ? "0"+date : date.toString());
  }
  
  getHour() {
    let hour = this.now.getHours();
    return (hour<10 ? "0"+hour : hour.toString());
  }
  
  getMinute() {
    let minute = this.now.getMinutes();
    return (minute<10 ? "0"+minute : minute.toString());
  }
  
  getSecond() {
    let second = this.now.getSeconds();
    return (second<10 ? "0"+second : second.toString());
  }
  
  getTime() {
    return this.getYear() +'-'+ this.getMonth() +'-'+ this.getDay() +' '+ this.getHour() +':'+ this.getMinute() +':'+ this.getSecond();
  }
}
// 电话号码处理
export class FormatMobileNum{
  static number = "";
  
  constructor(num) {
    
    if(!num){
      
      return num;
    }

    if(num.length != 11){
      
      return num;
    }
    this.number = num;
  }

  /**
   * 从第n位开始隐藏后m位
   * @param {*} n 
   * @param {*} m 
   */
  // getNumHideByM(n = 0 ,m = 1){
  //   let reg = /^(\d{3})\d{4}(\d{4})$/;
  //   phone = phone.replace(reg, "$1****$2");
  // }


  // 前三后四
  getTop3Later4() {
    let reg = /^(\d{3})\d{4}(\d{4})$/;
    
    this.number = !this.number?this.number:this.number.replace(reg, "$1****$2");
    return this.number
  }

  // 前四后三
  getTop4Later3() {
    let reg = /^(\d{4})\d{4}(\d{3})$/;
    this.number = !this.number?this.number:this.number.replace(reg, "$1****$2");
    return this.number
  }


}
// 文件/图片 上传
export class UploadFile{
  
  static domain = "";
  static uploadUrl = "";
  
  constructor() {
    this.domain = process.env.JAVA
  }

  // 获取文件上传路径
  getUploadUrl() {
    if (process.env.ENV_CONFIG != 'dev'){
      this.uploadUrl = '/Api/Api/uploadFile'
    }else{
      this.uploadUrl = this.domain + '/newBuildWeb/openApi/org/common/upload'
    }
    
    return this.uploadUrl
  }


}
//当前时间和确认时间的差
export class timePeriod{
  constructor(val) {
    this.val = new Date(val).getTime();
    this.nowTime= Date.now();
  }
  getDifference(){
    return this.val-this.nowTime
  }
}




export class JudgeObjectIsEqult{
  /*
  * @param fristObj {Object} 对象1
  * @param secoundObj {Object} 对象2
  * @return  {Boolean} true 为相等，false 为不等
  */
  // 判断编辑
  deepEqual(fristObj, secoundObj){

    for(var prop in fristObj) {
      if(secoundObj[prop] !== fristObj[prop]) {
        return false;
      }
    }
    return true;
  }
}
