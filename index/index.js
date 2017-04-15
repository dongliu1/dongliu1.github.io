/**
 * Created by Administrator on 2017/4/15.
 */
$(function () {
    _init_tools._init();
    _init_right._init();
    var _height=$(".contain").height()+10;
    console.log(_height);
    window.parent.$("#iframe-index").height(_height);
});
var _init_tools={
    _init:function () {
        $.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js', function(_result) {
            console.log(_result);
            console.log(remote_ip_info);
            if (remote_ip_info.ret == '1') {
                $.ajax({
                    type: "GET",
                    url: "http://wthrcdn.etouch.cn/weather_mini?city="+remote_ip_info.city,
                    data: "",
                    success: function(msg){
                        console.log(msg);
                        msg=JSON.parse(msg);
                        var _info="<span>"+msg.data.city+"</span><span style='margin-left:1em;'>"+msg.data.forecast[0]["type"]+"</span><span style='margin:.5em 1em;'>"+msg.data.wendu+"</span><span>"+msg.data.forecast[0]["fengxiang"]+"</span>";
                        $(".weather-forecast").html(_info);
                    }
                });
            }
        });
    }
};
var _init_left={
    _init:function () {

    },
    _init_tabs:function () {

    }
};

var _init_middle={
    _init:function () {

    }
};

var _init_right={
    _imgInfo:[
        {tabid:"xyzc",imgname:"zhxy01.png"},
        {tabid:"xxms",imgname:"zhxy07.png"},
        {tabid:"zxxx",imgname:"zhxy02.png"},
        {tabid:"jxpg",imgname:"zhxy03.png"},
        {tabid:"oaxt",imgname:"zhxy10.png"},
        {tabid:"cpxt",imgname:"zhxy04.png"},
        {tabid:"jwgl",imgname:"zhxy11.png"},
        {tabid:"dxxt",imgname:"zhxy05.png"},
        {tabid:"dygl",imgname:"zhxy06.png"},
        {tabid:"xnjt",imgname:"zhxy08.png"},
        {tabid:"xzxx",imgname:"zhxy09.png"}
    ],
    _init:function () {
        $.each(_init_right._imgInfo,function (i, idata) {
            var _src="../rsc/img/"+idata.imgname;
            var _a="<a tabid='"+idata.tabid+"' href='javascript:void(0)' style='display:inline-block;height:45px;margin-bottom: 10px;width:100%'>&nbsp;</a>";
            var obj=$(_a).appendTo($(".content-right>.tab-contain:first .tab-menus"));
            $(obj).css("background","url('"+_src+"')no-repeat");
        })
    }
};