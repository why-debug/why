<template>
  <!-- item-lable - 表单 -->
  <div class="base-item-lable">
    <div class="lable-tt">{{label}}  </div>
    <div v-if="required" class="lable-required">*</div>
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
    required: {
      type: Boolean,
      default: false
    },
    
  },
  methods: {
    
  },
}
</script>

<style lang="scss" scoped>
  .base-item-lable{
    width: 0.7rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: relative;
    padding-right: 0.2rem;
    box-sizing: border-box;
    .lable-tt{
      font-size: 0.12rem;
      color: #444444;
      white-space: nowrap;
    
    }
    .lable-required{
      position: absolute;
      right: 0.08rem;
      top: 50%;
      line-height: 1;
      transform: translateY(-50%);
      font-size: 0.12rem;
      color: #ff5a1f;
    }
  }
</style>