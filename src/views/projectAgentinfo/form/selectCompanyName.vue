

<template>
  <div class="select_reg">
    <div @click="chooseInfo" class="selected_item f_r_s">
      <img class="selected_build" :src="imgSrc">
      <div :class="{'selectedTextWhite': selectText && selectText !== defaultText}"
           class="selected_text">{{ selectText || defaultText }}</div>
      <img class="selected_arrow" src="http://cdn.haofang.net/static/newHouseStandardVersion/select/smallsj_200.png">
    </div>

    <!--弹窗-->
    <transition name="el-fade-in">
      <div v-show="showTc" class="select_tc f_c_s">
        <div class="selected_tc_item selected_item f_r_s">
          <img class="selected_build" :src="imgSrc">
          <div class="selected_text">{{ selectText || defaultText }}</div>
          <img class="selected_arrow" src="http://cdn.haofang.net/static/newHouseStandardVersion/select/smallsj_200.png">
        </div>

        <div class="area_tc_cont" @click.stop="">
          <!--搜索-->
          <div class="f_c_c input_view">
            <div>
              <input @input="inputChange" v-model="ProjectParameter.buildName" placeholder="" />
            </div>
          </div>

          <div class="area_cont">
            <div @mouseenter="enterRegCheck(item, index)" v-for="(item, index) in list"
                 :class="{'reg_hover' : (index === hoverIndex)}"
                 class="select_item_click"
                 @click.stop="clickItem(item)"
                 :key="index">{{ item[textKey] }}</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import {GetCompanyNameList, RequestParameter} from "../../../net/projectAgentInfoRequest/selectCompanyNameRequest";
  import {SearchCondition, SearchFromLocal} from "../../../utils/Common";

  class PrivateData {
    static timeOutVal = null;
    static allList = []; // 所有的列表
    static searchList = [];  // 搜索的列表
  }

  export default {
    data() {
      return {
        showTc: false,
        selectText: "",
        hoverIndex: null,
        clickShow: false,
        imgSrc: require("@/view/meiLianErp/assets/images/Report/project.png"),
        imgWidth: "0.15rem",
        imgHeight: "0.15rem",
        list: [],
        textKey: "text",
        ProjectParameter: new RequestParameter(),
        Reset:false,
      }
    },
    props:{
      // 展示的字段名称
      defaultText: {
        type: String,
        default: '项目'
      },
      // 1 一手 2租赁
      buildType: {
        type: Number,
        default: 1
      },
      // 是否清空 true false
      empty: {
        type: Boolean,
        default: false
      }
    },
    watch :{
      empty: function(){
        this.Reset = this.empty;
        if(this.Reset){
          this.emptySuccess();
        }
      },
      buildType:{
        handler: function(){
          this.checkbuildType();
        },
        deep: true
      }
    },
    created(){
      this.initData();
    },
    mounted() {
      document.addEventListener('click', this.handleBodyClick);
      this.selectText = this.defaultText;
      this.initData();
    },
    destroyed () {
      document.removeEventListener('click', this.handleBodyClick);
    },

    methods: {
      checkbuildType(){
        this.ProjectParameter.buildType = this.buildType;
      },
      handleBodyClick() {
        this.Reset = false;
        if (this.clickShow) {
          this.clickShow = false;
          return;
        }
        this.showTc = false;
      },

      // 初始化数据
      async initData() {
        PrivateData.allList = await new GetCompanyNameList(this.ProjectParameter).send()
        this.dealList();
      },

      // 处理显示的列表
      dealList() {
        this.list = PrivateData.searchList.length > 0
          ? PrivateData.searchList : PrivateData.allList;
        const first = {id: '',text: "全部"}
        this.list.unshift(first);
      },

      inputChange() {
        clearTimeout(PrivateData.timeOutVal);

        PrivateData.timeOutVal = setTimeout(() => {
          let condition = [];
          condition.push(new SearchCondition("text", this.ProjectParameter.buildName));
          PrivateData.searchList = new SearchFromLocal(PrivateData.allList).getList(condition);
          this.list = PrivateData.searchList;
        }, 500);
      },

      // 选择
      chooseInfo() {
        this.clickShow = true;
        this.showTc = true;
      },

      enterRegCheck(item, index) {
        this.hoverIndex = index;
      },
      emptySuccess(){
        this.selectText = "";
        this.Reset = false;
        this.ProjectParameter = new RequestParameter();
      },
      clickItem(item) {
        this.Reset = false;
        this.selectText = item[this.textKey] === "全部" ? "" : item[this.textKey] || "";
        this.showTc = false;
        this.$emit("onSelectChange", item);
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../../style/select";
  @desColor : #9ba792;

  .select_reg{
    width: @width;
    position: relative;
    cursor: pointer;
    &::after{
      content: "";
      background-image: linear-gradient(#2398ee, #015796, #2398ee);
      width: 0.01rem;
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
    }
  }
  .selected_item{
    background: @bgColor;
    height: 0.33rem;
    line-height: 0.33rem;
    width: 100%;
    box-shadow: 0 0.01rem 0 0
    rgba(255, 255, 255, 0.3);
    position: relative;
    align-items: center;
    box-sizing: border-box;
    border-bottom: 1px solid @borderBottomColor;
    .selected_build{
      margin: auto 0.04rem auto 0.04rem;
      flex-shrink: 0;
      width: 0.15rem;
      height: 0.15rem;
      display: flex;
    }
    .selected_arrow{
      flex-shrink: 0;
      width: 0.10rem;
      position: absolute;
      right: 0.1rem;
      top: 50%;
      transform: translateY(-50%);
    }
    .selected_text{
      font-weight: bold;
      font-family: SimSun;
      font-size: 0.12rem;
      font-stretch: normal;
      letter-spacing: 0;
      color: #00223a;
      text-align: left;
      max-width: calc(100% - 0.26rem);
      padding-right: 0.15rem;
      box-sizing: border-box;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .selectedTextWhite{
      color: #ffffff;
      font-weight: bold;
    }
    .selected_del{
      flex-shrink: 0;
      width: 0.15rem;
      position: absolute;
      right: 0.05rem;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .select_tc{
    position: absolute;
    left: 0;
    top: 0;
    z-index: 999;
    width: @contWidth;
    background: @tcBgColor;
    box-shadow: 0.005rem 0.009rem 0.03rem 0
    rgba(0, 0, 0, 0.45);
    .selected_tc_item{
      border-bottom: none;
      width: 100%;
      background: @tcBgColor;
      box-shadow: none;
    }
    .area_tc_cont{
      width: 100%;
      .select_item_click{
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow:hidden; 
        width: 100%;
        margin-right: 0;
        height: 0.3rem;
        line-height: 0.3rem;
        padding-left: 0.11rem;
        box-sizing: border-box;
        align-items: center;
        font-size: 0.12rem;
        border-bottom: 1px solid @borderColor1;
      }
    }
  }
  .input_view{
    padding: 0.1rem;
    box-sizing: border-box;
    div{
      width: 100%;
      height: 0.26rem;
      background-color: #ffffff;
      box-shadow: inset 0 0.01rem 0.05rem 0
      rgba(202, 213, 223, 0.73);
      border-radius: 0.02rem;
      border: solid 0.01rem #cad5df;
      line-height: 0.26rem;
      text-align: left;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      input{
        padding-left: 0.06rem;
        padding-right: 0.06rem;
        height: 100%;
        line-height: 100%;
        text-align: left;
        border: none;
        flex: 1;
        display: block;
        color: #333333;
        background: #ffffff;
        font-size: 0.12rem;
        &:focus{
          border: solid 1px @inputFocusColor;
          box-shadow: 0 0.01rem 0.05rem 0
          @inputBoxShadowColor;
        }
      }
    }
  }
  input,textarea {
    color: #333333;
    text-shadow: 0 0 0 #333333;
    -webkit-text-fill-color: transparent;
  }
  input::-webkit-input-placeholder{
    color: #333333;
    text-shadow: none;
    -webkit-text-fill-color: initial;
  }
  .reg_hover{
    background-color: @hoverColor;
    color: #ffffff;
  }
  .area_cont{
    max-height: 3.17rem;
    min-height: 0.9rem;
    overflow-y: auto;
  }
</style>
