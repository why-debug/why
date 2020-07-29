<template>
  <div class="no-data">
    <img src="../../../../assets/images/public/nodate.png" alt="">
    <div>暂无数据</div>
  </div>
</template>

<style lang="less" scoped>
.no-data {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &>img {
    width: 1.2rem;
    height: 1.6rem;
    display: block;
  }
  &>div {
    width: 100%;
    height: auto;
    margin-top: 0.1rem;
    text-align: center;
    line-height: 1;
    color: #999999;
    font-size: 0.12rem;
  }
}
</style>
