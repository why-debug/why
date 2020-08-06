import Vue from 'vue';
import confirm from './confirm.vue';

let confirmConstructor = Vue.extend(confirm);

let erpConfirm = function (config = {}) {
  return new Promise((res, rej) => { //promise封装，ok执行resolve，no执行reject 
    let confirmDom = new confirmConstructor({
      el: document.createElement('div')
    })
    document.body.appendChild(confirmDom.$el); //new一个对象，然后插入body里面

    let confirmConfig = {
      type: config.type || 1,
      msg: config.msg || '',
    }
    if (2 == config.type){
      confirmConfig["btn"] = {
        ok: '确 定',
        no: ''
      }
    }else{
      confirmConfig["btn"] = {
        ok: '确 定',
        no: '取 消'
      }
    }
    

    confirmDom.config = confirmConfig; //为了使confirm的扩展性更强，这个采用对象的方式传入，所有的字段都可以根据需求自定义
    confirmDom.ok = function () {
      res()
      confirmDom.isShow = false
    }
    confirmDom.close = function () {
      rej()
      confirmDom.isShow = false
    }

  })
}

export default erpConfirm;

//暴露出去，别忘记挂载到vue的原型上  
//   => 在main.js里面先引入 import theConfirm from './components/confirm/confirm.js'
//   => 再挂载 Vue.prototype.$confirm = theConfirm;
//在需要的地方直接用以下方法调用即可：
//   this.$confirm({
//     type:'提示',
//     msg:'是否删除这条信息？',
//     btn:{
//         ok:'yes',
//         no:'no'
//     }
// }).then(() => {
//     console.log('ok')
// })
// .catch(() => {
//     console.log('no')
// })
