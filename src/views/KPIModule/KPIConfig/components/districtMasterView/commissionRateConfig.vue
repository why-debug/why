<template>
  <div>
    <el-form :show-message="false" :hide-required-asterisk="false" :model="dynamicValidateForm" ref="dynamicValidateForm">
      <div class="commission-box" v-for="(dataItem,dataIndex) in dynamicValidateForm.data" :key="dataIndex">
        <div>
          <el-select v-model="dataItem.firstTime" @change="selectChange" :disabled="configListItem.editOrSave==1" placeholder="请选择" style="width: 0.9rem;">
            <el-option
                v-for="item in timeSelect"
                :key="item.value"
                :label="item.label"
                :disabled="item.disabled"
                :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>收佣率在</div>
        <div>
          <el-form-item
            :key="dataItem.key"
            :prop="'data.' + dataIndex + '.firstValue'"
            :rules="{required: true, message: '最小值不能为空', trigger: 'blur'}">
            <el-input
              v-model="dataItem.firstValue"
              v-only-number
              :disabled="configListItem.editOrSave==1"
              @input="inputChange(dataItem,'firstValue')"
              :style="{'width': inputWidth}">
            </el-input>
          </el-form-item>
        </div>
        <div>及以上，且</div>
        <div>
          <el-select v-model="dataItem.secondTime" placeholder="请选择" :disabled="configListItem.editOrSave==1" style="width: 0.9rem;">
            <el-option
                v-for="item in timeSelect"
                :key="item.value"
                :label="item.label"
                :disabled="item.disabled"
                :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>收佣率在</div>
        <div>
          <el-form-item
            :key="dataItem.key"
            :prop="'data.' + dataIndex + '.secondValue'"
            :rules="{required: true, message: '最小值不能为空', trigger: 'blur'}">
            <el-input
              v-model="dataItem.secondValue"
              v-only-number
              @input="inputChange(dataItem,'secondValue')"
              :disabled="configListItem.editOrSave==1"
              :style="{'width': inputWidth}">
            </el-input>
          </el-form-item>
        </div>
        <div>及以上，得</div>
        <div>
          <el-form-item
            :key="dataItem.key"
            :prop="'data.' + dataIndex + '.value'"
            :rules="{required: true, message: '最小值不能为空', trigger: 'blur'}">
            <el-input
              v-only-number
              :disabled="configListItem.editOrSave==1"
              :maxlength="3"
              v-model="dataItem.value"
              :style="{'width': inputWidth}">
            </el-input>
          </el-form-item>
        </div>
        <div>
          <div v-if="configListItem.editOrSave==2">
            <img src="../../../../../assets/images/public/add_200.png" @click.stop="add(dataItem,dataIndex)" alt="" v-if="dataIndex===0">
            <img src="../../../../../assets/images/public/del_200.png" @click.stop="del(dataItem,dataIndex)" alt="" v-else>
          </div>
          <div v-else style="width: 0.15rem;height: 0.15rem"></div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
  import {ErpCommon} from "../../../../../utils/ErpCommon";

  export default {
    props: {
      dataList: {
        type: Array,
        default() {
          return []
        }
      },
      configListItem: {
        type: [Array,Object],
        default() {
          return {};
        }
      },
    },

    watch: {
      dataList: {
        handler: function () {
          this.init();
        },
        deep: true
      }
    },

    data() {
      return {
        inputWidth: '0.9rem',
        timeSelect: [
          {
            label: '去年',
            value: 1,
            disabled: false,
          },
          {
            label: '前年',
            value: 2,
            disabled: false,
          },
          {
            label: '前两年',
            value: 3,
            disabled: false,
          }
        ],
        dynamicValidateForm:{
          data:[{
            firstTime: 1,
            firstValue: '',
            secondTime: 2,
            secondValue: '',
            value: '',
          }],
        },
      }
    },

    methods: {
      init() {
        this.dynamicValidateForm.data = JSON.parse(JSON.stringify(this.dataList));
      },
      add(item, index) {
        let listItem = this.dataList[this.dataList.length - 1];
        if (listItem.firstValue === '' || listItem.secondValue === '' || listItem.value === '') {
          new ErpCommon().toast('请先输入未填项');
          return;
        }

        this.dataList.push({
          firstTime: 1,
          firstValue: '',
          secondTime: 1,
          secondValue: '',
          value: '',
        });
      },
      del(item, index) {
        if (!index) return;

        this.dataList.splice(index, 1);
      },
      inputChange(item, key) {
        if (item[key] >= 100) {
          item[key] = 100;
        }

        if (item[key] <= 1) {
          item[key] = 1;
        }
      },
      selectChange() {
        console.log('AA')
      },
      // 所有的子组件中都需要包含两个方法 validate(验证)、getData(获取数据) 供父组件调用。
      getData() {
        return this.dynamicValidateForm.data;
      },
      validate() {
        return this.$refs['dynamicValidateForm'].validate();
      },
    },
  }
</script>

<style scoped lang="less">
  .commission-box {
    font-size: 0.14rem;
    color: #444444;
    margin-bottom: 0.1rem;
    display: flex;
    flex-direction: row;
    align-items: center;

    & > div {
      margin-right: 0.1rem;

      & > div {
        & > img {
          width: 0.15rem;
          height: 0.15rem;
        }
      }
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
