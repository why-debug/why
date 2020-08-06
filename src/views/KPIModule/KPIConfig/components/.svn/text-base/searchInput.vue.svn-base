<!--右上角搜索框组件-->
<template>
  <div class="inputSearchBox">
    <InputBox ref="inputBoxRef" @sendData="changeAraeForm" @inputChange="inputChange" :placeholder="placeholder" width="1.97"
              maxLength="30"></InputBox>
    <div class="search_icon_b">
      <img class="search_icon" src="http://cdn.haofang.net/static/newHouseStandardVersion/customer/sstiao_FD_200.png"
           alt="" @click="kwdSearch">
    </div>
  </div>
</template>

<script>
  import InputBox from '../../../../components/form/inputBox.vue';

  export default {
    components: {
      InputBox
    },
    data() {
      return {
        keyword: '', //关键字
      }
    },

    props: {
      placeholder: {
        type: String,
        default: '请输入你想查找的内容',
      }
    },

    methods: {
      changeAraeForm(data) {
        this.keyword = data.value || '';
      },
      kwdSearch() {
        this.$emit("Kwd", this.keyword);
      },
      //清空搜索的数据
      cleanInputDateFn_() {
        this.$refs.inputBoxRef.cleanInputDateFn()
      },
      inputChange(val){
        this.$emit('inputChange',val);
      },
    },
  }
</script>

<style scoped>
  .inputSearchBox {
    display: flex;
    flex-direction: row;
  }

  .search_icon_b {
    position: relative;
    top: 0;
    left: -0.25rem;
    height: 0.21rem;
    cursor: pointer;
  }

  .search_icon {
    width: 0.14rem;
    height: 0.14rem;
    margin-top: 0.035rem;
  }

  .search_icon > img {
    width: 0.14rem;
    height: 0.14rem;
  }
</style>
