<template>
  <div>
    <el-form :model="fromData" :rules="rules" :show-message="false" :hide-required-asterisk="false" ref="ruleForm">
      <div class="kpi-name">
        <div>按照</div>
        <div>
          <el-form-item prop="useOrgConfigId">
            <el-select v-model="fromData.useOrgConfigId" placeholder="请选择" :disabled="configListItem.editOrSave==1" style="width: 1.5rem;">
              <el-option
                v-for="item in list"
                :key="item.type"
                :label="item.name"
                :value="item.type">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div>考核标准计算分行KPI分数</div>
      </div>
      <!--<div class="per-score">
        <div>分行平均KPI超过</div>
        <div>
          <el-form-item prop="baseScore">
            <el-input
              v-only-number
              :maxlength="3"
              :disabled="configListItem.editOrSave==1"
              v-model="fromData.baseScore"
              :style="{'width': inputWidth}">
            </el-input>
          </el-form-item>
        </div>
        <div>分，每分加</div>
        <div>
          <el-form-item prop="unitAddScore">
            <el-input
              v-only-number
              :maxlength="3"
              :disabled="configListItem.editOrSave==1"
              v-model="fromData.unitAddScore"
              :style="{'width': inputWidth}">
            </el-input>
          </el-form-item>
        </div>
        <div>分，最高可得</div>
        <div>
          <el-form-item prop="highestScore">
            <el-input
              v-only-number
              :maxlength="3"
              :disabled="configListItem.editOrSave==1"
              v-model="fromData.highestScore"
              :style="{'width': inputWidth}">
            </el-input>
          </el-form-item>
        </div>
        <div>分</div>
      </div>-->
    </el-form>
  </div>
</template>

<script>
  export default {
    props: {
      averageScore: {
        type: [Array,Object],
        default() {
          return []
        }
      },
      configListItem: {
        type: [Array, Object],
        default() {
          return {};
        }
      },
    },

    watch: {
      averageScore: {
        handler: function () {
          this.init();
        },
        deep: true
      }
    },

    data() {
      return {
        inputWidth: '0.9rem',
        rules: {
          useOrgConfigId: [{required: true, message: '', trigger: 'change'}],
          /*highestScore: [{required: true, message: '', trigger: 'blur'}],
          unitAddScore: [{required: true, message: '', trigger: 'blur'}],
          baseScore: [{required: true, message: '', trigger: 'blur'}],*/
        },
        fromData:{},

        normalValue: '',
        list: [
          {
            name: '经纪人考核-区主',
            type: 1,
          },
          {
            name: '经纪人考核-分行经理',
            type: 2,
          },
          {
            name: '经纪人考核-经纪人',
            type: 3,
          }
        ],
      }
    },

    methods: {
      init() {
        this.fromData = JSON.parse(JSON.stringify(this.averageScore)); // 必须转一次 否则 fromData与baseData指向同一指针
      },
      // 所有的子组件中都需要包含两个方法 validate(验证)、getData(获取数据)丶resetForm(重置表单) 供父组件调用。
      getData() {
        return this.fromData;
      },
      validate() {
        return this.$refs['ruleForm'].validate();
      },
      resetForm() {
        this.$refs['ruleForm'].resetFields();
      }
    }
  }
</script>

<style scoped lang="less">
  .kpi-name {
    font-size: 0.14rem;
    color: #444444;
    margin-bottom: 0.1rem;
    display: flex;
    flex-direction: row;
    align-items: center;

    & > div {
      margin-right: 0.1rem;
    }

    :last-child {
      margin-right: 0;
    }

    /deep/ .el-input--small .el-input__inner {
      line-height: normal;
      text-align: center;
    }

    /deep/ .el-input {
      /deep/ .el-input__inner {
        font-size: 0.14rem;
        height: 0.34rem;
        padding: 0 0.3rem 0 0.1rem;
        text-align: center;
      }
    }

    /deep/ .el-form-item--small.el-form-item{
      margin-bottom: 0;
    }
  }

  .per-score {
    font-size: 0.14rem;
    color: #444444;
    margin-bottom: 0.1rem;
    display: flex;
    flex-direction: row;
    align-items: center;

    & > div {
      margin-right: 0.1rem;
    }

    :last-child {
      margin-right: 0;
    }

    /deep/ .el-input--small .el-input__inner {
      line-height: normal;
      text-align: center;
    }

    /deep/ .el-input {
      /deep/ .el-input__inner {
        font-size: 0.14rem;
        height: 0.34rem;
        padding: 0 0.1rem;
        text-align: center;
      }
    }

    /deep/ .el-form-item--small.el-form-item {
      margin-bottom: 0;
    }

  }
</style>
