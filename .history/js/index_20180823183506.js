(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
$(function () {

    //首页一键体检
    $('#beforeBtn').on('click',function(){
        $('.before').hide();
        $('.check').show();
        $('.progress').circleProgress({
            value: 1,
            size: 115,
            startAngle: Math.PI/2,
            thickness: 14,
            animation: {duration:12000},//进度条完成时间（ms）
            fill: {
                gradient: ["#32edfd"]
            },
            //circle-animation-start：	function(event)-event - jQ事件 
            //circle-animation-progress：	function(event, animationProgress, stepValue)：-event - jQ事件 animationProgress - 从0.0到1.0stepValue - 当前的步长值，从0.0到value 
            //circle-animation-end:	function(event)：-event - jQ事件
        }).on('circle-animation-progress', function (event, progress, stepValue) {
                $(this).find('span').html(parseInt(stepValue.toFixed(2) * 100));
        }).on('circle-animation-end',function(){
            $('.message').removeClass('move');
            stop();
            $('.check').hide();
            $('.result').show();
        });
        start();
        messageMove();
    });

    //远程测速
    $('.progress_1').circleProgress({
        value: 1,
        size: 150,
        startAngle: Math.PI / 2,
        thickness: 14,
        animation: { duration: 12000 },//进度条完成时间（ms）
        fill: {
            gradient: ["#32edfd"]
        },
    }).on('circle-animation-start', function () {
        start();
    }).on('circle-animation-progress', function (event, progress, stepValue) {
        $(this).find('span').html(parseInt(stepValue.toFixed(2) * 100));
    }).on('circle-animation-end', function () {
        stop();
    });

    //检查项滚动
    var messageInnerText = '1111';
    function messageScroll(){
        $('.message').children('li:first-child').remove();
        $('.message').append('<li>'+messageInnerText+'</li>');
        if(!$('.message').hasClass('move')){
            window.clearInterval(timer);
        }
    }
    function messageMove(){
        timer = window.setInterval(messageScroll,500);
    }
    
    
    //检测时间
    var hour,minute,second;
    hour=minute=second=0;
    var millisecond=0;
    var int;
    function start(){
        int=setInterval(times,50);
    }
    function times(){
        millisecond=millisecond+50;
        if(millisecond>=1000){
            millisecond=0;
            second=second+1;
        }
        if(second>=60){
            second=0;
            minute=minute+1;
        }
  
        if(minute>=60){
            minute=0;
            hour=hour+1;
        }
      $('#timeText').text((hour<10?"0"+hour:hour)+':'+(minute<10?"0"+minute:minute)+':'+(second<10?"0"+second:second));
    }
    function stop(){
        window.clearInterval(int);
    }

    
    //查看详细清单下拉
    $('.arrow').on('click',function(){
        var $this = $(this),
            $listBox = $(this).siblings('div');
        $listBox.slideToggle("normal",function(){
            if($listBox.css('display') === 'block'){
                $this.addClass('act');
                $this.siblings('p').css('opacity','0');
            }else{
                $this.removeClass('act');
                $this.siblings('p').css('opacity','1');
            }
        });
    });



    //网关重启 WIFI开关 LED指示灯开关 查看黑名单
    $('#controlBox').on('click','a',function(){
        var $this = $(this);
        if($this.hasClass('off')){
            $this.removeClass('off');
        }else{
            $this.addClass('off');
        }
    });

    $('#look_blacklist').on('click',function(){
        $('.blacklistModel').show();
    });

    //返回
    $('.back').on('click',function(){
        window.history.go(-1);
    });
    //关闭弹窗
    $('.close').on('click',function(){
        $(this).parent().hide();
        hideMask();
    });  
    //显示遮罩层
    function showMask(){
        $("#mask").css("height",$(document).height());
        $("#mask").css("width",$(document).width());
        $("#mask").show();
        $('body').css('position','fixed');
    }
    //隐藏遮罩层
    function hideMask(){
        $("#mask").hide();
        $('body').css('position','unset');
    }
});