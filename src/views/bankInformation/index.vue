<template>
  <div class="bankInformationBox">
    <div class="bankBox">
      <div class="bankName_Box">
        <bankName @selectBank="selectBank"></bankName>
      </div>
      <div class="bankList_Box">
        <bankList :bankInfo="bankInfo"></bankList>
      </div>
    </div>
  </div>
</template>
<script>
import bankList from './components/listItem/bankList'
import bankName from './components/listItem/bankName'

export default {
  components: {
    bankList,
    bankName,
  },
  data() {
    return {
      bankInfo:'', // 主行信息(左边)
    }
  },

  methods: {
    selectBank(item){
      this.bankInfo = item;
    }
  },
}
</script>
<style lang="less">
  .bankInformationBox{
    font-size: 0.12rem;
    min-width: 14.4rem;
    // height: 100%;
    // height: calc( 100% - 0.33rem);
    height: calc(~"100% - 0.33rem");
    line-height: 1;
    background-color: #e6e6e6;
    user-select: none;
    // .ceshikong{
    //   width: 14.4rem;
    //   height: 100%;
    //   background: yellow;
    // }
    .bankBox{
      display: flex;
      width: 100%;
      height:100%;
      // height: calc(100% - 0.31rem);
      .bankName_Box{
        flex:0.16;
        // width: 2.3rem;
        height: 100%;
      }
      .bankList_Box{
        flex:0.84;
        // width: 12.14rem;
        height: 100%;
      }
    }
  }
</style>