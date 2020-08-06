/* -------------------------必填验证------------------------ */
// 规则
export class Rules {
    // 必填项
    getRequire() { 
      // return {required: true, message: '该项为必填项', trigger: 'blur' }
      return {required: true, message: ' ', trigger: 'blur' }
    }; 
    // 必须为数字
    getIsNumber() {
      // return { type: 'number', message: '必须为数字值'}
      return { type: 'number', message: ' '}
    }; 
    // 长度限制
    getLimitLength(min,  max) {
      if (!min) return { max,  message:`长度${max}个字符`,  trigger:'blur'}
      return { min, max,  message:`长度${max}个字符`,  trigger:'blur'}
    }; 
    // 长度限制500字 
    length_500() {
      return this.getLimitLength(500)
    }; 
}
// 创建自带规则
export class CreateCommonRules extends Rules{
  attr; 
  mapRules= new Map()
  .set('required', this.getRequire())
  .set('number', this.getIsNumber())
  constructor(params= {}) {
    super()
    this.attr= params
  }
  // 获取验证规则对象
  getCommonRules() {
    let _p= this.attr; 
    let _o= new Object(); 
    for(let i in _p) {
      if(!(_p[i] instanceof Array)) continue
      _o[i]= this.createSingleRule(_p[i])
    }
    return _o; 
  }; 
  //创建对应属性的验证规则数组
  createSingleRule(params= []) {
    let _p= params; 
    return _p.map(v => {
      return this.getMapRule(v); 
    })
  }; 
  //映射对应验证规则
  getMapRule(params) {
    return this.mapRules.get(params); 
  }

}

/* -----------------------自定义验证---------------------- */
class AddCustomValidation {
  validations; 
  _map= new Map()
  .set() 
  constructor(_arr= []) {
    this.validations= _arr; 
  }
  addCustomValidation(){}
}

export class CustomValidation extends AddCustomValidation  {
  constructor() {
    super()
  }; 
  float_2(rule, value, callback) {
    let v= value
    if (typeof(value) != 'string') v= v.toString(); 
    setTimeout(() => {
      if(v.split('.')[1].length>2) return callback(new Error('最多两位小数')); 
      callback();
    }, 1000)
  }
}
