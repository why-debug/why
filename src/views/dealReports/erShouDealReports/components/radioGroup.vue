<template>
  <div class="radio-group">
    <div
      class="radio-group-item"
      v-for="(item, index) in radioList"
      :key="index"
      :class="{'active': activeRadio === item.value}"
      @click="selecRadio(item.value)">
      {{item.text}}
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
          { text: '先生', value: 1 },
          { text: '女士', value: 0 }
        ]
      }
    },
    nowData: {
      type: String | Number,
      default: ''
    },
    indexParent: {
      type: String | Number,
      default: ''
    }
  },
  data () {
    return {
      activeRadio: ''
    }
  },
  created () {
    this.activeRadio = this.nowData
  },
  methods: {
    selecRadio (value) {
      this.activeRadio = value
      this.$emit('sendData', this.indexParent, value)
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
  &>.radio-group-item {
    width: 0.7rem;
    height: calc(~"@{commonHeight} - 0.02rem");
    line-height: calc(~"@{commonHeight} - 0.02rem");
    border: 0.01rem solid #bdc6cf;
    color: #444444;
    text-align: center;
    font-size: 0.12rem;
    margin-right: 0.1rem;
    border-radius: 0.04rem;
    cursor: pointer;
    &:last-child {
      margin-right: 0;
    }
    &.active {
      border: 0.01rem solid #fb8a10;
    }
  }
}
</style>
