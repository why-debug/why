<template>
  <div class="erp-loading" v-show="isShow">
    <div class="erp-loading-icon"></div>
  </div>
</template>

<script>
export default {
  name:'erpLoading',
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
.erp-loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-family: MicrosoftYaHei;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: 200;
  .erp-loading-icon {
    width: 0.4rem;
    height: 0.4rem;
    background-size: 100% 100%;
    background-position: center center;
    background-repeat: no-repeat;
    background-image: url("../../assets/images/public/loadIng.gif");
  }
}


</style>
