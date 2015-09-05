//mammothcodeCoreJsLib
//version 0.2.4

//======= namespacep START=======//
var Mc = {}; //曼码JsLib
Mc.App = {}; //移动端类
Mc.App.Pop = {}; //弹出层(移动端)
Mc.Pc = {}; //Pc端类
Mc.Pc.Calendar = {} //日历类
Mc.Pc.Pop = {}; //弹出层(PC端)
Mc.Util = {}; //工具类(公共类)
Mc.Util.Check = {}; //表单验证类
Mc.Util.Date = {}; //日期时间类
Mc.Util.String = {}; //字符串类
Mc.Util.Uri = {}; //uri类
//======= namespace END =======//

/**
 * [Tip - 提示框:弹出一个操作提示,在tip_live时间(单位毫秒)内存在,然后消失,无回调函数]
 * Auther Zero
 * Update 2015.8.4
 * Version 1.4.0
 * [txtContent - 提示文本内容 | 默认 ""] 
 * [fadeSpeed - 淡入淡出时间(毫秒) | 默认 200] 
 * [tipLive - 提示层生存时间(毫秒) | 默认 2000] 
 * @param {} options
 * @returns {} 
 */
Mc.App.Pop.Tip = function (options) {
    var settings = $.extend({
        txtContent: "", //提示文本内容 | 默认 ""
        fadeSpeed: 200, //淡入淡出时间(毫秒) | 默认 200
        tipLive: 2000 //提示层生存时间(毫秒) | 默认 2000
    }, options);
    //把当前时间(从1970.1.1开始的毫秒数)给弹出层作为ID标识
    var popId = new Date().getTime();
    var popHtml = function typeTipHtmlCreate() {
        var html = "";
        html += "<div id='tip" + popId + "' class='dialog-position-wrap' style='display:none;'>";
        html += "<div class='tip-wrap'>";
        html += "<div class='tip-content'>";
        html += settings.txtContent;
        html += "</div>";
        return html;
    };
    $("body").append(popHtml);
    var $popObj = $("#tip" + popId);
    //操作提示显示
    $popObj.fadeIn(settings.fadeSpeed, function () {
        //操作提示延时自动消失
        setTimeout(function () {
            $popObj.fadeOut(settings.fadeSpeed, function () {
                $popObj.remove();
            });
        }, settings.tipLive);
    });
}

/**
 * [Dialog 对话框]
 * Author: Zero
 * Update: 2015.8.13
 * Version: 0.7
 * [wrapClass - Pop 层外部包裹class | 默认 ""] 
 * [popHtml - Pop html | 默认""] 
 * [iniCallback - Pop初始化回调函数 | 默认""] 
 * [leftBtn - 是否有左侧按钮 | 默认 true] 
 * [leftBtnClass - 左侧按钮class | 默认 ""] 
 * [leftBtnContent - 左侧按钮文字 | 默认 确定] 
 * [leftBtnCallback - 左侧按钮回调函数 | 默认 null] 
 * [rightBtn - 是否有右侧按钮 | 默认 true] 
 * [rightBtnClass - 右侧按钮class | 默认 ""] 
 * [rightBtnContent - 右侧按钮文字 | 默认 取消] 
 * [rightBtnCallback - 右侧按钮回调函数 | 默认 null] 
 * [hasBg - 是否有bg | 默认 true] 
 * [bgClose - 点击bg关闭弹出层 | 默认false] 
 * [bgCloseCallback - bg点击关闭回调函数 | 默认 null] 
 * [otherClose - 其他关闭jQ选择器 | 默认""] 
 * [otherCloseCallback - 其他关闭回调函数 | 默认null] 
 * [fadeOutCallback - Pop消失回调函数 | 默认null] 
 * [fadeSpeed - 淡入淡出时间(毫秒) | 默认 200] 
 * @param {} options
 * @returns {} 
 */
Mc.Pc.Pop.Dialog = function (options) {
    var settings = $.extend({
        wrapClass: "", //Pop 层外部包裹class | 默认 ""
        popHtml: "", //Pop html | 默认""
        iniCallback: null, //Pop初始化回调函数 | 默认""
        leftBtn: true, //是否有左侧按钮 | 默认 true
        leftBtnClass: "", //左侧按钮class | 默认 ""
        leftBtnContent: "确认", //左侧按钮文字 | 默认 确定
        leftBtnCallback: null, //左侧按钮回调函数 | 默认 null
        rightBtn: true, //是否有右侧按钮 | 默认 true
        rightBtnClass: "", //右侧按钮class | 默认 ""
        rightBtnContent: "取消", //右侧按钮文字 | 默认 取消
        rightBtnCallback: null, //右侧按钮回调函数 | 默认 null
        hasBg: true, //是否有bg | 默认 true
        bgClose: false, //点击bg关闭弹出层 | 默认false
        bgCloseCallback: null, //bg点击关闭回调函数 | 默认 null
        otherClose: "", //其他关闭jQ选择器 | 默认""
        otherCloseCallback: null, //其他关闭回调函数 | 默认null
        fadeOutCallback: null, //Pop消失回调函数 | 默认null
        fadeSpeed: 200 //淡入淡出时间(毫秒) | 默认 200
    }, options);
    //把当前时间(从1970.1.1开始的毫秒数)给弹出层作为ID标识
    var popId = new Date().getTime();
    //弹出层html构造
    var popHtml = function typeTipHtmlCreate() {
        var html = "";
        html += "<div id='Dialog" + popId + "' class='pop-position-wrap' style='display:none;'>";
        html += "<div class='pop-wrap " + settings.wrapClass + "'>";
        //Pop html
        html += settings.popHtml;
        //弹出层btn构造
        if (settings.leftBtn) html += "<div id='dialog_L_" + popId + "' class='btn " + settings.leftBtnClass + "'>" + settings.leftBtnContent + "</div>";
        if (settings.rightBtn) html += "<div id='dialog_R_" + popId + "' class='btn " + settings.rightBtnClass + "'>" + settings.rightBtnContent + "</div>";
        //弹出层bg构造
        if (settings.hasBg) html += "</div><div id='bg_" + popId + "' class='pop-bg'></div>";
        html += "</div>";
        return html;
    };
    //清除之前错误未显示的弹窗
    var $abandonPop = $("[id^=Dialog]:hidden"); //废弃的弹窗
    if ($abandonPop.length !== 0) {
        $abandonPop.remove();
    }
    //添加弹出层html到页面上
    $("body").append(popHtml);
    //选中弹出层->jQuery对象
    var $popObj = $("#Dialog" + popId);
    //初始化回调函数
    //回调函数为空->关闭||回调函数不为空判断是否为函数->true->执行函数->函数返回值为false不显示弹出层,否则关闭弹出层
    if (settings.iniCallback == null || typeof (settings.iniCallback) === "function" && settings.iniCallback() !== false) {
        //弹窗显示
        $popObj.fadeIn(settings.fadeSpeed);
    }
    //弹窗关闭
    function popClose() {
        //回调函数为空->关闭||回调函数不为空判断是否为函数->true->执行函数->函数返回值为false不关闭弹出层,否则关闭弹出层
        if (settings.fadeOutCallback == null || typeof (settings.fadeOutCallback) === "function" && settings.fadeOutCallback() !== false) {
            $popObj.fadeOut(settings.fadeSpeed, function () {
                $popObj.remove();
            });
        }
    }
    //左侧按钮点击事件
    $popObj.on("click", "#dialog_L_" + popId, function () {
        //回调函数为空->关闭||回调函数不为空判断是否为函数->true->执行函数->函数返回值为false不关闭弹出层,否则关闭弹出层
        if (settings.leftBtnCallback == null || typeof (settings.leftBtnCallback) === "function" && settings.leftBtnCallback() !== false) {
            popClose();
        }
    });
    //右侧按钮点击事件
    $popObj.on("click", "#dialog_R_" + popId, function () {
        //回调函数为空->关闭||回调函数不为空判断是否为函数->true->执行函数->函数返回值为false不关闭弹出层,否则关闭弹出层
        if (settings.rightBtnCallback == null || typeof (settings.rightBtnCallback) === "function" && settings.rightBtnCallback() !== false) {
            popClose();
        }
    });
    //背景关闭事件
    if (settings.bgClose) {
        $popObj.on("click", "#bg_" + popId, function () {
            //回调函数为空->关闭||回调函数不为空判断是否为函数->true->执行函数->函数返回值为false不关闭弹出层,否则关闭弹出层
            if (settings.bgCloseCallback == null || typeof (settings.bgCloseCallback) === "function" && settings.bgCloseCallback() !== false) {
                popClose();
            }
        });
    }
    //其他关闭事件
    if (settings.otherClose !== "") {
        $popObj.on("click", settings.otherClose, function () {
            //回调函数为空->关闭||回调函数不为空判断是否为函数->true->执行函数->函数返回值为false不关闭弹出层,否则关闭弹出层
            if (settings.otherCloseCallback == null || typeof (settings.otherCloseCallback) === "function" && settings.otherCloseCallback() !== false) {
                popClose();
            }
        });
    }
}

