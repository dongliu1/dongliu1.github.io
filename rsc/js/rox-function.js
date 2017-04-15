/**
 * Created by liudong on 2017/4/14.
 */

//添加tabs
function init_rox_tabs(tabid,_src) {
    var iframeid="iframe-"+tabid;
    var _iframe=$("#"+iframeid);
    var param=_src.split("?");
    var isExist=false;
    $(".inc-content>iframe").hide();
    if(_iframe.length){
        _iframe.show();
        isExist=true;
    }else{
        var _html="<iframe id='"+iframeid+"' name='' src='"+_src+"' onload='init_load_pubtemplate(\""+iframeid+"\")' width='100%'  frameborder='no' border='0' marginwidth='0' marginheight='0' scrolling='no' allowtransparency='yes' style='height: 886px;'></iframe>";
        $(".content>.inc-content").append(_html);
    }
    //判断路径是否传入参数
    if(param[1])$(".inc-tabs>ul:not(:first)").hide();
    if(isExist)init_select_tab(_iframe,param[1]);
}

//选中iframe内对应tab项
function init_select_tab(_iframe,param) {
    var doc=$(_iframe).contents();
    var menuid=param.split("=")[1];
    if(!menuid)return;
    $(".inc-left-menus li",doc).removeClass("tab-active");
    $("[nodeid='tab-"+menuid+"']",doc).addClass("tab-active");
    _inc_right._init(doc,_iframe);
}

//加载左部与右部
function init_load_pubtemplate(_iframeid) {
    var _iframe=$("#"+_iframeid);
    var _src=_iframe.attr("src");
    var param=_src.split("?")[1];
    console.log(param,_src);
    if(param.split("=")[1]=="")return;
    var doc=_iframe.contents();
    var _html='<div class="contain"><div class="inc-left"></div><div class="inc-right"></div></div>';
    $("body",doc).html(_html);
    $(".contain>.inc-left",doc).load("templates/public-page/ifr-left.html",function () {
        _inc_left._init(doc,_iframeid);
        var _tabid=_iframeid.replace("iframe","tab");
        var _html="<ul id='"+_tabid+"-menus'>";
        $("#"+_tabid).find("li").each(function () {
            var tabname=$(this).text();
            var mid=$(this).attr("mid");
            //console.log(mid);
            _html+="<li nodeid='tab-"+mid+"' onclick='window.parent._inc_left._onclick(this)'>"+tabname+"</li>"
        });
        _html+="</ul>";
        $(".inc-left-menus",this).html(_html);
        console.log(_src,param);
        init_select_tab("#"+_iframeid,param);
    });
    $(".contain>.inc-right",doc).load("templates/public-page/ifr-right.html",function () {
        _inc_right._init(doc,_iframeid);
    });
}