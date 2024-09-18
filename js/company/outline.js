var onReady = function() {
    const attr = $("input[name=target]").val();
    let target = '#sec_corporate_overview01';

    if (attr == 'business-line') {
        target = '#sec_corporate_overview02';
    } else if (attr == 'vision') {
        target = '#sec_corporate_overview03';
    }

    moveSection(target);
};

function moveSection(target){
    let margin = 50;
    let moveDelay = 200;
    let moveSpeed = 700;
    let moveEasing = "easeOutExpo";
    let winWidth = $(window).width();
    let mobile = 1200;

    if ( target == '#sec_corporate_overview01' ){
        margin = 63;
    };

    if ( winWidth <= mobile ){
        margin = margin / 2;
    };

    if ( $(target).length > 0 ){
        let top = $(target).offset().top - margin;

        // 사이트맵 닫기
        /*$("#sitemap").removeClass("on");
        $(".sitemap").stop().fadeOut(moveDelay);*/

        // 스크롤 이동
        setTimeout(function(){
            $("html, body").stop().animate({ "scrollTop": top }, moveSpeed, moveEasing);
        }, moveDelay + 100);
    };
};

$(document).ready(onReady);