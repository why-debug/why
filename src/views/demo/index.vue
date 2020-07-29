<template>
  <div>接口请求demo</div>
</template>

<script>
import { getDemo } from '@/net/netDemo/netDemo.js';

export default {
  data () {
    return {
      paramsObj: {
        buildName: "", // 楼盘名称
        createTime: "", // 创建时间
        status: "", // 1分销中 2待分销 3合作到期
        systemFlag: 1, // 来源 0erp 1系统(分销楼盘) 2搜搜抓取 3旅居地产 4新盘代理 5pad端登记
        pageNum: 1,
        pageSize: 20
      }
    }
  },
  created() {
    this.initData();
  },
  methods: {
    async initData () {
      let data = await new getDemo(this.paramsObj).send();
      console.log(data);
    }
  },
}
</script>
