"use strict";

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
    }
};
exports["default"] = Utils;
module.exports = exports["default"];