
<!--表格内容-->
<template>
  <table slot-scope="data">
    <thead>
    <tr class="thead-tr">
      <slot></slot>
    </tr>
    </thead>
    <td style="width: 100%;height: 100%">
      <el-form :show-message="false" :hide-required-asterisk="false" :model="{data:data}" ref="ruleForm">
       <template v-for="(item,dataIndex) in data">
        <tr>
          <template v-for="(info) in nodeInfoList">
            <td :style="{
                width: dealWidth(info.width),
                textAlign: info.align,
                height:info.height,
                fontSize:info.fontSize,
                border:info.border,
                paddingLeft:info.paddingLeft,
                backgroundColor:info.tbodyBackgroundColor,
                color:info.tbodyColor,
              }">
              <span v-if="info.prop == 'label'" style="line-height: 0.34rem">{{ item[info.prop] }}</span>
              <span v-else class="table-input">
                <el-form-item
                  :key="nodeInfoList.key"
                  :prop="'data.' + dataIndex + '.' + [info.prop]"
                  :rules="!noRequiredField.includes(info.prop) ? {required: true, message: '不能为空', trigger: 'blur'} : {required: false, message: '不能为空', trigger: 'blur'}">
                    <!-- 非封顶分使用的输入框 -->
                    <el-input
                      v-if="info.prop == 'fenDinFen'"
                      v-model="item[info.prop]"
                      :disabled="getDisabledStatus(info.prop)"
                      v-only-two-decimal
                      @blur="inputBlurFenDinFen(item)"
                      :maxlength.native="5"
                      :style="{width: info.inputWidth}">
                    </el-input>
                    <!-- 封顶分使用的输入框 -->
                    <el-input
                      v-if="info.prop != 'fenDinFen'"
                      v-model="item[info.prop]"
                      :disabled="getDisabledStatus(info.prop)"
                      v-only-two-decimal
                      @input="inputChange(item)"
                      :maxlength.native="5"
                      :style="{width: info.inputWidth}">
                    </el-input>
                </el-form-item>
              </span>
            </td>
          </template>
        </tr>
      </template>
      </el-form>
    </td>
  </table>
</template>

<script>
import { ErpCommon } from '../../../../../utils/ErpCommon';
  export default {
    props: {
      data: {
        type: Array | null,
        default() {
          return []
        }
      },
      configListItem: {
        type: [Array,Object],
        default() {
          return [];
        }
      },
    },
    data() {
      return {
        nodeInfoList: [],

        // 不验证的所有字段
        noRequiredField : ['fenDinFen','kaoHeNum','fenDinFen'],
      }
    },
    mounted() {
      this.dealNodeInfo();
    },
    methods: {
      // 处理宽度
      dealWidth(width) {
        if (!isNaN(width)) {
          return `${width}px`;
        }

        return width;
      },
      // 处理节点信息
      dealNodeInfo() {
        let nodes = this.$slots.default;
        let nodeInfoList = [];
        for (let info of nodes) {
          nodeInfoList.push(info.elm.__vue__);
        }
        this.nodeInfoList = nodeInfoList;
      },
      // 经纪人配置 - 基础考核项中的基础分不予填写,做特殊处理
      getDisabledStatus(prop){
        if (prop == 'jiChuFen') return true;
        if (this.configListItem.editOrSave==1)return true;
        return false;
      },
      // 限制封顶分输入
      inputBlurFenDinFen(item) {
        // 基础考核项的封顶分数不能小于基础分
        if (item.jiChuFen && (+item.jiChuFen > +item.fenDinFen)) {
          if (item.fenDinFen != '') {
             new ErpCommon().toast('封顶分不能小于基础分');
            item.fenDinFen = item.jiChuFen;
          }
        }

        // 独家委托项的封顶分数不能小于单项分
        if (!item.jiChuFen && (+item.danXianFen * +item.kaoHeNum > +item.fenDinFen)) {
          if (item.fenDinFen != '') {
            new ErpCommon().toast('封顶分不能小于单项分');
            item.fenDinFen = item.danXianFen * item.kaoHeNum;
          }
        }
      },
      // 计算基础分
      inputChange(item) {
        console.log(item.kaoHeNum,'套数',item.danXianFen,'单项分',item.fenDinFen,'封顶分','-----------',JSON.parse(JSON.stringify(item)));
        // 计算 : 基础分 = 套数 * 单项分
        if (!isNaN(item.taoNum) && !isNaN(item.danXianFen)){
          item.jiChuFen = item.taoNum * item.danXianFen;
        }

        if(+item.jiChuFen > +item.fenDinFen && item.jiChuFen != ''){
          item.fenDinFen = item.jiChuFen
        }

        if ((+item.kaoHeNum * +item.danXianFen > +item.fenDinFen) && item.fenDinFen!=''){
          item.fenDinFen = item.kaoHeNum * item.danXianFen;
        }
      },
      resetForm() {
        this.$refs['ruleForm'].resetFields();
      }
    }
  }
</script>

<style lang="less" scoped>
  .thead-tr{
    display: flex;
    line-height: 0.34rem
  }

  .table-input {
    /deep/ .el-input--small .el-input__inner {
      font-size: 0.14rem;
      text-align: center;
      line-height: normal;
      height: 0.34rem;
      padding: 0 0.05rem;
    }

    /deep/ .el-form-item--small.el-form-item{
      margin-bottom: 0;
    }
  }
</style>
