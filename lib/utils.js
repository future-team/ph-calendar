'use strict';

exports.__esModule = true;
var Utils = {
    /**
     * check type
     * @param obj
     * @param type
     * @returns {boolean}
     */
    checkType: function checkType(obj, type) {
        return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase() === type;
    },
    /**
     * detach env prefix
     * @returns {boolean}
     */
    isMobile: function isMobile() {
        var isM = false;
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            isM = true;
        }
        return isM;
    },
    daysInMonth: function daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    },
    /**
     * 对Date的扩展，将 Date 转化为指定格式的String
     * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符
     * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
     * eg:
     * (new Date()).pattern('yyyy-MM-dd hh:mm:ss.S') ==> 2007-07-02 08:09:04.423
     * (new Date()).pattern('yyyy-MM-dd E HH:mm:ss') ==> 2007-03-10 二 20:09:04
     * (new Date()).pattern('yyyy-MM-dd EE hh:mm:ss') ==> 2007-03-10 周二 08:09:04
     * (new Date()).pattern('yyyy-MM-dd EEE hh:mm:ss') ==> 2007-03-10 星期二 08:09:04
     * (new Date()).pattern('yyyy-M-d h:m:s.S') ==> 2007-7-2 8:9:4.18
     */
    dateFormat: function dateFormat(date, fmt) {
        if (!this.checkType(date, 'date')) return '';
        var o = {
            'M+': date.getMonth() + 1,
            //月份
            'd+': date.getDate(),
            //日
            'h+': date.getHours() % 12 == 0 ? 12 : date.getHours() % 12,
            //小时
            'H+': date.getHours(),
            //小时
            'm+': date.getMinutes(),
            //分
            's+': date.getSeconds(),
            //秒
            'q+': Math.floor((date.getMonth() + 3) / 3),
            //季度
            'S': date.getMilliseconds() //毫秒
        };
        var week = {
            '0': '日',
            '1': '一',
            '2': '二',
            '3': '三',
            '4': '四',
            '5': '五',
            '6': '六'
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        if (/(E+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length > 1 ? RegExp.$1.length > 2 ? '星期' : '周' : '') + week[date.getDay() + '']);
        }
        for (var k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
            }
        }
        return fmt;
    }
};
exports['default'] = Utils;
module.exports = exports['default'];