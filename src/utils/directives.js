import Vue from 'vue';

const trigger = (el, type) => {
  const e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
};

// input验证只能输入数字
Vue.directive('numberTwo', {
  bind(el) {
    const input = el.getElementsByTagName('input')[0];

    function del() {
      let value = input.value;
      //先把非数字的都替换掉，除了数字和.
      value = value.replace(/[^\d.]/g, "");
      //保证只有出现一个.而没有多个.
      value = value.replace(/\.{2,}/g, ".");
      //必须保证第一个为数字而不是.
      value = value.replace(/^\./g, "");
      //保证.只出现一次，而不能出现两次以上
      value = value
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", ".");
      //只能输入两个小数
      value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3");
      input.value = value;
    }

    input.onkeyup = function (e) {
      del();
      trigger(input, 'input')
    };
    input.onblur = function (e) {
      del();
      trigger(input, 'input')
    }
  }
});

// 只能输入数字
Vue.directive('onlyNumber', {
  bind(el) {
    const input = el.getElementsByTagName('input')[0];

    function del() {
      let value = input.value;
      value = value.replace(/\D/g, '');
      input.value = value;
    }

    input.onkeyup = function (e) {
      del();
      trigger(input, 'input')
    };
    input.onblur = function (e) {
      del();
      trigger(input, 'input')
    }
  }
});

// 大于0小于1的一位小数
Vue.directive('numberOne', {
  bind(el) {
    const input = el.getElementsByTagName('input')[0];

    function del() {
      let value = input.value;
      //先把非数字的都替换掉，除了数字和.
      value = value.replace(/[^\d.]/g, "");
      //保证只有出现一个.而没有多个.
      value = value.replace(/\.{2,}/g, ".");
      //必须保证第一个为数字而不是.
      value = value.replace(/^\./g, "");
      //保证.只出现一次，而不能出现两次以上
      value = value
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", ".");
      //只能输入两个小数
      value = value.replace(/^(\-)*(\d+)\.(\d).*$/, "$1$2.$3");
      if (value >= 1) value = 1;
      input.value = value;
    }

    input.onkeyup = function (e) {
      del();
      trigger(input, 'input')
    };
    input.onblur = function (e) {
      del();
      trigger(input, 'input')
    }
  }
});

// 验证输入数字且保留2位小数
Vue.directive('onlyTwoDecimal',{
  bind (el) {
    const input = el.getElementsByTagName('input')[0];
    function del() {
      let value = input.value;
      //先把非数字的都替换掉，除了数字和.
      value = value.replace(/[^\d.]/g, "");
      //保证只有出现一个.而没有多个.
      value = value.replace(/\.{2,}/g, ".");
      //必须保证第一个为数字而不是.
      value = value.replace(/^\./g, "");
      //保证.只出现一次，而不能出现两次以上
      value = value
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", ".");
      //只能输入两个小数
      value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3");
      input.value = value;
    }
    input.onkeyup = function (e) {
      del();
      trigger(input, 'input')
    };
    input.onblur = function (e) {
      del();
      trigger(input, 'input')
    }
  }
});
