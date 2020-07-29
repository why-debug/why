<template>
  <div class="title">
    {{ title }}
  </div>
</template>

<script>
export default {
  props:['title']

}
</script>

<style lang="less" scoped>
.title {
  width: 100%; height: 0.32rem; padding-left: 0.1rem; line-height: 0.32rem; font-size: 0.14rem; color: #444444;
  border-bottom: 0.01rem solid #ededed;
}
</style>