<template>
  <div class="erp-confirm" v-if="isShow">
    <div class="erp-confirm-cont">
      <div class="erp-confirm-close" @click="close()"></div>
      <div class="erp-confirm-icon"></div>
      <div class="erp-confirm-txt">{{config.msg}}</div>
      <div class="erp-confirm-btn-cont">
        <div class="erp-confirm-btn" @click="ok()" v-if="config.btn.ok">{{config.btn.ok}}</div>
        <div class="erp-confirm-btn" @click="close()" v-if="config.btn.no">{{config.btn.no}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    data(){
        return{
            isShow:true,
            config:{
                msg:'',
                btn:{
                    ok:'确 定',
                    no:'取 消'
                },
            }
        }
    },
    methods:{
        close(){
            console.log('关闭');
        },
        ok(){
            console.log('确定')
        }
    }
}
</script>
<style lang="less" scoped >

.erp-confirm{
  z-index: 999;
  position: fixed;width: 100%;height: 100%;left: 0;top: 0;display: flex;justify-content: center;align-items: center;background: rgba(0,0,0,0.6);}
    .erp-confirm-cont{
      background: #fff;
      min-width: 4rem;
      max-width: 4rem;
      position: relative;
      padding: 0.3rem 0.2rem 0.2rem;
      box-sizing: border-box;
    }
    .erp-confirm-close{
      position: absolute;
      top: 0;
      right: 0;
      width: 0.26rem;
      height: 0.22rem;
      background: url("../../../assets/images/common/close_200.png") center center no-repeat;
      background-size: 0.12rem auto;
      cursor: pointer;
    }
    .erp-confirm-close:hover{
      background-color: red;
      background-image: url("../../../assets/images/common/close_200_hover.png");
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 0.12rem auto;
    }
    .erp-confirm-icon{
      margin: 0 auto;
      width: 0.7rem;
      height: 0.7rem;
      background: url("../../../assets/images/common/Warning_Msg_200.png") center center no-repeat;
      background-size: 100% 100%;
    }
    .erp-confirm-txt{
      margin-top: 0.2rem;
      text-align: center;
      font-size: 0.16rem;
      color: #444;
    }
    .erp-confirm-btn-cont{
      margin-top: 0.4rem;
      display: flex;
      justify-content: center;
    }
    .erp-confirm-btn{
      height: 0.35rem;
      line-height: 0.35rem;
      padding: 0 0.15rem;
      color: #fff;
      font-size: 0.16rem;
      border-radius: 0.02rem;
      cursor: pointer;
    }
    .erp-confirm-btn:nth-of-type(1){background: #4fb0ff;}
    .erp-confirm-btn:nth-of-type(2){background: #fB8A10;margin-left: 0.25rem;}



</style>
