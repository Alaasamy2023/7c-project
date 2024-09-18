$(function(){
    $(window).on('scroll', function(){
        //이미지 애니메이션
        var scr = $(this).scrollTop();
        var hig = $(this).height();

        if ( $('[class*="ani_big"]').length > 0 ){
            $('[class*="ani_big"]').each(function(){
                var $offset = $(this).offset().top;

                if ( $(this).is(".ani_big_layer") ){
                    hig = hig / 2;
                };

                if ( scr > ($offset - hig) && !$(this).is(".ani") ){
                    $(this).addClass('ani');
                    if ( $(this).is(".ani_big_layer") ){
                        productLayerStart();
                    };
                };
            });
        };
    });

    // product layer
    function productLayerStart(){
        if ( $(".list_layer").length > 0 ){
            $(".list_layer > ul > li:first-child > a").trigger("click");
        };
    };
});
/*<== 스크롤 애니 ==*/
function animateFrom(elem, direction) {
  direction = direction || 1;
  var x = 0,
      y = direction * 100;
  if(elem.classList.contains("from_left")) {
    x = -100;
    y = 0;
  } else if (elem.classList.contains("from_right")) {
    x = 100;
    y = 0;
  } else if (elem.classList.contains("from_bottom")) {
    x = 0;
    y = 100;
  } else if (elem.classList.contains("from_top")) {
    x = 0;
    y = -100;
  } else if (elem.classList.contains("from_none")) {
    x = 0;
    y = 0;
  }
  elem.style.transform = "translate(" + x + "px, " + y + "px)";
  elem.style.opacity = "0";
  gsap.fromTo(elem, {x: x, y: y, autoAlpha: 0}, {
    delay:0.5,
    duration: 1.25,
    x: 0,
    y: 0,
    autoAlpha: 1,
    ease: "expo",
    overwrite: "auto"
  });
}
function hide(elem) {
  gsap.set(elem, {autoAlpha: 0});
}
document.addEventListener("DOMContentLoaded", function() {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".gs_ani").forEach(function(elem) {
    hide(elem);

    ScrollTrigger.create({
      trigger: elem,
      once:true,
      onEnter: function() { animateFrom(elem) }
      // onEnterBack: function() { animateFrom(elem, -1) },
      // onLeave: function() { hide(elem) }
    });
  });
});
/*== 스크롤 애니 ==>*/
