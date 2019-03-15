// 防抖:在一段时间内防止频繁的触发事件函数

// 使用:container.onmousemove = debounce(getUserAction, 1000);

// 版本1
function debounce1(func, wait) {
    var timeout;
    return function() {
        timeout && clearTimeout(timeout);
        timeout = setTimeout(func, wait);
    }
}

// 版本2：解决this的指向问题,让this不指向window，指向getUserAction
function debounce2(func, wait) {
    var timeout;
    return function() {
        var _this = this;
        timeout && clearTimeout(timeout);
        timeout = setTimeout(function() {
            func.apply(_this);
        }, wait);
    }
}

// 版本3：解决获取events对象的问题
function debounce3(func, wait) {
    var timeout;
    return function() {
        var _this = this;
        var args = arguments;
        timeout && clearTimeout(timeout);
        timeout = setTimeout(function() {
            func.apply(_this, args);
        }, wait);
    }
}

// 版本4: 立即执行
function debounce4(func, wait, immediate) {
    var timeout;
    return function() {
        var _this = this;
        var args = arguments;
        timeout && clearTimeout(timeout);
        if (immediate) {
            // 如果已经执行过 不再执行
            var callnow = !timeout;
            timeout = setTimeout(function() {
                timeout = null;
            }, wait);
            callnow && func.apply(_this, args);
        } else {
            timeout = setTimeout(function(){
                func.apply(_this, args);
            }, wait);
        }
    }
}

// 版本5: 返回值
function debounce5(func, wait, immediate) {
    var timeout, result;
    return function() {
        var _this = this;
        var args = arguments;
        timeout && clearTimeout(timeout);
        if (immediate) {
            // 如果已经执行过 不再执行
            var callnow = !timeout;
            timeout = setTimeout(function() {
                timeout = null;
            }, wait);
            if (callnow) result = func.apply(_this, args);
        } else {
            timeout = setTimeout(function(){
                result = func.apply(_this, args);
            }, wait);
        }
        return result;
    }
}

// 版本6： 取消
function debounce6(func, wait, immediate) {
    var timeout, result;
    var debounced = function() {
        var _this = this;
        var args = arguments;
        timeout && clearTimeout(timeout);
        if (immediate) {
            // 如果已经执行过 不再执行
            var callnow = !timeout;
            timeout = setTimeout(function() {
                timeout = null;
            }, wait);
            if (callnow) result = func.apply(_this, args);
        } else {
            timeout = setTimeout(function(){
                result = func.apply(_this, args);
            }, wait);
        }
        return result;
    }
    debounced.cancel = function() {
        clearTimeout(timeout);
        timeout = null;
    }
}






