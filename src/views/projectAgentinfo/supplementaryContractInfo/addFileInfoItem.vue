<template>
  <div class="g_biggest">
    <div class="g_navListTop">
      <div class="g_nav">
        <div class="u_content">合同资料</div>
        <div class="g_bootom"></div>
      </div>
      <div class="g_btnList">
        <div class="g_btn u_submit" @click="f_submit">提交</div>
        <div class="g_btn u_cancel" @click="f_cancel">取消</div>
      </div>
    </div>
    <div class="g_content">
      <div class="g_topLine">
        <topDividingLine :title="title"></topDividingLine>
      </div>

      <div class="g_fromBiggst">
        <div class="firstGroup">
          <div class="u_group">
            <div class="firstTitle thereTitle">原合同编号:</div>
            <div class="u_important"></div>
            <div
              class="u_groupDisplaycontent u_groupSelectInput"
              @click="f_selectContractClick"
            >
              {{ parameter.oldContractNum }}
            </div>
          </div>
          <div class="u_group">
            <div
              class="firstTitle secoundTitle"
              style="padding-left:1rem!important;"
            >
              原合同名称:
            </div>
            <div class="u_important">*</div>
            <div class="u_groupDisplaycontent g_greyForbidOperate">
              {{ parameter.oldContractName || "--" }}
            </div>
          </div>
          <div class="u_group">
            <div class="firstTitle" style="padding-left:0;">
              原合同当前审批人:
            </div>
            <div class="u_important"></div>
            <div class="u_groupDisplaycontent g_greyForbidOperate">
              {{ parameter.oldContractLegal || "--" }}
            </div>
          </div>
          <div class="u_group">
            <div class="firstTitle secoundTitle">原合同当前审批状态:</div>
            <div class="u_important"></div>
            <div class="u_groupDisplaycontent g_greyForbidOperate">
              {{ parameter.oldContractStatuText || "--" }}
            </div>
          </div>
          <div class="u_group">
            <div class="firstTitle thereTitle">资料类型:</div>
            <div class="u_important"></div>
            <el-checkbox-group v-model="parameter.fileType">
              <el-checkbox
                @change="f_otherFileDescribe(fileType)"
                v-for="fileType in checkBoxFileInfoItem"
                :label="fileType"
                :key="fileType"
                >{{ fileType }}</el-checkbox
              >
            </el-checkbox-group>
            <input
              v-if="otherDesc"
              v-model="parameter.otherDesc"
              class="u_groupSelectInput g_checkBoxGroupInput"
              type="text"
            />
          </div>
          <div class="u_group">
            <div class="firstTitle thereTitle">盖章类型:</div>
            <div class="u_important"></div>
            <el-checkbox-group v-model="parameter.sealTypeArr">
              <el-checkbox
                @change="f_legalChange(sealType)"
                v-for="sealType in checkBoxSealItem"
                :label="sealType"
                :key="sealType"
                >{{ sealType }}</el-checkbox
              >
            </el-checkbox-group>
          </div>
          <div class="u_group" v-if="legal">
            <div class="firstTitle thereTitle">法人章备注:</div>
            <div class="u_important">*</div>
            <input
              v-model="parameter.sealDesc"
              class="u_groupSelectInput g_enforcerWidth"
              type="text"
            />
          </div>
          <div class="u_group u_textareaGroup">
            <div class="firstTitle thereTitle">备&nbsp;&nbsp;注:</div>
            <div class="u_important"></div>
            <textarea
              v-model="parameter.desc"
              class="g_textareaWidth"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
    <!-- 选择合同 弹窗 -->
    <div v-if="isSelectContract">
      <selectContract
        @f_closeView="f_closeView"
        @f_contractData="f_contractData"
      ></selectContract>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { CheckboxGroup } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import topDividingLine from "../../../components/form/topDividingLine";
import { JudgeObjectIsEqult } from "../../../utils/Common";
Vue.use(CheckboxGroup);
import selectContract from "../form/selectContract";
import {
  AddFileInfoRequestParameter,
  PortRequestParameter,
  AddFileInfoDetails,
} from "../../../net/projectAgentinfo/fileInfoRequest/AddFileInfoRequest";

import { GetFileInfoDetailsList } from "../../../net/projectAgentinfo/fileInfoRequest/InitEditFileInfoDetails";

