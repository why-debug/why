<!--右上角搜索框组件-->
<template>
  <div class="f_r_s">
    <InputBox
      @sendData="changeAraeForm"
      :placeholder="placeholder"
      :width="width"
      maxLength="30"
      :value="inputVal"
    ></InputBox>
    <div class="search_icon_b" @click="kwdSearch(keyword)">
      <img
        class="search_icon"
        src="http://cdn.haofang.net/static/newHouseStandardVersion/customer/sstiao_FD_200.png"
        alt=""
      />
    </div>
  </div>
</template>

<script>
import InputBox from "../../form/inputBox";
export default {
  components: {
    InputBox,
  },
  data() {
    return {
      keyword: "", //关键字
      inputVal:'',
    };
  },

  props: {
    placeholder: {
      type: String,
      default: "请输入你想查找的内容",
    },
    width: {
      type: String,
      default(){
        return '2.26'
      }
    },
    empty: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  watch: {
    empty: {
      handler: function() {
        if (this.empty) {
          this.inputVal = "请输入你想查找的内容";
        } else {
          this.inputVal = "";
        }
      },
      deep: true,
    },
  },
  methods: {
    changeAraeForm(data) {
      this.keyword = data.value || "";
      this.$emit("Kwd", this.keyword);
    },
    kwdSearch(val) {
      this.$emit("kwdSearch", val);
    },
  },
};
</script>

<style scoped>
@import "../../../../common/css/common.css";
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
