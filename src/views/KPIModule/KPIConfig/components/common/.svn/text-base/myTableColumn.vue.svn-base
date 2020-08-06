
<!--表格标题-->
<template>
  <td :style="{
    backgroundColor:theadBackgroundColor,
    color:theadColor,
    width: newWidth,
    textAlign: align,
    height:height,
    fontSize:fontSize,
    border:border,
    paddingLeft:paddingLeft,
  }" slot="">
    {{ label }}
  </td>
</template>

<script>
  export default {
    props: {
      label: {
        type: String,
        default() {
          return "";
        }
      },
      prop: {
        type: String,
        default() {
          return "";
        }
      },
      width: {
        type: String|Number,
        default() {
          return "100%";
        }
      },
      height: {
        type: String|Number,
        default() {
          return "0.5rem";
        }
      },
      align: {
        type: String,
        default() {
          return "left";
        }
      },
      theadBackgroundColor: {
        type: String,
        default() {
          return "#f8f8f8";
        }
      },
      tbodyBackgroundColor: {
        type: String,
        default() {
          return "#ffffff";
        }
      },
      theadColor:{
        type: String,
        default(){
          return '#999999';
        },
      },
      tbodyColor:{
        type: String,
        default(){
          return '#444444';
        },
      },
      fontSize: {
        type: String,
        default(){
          return '0.14rem';
        },
      },
      border:{
        type: String,
        default(){
          return 'solid 0.01rem #eaeaea';
        },
      },
      paddingLeft:{
        type: String,
        default(){
          return '0.2rem';
        }
      },
      color:{
        type: String,
        default(){
          return '#444444';
        }
      },

      // 不通用配置 - input的宽度
      inputWidth:{
        type: String,
        default(){
          return '0.75rem'
        },
      },
    },
    computed: {
      newWidth() {
        if (!isNaN(this.width)) {
          return `${this.width}px`;
        }

        return this.width;
      }
    },
    data() {
      return {

      }
    }
  }
</script>

<style lang="less" scoped>

</style>
