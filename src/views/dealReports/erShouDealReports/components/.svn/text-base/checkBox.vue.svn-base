<template>
  <!-- check-box - 表单 -->
    <div class="base-check-box"  @click="addDelSelect(value)">
      <div class="check-li-icon" :class="{'checked': selected.indexOf(value) > -1}" ></div>
      <div class="check-li-text">
        <span>{{label}}</span>
        <span v-if="note">({{note}})</span>
      </div>
    </div>
</template>

<script>
export default {
  name: 'checkBox',
  props: {
    selected: {
      type: Array,
      default () {
        return []
      }
    },
    label: {
      type: String,
      default: ''
    },
    note: {
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
    addDelSelect (value) {
      if (!value) return
      let row = this.selected
      row.indexOf(value) > -1 ? row = row.filter(n => n !== value) : row.push(value)
      this.$emit("sendData", {
        formKey: this.forKey,
        value: row
      })
    }
  },
}
</script>

<style lang="less" scoped>
  .base-check-box {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-right: 0.16rem;
    min-width: 0.1rem;
    .check-li-icon {
      width: 0.14rem;
      height: 0.14rem;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 100% 100%;
      background-image: url('../../../../assets/images/public/checkbox_200.png');
      &.checked {
        background-image: url('../../../../assets/images/public/checkbox1_200.png');
      }
    }
    .check-li-text {
      font-size: 0.12rem;
      margin-left: 0.06rem;
      &>span {
        &:nth-child(1) {
          color: #444444;
        }
        &:nth-child(2) {
          color: #999999;
        }
      }
    }
  }
</style>