/**
 * [DialogForm 对话框带表单]
 * Author: Zero
 * Update: 2015.8.16
 * Version: 0.7
 * [formAction - form表单action属性值 | 默认 ""] 
 * [formMethod - form表单method属性值 | 默认 ""] 
 * [wrapClass - Pop 层外部包裹class | 默认 ""] 
 * [popHtml - Pop html | 默认""] 
 * [iniCallback - Pop初始化回调函数 | 默认""] 
 * [leftBtn - 是否有左侧按钮 | 默认 true] 
 * [leftBtnClass - 左侧按钮class | 默认 ""] 
 * [leftBtnContent - 左侧按钮文字 | 默认 确定] 
 * [leftBtnCallback - 左侧按钮回调函数 | 默认 null] 
 * [rightBtn - 是否有右侧按钮 | 默认 true] 
 * [rightBtnClass - 右侧按钮class | 默认 ""] 
 * [rightBtnContent - 右侧按钮文字 | 默认 取消] 
 * [rightBtnCallback - 右侧按钮回调函数 | 默认 null] 
 * [hasBg - 是否有bg | 默认 true] 
 * [bgClose - 点击bg关闭弹出层 | 默认false] 
 * [bgCloseCallback - bg点击关闭回调函数 | 默认 null] 
 * [otherClose - 其他关闭jQ选择器 | 默认""] 
 * [otherCloseCallback - 其他关闭回调函数 | 默认null] 
 * [fadeOutCallback - Pop消失回调函数 | 默认null] 
 * [fadeSpeed - 淡入淡出时间(毫秒) | 默认 200] 
 * @param {} options
 * @returns {} 
 */
Mc.Pc.Pop.DialogForm = function (options) {
    var settings = $.extend({
        formAction: "", //form表单action属性值 | 默认 ""
        formMethod: "", //form表单method属性值 | 默认 ""
        wrapClass: "", //Pop 层外部包裹class | 默认 ""
        popHtml: "", //Pop html | 默认""
        iniCallback: null, //Pop初始化回调函数 | 默认""
        leftBtn: true, //是否有左侧按钮 | 默认 true
        leftBtnClass: "", //左侧按钮class | 默认 ""
        leftBtnContent: "确认", //左侧按钮文字 | 默认 确定
        leftBtnCallback: null, //左侧按钮回调函数 | 默认 null
        rightBtn: true, //是否有右侧按钮 | 默认 true
        rightBtnClass: "", //右侧按钮class | 默认 ""
        rightBtnContent: "取消", //右侧按钮文字 | 默认 取消
        rightBtnCallback: null, //右侧按钮回调函数 | 默认 null
        hasBg: true, //是否有bg | 默认 true
        bgClose: false, //点击bg关闭弹出层 | 默认false
        bgCloseCallback: null, //bg点击关闭回调函数 | 默认 null
        otherClose: "", //其他关闭jQ选择器 | 默认""
        otherCloseCallback: null, //其他关闭回调函数 | 默认null
        fadeOutCallback: null, //Pop消失回调函数 | 默认null
        fadeSpeed: 200 //淡入淡出时间(毫秒) | 默认 200
    }, options);
    //把当前时间(从1970.1.1开始的毫秒数)给弹出层作为ID标识
    var popId = new Date().getTime();
    //弹出层html构造
    var popHtml = function typeTipHtmlCreate() {
        var html = "";
        html += "<div id='Dialog" + popId + "' class='pop-position-wrap' style='display:none;'>";
        html += "<div class='pop-wrap " + settings.wrapClass + "'>";
        html += "<form action='" + settings.formAction + "' method='" + settings.formMethod + "' target=\"_blank\">";
        //Pop html
        html += settings.popHtml;
        //弹出层btn构造
        if (settings.leftBtn) html += "<input type='submit' id='dialog_L_" + popId + "' class='btn " + settings.leftBtnClass + "' value='" + settings.leftBtnContent + "'>";
        if (settings.rightBtn) html += "<input type='submit' id='dialog_R_" + popId + "' class='btn " + settings.rightBtnClass + "' value='" + settings.rightBtnContent + "'>";
        //弹出层bg构造
        if (settings.hasBg) html += "</form></div><div id='bg_" + popId + "' class='pop-bg'></div>";
        html += "</div>";
        return html;
    };
    //清除之前错误未显示的弹窗
    var $abandonPop = $("[id^=Dialog]:hidden"); //废弃的弹窗
    if ($abandonPop.length !== 0) {
        $abandonPop.remove();
    }
    //添加弹出层html到页面上
    $("body").append(popHtml);
    //选中弹出层->jQuery对象
    var $popObj = $("#Dialog" + popId);
    //初始化回调函数
    //回调函数为空->关闭||回调函数不为空判断是否为函数->true->执行函数->函数返回值为false不显示弹出层,否则关闭弹出层
    if (settings.iniCallback == null || typeof (settings.iniCallback) === "function" && settings.iniCallback() !== false) {
        //弹窗显示
        $popObj.fadeIn(settings.fadeSpeed);
    }
    //弹窗关闭
    function popClose() {
        //回调函数为空->关闭||回调函数不为空判断是否为函数->true->执行函数->函数返回值为false不关闭弹出层,否则关闭弹出层
        if (settings.fadeOutCallback == null || typeof (settings.fadeOutCallback) === "function" && settings.fadeOutCallback() !== false) {
            $popObj.fadeOut(settings.fadeSpeed, function () {
                $popObj.remove();
            });
        }
    }
    //左侧按钮点击事件
    $popObj.on("click", "#dialog_L_" + popId, function () {
        //回调函数为空->关闭||回调函数不为空判断是否为函数->true->执行函数->函数返回值为false不关闭弹出层,否则关闭弹出层
        if (settings.leftBtnCallback == null || typeof (settings.leftBtnCallback) === "function" && settings.leftBtnCallback() !== false) {
            popClose();
        }
    });
    //右侧按钮点击事件
    $popObj.on("click", "#dialog_R_" + popId, function () {
        //回调函数为空->关闭||回调函数不为空判断是否为函数->true->执行函数->函数返回值为false不关闭弹出层,否则关闭弹出层
        if (settings.rightBtnCallback == null || typeof (settings.rightBtnCallback) === "function" && settings.rightBtnCallback() !== false) {
            popClose();
        }
    });
    //背景关闭事件
    if (settings.bgClose) {
        $popObj.on("click", "#bg_" + popId, function () {
            //回调函数为空->关闭||回调函数不为空判断是否为函数->true->执行函数->函数返回值为false不关闭弹出层,否则关闭弹出层
            if (settings.bgCloseCallback == null || typeof (settings.bgCloseCallback) === "function" && settings.bgCloseCallback() !== false) {
                popClose();
            }
        });
    }
    //其他关闭事件
    if (settings.otherClose !== "") {
        $popObj.on("click", settings.otherClose, function () {
            //回调函数为空->关闭||回调函数不为空判断是否为函数->true->执行函数->函数返回值为false不关闭弹出层,否则关闭弹出层
            if (settings.otherCloseCallback == null || typeof (settings.otherCloseCallback) === "function" && settings.otherCloseCallback() !== false) {
                popClose();
            }
        });
    }
}

