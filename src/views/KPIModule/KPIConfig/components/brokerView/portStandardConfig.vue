
<!--扣分项-端口标准-->
<template>
    <div>
        <div class="title">
            <div class="port">端口标准</div>
            <div class="tips">排名：经纪人使用端口发布的房源，月度房源总点击率在全公司的排名</div>
        </div>
        <div class="row-box" style="margin-bottom: 0.18rem">
            <div></div>
            <div>%</div>
            <div style="width: 0.2rem"></div>
            <div></div>
            <div></div>
            <div>分数</div>
        </div>
        <div class="row-box">
            <div>全公司排名前</div>
            <div>
                <el-input v-only-number :maxlength="5" v-model="ranking" :style="{'width': inputWidth}"></el-input>
            </div>
            <div style="width: 0.2rem"></div>
            <div></div>
            <div style="text-align: left">不扣分</div>
            <div></div>
        </div>
        <div class="row-box" v-for="(item,index) in rankingItem" :key="index">
            <div>全公司排名</div>
            <div>
                <el-input v-only-number :maxlength="5" v-model="item.min" :style="{'width': inputWidth}"></el-input>
            </div>
            <div style="width: 0.2rem">至</div>
            <div>
                <el-input v-only-number :maxlength="5" v-model="item.max" :style="{'width': inputWidth}"></el-input>
            </div>
            <div>整个绩效分数扣</div>
            <div>
                <el-input v-only-number :maxlength="3" v-model="item.value" :style="{'width': inputWidth}"></el-input>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                inputWidth:'0.6rem',

                ranking:10, // 前 ranking 名不扣分
                rankingItem:[
                    {
                        min:11,
                        max:20,
                        value:5,
                    },
                    {
                        min:21,
                        max:50,
                        value:10,
                    }
                ],
            }
        }
    }
</script>

<style scoped lang="less">
    .title{
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        margin-bottom: 0.28rem;
        .port{
            font-size: 0.16rem;
            color: #444444;
            margin-right: 0.22rem;
        }
        .tips{
            font-size: 0.12rem;
            color: #999999;
        }
    }

    .row-box{
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 0.14rem;
        color: #666666;
        margin-bottom: 0.07rem;
        text-align: center;
        &>div{
            margin-right: 0.1rem;
            width: 0.6rem;
            &:first-child{
                width: 0.9rem;
                text-align: left;
            }
            &:nth-child(5){
                width: 1.05rem;
            }
        }
        /deep/ .el-input--small .el-input__inner{
            line-height: normal;
            text-align: center;
        }
        /deep/ .el-input{
            /deep/ .el-input__inner{
                font-size: 0.14rem;
                height: 0.34rem;
                border-color: #bdc6cf;
                padding: 0 0.1rem;
                text-align: center;
            }
        }
    }
</style>
