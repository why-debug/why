<template>
  <!-- radio-box - 表单 -->
  <div class="base-radio-box"
  :class="selected == value?'checked':''"
   @click="addDelSelect(value)"
   >
   {{label}}
  </div>
</template>

<script>
export default {
  name: 'radioBox',
  props: {
    selected: {
      // type: String || Number,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    value: {
      type: String || Number,
      default: ''
    },
    forKey: {
      type: String,
      default: ''
    },
    
  },
  methods: {
    addDelSelect(value){
      if(!value) return;
      if(this.selected == value) return;
      this.$emit("sendData",{
        formKey:this.forKey,
        value:value
      });
    }
  },
}
</script>

<style lang="scss" scoped>
  .base-radio-box{
    position: relative;
    min-width: 0.68rem;
    height: 0.3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 0.03rem;
    border: solid 0.01rem #bdc6cf;
    background-color: #fff;
    box-sizing: border-box;
    margin-right: 0.1rem;
    &:last-of-type{
      margin-right: 0;
    }
    &.checked{
      border: 0.02rem #7cb7f2 solid;
      background:#fff url("../../assets/images/public/buttonbulecheck_200.png") right bottom no-repeat;
      background-size: 0.15rem 0.15rem;
    }
  }
</style>