/**
 * [Loading 载入中弹出层]
 * Author: Zero
 * Update: 2015.9.1
 * Version: 1.0
 * [wrapClass - Pop 层外部包裹class | 默认 ""] 
 * [loadingClass - Loading 层class样式名 | 默认"loading-cotar"]
 * [loadingTxt - 载入层提示文字 | 默认"载入中..."]
 * [hasBg - 是否有bg | 默认 true] 
 * [fadeOutCallback - Pop消失回调函数 | 默认null] 
 * [fadeSpeed - 淡入淡出时间(毫秒) | 默认 200] 
 * @param {} options 
 * @returns {} 
 */
Mc.Pc.Pop.Loading = function (options) {
    var settings = $.extend({
        wrapClass: "", //Pop 层外部包裹class | 默认 ""
        loadingClass: "loading-cotar", //Loading 层class样式名 | 默认"loading-cotar"
        loadingTxt: "载入中...", //载入层提示文字 | 默认"载入中..."
        hasBg: true, //是否有bg | 默认 true
        fadeOutCallback: null, //Pop消失回调函数 | 默认null
        fadeSpeed: 200 //淡入淡出时间(毫秒) | 默认 200
    }, options);
    //把当前时间(从1970.1.1开始的毫秒数)给弹出层作为ID标识
    var popId = new Date().getTime();
    //弹出层html构造
    var popHtml = function typeTipHtmlCreate() {
        var html = "";
        html += "<div id='Loading" + popId + "' class='pop-position-wrap' style='display:none;'>";
        html += "<div class='pop-wrap " + settings.wrapClass + "'>";
        html += "<div class='" + settings.loadingClass + "'>";
        //loading txt
        html += settings.loadingTxt;
        //弹出层bg构造
        if (settings.hasBg) html += "</div></div><div id='bg_" + popId + "' class='pop-bg'></div>";
        html += "</div>";
        return html;
    };
    //添加弹出层html到页面上
    $("body").append(popHtml);
    //选中弹出层->jQuery对象
    var $popObj = $("#Loading" + popId);
    //弹窗显示
    $popObj.fadeIn(settings.fadeSpeed);
    //保存loading层对象
    var _this = this;
    //弹窗关闭
    function popClose() {
        //回调函数为空->关闭||回调函数不为空判断是否为函数->true->执行函数->函数返回值为false不关闭弹出层,否则关闭弹出层
        if (settings.fadeOutCallback == null || typeof (settings.fadeOutCallback) === "function" && settings.fadeOutCallback() !== false) {
            $popObj.fadeOut(settings.fadeSpeed, function () {
                $popObj.remove();
            });
        }
    }
    //移除载入弹出层 - 对外接口函数
    _this.removeLoading = function () {
        popClose();
    }
}

/**
 * [签到日历]
 * Author: Zero
 * Update: 2015.8.25
 * Version: 1.2
 */