export default {
  data() {
    return {
      title: "新增-公司资料",
      checkBoxFileInfoItem: [
        "营业执照",
        "授权委托书",
        "法人代表身份证",
        "法人代表证明",
        "其他",
      ], //补充资料
      checkBoxSealItem: [
        "合同章",
        "公章",
        "法人章",
        "业务专用章",
        "财务专用章",
      ], //补充印章
      sealTypeArr: [], //盖章类型选中值
      fileTypeArr: [], //资料类型选中值
      legal: false,
      otherDesc: false, //其他资料
      isSelectContract: false, //弹窗 选择合同 标志
      parameter: new AddFileInfoRequestParameter(),
      oldParemeter: {},
      newParemeter: {},
    };
  },
  watch: {
    parameter: {
      handler(newVal) {
        this.newParemeter = newVal;
      },
      deep: true,
    },
  },
  props: {
    //主键id
    id: {
      type: Number,
      default() {
        return 0;
      },
    },
    contractId: {
      type: Number,
      default: 0,
    },
    //1 新增, 2 编辑
    statu: {
      type: Number,
      default: 1,
    },
  },
  components: {
    topDividingLine,
    selectContract,
  },
  created() {
    if (this.statu == 2) {
      this.title = "编辑-公司资料";
      this.initData();
    }
  },
  methods: {
    //初始化
    initData() {
      let params = {
        id: this.id,
      };
      new GetFileInfoDetailsList(params)
        .send()
        .then((res) => {
          console.log(res);
          this.oldParemeter = Object.assign({}, res);
          this.parameter = Object.assign({}, res);
          //资料、盖章类型转换
          this.sealTypeArr = this.parameter.sealTypeArr;
          this.fileTypeArr = this.parameter.fileType;
          console.log(res, "hhhhhhhhhhhhhhhhhhhfheiawhfihe");
          console.log(res.sealTypeArr, "盖章类型");
          console.log(res.fileType, "资料类型");
          if (res.sealTypeArr.includes("法人章")) {
            this.legal = true;
          }
          if (res.fileType.includes("其他")) {
            this.otherDesc = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //检查元素
    f_getInspectParameterValue() {
      const el = this.parameter;
      if (!el.oldContractName) {
        this.$erpCommon.toast("原合同名称不能为空", "error");
        return false;
      }
      if (this.legal && !el.sealDesc) {
        this.$erpCommon.toast("法人备注不能为空", "error");
        return false;
      }

      return true;
    },
    //提交
    f_submit() {
      if (!this.f_getInspectParameterValue()) return;
      //未曾更改
      if (this.f_getJudgeObject(this.newParemeter, this.oldParemeter)) {
        this.$erpCommon.toast("数据没有更改..", "error");
        return;
      }
      if (this.statu == 2) {
        this.$erpConfirm({
          msg: "请确认是否要修改数据..",
        })
          .then(() => {
            //修改数据
            console.log(this.parameter, "修改数据");
            //调用保存接口
            //处理时间
            new AddFileInfoDetails(new PortRequestParameter(this.parameter))
              .send()
              .then((res) => {
                //操作成功,刷新列表
                if (res.errCode == 200) {
                  //初始化父组件列表数据
                  this.$parent.initData();
                  this.$parent.initContactNameList();
                  console.log("成功了哈哈哈哈哈");
                  setTimeout(() => {
                    this.$emit("f_closeView", true);
                  }, 300);
                  return;
                }
              });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        new AddFileInfoDetails(new PortRequestParameter(this.parameter))
          .send()
          .then((res) => {
            //操作成功,刷新列表
            if (res.errCode == 200) {
              //初始化父组件列表数据
              this.$parent.initData();
              this.$parent.initContactNameList();
              this.$erpCommon.toast("保存成功");
              console.log("成功了哈哈哈哈哈");
              setTimeout(() => {
                this.$emit("f_closeView", true);
              }, 300);
              return;
            }
          });
      }
    },
    //判断 对象是否改变
    f_getJudgeObject(newVal, oldVal) {
      return new JudgeObjectIsEqult().deepEqual(newVal, oldVal);
    },
    //选择合同弹窗
    f_selectContractClick() {
      // if(this.statu == 2){
      //     return
      // }
      this.isSelectContract = true;
    },
    //合同数据
    f_contractData(data) {
      this.parameter.oldContractNum = data.contractNum; //合同编号
      this.parameter.dealId = data.dealId; //合同id
      this.parameter.oldContractName = data.contractName; //合同名称
      this.parameter.oldContractLegal = data.auditor; //审核人
      this.parameter.oldContractStatu = data.statu; //状态
      this.parameter.oldContractStatuText = data.statuText; //状态文字表述
    },
    //法人章
    f_legalChange(text) {
      if (text != "法人章") {
        return;
      }
      this.legal = !this.legal;
      this.parameter.sealDesc = "";
    },
    //其他资料
    f_otherFileDescribe(text) {
      if (text != "其他") {
        return;
      }
      this.otherDesc = !this.otherDesc;
      this.parameter.otherDesc = "";
    },
    //取消
    f_cancel() {
      if (this.f_getJudgeObject(this.newParemeter, this.oldParemeter)) {
        setTimeout(() => {
          this.$emit("f_closeView", true);
        }, 300);
        return;
      }
      if (this.statu == 2) {
        this.$erpConfirm({
          msg: "你修改了数据,退出将不会有任何更改,确认要退出吗? ",
        })
          .then(() => {
            setTimeout(() => {
              this.$emit("f_closeView", true);
            }, 300);
          })
          .catch(() => {});
      } else {
        setTimeout(() => {
          this.$emit("f_closeView", true);
        }, 300);
      }
    },
    //关闭弹窗
    f_closeView() {
      this.isSelectContract = false;
    },
  },
};
</script>

<style scoped>
/* 置灰 */
.g_greyForbidOperate {
  border: 1px solid #bdbdbd;
  padding-left: 0.1rem;
  box-sizing: border-box;
  background-color: #e5e5e5;
  border-radius: 0.03rem;
  cursor: not-allowed;
}
.g_enforcerWidth {
  width: 7.3rem !important;

  border-style: none;
  border: 1px solid #bdc6cf;
  border-radius: 0.03rem;
}
.g_checkBoxGroupInput {
  width: 1.7rem !important;
}
.g_groupCheckBox {
  width: max-content;
  height: 0.3rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.g_textareaWidth {
  width: 7.3rem !important;
  height: 1.09rem !important;
  padding: 0.08rem !important;
  box-sizing: border-box;
  font-family:"Microsoft";
  font-size: 0.14rem;
  color: #444;
  border-style: none;
  border: 1px solid #bdc6cf;
  border-radius: 0.03rem;
}
.u_textareaGroup {
  width: max-content;
  height: 1.1rem !important;
}
.u_groupSelectInput {
  width: 1.7rem;
  height: 0.3rem;
  font-family:"Microsoft";
  background-color: #fdfdfd;
  box-shadow: inset 0rem 0rem 0.02rem 0rem rgba(253, 253, 253, 0.6);
  border-radius: 0.03rem;
  border: solid 0.01rem #bdc6cf;
  padding: 0 0.05rem;
  box-sizing: border-box;
}
.u_group {
  width: max-content;
  height: 0.3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.1rem;

  float: left;
  /* width: 2.8rem; */
}
.firstGroup {
  max-width: 8.9rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;

  display: block;
  float: left;
  font-size: 0.14rem;
}
.thereTitle {
  padding-left: 0.5rem !important;
}
.secoundTitle {
  width: 2.025rem !important;
  padding-left: 0.5rem !important;
}
.firstTitle {
  font-family: MicrosoftYaHei;
  line-height: 0.3rem;
  font-size: 0.14rem;
  color: #444444;
  text-align: justify;
  text-justify: distribute-all-lines;
  text-align-last: justify;
  margin-left: 0.05rem;
  width: 1.3rem;
  height: 100%;
  padding-left: 0.2rem;
  box-sizing: border-box;
  position: relative;
}
.u_important {
  margin: 0 0.085rem;
  height: 100%;
  line-height: 0.3rem;
  color: #ff0000;
  width: 0.05rem;
  font-family: SimSun;
  font-size: 0.12rem;
}
.u_groupDisplaycontent {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-family: '"Microsoft"';
  font-size: 0.14rem;
  color: #444444;
  width: 2.5rem;
  height: 0.3rem;
  box-sizing: border-box;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.g_topLine {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.3rem;
  margin-top: 0.45rem;
}
.g_content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-x: hidden;
  overflow-y: auto;
}
.u_cancel {
  background-color: #f3f3f3;
  color: #666666;
  border: 1px solid#DDD;
  box-sizing: border-box;
}
.u_submit {
  border: 1px solid #238aff;
  box-sizing: border-box;
  background-color: #489eff;
  color: #ffffff;
}
.g_btn {
  padding: 0.06rem 0.2rem;
  margin-left: 0.15rem;
  border-radius: 0.03rem;
  cursor: pointer;
}
.g_btnList {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: SimSun;
  font-size: 0.12rem;
}
.u_content {
  padding: 0.11rem 0.08rem;
  font-family: SimSun;
  font-size: 0.14rem;
  color: #666666;
  white-space: nowrap;
}
.g_bootom {
  width: 100%;
  height: 0.03rem;
  background-color: #ff5a1f;
}
.g_nav {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.g_navListTop {
  width: 100%;
  padding: 0 0.25rem;
  height: 0.4rem;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(102, 102, 102, 0.3);
}
.g_biggest {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  background-color: #fafafa;
}
</style>
<style lang="less" scoped>
.u_group .el-checkbox {
  margin: 0 !important;
  padding-left: 0 !important;
}
.u_group .el-checkbox-group {
  height: 0.3rem;
  line-height: 0.3rem;
}
.u_group .el-checkbox:nth-child(1) {
  width: 0.98rem !important;
}
.u_group .el-checkbox:nth-child(2) {
  width: 1.16rem !important;
}
.u_group .el-checkbox:nth-child(3) {
  width: 1.43rem !important;
}
.u_group .el-checkbox:nth-child(4) {
  width: 1.36rem !important;
}
.u_group .el-checkbox:nth-child(5) {
  width: 0.67rem !important;
}
.el-checkbox__inner::after {
  border: 1px solid #409eff;
}
.el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #ffffff;
  border-color: #409eff;
}
</style>
