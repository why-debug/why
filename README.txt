
css兼容erp常见问题:
    el-input输入框光标对齐需要写上样式:line-height: normal;
    erp里面span兼容性存在问题,尽量不要使用span;
    flex布局的样式写成行内样式转换存在问题,不要写;
    宽高正确计算方式: width: calc(~"100% - 2.16rem");错误: width:calc(100% - 2.16rem);
    flex-wrap: wrap; erp不兼容,需要写上: display: inline-block;