Mc.Pc.Calendar.SignCal = {
    /**
     * 初始化一个签到日历
     * @param {} options 
     * @returns {} 
     */
    iniCal: function (options) {
        var current = new Date(); //当前时间
        var settings = $.extend({
            target: "", //显示签到日历的目标jQ选择器 | 默认 ""
            iYear: current.getFullYear(), //年 | 默认 当前年份
            iMonth: current.getMonth() + 1, //月 | 默认 当前月份
            iDay: current.getDate(),
            signList: "", //已签到列表 | 默认 ""
            iniCallBack: null, //初始化回调函数 | 默认 null
            yearSelectCallBack: null, //年份选择回调函数 | 默认 null
            monthSelectCallBack: null, //月份选择回调函数 | 默认 null
            otherSignInBtn: "", //其他签到按钮的jQ选择器 | 默认 ""
            signInBtnCallBack: null, //签到按钮回调函数 | 默认 null
            signInSuccessCallBack: null, //签到成功回调函数 | 默认 null
            signInFailCallBack: null //签到失败回调函数 | 默认 null
        }, options);
        //签到日历HTML构造
        var signHtml = Mc.Pc.Calendar.SignCal.drawCal({
            iYear: settings.iYear,
            iMonth: settings.iMonth,
            iDay: settings.iDay,
            signList: settings.signList
        });
        //添加HTML到页面
        $(settings.target).html(signHtml);
        var $signInObj = $("#sign_layer"); //日历jQ对象

        //签到日历初始化
        //回调函数为空->显示日历||回调函数不为空判断是否为函数->true->执行函数->函数返回值为false不显示日历,否则显示日历
        if (settings.iniCallback == null || typeof (settings.iniCallback) === "function" && settings.iniCallback() !== false) {
            //下拉选择框初始化
            Mc.Util.selectMenu("#sign_year_select", function (_this, val) {
                var dateTime = {
                    year: $("#sign_year_select>input").val(),
                    month: $("#sign_month_select>input").val()
                };
                var dif = parseInt(parseInt((dateTime.year - settings.iYear) * 12) + parseInt((dateTime.month - settings.iMonth)));
                if (dif > 0) {
                    $(".top-tip").html("(M+" + dif + ")月");
                } else if (dif < 0) {
                    $(".top-tip").html("(M" + dif + ")月");
                } else {
                    $(".top-tip").html("（M）月");
                }
                //年份下拉选择框回调函数
                settings.yearSelectCallBack(dateTime);
            });
            Mc.Util.selectMenu("#sign_month_select", function (_this, val) {
                var dateTime = {
                    year: $("#sign_year_select>input").val(),
                    month: $("#sign_month_select>input").val()
                };
                var dif = parseInt(parseInt((dateTime.year - settings.iYear) * 12) + parseInt((dateTime.month - settings.iMonth)));
                if (dif > 0) {
                    $(".top-tip").html("(M+" + dif + ")月");
                } else if (dif < 0) {
                    $(".top-tip").html("(M" + dif + ")月");
                } else {
                    $(".top-tip").html("（M）月");
                }
                //月份下拉选择框回调函数
                settings.monthSelectCallBack(dateTime);
            });
            //日历显示
            $signInObj.show();
        }

        //签到函数
        function signIn() {
            var errorMsg = "签到回调函数必须返回如下格式数据: {\r\n year:签到年份,\r\n month:签到月份,\r\n signList:对应月份签到列表(包括签到当天),\r\n state:签到成功与否(true/false)\r\n }\r\n"; //错误信息
            //回调函数为空->签到||回调函数不为空判断是否为函数->true->执行函数->函数返回值为false不执行签到,否则签到
            if (settings.signInBtnCallBack == null || typeof (settings.signInBtnCallBack) !== "function") {
                //签到失败
                console.error(errorMsg); //输出错误信息
                //回调函数为空||回调函数不为空判断是否为函数->true->执行函数
                if (settings.signInFailCallBack == null || typeof (settings.signInFailCallBack) === "function" && settings.signInFailCallBack());
            } else {
                var data = settings.signInBtnCallBack(); //获得回调函数返回值
                if (Mc.Util.isNull(data.year) || Mc.Util.isNull(data.month) || Mc.Util.isNull(data.signList)) {
                    console.error(errorMsg);
                    return;
                } //输出错误信息
                if (data.state == true) {
                    //签到成功
                    //回调函数为空||回调函数不为空判断是否为函数->true->执行函数
                    if (settings.signInSuccessCallBack == null || typeof (settings.signInSuccessCallBack) === "function" && settings.signInSuccessCallBack());
                } else {
                    //签到失败
                    //回调函数为空||回调函数不为空判断是否为函数->true->执行函数
                    if (settings.signInFailCallBack == null || typeof (settings.signInFailCallBack) === "function" && settings.signInFailCallBack());
                }
                //更新日历到当前月(回调函数返回参数)
                Mc.Pc.Calendar.SignCal.updateCal({
                    iYear: data.year,
                    iMonth: data.month,
                    signList: data.signList
                });
                //更新标题上的选择框
                $("#sign_year_select>input").val(data.year);
                $("#sign_year_select>div").html(data.year);
                $("#sign_month_select>input").val(data.month);
                $("#sign_month_select>div").html(data.month);
            }
        }

        //签到按钮事件绑定
        $signInObj.on("click", "#sign_in_btn,.now-day", function () {
            signIn();
        });
        //其他签到按钮事件绑定
        if (!Mc.Util.isNull(settings.otherSignInBtn)) {
            $(document).on("click", settings.otherSignInBtn, function () {
                signIn();
            });
        }
    },

    /**
     * [构造一个签到日历HTML]
     * @param {} options 配置参数
     * @returns {String} 构造出的签到日历HTML
     */
    drawCal: function (options) {
        var current = new Date(); //当前时间
        var settings = $.extend({
            iYear: current.getFullYear(), //年 | 默认 当前年份
            iMonth: current.getMonth() + 1, //月 | 默认 当前月份
            iDay: current.getDate(),
            signList: "" //已签到列表 | 默认 ""
        }, options);
        //构造签到日历HTML
        var htmls = new Array();
        htmls.push("<div class='sign_main' id='sign_layer' style='display:none;'>");
        htmls.push("<div class='sign_succ_calendar_title'>");
        //年份选择
        htmls.push("<div class='select-box' id='sign_year_select'><input type='hidden' value='" + settings.iYear + "'><div>" + settings.iYear + "年</div><ul style='display:none;'>");
        for (var i = 2015; i < 2050; i++)
            htmls.push("<li mc-select-value='" + i + "'>" + i + "年</li>");
        htmls.push("</ul></div>");
        //月份选择
        htmls.push("<div class='select-box' id='sign_month_select'><input type='hidden' value='" + settings.iMonth + "'><div>" + settings.iMonth + "月</div><ul style='display:none;'>");
        for (var j = 1; j < 13; j++)
            htmls.push("<li mc-select-value='" + j + "'>" + j + "月</li>");
        htmls.push("</ul></div>");
        //标题
        //htmls.push("<div class='calendar_month_span'>" + settings.iYear + "年" + settings.iMonth + "月</div>");
        //htmls.push("<div class='sign-in' id='sign_in_btn'>签到</div>");//签到按钮
        var difMonth = "M";
        htmls.push("<div class='top-tip'>(" + difMonth + ")月</div>");//(M)月
        htmls.push("</div>");
        //日历主体
        htmls.push("<div class='sign' id='sign_cal'>");
        //日历数据主体
        htmls.push(Mc.Pc.Calendar.SignCal.getCalDataHtml(settings.iYear, settings.iMonth, settings.iDay, settings.signList));
        htmls.push("</div>");
        htmls.push("</div>");
        return htmls.join('');
    },

    /**
     * 更新日历数据
     * @param {} options 
     * @returns {} 
     */
    updateCal: function (options) {
        var current = new Date(); //当前时间
        var settings = $.extend({
            iYear: current.getFullYear(), //年 | 默认 当前年份
            iMonth: current.getMonth() + 1, //月 | 默认 当前月份
            iDay: current.getDate(),
            signList: "", //已签到列表 | 默认 ""
            callBack: null //数据更新完成回调函数 | 默认 null
        }, options);
        var $signCal = $("#sign_cal");
        //添加新数据
        $signCal.html(Mc.Pc.Calendar.SignCal.getCalDataHtml(settings.iYear, settings.iMonth, settings.iDay, settings.signList));
        //回调函数为空||回调函数不为空判断是否为函数->true->执行函数
        if (settings.callBack == null || typeof (settings.callBack) === "function" && settings.callBack());
    },

    /**
     * 获得日历当月数据HTML
     * @param {} iYear 年
     * @param {} iMonth 月
     * @param {} signList 当月签到情况
     * @returns {String} 参数指定月份签到HTML
     */
    getCalDataHtml: function (iYear, iMonth, iDay, signList) {
        //判断当天是否已签到
        function isHasSigned(signList, day) {
            var signed = false;
            $.each(signList, function (index, item) {
                if (item === day) {
                    signed = true;
                    return false;
                }
            });
            return signed;
        }
        //获得日历数组
        var myMonth = Mc.Util.Date.getCalendar({
            iYear: iYear,
            iMonth: iMonth
        });
        //日历数据主体HTML构造
        var htmls = new Array();
        htmls.push("<table>");
        htmls.push("<tr>");
        htmls.push("<th class='col-1'><span>" + myMonth[0][0] + "</span></th>");
        htmls.push("<th class='col-2'><span>" + myMonth[0][1] + "</span></th>");
        htmls.push("<th class='col-3'><span>" + myMonth[0][2] + "</span></th>");
        htmls.push("<th class='col-4'><span>" + myMonth[0][3] + "</span></th>");
        htmls.push("<th class='col-5'><span>" + myMonth[0][4] + "</span></th>");
        htmls.push("<th class='col-6'><span>" + myMonth[0][5] + "</span></th>");
        htmls.push("<th class='col-7'><span>" + myMonth[0][6] + "</span></th>");
        htmls.push("</tr>");
        var d, w;
        for (w = 1; w < 7; w++) {
            htmls.push("<tr class='row-" + w + "'>");
            for (d = 1; d < 8; d++) {
                var signed = isHasSigned(signList, myMonth[w][d - 1]);
                var dayDate = !isNaN(myMonth[w][d - 1]) ? myMonth[w][d - 1] : ""; //获取天
                if (signed) {
                    if (myMonth[w][d - 1] == iDay) {
                        htmls.push("<td mc-cal-value='" + dayDate + "' class='col-" + d + " on now-day'><span>" + dayDate + "</span></td>");
                    } else {
                        htmls.push("<td mc-cal-value='" + dayDate + "' class='col-" + d + " on'><span>" + dayDate + "</span></td>");
                    }
                } else {
                    if (Mc.Util.isNull(dayDate)) {
                        htmls.push("<td mc-cal-value='" + dayDate + "' class='col-" + d + " other-month'><span>" + dayDate + "</td>");
                    } else {
                        if (myMonth[w][d - 1] == iDay) {
                            htmls.push("<td mc-cal-value='" + dayDate + "' class='col-" + d + " now-day'><span>" + dayDate + "</span></td>");
                        } else {
                            htmls.push("<td mc-cal-value='" + dayDate + "' class='col-" + d + "'><span>" + dayDate + "</span></td>");
                        }
                    }
                }
            }
            htmls.push("</tr>");
        }
        htmls.push("</table>");
        return htmls.join('');
    },

    /**
     * 执行签到
     * @param {} iDay 要签到的当天 
     * @returns {} 如果已经签到 false
     *             未签到 true
     */
    setSignIn: function (iDay) {
        var $signCal = $("#sign_cal");
        var $targeDay = $signCal.find("[mc-cal-value='" + iDay + "']"); //目标日期
        if ($targeDay.hasClass("on")) {
            return false;
        } else {
            $targeDay.addClass("on");
            return true;
        }
    }
}

/**
 * [工具函数-阻止滚动条滚动事件冒泡]
 * @param {} id 滚动层id
 * @returns {} 
 */
