const Utils = {
    /**
     * check type
     * @param obj
     * @param type
     * @returns {boolean}
     */
    checkType(obj, type) {
        return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase() === type
    },
    /**
     * detach env prefix
     * @returns {boolean}
     */
    isMobile(){
        let isM = false
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            isM = true
        }
        return isM
    },
    daysInMonth(month, year) {
        return new Date(year, month, 0).getDate()
    }
}
export default Utils