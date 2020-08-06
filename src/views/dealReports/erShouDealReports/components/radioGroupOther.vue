<template>
  <div class="radio-group">
    <div
      class="radio-group-item"
      v-for="(item, index) in radioList"
      :key="index"
      @click="selecRadio(item.value)">
      <img :src="activeRadio === item.value ? radioActiveIcon : radioIcon" alt="" srcset="">
      <div>{{item.text}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    radioList: {
      type: Array,
      default () {
        return [
          { text: '录比列', value: '1' },
          { text: '录金额', value: '2' }
        ]
      }
    }
  },
  data () {
    return {
      activeRadio: this.radioList[0].value ? this.radioList[0].value : '',
      radioIcon: require('../../../../assets/images/public/radioBox_200.png'),
      radioActiveIcon: require('../../../../assets/images/public/radioBox1_200.png')
    }
  },
  methods: {
    selecRadio (value) {
      this.activeRadio = value
      this.$emit('sendData', value)
    }
  }
}
</script>

<style lang="less" scoped>
@commonHeight: 0.3rem;
.radio-group {
  width: auto;
  height: @commonHeight;
  display: flex;
  align-items: center;
  &>.radio-group-item {
    width: 0.7rem;
    height: auto;
    margin-right: 0.2rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    &:last-child {
      margin-right: 0;
    }
    &>img {
      width: 0.16rem;
      height: 0.16rem;
      display: block;
    }
    &>div {
      line-height: 1;
      color: #444444;
      font-size: 0.12rem;
      margin-left: 0.08rem;
    }
  }
}
</style>
