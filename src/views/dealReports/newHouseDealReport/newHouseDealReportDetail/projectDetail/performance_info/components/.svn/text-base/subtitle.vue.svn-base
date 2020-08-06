<template>
  <div class="subtitle" :class="{'icon':!!has_icon}">
    {{ title }}
  </div>
</template>

<script>
export default {
  props: [
    'title', 'has_icon'
  ]
}
</script>

<style lang="less" scoped>
  .subtitle {
    margin-top: 0.23rem; margin-left: 0.15rem; color: #444444; font-weight: bold; font-size: 0.12rem;
  }
  .icon {
    position: relative;
    &::before {
      content: ""; position: absolute; left: -0.08rem; height: 0.14rem; width: 0.02rem; background-color: #259cf3; top: 50%; transform: translateY(-50%); 
    }
  }
</style>