<template>
  <!-- item-lable - 表单 -->
  <div class="base-item-lable" :style="'width:'+width+'rem'">
    <div :style="'margin-left:'+marginLeft+'rem'" class="lable-tt">{{label}}  </div>
    <div class="lable-required"><span v-if="required">*</span></div>
  </div>

</template>

<script>
export default {
  name: 'itemLabel',
  props: {
    label: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '0.72'
    },
    required: {
      type: Boolean,
      default: false
    },
    marginLeft: {
      default: 0
    },
    
  },
  methods: {
    
  },
}
</script>

<style lang="scss" scoped>
  .base-item-lable{
    width: 0.7rem;
    position: relative;
    padding-right: 0.2rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    text-align: right;
    .lable-tt{
      font-size: 0.12rem;
      color: #444444;
      white-space: nowrap;
      text-align: right;
    }
    .lable-required{
      position: absolute;
      right: 0.08rem;
      top: 50%;
      transform: translateY(-40%);
      font-size: 0.12rem;
      color: #ff5a1f;
    }
  }
</style>