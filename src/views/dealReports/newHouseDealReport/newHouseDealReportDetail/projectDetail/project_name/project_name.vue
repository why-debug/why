<template>
  <div class="project_name">
    <div class="top">
      <div class="build_name">{{ project_name_data.buildName }}</div>
      <div class="build_price">{{ project_name_data.offerAmount|price }} <span class="unit">{{ project_name_data.offerAmount|unit }}</span></div>
    </div>
    <div class="bottom">
      <div class="addr">{{ project_name_data.buildAddr }}</div>
      <div class="tags_list">
        <div  v-for="(item, i) in tags_list" :key="i" :class="item != '未收佣'?'tag':'no-tag'">{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tags_list:[],//报告类型
      project_name_data: {},
    }
  }, 
  props:{
    initParams:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  watch:{
    initParams(){
      this.project_name_data = this.initParams;
      //添加项目类型 如：直销 一般成交 一次性付款 未收佣 reportTypeText reportClassText payTypeText commissionStatusText
      this.tags_list.push(this.project_name_data.reportTypeText);
      this.tags_list.push(this.project_name_data.reportClassText);
      this.tags_list.push(this.project_name_data.payTypeText);
      this.tags_list.push(this.project_name_data.commissionStatusText);
    }
  },
  filters: {
    unit(price) {
      let p= Number(price)
      if (isNaN(p)) return '元';
      if (p<9999) return '元'
      return '万元'
    }, 
    price(price) {
      let p= Number(price)
      if (isNaN(p)) return '--';
      if (p<9999) return price
      return p/10000
    }
  }
}
</script>

<style lang="less" scoped>
  .project_name {
    padding: 0.12rem 0.1rem; width: 100%; box-sizing: border-box; 
    .top {
      display: flex; justify-content: space-between; width: 100%; align-items: flex-end; padding-bottom: 0.06rem;
      .build_name {
        font-size: 0.18rem; font-weight: bold; color: #444444;
      }
      .build_price {
        font-size: 0.2rem; color: #ff8002;
        .unit {
          font-size: 0.12rem;
        }
      }
    }
    .bottom {
      display: flex; justify-content: space-between; align-items: center; 
      .addr {
        color: #999999;
      }
      .tags_list {
        display: flex;
        .tag {
          width: auto; margin-left: 0.06rem; height: 0.19rem; border: solid 0.01rem #259cf3; color: #259cf3;
          text-align: center; line-height: 0.19rem;  
        }
        .no-tag{
          width: auto; 
          margin-left: 0.06rem;
          height: 0.19rem;
          text-align: center;
          line-height: 0.19rem;  
          color: #bcbcbc;
          border: solid 0.01rem #bcbcbc;
        }
      }
    }
  }

</style>