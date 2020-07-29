<template>
  <!-- select-box - 表单 -->
  <div class="base-select-box" :style="'width:'+width+'rem'">
    <div class="select-value-box" 
    :class="listShowFlag?'on':''" 
    @click="listShowFlag = !listShowFlag">{{getLable}}</div>
    <div class="select-list-box" v-show="listShowFlag">
      <div class="select-li" 
      v-for="(item, index) in list" :key="index"
      @click="changeSelectValue(item.value)"
      >{{item.text || item.label}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'selectBox',
  props: {
    width: {
      type: String,
      default: '1'
    },
    list: {
      type: Array,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    forKey: {
      type: String,
      default: ''
    },
    
  },
  computed: {
    getLable(){
      let label = ''
      this.list.forEach(item => {
        if(item.value == this.value){
          label = item.label || item.text
        }
      });
      return label
    }
  },
  data() {
    return {
      listShowFlag:false,
    }
  },
  methods: {
    changeSelectValue(value){
      this.listShowFlag = false
      if(this.value == value) return;
      this.$emit("sendData",{
        formKey:this.forKey,
        value:value
      });
    }
  },
}
</script>

<style lang="scss" scoped>
  .base-select-box{
    position: relative;
      font-size: 0.12rem;
    
    width: 0.9rem;
    height: 0.3rem;
    display: flex;
    align-items: center;
    .select-value-box{
      width: 100%;
      height: 100%;
      background-image: linear-gradient(0deg, #eff1f4 0%, #ffffff 100%), 	linear-gradient(#fdfdfd, #fdfdfd);
      background-blend-mode: normal, normal;
      border-radius: 0.03rem;
      border: solid 0.01rem #bdc6cf;
      display: flex;
      align-items: center;
      padding-left: 0.1rem;
      padding-right: 0.15rem;
      box-sizing: border-box;
      cursor: pointer;
      &.on{
        background-color: #ebebeb;
        background-image: none;
      }
      &::after{
        content: '';
        position: absolute;
        right: 0.06rem;
        top: 50%;
        transform: translateY(-50%);
        width: 0.09rem;
        height: 0.06rem;
        background: url("../../assets/images/public/downArrowBtnSel_200.png") center center no-repeat;
        background-size: 100% 100%;
      }
    }
    .select-list-box{
      position: absolute;
      width: 100%;
      left: 0;
      top: 0.3rem;
      max-height: 3rem;
      z-index: 10;
      overflow-y: auto;
      &::-webkit-scrollbar{
        width: 8px;
        height: 8px;
      }
      &::-webkit-scrollbar-thumb{
        background-color: rgba(0, 0, 0, .1);
        border-radius: 10px;
      }
      .select-li{
        cursor: pointer;
        width: 100%;
        height: 0.3rem;
        display: flex;
        align-items: center;
        padding-left: 0.1rem;
        box-sizing: border-box;
        border: solid 0.01rem #bdc6cf;
        background-color: #fff;
        border-radius: 0;
        &:hover{
          background-color: #E5E9EC;
        }
        &:not(:first-of-type){
          border-top: none;
        }
      }
    }
  }

/*滚动条宽高*/
.waitEnteringScroll::-webkit-scrollbar{
    width: 8px;
    height: 8px;
}
/*正常情况下滑块的样式*/
.waitEnteringScroll::-webkit-scrollbar-thumb{
    background-color: rgba(0, 0, 0, .05);
    border-radius: 10px;
}

</style>