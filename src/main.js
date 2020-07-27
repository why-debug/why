import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import 'element-ui/lib/theme-chalk/index.css';
import "./style/reset.css";
import "./utils/directives.js";
import { Button, Row, InfiniteScroll, Upload, Select, Input, Option, Form, FormItem,
  DatePicker, Image, Message, Dialog , Popover, Table, TableColumn, Loading,
  Col, Pagination, MessageBox, Checkbox, Tabs, TabPane, CheckboxButton,
  CheckboxGroup, Backtop, Switch, Tag, Notification, Radio, RadioGroup, Autocomplete}
from 'element-ui';
import {Browser} from "./common/Browser";
import {UserPermission} from "./utils/UserPermission";
import {ErpCommon} from "./utils/ErpCommon";
import erpConfirm from './components/erpCommon/confirm/confirm.js'

class Main {
  static initElement() {
    Vue.prototype.$ELEMENT = { size: 'small', zIndex: 100 };
    Vue.use(Button);
    Vue.use(Row);
    Vue.use(Col);
    Vue.use(InfiniteScroll);
    Vue.use(Upload);
    Vue.use(Select);
    Vue.use(Input);
    Vue.use(Option);
    Vue.use(Form);
    Vue.use(FormItem);
    Vue.use(Checkbox);
    Vue.use(CheckboxGroup);
    Vue.use(CheckboxButton);
    Vue.use(DatePicker);
    Vue.use(Image);
    Vue.use(Dialog);
    Vue.use(Popover);
    Vue.use(Table);
    Vue.use(TableColumn);
    Vue.use(Loading);
    Vue.use(Pagination);
    Vue.use(Loading.directive);
    Vue.use(Tabs);
    Vue.use(TabPane);
    Vue.use(Backtop);
    Vue.use(Switch);
    Vue.use(Tag);
    Vue.use(Radio);
    Vue.use(RadioGroup);
    Vue.use(Autocomplete);

    Vue.config.productionTip = false;
    Vue.prototype.$message = Message;
    Vue.prototype.$loading = Loading.service;
    Vue.prototype.$msgbox = MessageBox;
    Vue.prototype.$alert = MessageBox.alert;
    Vue.prototype.$erpCommon = new ErpCommon();
    Vue.prototype.$confirm = MessageBox.confirm;
    Vue.prototype.$prompt = MessageBox.prompt;
    Vue.prototype.$notify = Notification;
    Vue.prototype.$message = Message;
    Vue.prototype.$erpConfirm = erpConfirm;
  }

  static init() {
    Vue.prototype.$UserPermission = new UserPermission();
  }

  static main() {
    this.initElement();
    this.init();
    Browser.init();

    return new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
}

export default Main.main();
