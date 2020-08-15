<!--右上角搜索框组件-->
<template>
  <div class="f_r_s">
    <InputBox
      @sendData="changeAraeForm"
      :placeholder="placeholder"
      :style="'width:' + width + 'rem'"
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
import InputBox from "./inputBox";

export default {
  components: {
    InputBox,
  },

  data() {
    return {
      keyword: "", //关键字
      inputVal: "",
    };
  },
  props: {
    placeholder: {
      type: String,
      default: "请输入你想查找的内容",
    },
    width: {
      type: String,
      default: "1.7",
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
    kwdSearch(Val) {
      const that = this;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        that.$emit("kwdSearch", Val);
      }, 500);
    },
  },
};
</script>

<style scoped>
@import "../../../common/css/common.css";
.search_icon_b {
  position: relative;
  top: 0;
  bottom: 0;
  left: -0.25rem;
  height: 0.21rem;
  cursor: pointer;
  width: 0.2rem;
  /* margin: auto; */
}
.search_icon {
  position: absolute;
  width: 0.14rem;
  height: 0.14rem;
  top: 0.035rem;
}
.search_icon > img {
  width: 0.14rem;
  height: 0.14rem;
}
</style>
