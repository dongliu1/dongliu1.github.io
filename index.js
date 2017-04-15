/**
 * Created by liudong on 2017/4/14.
 */
$(function () {
    inc_tabs._init();
    inc_content._init();
    inc_footer._init();
});

var inc_tabs={
    _init:function () {
        $.each(inc_tabs._tab_menus,function (t, tdata) {
            var _tabid=tdata.tabid;
            var _src=_tabid+"/index.html?menuid="+tdata.mid;
            var _li="<li tabid='tab-"+_tabid+"' onclick='init_rox_tabs(\""+_tabid+"\",\""+_src+"\")'><a href='javascript:void(0)' "+(tdata.name.length==2?"style='letter-spacing:1em;'":"")+">"+tdata.name+"</a></li>";
            $("#tab-menus").append(_li);
            if(tdata.hasOwnProperty("children"))inc_tabs._init_childtabs(_tabid,tdata.children);
        });
        inc_tabs._toggle_childtabs();
    },
    _init_childtabs:function (tabid,nodedata) {
        var _html="<ul id='tab-"+tabid+"' style='display: none;position: absolute;'>";
        $.each(nodedata,function (n,ndata) {
            var _src=tabid+"/index.html?menuid="+ndata.mid;
            _html+="<li mid='"+ndata.mid+"' onclick='init_rox_tabs(\""+tabid+"\",\""+_src+"\")'>"+ndata.name+"</li>"
        });
        _html+="</ul>";
        $(".content>.inc-tabs").append(_html);
    },
    _toggle_childtabs:function () {
        $("#tab-menus>li").on("mouseover",function () {
            var _this=this;
            var _offset=$(_this).offset();
            var _tabid=$(_this).attr("tabid");
            var _width=$(_this).width()-2;
            $("#tab-menus>li>a").removeClass("tab-active");
            $(".inc-tabs>ul:not(:first)").hide();
            $("#"+_tabid).css({"left":_offset.left+"px","top":(_offset.top+38)+"px","min-width":_width+"px"}).show();
            event.stopPropagation();
        });
        $(".inc-tabs>ul:not(:first)").on("mouseover",function () {
           var _tabid=$(this).attr("id");
           console.log(_tabid);
           $("#tab-menus>li>a").removeClass("tab-active");
           $("[tabid='"+_tabid+"']>a").addClass("tab-active");
           event.stopPropagation();
        });
        $(document).on("mouseover",function (e) {
            $("#tab-menus>li>a").removeClass("tab-active");
            $(".inc-tabs>ul:not(:first)").hide();
        })
    },
    _tab_menus:[
        {name:"首页",mid:"",tabid:"index"},
        {name:"校院概况",mid:"xyjj",tabid:"page-profile",children:[
                {name:"校院简介",mid:"xyjj"},
                {name:"现任领导",mid:"xrld"},
                {name:"机构设置",mid:"jgsz"},
                {name:"主要职能",mid:"zyzn"},
                {name:"历史沿革",mid:"lsyg"}
            ]
        },
        {name:"教学工作",mid:"jxgg",tabid:"page-course",children:[
                {name:"教学公告",mid:"jxgg"},
                {name:"教学管理",mid:"jxgl"},
                {name:"教学动态",mid:"jxdt"},
                {name:"教学计划",mid:"jxjh"},
                {name:"教学研究",mid:"jxyj"},
                {name:"教学资料下载",mid:"jxzlxz"}
            ]
        },
        {name:"学术科研",mid:"kydt",tabid:"page-research",children:[
                {name:"科研动态",mid:"kydt"},
                {name:"管理制度",mid:"glzd"},
                {name:"决策咨询",mid:"jczx"},
                {name:"学术成果",mid:"xscg"},
                {name:"报刊杂志",mid:"bkzz"},
                {name:"科研资料下载",mid:"kyzlxz"}
            ]
        },
        {name:"学员管理",mid:"xydt",tabid:"page-student",children:[
                {name:"学员动态",mid:"xydt"},
                {name:"学员管理",mid:"xygl"},
                {name:"学员天地",mid:"xytd"}
            ]
        },
        {name:"队伍建设",mid:"zcfg",tabid:"page-teamwork",children:[
                {name:"政策法规",mid:"zcfg"},
                {name:"工作动态",mid:"gzdt"},
                {name:"师资队伍",mid:"szdw"},
                {name:"学科建设",mid:"xkjs"}
            ]
        },
        {name:"信息化建设",mid:"xxhgk",tabid:"page-information",children:[
                {name:"信息化概况",mid:"xxhgk"},
                {name:"信息化动态",mid:"xxhdt"},
                {name:"规章制度",mid:"gzzd"}
            ]
        },
        {name:"机关党建",mid:"gzdt",tabid:"page-organ",children:[
                {name:"工作动态",mid:"gzdt"},
                {name:"文件汇编",mid:"wjhb"},
                {name:"党风廉政建设",mid:"dflzjs"},
                {name:"精神文明建设",mid:"jswmjs"},
                {name:"老干部工作",mid:"lgbgz"}
            ]
        },
        {name:"服务保障",mid:"gzzd",tabid:"page-service",children:[
                {name:"规章制度",mid:"gzzd"},
                {name:"工作动态",mid:"gzdt"},
                {name:"社会化服务",mid:"shhfw"},
                {name:"意见信箱",mid:"yjxx"}
            ]
        },
        {name:"智慧校园云平台",mid:"",tabid:"page-wsdSchool"}
    ]
};

var inc_content={
    _init:function () {
        init_rox_tabs("index","index/index.html?menuid=");
    }
};

var inc_footer={
    _init:function () {
        $(".content>.inc-footer").load("templates/inc-footer.html");
    }
};