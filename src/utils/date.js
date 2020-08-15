export default function datePeriod() {
    /**
     * 获取本周、本季度、本月、上月的开端日期、停止日期
     */
    var now = new Date(); //当前日期
    var nowDayOfWeek = now.getDay(); //今天本周的第几天
    var nowDay = now.getDate(); //当前日
    var nowMonth = now.getMonth(); //当前月
    var nowYear = now.getYear(); //当前年
    nowYear += (nowYear < 2000) ? 1900 : 0; //

    var nextMonthDate = new Date(); //下月日期
    nextMonthDate.setDate(1);
    nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
    var nextYear = nextMonthDate.getYear();
    var nextMonth = nextMonthDate.getMonth();

    //格局化日期：yyyy-MM-dd
    function formatDate(date) {
        var myyear = date.getFullYear();
        var mymonth = date.getMonth() + 1;
        var myweekday = date.getDate();

        if (mymonth < 10) {
            mymonth = "0" + mymonth;
        }
        if (myweekday < 10) {
            myweekday = "0" + myweekday;
        }
        return (myyear + "-" + mymonth + "-" + myweekday);
    }

    //获得某月的天数
    function getMonthDays(myMonth) {
        var monthStartDate = new Date(nowYear, myMonth, 1);
        var monthEndDate = new Date(nowYear, myMonth + 1, 1);
        var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
        return days;
    }

    //获得本季度的开端月份
    function getQuarterStartMonth() {
        var quarterStartMonth = 0;
        if (nowMonth < 3) {
            quarterStartMonth = 0;
        }
        if (2 < nowMonth && nowMonth < 6) {
            quarterStartMonth = 3;
        }
        if (5 < nowMonth && nowMonth < 9) {
            quarterStartMonth = 6;
        }
        if (nowMonth > 8) {
            quarterStartMonth = 9;
        }
        return quarterStartMonth;
    }

    //获得本周的开端日期
    function getNowDate() {
        var nowDate = new Date(nowYear, nowMonth, nowDay);
        return formatDate(nowDate);
    }
    //获得本周的开端日期
    function getWeekStartDate() {
        var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
        return formatDate(weekStartDate);
    }

    //获得本周的停止日期
    function getWeekEndDate() {
        var weekEndDate = new Date(nowYear, nowMonth, nowDay + (7 - nowDayOfWeek));
        return formatDate(weekEndDate);
    }

    //获得下周的停止日期
    function getNextWeekEndDate() {
        var nextWeekEndDate = new Date(nowYear, nowMonth, nowDay + (14 - nowDayOfWeek));
        return formatDate(nextWeekEndDate);
    }

    //获得本月的开端日期
    function getMonthStartDate() {
        var monthStartDate = new Date(nowYear, nowMonth, 1);
        return formatDate(monthStartDate);
    }

    //获得本月的停止日期
    function getMonthEndDate() {
        var monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth));
        return formatDate(monthEndDate);
    }

    //获得下月月开端时候
    function getnextMonthStartDate() {
        var nextMonthStartDate = new Date(nowYear, nextMonth, 1);
        return formatDate(nextMonthStartDate);
    }

    //获得下月停止时候
    function getnextMonthEndDate() {
        var nextMonthEndDate = new Date(nowYear, nextMonth, getMonthDays(nextMonth));
        return formatDate(nextMonthEndDate);
    }

    //各个时间段的值
    let timePeriod = { nowDate:getNowDate(), nowWeek: [getWeekStartDate(), getWeekEndDate()], nextWeek: [getWeekEndDate(), getNextWeekEndDate()], nowMonth: [getMonthStartDate(), getMonthEndDate()], nextMonth: [getnextMonthStartDate(), getnextMonthEndDate()] }

    return timePeriod;

}