Mc.Util.preventScroll = function (id) {
    var _this = document.getElementById(id);
    if (_this != null) {
        if (navigator.userAgent.indexOf("Firefox") > 0) {
            _this.addEventListener('DOMMouseScroll', function (e) {
                _this.scrollTop += e.detail > 0 ? 60 : -60;
                e.preventDefault();
            }, false);
        } else {
            _this.onmousewheel = function (e) {
                e = e || window.event;
                _this.scrollTop += e.wheelDelta > 0 ? -60 : 60;
                return false;
            };
        }
    }
    return this;
}

/**
 * [工具函数-自定义下拉选择框]
 * @param {} selector 下拉选择框对应的jQ选择器
 * @param {} callback 选项选择时回调函数
 * @returns {} 
 */
Mc.Util.selectMenu = function (selector, callback) {
    var $selector = $(selector);
    var $selectorInput = $(selector).find("input");
    var $selectorDiv = $(selector).find("div");
    var $selectorUl = $selector.find("ul");
    $selector.on("click", function (ev) {
        var $this = $(this);
        if ($this.hasClass("open")) {
            $this.removeClass("open");
            $selectorUl.hide();
        } else {
            $this.addClass("open");
            $selectorUl.show();
        }
        ev.stopPropagation();
    });
    $selector.on("click", 'li', function (ev) {
        var $this = $(this);
        var val = $this.text();
        var data_value = $this.attr("mc-select-value");
        $selectorDiv.html(val);
        $selectorInput.val(data_value);
        if (callback != null) callback(this, val);
        $selectorUl.hide();
        $selector.removeClass("open");
        ev.stopPropagation();
    });
    $(document).click(function () {
        $selectorUl.hide();
        $selector.removeClass("open");
    });
}

/**
 * [工具函数-特效变化]
 * [target - 特效变化父级jQ选择器(通过事件代理触发) | 默认 "document"]
 * [event - 触发事件 | 默认click | 可选项 {
 *     click:点击触发,
 *     hover:鼠标移入/移出各触发一次,
 *     mouseover:鼠标移入触发,
 *     mouseout:鼠标移出触发
 * }]
 * [effect - 特效形式 | 默认SH | 可选项 { 
 *     SH:show/hide,
 *     FIO:fadeIn/fadeOut,
 *     SDU:slideDown/slideUp
 * }]
 * [onlyActive - 同一时间只能有一个激活 | 默认false]
 * [lessOneActive - 至少有一个处于激活状态 | 默认false]
 * [effectSpeed - 特效变化时间(毫秒) | 默认 200]
 * [常见用法 {
 *     单页切换: onlyActive:true,lessOneActive:true
 * }]
 * @param {} options 
 * @returns {} 
 */
Mc.Util.EffectChange = function (options) {
    var settings = $.extend({
        target: "document", //特效变化父级jQ选择器(通过事件代理触发) | 默认 "document"
        event: "click", //触发事件 | 默认click {click:点击触发,hover:鼠标移入/移出各触发一次,mouseover:鼠标移入触发,mouseout:鼠标移出触发}
        effect: "SH", //特效形式 | 默认SH {SH:show/hide,FIO:fadeIn/fadeOut,SDU:slideDown/slideUp}
        onlyActive: false, //同一时间只能有一个激活 | 默认false | Tip:如果实现单页切换,此值应为true
        lessOneActive: false, //至少有一个处于激活状态 | 默认false | Tip:如果实现单页切换,此值应为true
        effectSpeed: 200 //特效变化时间(毫秒) | 默认 200
    }, options);
    //初始化
    function effectChageIni() {
        $(settings.target + " [mc-efc-page]").each(function (i, val) {
            var $active = $(val);
            if (!$(val).hasClass("mc-active")) {
                $active.hide();
            }
        });
    }
    $(function () {
        effectChageIni();
    });
    //根据特效类型字符串映射为对应特效类型code
    function getEfcTypeCode() {
        if (settings.effect == "FIO") {
            return 1;
        } else if (settings.effect == "SDU") {
            return 2;
        } else {
            return 0;
        }
    }
    var effectType = getEfcTypeCode(); //获取特效类型编号
    //开始特效
    function effectStart(efcTarget) {
        efcTarget.addClass("mc-active");
        switch (effectType) {
            case 0:
                efcTarget.show();
                break;
            case 1:
                efcTarget.fadeIn(settings.effectSpeed);
                break;
            case 2:
                efcTarget.slideDown(settings.effectSpeed);
                break;
        }
    }
    //结束特效
    function effectEnd(efcTarget) {
        efcTarget.removeClass("mc-active");
        switch (effectType) {
            case 0:
                efcTarget.hide();
                break;
            case 1:
                efcTarget.fadeOut(settings.effectSpeed);
                break;
            case 2:
                efcTarget.slideUp(settings.effectSpeed);
                break;
        }
    }
    var $targetF = $(settings.target); //获取绑定对象
    $targetF.on(settings.event, "[mc-efc-btn]", function () {
        var $this = $(this); //当前对象
        var $targetData = $this.attr("mc-efc-btn"); //当前对象目标数据(用来选取当前对象目标)
        var $target = $targetF.find("[mc-efc-page=" + $targetData + "]"); //当前对象目标
        var $activeBtn = $targetF.find("[mc-efc-btn].mc-active"); //处于激活状态的选项
        var $activePage = $targetF.find("[mc-efc-page].mc-active"); //处于激活状态的选项目标
        var condition1 = !settings.lessOneActive; //条件1 - 可以全处于冻结状态
        var condition2 = $targetF.find("[mc-efc-btn].mc-active").length > 1; //条件2 - 处于激活的项多以1个(隐含条件 - 不满足条件1,即至少有一个要处于激活状态)
        if ($this.hasClass("mc-active") && (condition1 || condition2)) {
            //条件1 - 所有选项可以处于冻结状态
            //条件2 - 处于激活状态的项多于1个(隐含条件 - 不满足条件1,即至少有一个要处于激活状态)
            //如果当前项处于激活状态,并且符合条件1,2中任意一条 --> 冻结当前项
            $this.removeClass("mc-active active"); //冻结当前项
            effectEnd($target); //冻结当前项目标
        } else if (!$this.hasClass("mc-active")) {
            //不满足冻结选项条件(并且当前项处于冻结状态) --> 激活当前项
            if (settings.onlyActive) {
                //如果所有选项中只能激活一个选项,则关闭已激活对象,再激活当前对象
                $activeBtn.removeClass("mc-active active"); //冻结已激活对象
                effectEnd($activePage); //冻结已激活对象目标
            }
            $this.addClass("mc-active active"); //激活当前项
            effectStart($target); //激活当前项目标
        }
    });
}

/**
 * [工具函数-侧栏手风琴菜单]
 * @param {} navList 手风琴菜单的jQ选择器
 * @param {boolean} oneSildeDown 是否只有一个能展开 true 一个 false 多个
 * @returns {} 
 */
Mc.Util.dropMenuList = function (navList, oneSildeDown) {
    $(navList).on("click", "[mc-dropbtn]", function () {
        var $this = $(this);
        var targetName = $this.attr("mc-dropbtn");
        var $targetObj = $("[mc-dropmenu=" + targetName + "]");
        if ($targetObj.hasClass("open")) {
            $this.removeClass("open");
            $targetObj.removeClass("open").slideUp();
        } else {
            if (oneSildeDown) {
                var $allDropBtn = $("[mc-dropbtn]");
                var $allDropMenu = $("[mc-dropmenu]");
                for (var i = 0; i < $allDropMenu.length; i++) {
                    var nowLooObjB = $allDropBtn.eq(i);
                    var nowLoopObjM = $allDropMenu.eq(i);
                    if (nowLoopObjM.hasClass("open")) {
                        nowLooObjB.removeClass("open");
                        nowLoopObjM.removeClass("open").slideUp();
                    }
                }
            }
            $this.addClass("open");
            $targetObj.addClass("open").slideDown();
        }
    });
}

