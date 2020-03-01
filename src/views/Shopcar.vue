<template>
    <div class="shopcar" v-show="shopcar">
        挡板
    </div>
</template>

<script>
    export default {
    
    }
</script>

<style lang="less" scoped>
    .shopcar{
        width: 100%;
        height: 300px;
        background: #ccc;
        position: fixed;
        bottom: 60px
    }
</style>