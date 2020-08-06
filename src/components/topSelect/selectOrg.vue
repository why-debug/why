

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
              <input @input="inputChange" v-model="inputVal" autocomplete="off" placeholder="" />
            </div>
          </div>

          <!--nav-->
          <ul v-show="!searchList" class="nav_org f_r_s">
            <li v-for="(item, index) in navList"
                :class="{'active_nav' : (index > 0 && index === navList.length - 1)}"
                @click="chooseNav(item, index)"
                :key="index">
              <span style="margin-left: 0.02rem;" v-if="index > 0">/</span>{{ item.name }}
            </li>
          </ul>

          <div v-show="!searchList" class="area_cont">
            <!-- <div class="select_item_click f_r_b"
                 v-show="navList && navList.length === 1"
                 @click.stop="clickItem({name: '全部', id: '0'})">
              <div class="f_r_s" style="align-items: center">
                <div class="max_org_name">全部</div>
                <div> ({{allPersonNum}}人)</div>
              </div>
            </div> -->

            <div v-for="(item, index) in list"
                 class="select_item_click f_r_b"
                 @click.stop="clickItem(item)"
                 :key="index">
              <div class="f_r_s" style="align-items: center">
                <div class="max_org_name">{{ item[textKey] }}</div>
                <div> ({{orgPeopleNumMap.get(item.id) || 0}}人)</div>
              </div>
              <div v-if="checkHasNextOrg(item.children || [])"
                   @click.stop="nextOrg(item, index)" class="org_icon_view f_r_e">
                <div class="org_icon"></div>
                <div class="org_text_next">下级</div>
              </div>
            </div>
          </div>

          <!--搜索-->
          <div v-show="searchList && searchList.length > 0" class="area_cont">
            <div v-for="(item, index) in searchList"
                 @click.stop="clickSearchItem(item, index)"
                 class="select_item_click f_r_b"
                 :key="index">
              <div class="f_r_s" style="align-items: center">
                <div class="max_org_name">{{ item["organizationName"] }}</div>
                <div> ({{orgPeopleNumMap.get(item.organizationId) || 0}}人)</div>
              </div>
            </div>
          </div>

          <!--搜索空-->
          <div v-show="searchList && searchList.length === 0" class="area_cont">
            <div class="empty_search">暂无相关数据，请尝试输入其他关键字进行查找！</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import {GetNewOrgTree} from "../../utils/GetOrgTree";
  import {OrgTreePrivateData} from "../../net/common/GetOrgTreeApi";
  import {SearchCondition, SearchFromLocal} from "../../utils/Common";

  class PrivateData {
    static timeOutVal = null;
    static allList = []; // 所有的列表
    static searchList = []; // 搜索
    static treeData = []; // 树
    static compInfo = {}; // 公司信息
    static navListMap = new Map();  // 导航map
    static OrgTreeClass = null;
  }

  export default {
    data() {
      return {
        showTc: false,
        selectText: "",
        hoverIndex: null,
        clickShow: false,
        imgSrc: require("../../assets/images/projectAgentInfo/contract/type_200.png"),
        imgWidth: "0.15rem",
        imgHeight: "0.15rem",
        list: [],
        searchList: null,
        textKey: "name",
        inputVal: "",
        // 当行列表 {name, id}
        navList: [],
        // 人数map
        orgPeopleNumMap: new Map(),
        // 总数
        allPersonNum: 0,
        Reset:false,
      }
    },
    props:{
      // 是否清空 true false
      empty: {
        type: Boolean,
        default: false
      },
      // 默认文案
      defaultText: {
        type: String,
        default() {
          return "所属公司"
        }
      },
      // 当前文案
      nowKey: {
        type: String,
        default() {
          return "text";
        }
      },
    },
    mounted() {
      document.addEventListener('click', this.handleBodyClick);
      this.selectText = this.defaultText;
      this.init();
    },
    destroyed () {
      document.removeEventListener('click', this.handleBodyClick);
    },
    watch:{
      nowKey: {
        handler: function(to, from){
          console.log(to)
          console.log(from)
          if(to==''){
            this.selectText = '';
          }
        },
        deep: true
      },
      empty: function(){
        this.Reset = this.empty;
        if(this.Reset){
          this.emptySuccess();
        }
      },
    },
    methods: {
      emptySuccess(){
        this.inputVal = ''
        this.selectText = ""
        this.Reset = false;
      },
      handleBodyClick() {
        this.Reset = false;
        if (this.clickShow) {
          this.clickShow = false;
          return;
        }

        this.showTc = false;
      },

      async init() {
        PrivateData.OrgTreeClass = new GetNewOrgTree();
        this.orgPeopleNumMap = PrivateData.OrgTreeClass.getPeopleNumMap();
        let data = await PrivateData.OrgTreeClass.initTree();
        PrivateData.allList = OrgTreePrivateData.organizationList;
        PrivateData.treeData = data.tree;
        PrivateData.compInfo = data.compInfo;
        let allPersonNum = 0;
        for (let info of PrivateData.treeData) {
          allPersonNum += (this.orgPeopleNumMap.get(info.id) || 0);
        }
        this.allPersonNum = allPersonNum;

        this.navList = [
          {name: PrivateData.compInfo.compName || "", id: PrivateData.compInfo.compId},
        ];
        this.list = this.dealList(PrivateData.treeData);
        PrivateData.navListMap.set(PrivateData.compInfo.compId, this.list);
      },

      // 处理list
      dealList(list) {
        let newList = [];
        for (let info of list) {
          if (!info.isOrg) continue;

          newList.push(info);
        }
        return newList;
      },

      chooseInfo() {
        this.clickShow = true;
        this.showTc = true;
      },

      inputChange() {
        clearTimeout(PrivateData.timeOutVal);
        if (!this.inputVal) {
          this.searchList = null;
          return;
        }

        PrivateData.timeOutVal = setTimeout(() => {
          let condition = [];
          condition.push(new SearchCondition("organizationName", this.inputVal));
          PrivateData.searchList = new SearchFromLocal(PrivateData.allList).getList(condition);
          this.searchList = PrivateData.searchList;
        }, 500);
      },

      clickItem(item) {
        this.selectText = item[this.textKey] === "全部"
          ? PrivateData.compInfo.compName
          : item[this.textKey] || "";
        this.showTc = false;
        this.$emit("onSelectChange", {
          id: item.id,
          name: item.name,
        });
      },

      // 搜索点击
      clickSearchItem(item) {
        this.selectText = item.organizationName;
        this.showTc = false;
        this.$emit("onSelectChange", {
          id: item.organizationId,
          name: item.organizationName,
        });
      },

      // 判断是否有下级
      checkHasNextOrg(children = []) {
        let index = children.findIndex((info) => info.isOrg);
        return (index >= 0);
      },

      // 切换下级
      nextOrg(item, index) {
        this.navList.push({
          name: item.name,
          id: item.id
        });
        this.list = this.dealList(item.children);
        PrivateData.navListMap.set(item.id, this.list);
      },

      // 切换nav
      chooseNav(item, index) {
        this.navList = this.navList.slice(0, index+1);
        this.list = PrivateData.navListMap.get(item.id);
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../style/select";
  @desColor : #9ba792;
  @border : 1px solid #b9e1f6;

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
      // font-weight: bold;
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
    width: @contWidth * 2.4;
    .selected_tc_item{
      border-bottom: none;
      width: @contWidth;
      background: @tcBgColor;
      box-shadow: none;
    }
    .area_tc_cont{
      width: 100%;
      background: @tcBgColor;
      box-shadow: 0.005rem 0.009rem 0.03rem 0
      rgba(0, 0, 0, 0.45);
      .select_item_click{
        width: 100%;
        margin-right: 0;
        height: 0.37rem;
        line-height: 0.37rem;
        padding-left: 0.08rem;
        box-sizing: border-box;
        align-items: center;
        font-size: 0.12rem;
        color: #444444;
        border-bottom: 1px solid @borderColor1;
        &:hover{
          background-color: @hoverColor;
          color: #ffffff;
          .org_icon{
            // background-image: url("../../../assets/images/projectAgentInfo/contract/org_down_white.png");
          }
          .org_text_next{
            color: #ffffff;
          }
        }
        &>.org_icon_view{
          align-items: center;
          padding-right: 0.13rem;
          box-sizing: border-box;
        }
        .org_icon{
          background-repeat: no-repeat;
          // background-image: url("../../../assets/images/projectAgentInfo/contract/org_down_gray.png");
          background-size: cover;
          width: 0.14rem;
          height: 0.14rem;
          margin: auto 0.04rem auto 0;
        }
        .org_text_next{
          font-family: MicrosoftYaHei;
          font-size: 0.12rem;
          color: #bbbbbb;
        }
      }
    }
  }
  .nav_org{
    flex-wrap: wrap;
    width: 100%;
    font-size: 0.12rem;
    line-height: 0.28rem;
    color: #444444;
    padding-bottom: 0.1rem;
    padding-left: 0.08rem;
    box-sizing: border-box;
    align-items: center;
    border-bottom: @border;
    &>li{
      text-align: left;
      color: #444444;
      &.active_nav{
        color: #999999;
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
  .area_cont{
    max-height: 3.071rem;
    min-height: 1.258rem;
    overflow-y: auto;
  }
  .empty_search{
    font-size: 0.14rem;
    color: @desColor;
    line-height: 0.18rem;
    margin-top: 0.06rem;
    padding-left: 0.10rem;
    margin-bottom: 0.06rem;
  }
  .max_org_name{
    text-align: left;
    max-width: 2.2rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
</style>
