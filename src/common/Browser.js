import { ErpCommon } from '../utils/ErpCommon'

export class Browser {
    // static init() {
    //   const win = window;
    //   const doc = document;

    //   win.addEventListener('resize', change, false);
    //   // function change() {
    //   //   let fontSize = doc.documentElement.clientWidth * 100 / 1920;
    //   //   fontSize = fontSize < 67 ? 67 : fontSize;
    //   //   doc.documentElement.style.fontSize = fontSize + 'px';
    //   // }
    //   function change() {
    //     let basefontSize = 90;
    //     let fontSize = basefontSize * (doc.documentElement.clientWidth / 1920); //1093
    //     // 获取ERP 分辨率调整
    //     let sysScaleParam = new ErpCommon().getSysScaleParam();

    //     fontSize = fontSize * sysScaleParam;

    //     let minFontSize = 91
    //     console.log('fontSizeOLd:', fontSize);

    //     fontSize = (fontSize < minFontSize ? minFontSize : fontSize) + 'px';
    //     console.log('fontSize:', fontSize);
    //     doc.documentElement.style.fontSize = fontSize
    //   }
    //   change();
    // }
    static init() {
        const win = window;
        const doc = document;

        win.addEventListener('resize', change, false);
        // function change() {
        //   let fontSize = doc.documentElement.clientWidth * 100 / 1920;
        //   fontSize = fontSize < 67 ? 67 : fontSize;
        //   doc.documentElement.style.fontSize = fontSize + 'px';
        // }
        function change() {
            let fontSize = doc.documentElement.clientWidth * 100 / 1440;
            // let fontSize = 100;
            doc.documentElement.style.fontSize = (fontSize < 12 ? 12 : fontSize) + 'px';
        }
        change();
    }

}