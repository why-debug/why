<template>
  <div class="ratio-input">
    <div class="title" :style="{padding:padding}">
      <div v-for="(val,key) in titleText" :key="key">
        <div>{{val.text}}</div>
      </div>
    </div>

    <el-form :show-message="false" :hide-required-asterisk="false" :model="dynamicValidateForm" ref="dynamicValidateForm">
      <div class="div-from" v-for="(domain, index) in dynamicValidateForm.data">
        <div style="margin-right: 0.1rem">
          <el-form-item
            :key="domain.key"
            :prop="'data.' + index + '.min'"
            :rules="{required: true, message: '最小值不能为空', trigger: 'blur'}">
            <el-input
              v-model="domain.min"
              :readonly="true"
              :maxlength="3"
              :disabled="configListItem.editOrSave==1"
              @input="minInputChange(domain,index)"
              :style="{'width': inputWidth}">
            </el-input>
          </el-form-item>
        </div>
        <div class="line"></div>
        <div style="margin:0 0.1rem">
          <el-form-item
            :key="domain.key"
            :prop="'data.' + index + '.max'"
            :rules="{required: true, message: '最大值不能为空', trigger: 'blur'}">
            <el-input
              v-model="domain.max"
              :maxlength="3"
              :disabled="configListItem.editOrSave==1"
              @input="maxInputChange(domain,index)"
              @blur="maxInputBlur(domain,index)"
              :style="{'width': inputWidth}">
            </el-input>
          </el-form-item>
        </div>
        <div style="margin-right: 0.1rem">
          <el-form-item
            :key="domain.key"
            :prop="'data.' + index + '.value'"
            :rules="{required: true, message: '得分不能为空', trigger: 'blur'}">
            <el-input
              v-model="domain.value"
              @input="valueInputChange(domain,index)"
              :maxlength="3"
              :disabled="configListItem.editOrSave==1"
              :style="{'width': inputWidth}">
            </el-input>
          </el-form-item>
        </div>
        <span v-if="configListItem.editOrSave==2">
        <img src="../../../../../assets/images/public/add_200.png" @click.stop="add(domain,index)" alt=""
             v-if="index===0">
        <img src="../../../../../assets/images/public/del_200.png" @click.stop="del(domain,index)" alt="" v-else>
      </span>
        <span v-else class="no-img"></span>
      </div>
    </el-form>
  </div>
</template>

<script>
  import {ErpCommon} from "../../../../../utils/ErpCommon";

  export default {
    props: {
      configListItem: {
        type: [Array, Object],
        default() {
          return {};
        }
      },
      padding: {
        type: String,
        default() {
          return '0 0.65rem 0 1.11rem';
        }
      },
      titleText: {
        type: Array,
        default() {
          return [
            {
              text: '比例区间',
            },
            {
              text: '得分',
            }
          ];
        }
      },
      dataList: {
        type: Array,
        default() {
          return [];
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
        inputWidth: '1.2rem',
        dynamicValidateForm: {
          data: [{
            min: 0,
            max: '',
            value: ''
          }],
        }
      };
    },

    methods: {
      init() {
        this.dynamicValidateForm.data = JSON.parse(JSON.stringify(this.dataList));
      },
      add(item, index) {
        this.$refs.dynamicValidateForm.validate(valid => {
          if (!valid) return;

          let listItem = this.dynamicValidateForm.data[this.dynamicValidateForm.data.length - 1];
          if (listItem.max == '以上') return;

          if (listItem.min === '' || listItem.max === '' || listItem.value === '') {
            new ErpCommon().toast('请先输入未填项');
            return;
          }

          for (let info of this.dynamicValidateForm.data) {
            if (info.min > info.max) {
              new ErpCommon().toast('配置项输入错误,请正确输入');
              return;
            }
          }

          if (listItem.max >= 98) {
            this.dynamicValidateForm.data.push({
              min: +listItem.max + 1,
              max: '以上',
              value: '',
            });

            return;
          }

          this.dynamicValidateForm.data.push({
            min: +listItem.max + 1,
            max: '',
            value: '',
          });
        });
      },
      del(item, index) {
        if (!index) return;

        this.dynamicValidateForm.data.splice(index, 1);
      },
      minInputChange(item, index) {
        item.min = item.min.replace(/[^0-9]/g, '');
      },
      maxInputChange(item, index) {
        item.max = item.max.replace(/[^0-9]/g, '');

        this.dynamicValidateForm.data.splice(index + 1, this.dynamicValidateForm.data.length);  // 修改上面的数据以下的全部删除
      },
      maxInputBlur(item, index) {
        if (item.min > item.max) {
          item.max = +item.min + 1;
        }

        if (item.max >= 100) {
          item.max = '以上';
        }
      },
      valueInputChange(item, index) {
        item.value = item.value.replace(/[^0-9]/g, '');
      },
      // 所有的子组件中都需要包含两个方法 validate(验证)、getData(获取数据) 供父组件调用。
      getData() {
        let newData = [];
        for (let [index, info] of this.dynamicValidateForm.data.entries()){
          let item = {};

          if (index == 0){
            item.left = '';
          }else {
            item.left = info.min || '';
          }

          if (info.max == '以上'){
            item.right = '';
          }else {
            item.right = info.max || '';
          }

          item.score = info.value || '';
          newData.push(item);
        }
        return newData;
      },
      validate() {
        return this.$refs['dynamicValidateForm'].validate();
      },
    }
  }
</script>

<style scoped lang="less">
  @import '../../../../../style/el-input-reset';

  .ratio-input {
    @ratioInputWidth: 4.35rem;

    width: @ratioInputWidth;
    box-sizing: border-box;

    .title {
      font-size: 0.14rem;
      line-height: 0.5rem;
      letter-spacing: 0.01rem;
      color: #999999;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    .div-from {
      width: 100%;
      margin-bottom: 0.06rem;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .line {
        width: 0.25rem;
        height: 0.02rem;
        border-bottom: 0.01rem #dddddd solid;
      }

      & > span {
        & > img {
          width: 0.15rem;
          height: 0.15rem;
          cursor: pointer;
        }
      }

      .no-img {
        width: 0.15rem;
        height: 0.15rem;
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
  }
</style>
