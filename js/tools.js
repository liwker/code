/* 过渡动画效果
    参数：
        obj 执行动画的元素
        sty 改变的样式
        target 边界值
        speed 速度
        fun 回调函数
*/
function move(obj, sty, target, speed, callback) {
    // 关闭上一个定时器
    clearInterval(obj.timer);

    // 获取当前样式值
    let current = parseInt(getStyle(obj, sty));

    // 判断方向
    if (current > target) {
        current = -current;
    }

    // 开启一个定时器，开始动画
    obj.timer = setInterval(function () {
        // 获取旧值
        let oldS = parseInt(getStyle(obj, sty));
        // 在旧值上加上speed 成为新值
        let newS = oldS + speed;

        // 判断是否到达或已经到达边界，将边界值给 新值
        if ((speed < 0 && newS <= target) || (speed > 0 && newS >= target)) {
            newS = target;
        }

        // 改变样式
        obj.style[sty] = newS + "px";

        // 当到达边界，就结束
        if (newS == target) {
            clearInterval(obj.timer);
            // 结束后，有回调函数就执行，没有就不执行
            callback && callback();
        }
    }, 5);
}



/* 获取指定元素的当前的样式值
 *  参数：
 * 		obj 要获取样式的元素
 * 		name 要获取的样式名
 */
function getStyle(obj, name) {

    if (window.getComputedStyle) {
        //正常浏览器的方式，具有getComputedStyle()方法
        return getComputedStyle(obj, null)[name];
    } else {
        //IE8的方式，没有getComputedStyle()方法
        return obj.currentStyle[name];
    }

}


/* 类操作
 *  参数:
 * 	    obj 要添加class属性的元素
 *      cn 要添加的class值
*/
// 判断该元素是否有 该类
function hasClass(obj, cn) {
    let reg = new RegExp("\\b" + cn + "\\b");
    return reg.test(obj.className);
}

// 为该元素 添加该类
function addClass(obj, cn) {
    if (!hasClass(obj, cn)) {
        obj.className += " " + cn;
    }
}

// 删除该元素的 该类
function removeClass(obj, cn) {
    let reg = new RegExp("\\b" + cn + "\\b");
    obj.className = obj.className.replace(reg, "");
}

// 切换元素的 该类，有则删除，没有则添加
function toggleClass(obj, cn) {
    if (hasClass(obj, cn)) {
        removeClass(obj, cn);
    } else {
        addClass(obj, cn);
    }
}