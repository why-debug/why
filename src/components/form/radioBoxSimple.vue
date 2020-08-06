<template>
  <!-- radio-box-simple - 表单 -->
  <div class="base-radio-box-simple"
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
      // type: String,
      default: ''
    },
    label: {
      type: String,
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
  .base-radio-box-simple{
    position: relative;
    color: #444444;
    height: 0.3rem;
    line-height: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    margin-right: 0.25rem;
    &::before{
      content: '';
      display: block;
      width: 0.15rem;
      height: 0.15rem;
      margin-right: 0.1rem;
      background: url("../../assets/images/public/radioBox_200.png") right bottom no-repeat;
      background-size: 100% 100%;
    }
    &.checked{
      &::before{
        background: url("../../assets/images/public/radioBox1_200.png") right bottom no-repeat;
        background-size: 100% 100%;
      }
    }
  }
</style>