/**
 * [工具函数-验证码倒计时]
 * Author: Zero
 * Update: 2015.8.16
 * Version: 1.0
 */
Mc.Util.iniFixCountDown = {
    timeCountDownState: true, //倒计时时判断按钮是否可用
    interValObj: null, //倒计时的定时器对象
    //开始倒计时
    start: function (options) {
        //target: jQuery选择器字符串
        //fixTime: 时间
        //startCallback: 开始倒计时回调函数
        //endCallback: 结束倒计时回调函数
        //timeFormat: 计时格式化字符串
        //defaultTxt: 默认显示文字
        var settings = $.extend({
            target: "#verifity", //选择器字符串
            fixTime: 60, //时间
            timeFormat: "%d", //计时格式化字符串
            startCallback: null, //开始倒计时回调函数
            endCallback: null, //结束倒计时回调函数
            defaultTxt: "获取验证码" //默认显示文字
        }, options);
        var timeFormatTxt = new Array();
        timeFormatTxt = settings.timeFormat.split("%d");
        if (typeof (timeFormatTxt[2]) != "undefined") console.error("不能有超过一个的%d出现");
        if (Mc.Util.iniFixCountDown.timeCountDownState) {
            Mc.Util.iniFixCountDown.timeCountDownState = false;
            if (settings.startCallback != null) settings.startCallback(); //开始节点回调函数
            Mc.Util.iniFixCountDown.interValObj = window.setInterval(function () {
                if (settings.fixTime == 0) {
                    window.clearInterval(Mc.Util.iniFixCountDown.interValObj);
                    $(settings.target).html(settings.defaultTxt);
                    if (settings.endCallback != null) settings.endCallback(); //结束节点回调函数
                    Mc.Util.iniFixCountDown.timeCountDownState = true;
                } else {
                    settings.fixTime--;
                    $(settings.target).html(timeFormatTxt[0] + parseInt(settings.fixTime) + timeFormatTxt[1]);
                }
            }, 1000);
        }
    },
    //清除倒计时
    clean: function (target) {
        if (Mc.Util.iniFixCountDown.interValObj != null) {
            window.clearInterval(Mc.Util.iniFixCountDown.interValObj);
            $(target).html("获取验证码");
            Mc.Util.iniFixCountDown.timeCountDownState = true;
        }
    }
}

/**
 * [获得日历数组] 
 * Author: Zero
 * Update: 2015.8.17
 * Version: 1.0
 * [iYear - 年 | 默认 当前年份] 
 * [iMonth - 月 | 默认 当前月份] 
 * [calHead - 日历表头 | 默认 星期日~星期一] 
 * @returns {Array} 当月二维数组
 */
Mc.Util.Date.getCalendar = function (options) {
    var current = new Date(); //当前时间
    var settings = $.extend({
        iYear: current.getFullYear(), //年 | 默认 当前年份
        iMonth: current.getMonth() + 1, //月 | 默认 当前月份
        calHead: ["日", "一", "二", "三", "四", "五", "六"] //日历表头 | 默认 星期日~星期一
    }, options);
    var aMonth = new Array();
    aMonth[0] = new Array(7);
    aMonth[1] = new Array(7);
    aMonth[2] = new Array(7);
    aMonth[3] = new Array(7);
    aMonth[4] = new Array(7);
    aMonth[5] = new Array(7);
    aMonth[6] = new Array(7);
    var dCalDate = new Date(settings.iYear, settings.iMonth - 1, 1);
    var iDayOfFirst = dCalDate.getDay(); //获得当月第一天
    var iDaysInMonth = Mc.Util.Date.getDaysInmonth(settings.iYear, settings.iMonth); //获得当月总天数
    var iVarDate = 1;
    var d, w;
    //表头初始化
    for (var i = 0; i < 7; i++) {
        aMonth[0][i] = settings.calHead[i];
    }
    for (d = iDayOfFirst; d < 7; d++) {
        aMonth[1][d] = iVarDate;
        iVarDate++;
    }
    for (w = 2; w < 7; w++) {
        for (d = 0; d < 7; d++) {
            if (iVarDate <= iDaysInMonth) {
                aMonth[w][d] = iVarDate;
                iVarDate++;
            }
        }
    }
    return aMonth;
}
/**
 * [获得当前月份天数]
 * @param {} iYear 年
 * @param {} iMonth 月
 * @returns {} 
 */
Mc.Util.Date.getDaysInmonth = function (iYear, iMonth) {
    var dPrevDate = new Date(iYear, iMonth, 0);
    return dPrevDate.getDate();
}

/**
 * [判断传入的对象是否为null | "" | undefined]
 * @param {} obj 判断对象
 * @returns {} true 传入对象为null | "" | undefined
 *             false 传入对象不为null | "" | undefined
 */
Mc.Util.isNull = function (obj) {
    if (obj == null || obj === "" || typeof (obj) == "undefined") {
        return true;
    }
    return false;
}

/**
 * [判断传入的对象是否为null | "" | NaN | undefined]
 * @param {} obj 判断对象
 * @returns {} true 传入对象不为null | ""| NaN | undefined
 *             false 传入对象为null | ""| NaN | undefined
 */
Mc.Util.isNumber = function (obj) {
    if (obj == null || obj === "" || isNaN(obj) || typeof (obj) == "undefined") {
        return false;
    }
    return true;
}

/**
 * [isNullorEmpty 判断字符串数组是否为空]
 * @param  {string[]} str
 * @return {Boolean}
 */
Mc.Util.String.isNullOrEmpty = function (str) {
    // body...
    var result = false;
    if (str.length !== 0) {
        for (var i = 0; i < str.length; i++) {
            if (str[i] !== "") {
                result = true;
            } else {
                result = false;
            }
        }
    }
    return result;
};

/**
 * [Checkphonecode 正则表达式验证手机号是否正确]
 * @param  {varchar} phonenum
 * @return {Boolean}
 */
Mc.Util.Check.checkPhoneCode = function (phonenum) {
    //待检测表达式是否正确
    var right = /^((\(\d{3}\))|(\d{3}\-))?13\d{9}|14[57]\d{8}|15\d{9}|18\d{9}|17\d{9}$/;
    if (phonenum.length !== 11 || !phonenum.match(right)) {
        return false;
    }
    return true;
};

/**
 * [Checkmailcode 正则表达式验证邮箱是否正确]
 * @param  {varchar}email
 * @return {Boolean}
 */
Mc.Util.Check.checkMailCode = function (email) {
    var right = /^[0-9A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/;
    if (email.match(right)) {
        return true;
    }
    else {
        return false;
    }
};

/**
 * [Checkidcard 正则表达式验证身份证是否正确]
 * @param  {varchar} idcard
 * @return {Boolean}
 */
Mc.Util.Check.checkIdcardCode = function (idcard) {
    var right = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (idcard.match(right)) {
        return true;
    }
    else {
        return false;
    }
};

/**
 * [Checktelcode 正则表达式验证固定电话是否正确]
 * @param  {varchar} telephone
 * @return {Boolean}
 */
Mc.Util.Check.checkTelCode = function (telephone) {
    var right = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (telephone.match(right)) {
        return true;
    }
    else {
        return false;
    }
};

/**
 * [Checktelcode 验证两个字符串是否相等]
 * @param  {varchar} str1 str2
 * @return {Boolean}
 */
Mc.Util.String.cmp = function (str1, str2) {
    var checkstr = [str1, str2];
    if (!Mc.Util.String.isNullOrEmpty(checkstr)) {
        return false;
    }
    if (str1 === str2) {
        return true;
    }
    else {
        return false;
    }
};

/**验证url**/

/**
 * [GetRequest get url param after ?]
 */
Mc.Util.Uri.getUrlParam = function () {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") !== -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
};

/**
 * [dateFormatter Description]
 * @param  {datetime} date [description]
 * @param  {int} type [1 "yyyy-MM-dd" 2 "MM-dd"]
 * @return {string}
 */
Mc.Util.Date.dateFormatter = function (date, type) {
    var year = date.replace(/yyyy/, this.getFullYear());
    var month = date.replace(/MM/, this.getMonth() > 9 ? this.getMonth().toString() : '0' + this.getMonth());
    var day = date.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
    if (type === 1) {
        return year + "-" + month + "-" + day;
    } else if (type === 2) {
        return month + "-'" + day;
    }
    return false;
};


Mc.Util.String.getStrTrueLength = function (str) {
    return str.replace(/[^x00-xff]/g, "xx").length;
};



//弹出层(废弃)
//Version 1.3.2
//Auther Zero
//Update 2015.6.23
//可选类型：
//1.null - 默认的带有head-body-bottom
//2.void - 空白弹出层:无默认按钮以及标题,可选择传入一个用来关闭弹出层的按钮的JQuery选择器
//3.tip - 提示框:弹出一个操作提示,在tip_live时间(单位毫秒)内存在,然后消失,无回调函数
//4.loading - 载入框:弹出一个载入中的弹出层.需要代码手动remove.
//5.confirm - 确认框 (开发中)
//type: null, 弹出层类型,默认null(即可自定义添加HTML,css控制样式)
//style: 1, 默认样式1
//width: '80%', 默认宽度
//max_height: '80%', 默认最大高度
//fadeSpeed: 200, 默认淡入淡出时间200毫秒
//tip_live: 2000, 操作提示层生存时间(单位毫秒),只有在type为tip时生效
//tip_content: "", 操作提示层内容,只有在type为tip时生效
//loading_content: "载入中...", 载入层提示文字
//hasHead: true, 默认有标题
//head_txt: "是否确认当前操作", 默认弹出层标题
//headHTML: "", 可传入String自定义head,type为void时会自动启用
//html: "", 默认弹出框的内容
//bottomHTML: "", 可传入String自定义bottom,type为void时会自动启用
//confirm_id: "#dialog_L_", 默认左侧按钮绑定的id前缀(开发中)
//confirm_btn: true, 默认显示确认按钮
//confirm_txt: "确认", 默认确认按钮显示文字确认
//callback_L: null, 左侧按钮点击回调函数(confirm_btn)
//cancel_id: "#dialog_R_", 默认右侧按钮绑定的id前缀(开发中)
//cancel_btn: true, 默认显示取消按钮
//cancle_txt: "取消", 默认取消按钮显示文字取消
//callback_R: null, 右侧按钮点击回调函数(cancel_btn)
//hasBg: true, 默认有黑色背景
//bgClose: false, 默认无法点击bg取消弹出框
//callback_bc: null, bg等关闭按钮点击回调函数,只有在bg_close为true的情况下才会生效
//otherClose: null, 传入一个用来关闭弹出层的按钮的JQuery选择器,若要唯一绑定,传入的JQuery必须唯一
//callback_oc: null, otherClose的回调函数
//callback_ini: null, 弹出层初始化回调函数
//callback_close: null, 弹出层消失回调函数
//scroll: true, 默认弹出层有滚动条
//scroll_mouseWheelPixels: 100 默认弹出层body滚动条滚动速度100px
function Dialog(options) {
    var settings = $.extend({
        //可选类型：
        //1.null - 默认的带有head-body-bottom
        //2.void - 空白弹出层:无默认按钮以及标题,可选择传入一个用来关闭弹出层的按钮的JQuery选择器
        //3.tip - 提示框:弹出一个操作提示,在tip_live时间(单位毫秒)内存在,然后消失,无回调函数
        //4.loading - 载入框:弹出一个载入中的弹出层.需要代码手动remove.
        //5.confirm - 确认框 (开发中)
        type: null, //弹出层类型,默认null(即可自定义添加HTML,css控制样式)
        style: 1, //默认样式1

        width: '80%', //默认宽度
        max_height: '80%', //默认最大高度
        fadeSpeed: 200, //默认淡入淡出时间200毫秒

        tip_live: 2000, //操作提示层生存时间(单位毫秒),只有在type为tip时生效
        tip_content: "", //操作提示层内容,只有在type为tip时生效

        loading_content: "载入中...", //载入层提示文字

        hasHead: true, //默认有标题
        head_txt: "是否确认当前操作", //默认弹出层标题
        headHTML: "", //可传入String自定义head,type为void时会自动启用

        html: "", //默认弹出框的内容
        bottomHTML: "", //可传入String自定义bottom,type为void时会自动启用

        confirm_id: "#dialog_L_", //默认左侧按钮绑定的id前缀(开发中)
        confirm_btn: true, //默认显示确认按钮
        confirm_txt: "确认", //默认确认按钮显示文字确认
        callback_L: null, //左侧按钮点击回调函数(confirm_btn)
        cancel_id: "#dialog_R_", //默认右侧按钮绑定的id前缀(开发中)
        cancel_btn: true, //默认显示取消按钮
        cancle_txt: "取消", //默认取消按钮显示文字取消
        callback_R: null, //右侧按钮点击回调函数(cancel_btn)

        hasBg: true, //默认有黑色背景
        bgClose: false, //默认无法点击bg取消弹出框
        callback_bc: null, //bg等关闭按钮点击回调函数,只有在bg_close为true的情况下才会生效

        otherClose: null, //传入一个用来关闭弹出层的按钮的JQuery选择器,若要唯一绑定,传入的JQuery必须唯一
        callback_oc: null, //otherClose的回调函数

        callback_ini: null, //弹出层初始化回调函数
        callback_close: null, //弹出层消失回调函数

        scroll: true, //默认弹出层有滚动条
        scroll_mouseWheelPixels: 100 //默认弹出层body滚动条滚动速度100px
    }, options);

    //======= 变量 START =======//
    var _this = this;
    var dialogBodyMaxHeight = null;

    //把当前时间(从1970.1.1开始的毫秒数)给弹出层作为ID标识
    var dialogId = new Date().getTime();

    var dialogHtml = "";
    //======= 变量 END =======//

    //======= 接口函数 START =======//
    //弹出层dialog-body滚动条更新(CANCEL)
    //_this.updateDialogScroll = function () {
    //    if (settings.scroll) {
    //        $(".dialog-body").mCustomScrollbar("update");
    //    }
    //}
    //获得弹出层dialog-body的max-height
    _this.getDialogBodyMaxHeight = function () {
        return dialogBodyMaxHeight;
    }
    //移除弹出层
    _this.remove = function () {
        delDialog(dialogId);
    }
    //移除载入弹出层
    _this.removeLoading = function () {
        delDialog("loading" + dialogId);
    }
    //======= 接口函数 END =======//


    //======= 弹出层HTML构造 START =======//
    //构造弹出层
    if (settings.type == null) {
        //默认弹出层
        dialogHtml = typeDefaultHtmlCreate();
    } else if (settings.type == "void") {
        //空的弹出层
        dialogHtml = typeVoidHtmlCreate();
    } else if (settings.type == "tip") {
        //提示弹出层
        dialogHtml = typeTipHtmlCreate();
    } else if (settings.type == "loading") {
        //载入中弹出层
        dialogHtml = typeLoadingHtmlCreate();
    } else if (settings.type == "confirm") {
        //确认框弹出层
        dialogHtml = typeConfirmHtmlCreate();
    }

    //1.默认的弹出层构造函数
    function typeDefaultHtmlCreate() {
        var HTML = "";
        HTML += "<div id='" + dialogId + "' class='dialog-position-wrap' style='display:none;'>";
        HTML += "<div class='dialog-wrap ds" + settings.style + "' style='width:" + settings.width + ";max-height:" + settings.max_height + ";'>";

        //dialog-top构造
        HTML += "<div class='dialog-top'>";
        //判断标题是否显示(hasHead优先级最高)
        if (settings.hasHead) {
            //若headHTML有内容(不为空),则覆盖默认的head
            if (isEmptyString(settings.headHTML)) {
                HTML += settings.headHTML;
            } else {
                HTML += "<div class='dialog-head ds" + settings.style + "'>" + settings.head_txt + "</div>";
            }
        }
        HTML += "</div>";

        //dialog-body构造
        HTML += "<div class='dialog-body'>";
        HTML += settings.html;
        HTML += "</div>";

        //dialog-bottom构造
        HTML += "<div class='dialog-bottom'>";
        //若bottomHTML有内容(不为空),则覆盖默认的bottom
        if (isEmptyString(settings.bottomHTML)) {
            HTML += settings.bottomHTML;
        } else {
            //判断按钮显示
            if (settings.confirm_btn || settings.cancel_btn) {
                HTML += "<div class='dialog-btn-wrap ds" + settings.style + "'>";
                if (settings.confirm_btn)
                    HTML += "<div id='dialog_L_" + dialogId + "' class='dialog-btn ds" + settings.style + "'>" + settings.confirm_txt + "</div>";
                if (settings.cancel_btn)
                    HTML += "<div id='dialog_R_" + dialogId + "' class='dialog-btn ds" + settings.style + "'>" + settings.cancle_txt + "</div>";
                HTML += "</div>";
            }
        }
        HTML += "</div>";

        //dialog-bg构造
        if (settings.hasBg) HTML += "<div id='bg_" + dialogId + "' class='dialog-bg ds" + settings.style + "'></div>";

        HTML += "</div></div>";
        return HTML;
    }

    //2.type: void 弹出层HTML构造
    function typeVoidHtmlCreate() {
        var html = "";
        html += "<div id='" + dialogId + "' class='dialog-position-wrap' style='display:none;'>";
        html += "<div class='dialog-wrap ds" + settings.style + "' style='width:" + settings.width + ";max-height:" + settings.max_height + ";'>";

        //dialog-top构造
        html += "<div class='dialog-top'>";
        //判断标题是否显示(hasHead优先级最高)
        if (settings.hasHead) {
            html += settings.headHTML;
        }
        html += "</div>";

        //dialog-body构造
        html += "<div class='dialog-body'>";
        html += settings.html;
        html += "</div>";

        //dialog-bottom构造
        html += "<div class='dialog-bottom'>";
        html += settings.bottomHTML;
        html += "</div>";

        //dialog-bg构造
        if (settings.hasBg) html += "<div id='bg_" + dialogId + "' class='dialog-bg ds" + settings.style + "'></div>";

        html += "</div></div>";
        return html;
    }

    //3.type: tip 弹出层HTML构造
    function typeTipHtmlCreate() {
        var html = "";
        html += "<div id='tip" + dialogId + "' class='dialog-position-wrap' style='display:none;'>";
        html += "<div class='tip-wrap'>";
        html += "<div class='tip-content'>";
        html += settings.tip_content;
        html += "</div></div>";
        return html;
    }

    //4.type: loading 弹出层HTML构造(TO DO)
    function typeLoadingHtmlCreate() {
        var html = "";
        html += "<div id='loading" + dialogId + "' class='dialog-position-wrap' style='display:none;'>";
        html += "<div class='dialog-wrap'>";
        html += "<div class='loading-content'>";
        html += settings.loading_content;
        //dialog-bg构造
        if (settings.hasBg) html += "<div id='bg_" + dialogId + "' class='dialog-bg ds" + settings.style + "'></div>";
        html += "</div></div>";
        return html;
    }

    //5.type: confirm 弹出层HTML构造(TO DO)
    function typeConfirmHtmlCreate() {
        var html = "";

        return html;
    }
    //======= 弹出层HTML构造 END =======//

    //======= 弹出层显示 START =======//
    //把弹出层HTML添加到页面中
    if (settings.type == "tip") {
        $("body").before(dialogHtml);
        //操作提示显示
        $("#tip" + dialogId).fadeIn(settings.fadeSpeed, function () {
            //操作提示延时自动消失
            setTimeout(function () {
                delDialog("tip" + dialogId);
            }, settings.tip_live);
        });
    } else if (settings.type == "loading") {
        $("body").before(dialogHtml);
        //载入中弹出层显示
        $("#loading" + dialogId).fadeIn(settings.fadeSpeed);
    } else {
        $("body").before(dialogHtml);
        //弹出层显示
        $("#" + dialogId).fadeIn(settings.fadeSpeed, function () {
            //设置dialog最大高度
            setDialogMaxHeight();
            //弹出层初始化回调函数
            if (settings.callback_ini != null) settings.callback_ini();
            //滚动条更新(CANCEL)
            //if (settings.scroll) {
            //    $(".dialog-body").mCustomScrollbar("update");
            //}
        });
    }
    //======= 弹出层显示 END =======//


    //======= 弹出层事件添加 START =======//
    if (settings.type == "tip") {
        //提示框被点击的时候直接消失
        $("#tip" + dialogId).bind('click', function () {
            //隐藏并删除确认框
            delDialog("tip" + dialogId);
        });
    } else {
        //其他关闭按钮
        if (settings.otherClose) {
            $(settings.otherClose).live('click', function () {
                //左侧按钮操作
                if (settings.callback_oc != null) settings.callback_oc();
                //隐藏并删除弹出层
                delDialog(dialogId);
            });
        }
        //底部按钮
        if ((settings.confirm_btn || settings.cancel_btn) && settings.type != "void") {
            if (settings.confirm_btn) {
                $(settings.confirm_id + dialogId).bind('click', function () {
                    //左侧按钮操作
                    if (settings.callback_L != null) settings.callback_L();
                    //隐藏并删除弹出层
                    delDialog(dialogId);
                });
            }
            if (settings.cancel_btn) {
                $(settings.cancel_id + dialogId).bind('click', function () {
                    //右侧按钮操作
                    if (settings.callback_R != null) settings.callback_R();
                    //隐藏并删除弹出层
                    delDialog(dialogId);
                });
            }
        }
        //背景关闭按钮
        if (settings.bgClose) {
            $("#bg_" + dialogId).bind('click', function () {
                //关闭弹出框后操作
                if (settings.callback_bc != null) settings.callback_bc();
                //隐藏并删除弹出层
                delDialog(dialogId);
            });
        }
    }
    //======= 弹出层事件添加 END =======//


    //======= 内部工具函数 START =======//
    //隐藏并删除弹出层
    function delDialog(dialogNum) {
        $("#" + dialogNum).fadeOut(settings.fadeSpeed, function () {
            //弹出层消失回调函数
            if (settings.callback_close != null) settings.callback_close();
            $("#" + dialogNum).remove();
        });
    }

    //设置dialog最大高度
    function setDialogMaxHeight() {
        var dialogWrapH = $(".dialog-wrap").outerHeight();
        var dialogHeadH = $(".dialog-top").outerHeight();
        var dialogBtnH = $(".dialog-bottom").outerHeight();
        //dialog_max_H此值为弹出层有实际内容的最大高度
        var dialogMaxH = dialogWrapH - dialogHeadH - dialogBtnH;
        //dialog_body_max_height此值为弹出层满高的最大高度
        dialogBodyMaxHeight = $(window).height() * (parseInt(settings.max_height) / 100) - dialogHeadH - dialogBtnH;
        $(".dialog-body").css("max-height", dialogMaxH);
    }

    //判断字符串是否为空
    function isEmptyString(str) {
        if (str == "") {
            return false;
        } else {
            return true;
        }
    }
    //======= 内部工具函数 END =======//

    //弹出层dialog-body滚动条(CANCEL)
    //if (settings.scroll) {
    //    //弹出层添加滚动条
    //    $(".dialog-body").mCustomScrollbar({
    //        //mouseWheelPixels: settings.scroll_mouseWheelPixels
    //        mouseWheelPixels: "auto"
    //    });
    //}
}
