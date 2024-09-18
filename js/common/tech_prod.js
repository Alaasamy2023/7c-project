$(function(){

	// iframe vid control

	// 20240529 수정 : start
	var players = {};

	$('.oled-prod-iframe > iframe').css('border','2px solid #000')

	function onYouTubeIframeAPIReady() {
		$('.oled-prod-iframe iframe').each(function() {
			var iframeID = $(this).attr('id');
			players[iframeID] = new YT.Player(iframeID);
		});
	}

	function pauseVideo(popupClass) {
		var iframe = $('.oled-prod-popup--' + popupClass).find('iframe')[0];
		var iframeID = $(iframe).attr('id');

		try{
			iframe.remove();
		}catch(e){}
	}

	$('.oled-prod-common__btn').on('click', function(){

		/* 20240603 추가 */
		$('html').css('overflow-y', 'hidden');
		/* 20240603 추가 */

		var popupClass = $(this).data('popup');
		var iframeStructure = $('.oled-prod-popup--' + popupClass).find('.oled-prod-iframe')[0];
		var iframeSrc = $('.oled-prod-popup--' + popupClass).find('iframe').attr('src');
		var oldIframeSrc = $('.oled-prod-popup--' + popupClass).find('iframe:first-child');
		var iframeDataSrc = $('.oled-prod-popup--' + popupClass).find('.oled-prod-iframe').attr('data-iframeSrc');

		try{
			const iframe = document.createElement('iframe');

			iframe.setAttribute('src', iframeDataSrc);
			iframeStructure.appendChild(iframe);
		}catch(e){}


		// iframe.setAttribute('src',ttt);
		// iframeStructure.prepend(iframe);


		// const videoId = $('.oled-prod-popup--' + popupClass).find('iframe').getAttribute('data-url');

		// $('.oled-prod-popup--' + popupClass)

		// console.log(videoId);


		$('.oled-prod-popup--' + popupClass).addClass('is-active');
		setTimeout(function(){
			$('.oled-prod-popup--' + popupClass + ' .oled-prod-iframe, .oled-prod-popup--' + popupClass + ' .oled-prod-popup__close').stop().fadeIn(300);
			try{
				$('.oled-prod-popup--' + popupClass).find('.oled-prod-lu__in').stop().fadeIn(300);
			} catch(e) {}
		}, 500);
	});

	$('.oled-prod-popup__close').on('click', function(){

		/* 20240603 추가 */
		$('html').css('overflow-y', 'scroll');
		/* 20240603 추가 */

		var popupClass = $(this).data('popup');
		$('.oled-prod-popup--' + popupClass + ' .oled-prod-iframe, .oled-prod-popup--' + popupClass + ' .oled-prod-popup__close').stop().fadeOut(300);
		setTimeout(function() {
			$('.oled-prod-popup--' + popupClass).removeClass('is-active');
			pauseVideo(popupClass);
		}, 300);
		try {
			$('.oled-prod-popup--' + popupClass).find('.oled-prod-lu__in').stop().fadeOut(300);
		} catch(e) {}

	});

	var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;


	// 20240529 수정 : End


	// 20240529 추가 : start
	$('.oled-prod-popup--video .oled-prod-popup__close').on('click', function(){
		var videoElement = $(this).closest('.oled-prod-popup--video').find('video').get(0);
		if(videoElement) {
			videoElement.pause();
			videoElement.currentTime = 0;
		}
	});
	
	// 20240529 추가 : end
	// END :: iframe vid control


	// sticky-bar indicator
	// var Indfocus = $('.tab-section')
	// , IndSticky = $('.sticky-bar')
	// , IndSticky_height = IndSticky.outerHeight();

	// $(window).on('scroll', function () {
	// 	var cur_pos = $(this).scrollTop();

	// 	Indfocus.each(function() {
	// 		var top = $(this).offset().top - IndSticky_height,
	// 			bottom = top + $(this).outerHeight();

	// 		if (cur_pos >= top && cur_pos <= bottom) {
	// 			IndSticky.find('li').removeClass('active');
	// 			Indfocus.removeClass('active');
				
	// 			$(this).addClass('active');

	// 			IndSticky.find('a[href="#'+$(this).attr('id')+'"]').parent().addClass('active');
	// 		}
	// 	});
	// });


	// // Test
	var Indfocus = $('.tab-section'),
	IndSticky = $('.sticky-bar'),
	IndSticky_height = IndSticky.outerHeight();

	/* 20240530_v5 수정 */
	/* 20240530_v2 수정 */
	$(window).on('scroll', function () {
		if($(window).width() > 1200){
			/* 20240607 수정 */
			var cur_pos = $(this).scrollTop() + 20;
			/* // 20240607 수정 */

			Indfocus.each(function() {
				var top = $(this).offset().top - IndSticky_height,
					bottom = top + $(this).outerHeight();

				if (cur_pos >= top && cur_pos <= bottom) {
					IndSticky.find('li').removeClass('active');
					Indfocus.removeClass('active');

					$(this).addClass('active');

					IndSticky.find('a[href="#'+$(this).attr('id')+'"]').parent().addClass('active');
				}
			});
		} else {
			/* 20240607 수정 */
			var cur_pos = $(this).scrollTop() + 20;
			/* // 20240607 수정 */

			Indfocus.each(function() {
				var top = $(this).offset().top - IndSticky_height,
					bottom = top + $(this).outerHeight();

				if (cur_pos >= top && cur_pos <= bottom) {
					IndSticky.find('li').removeClass('active');
					Indfocus.removeClass('active');

					$(this).addClass('active');

					IndSticky.find('a[href="#'+$(this).attr('id')+'"]').parent().addClass('active');
				}
			});
		}
	});
	/* // 20240530_v2 수정 */

	/* 20240530_v2 추가 */
	$('.sticky-tab-box > ul > li > a').on('click', function(e){
		// if($(window).width() <= 1200){
			e.preventDefault();
		// }
	})
	/* // 20240530_v2 추가 */

	/* 20240530_v2 수정 */
	$(document).on('click', '.sticky-bar a', function(e) {
		if($(window).width() <= 1200){
			/* 240528 제거 */
			// e.preventDefault();
			/* // 240528 제거 */
			var target = $($(this).attr('href')),
				offset = target.offset().top - 10;
	
			// console.log("스크롤 후"+offset);
	
			var isUp = $('body').hasClass('up');
	
			if (isUp) {
				// $('html, body').animate({ scrollTop: offset - 159 }, 1, function() {
					$('html, body').animate({ scrollTop: offset - 93 }, 1, function() {
					// console.log('up 있을때 실행');
				});
			} else {
				$('html, body').animate({ scrollTop: offset - 93 }, 1, function() {
					// console.log('up 없을때 실행');
				});
			}
		} else {
			var target = $($(this).attr('href')),
				offset = target.offset().top - 10;
	
			// console.log("스크롤 후"+offset);
	
			var isUp = $('body').hasClass('up');
	
			if (isUp) {
				// $('html, body').animate({ scrollTop: offset - 159 }, 1, function() {
					$('html, body').animate({ scrollTop: offset - 10 }, 1, function() {
					// console.log('up 있을때 실행');
				});
			} else {
				$('html, body').animate({ scrollTop: offset - 10 }, 1, function() {
					// console.log('up 없을때 실행');
				});
			}
		}
	});
	/* // 20240530_v2 수정 */
	
	/* // 20240530_v5 수정 */


	/*
	.tab-section(Indfocus)은 스크롤이 걸리는 영역의 top값을 구하기 위함
	.sticky-bar(IndSticky)는 2depth 메뉴

	<div class="sticky-bar">
		<button class="sticky-title__btn">OLED.2세대</button>
		<div class="sticky-tab-box">
			<ul>
				<li>
					<a href="#highlight" class="active">하이라이트</a>
				</li>
				<li>
					<a href="#features">특장점</a>
				</li>
				<li>
					<a href="#specifications">제품 스펙</a>
				</li>
			</ul>
		</div>
		<div class="sticky-bar__in">
			<a href="oled-3rd-gen" class="sticky-bar__link">OLED.3세대</a>
		</div>
	</div>

	<div class="contents-box gray tab-section"id="highlight"></div>
	<div class="tab-section" id="features"></div>
	<div class="tab-section" id="specifications"></div>

	var Indfocus = $('.tab-section'),
	IndSticky = $('.sticky-bar'),
	IndSticky_height = IndSticky.outerHeight();

	$(window).on('scroll', function () {
		var cur_pos = $(this).scrollTop();

		Indfocus.each(function() {
			var top = $(this).offset().top - IndSticky_height,
				bottom = top + $(this).outerHeight();

			if (cur_pos >= top && cur_pos <= bottom) {
				IndSticky.find('li').removeClass('active');
				Indfocus.removeClass('active');

				$(this).addClass('active');

				IndSticky.find('a[href="#'+$(this).attr('id')+'"]').parent().addClass('active');
			}
		});
	});

	$(document).on('click', '.sticky-bar a', function(e) {
		if($(window).width() <= 1200){
			e.preventDefault();
			var target = $($(this).attr('href')),
				offset = target.offset().top;

			if ($('body').hasClass('up')) {
				$('html, body').animate({ scrollTop: offset - 159 }, 500);
			} else {
				$('html, body').animate({ scrollTop: offset - 93 }, 500);
			}
		}
	});


	*/


	$('.sticky-title__btn').on('click', function(){
		if($(this).hasClass('active') == false){
			$(this).siblings('.sticky-bar__in').stop().slideDown(300);
			$(this).addClass('active');
			$(this).parent().addClass('active');
		} else {
			$(this).siblings('.sticky-bar__in').stop().slideUp(300);
			$(this).removeClass('active');
			$(this).parent().removeClass('active');
		}
	});

	$(document).mouseup(function(e){
		var popup_close = $(".sticky-bar__in, .sticky-title__btn");
		if (!popup_close.is(e.target) && popup_close.has(e.target).length === 0){
			$(".sticky-bar__in").stop().slideUp(300);
			$(".sticky-title__btn").removeClass("active");
			$(".sticky-bar").removeClass('active');
		}
	});
	// END :: sticky-bar indicator


	// tab Menu
	$(document).on('click', '.tab_menu > li', function (e) {
		e.preventDefault();

		if ($(this).attr('data-url') != undefined) {
			if ($(this).attr('target') == '_blank') {
				window.open($(this).attr('data-url'));
			} else {
				location.href = $(this).attr('data-url');
			}
		} else {
			$(this).parent().children('li').removeClass('active');
			var ind = $(this).index();
			$(this).addClass('active');
			$(".tab_content[data-tab='" + $(this).parent().attr('data-tab') + "']").children('div:not(.visible_tab)').hide();
			$(".tab_content[data-tab='" + $(this).parent().attr('data-tab') + "']").children('div.visible_tab').css({"visibility":"hidden","height":"0"});
			$(".tab_content[data-tab='" + $(this).parent().attr('data-tab') + "']").each(function () {
				$(this).children('div:not(.visible_tab)').eq(ind).fadeIn(500);
				$(this).children('div.info_wrap').eq(ind).fadeIn(500).css('display','flex');
			});
			$(".tab_content[data-tab='" + $(this).parent().attr('data-tab') + "']").each(function () {
				$(this).children('div:not(.visible_tab)').eq(ind).show();
				$(this).children('div.visible_tab').eq(ind).css({"visibility":"visible","height":"auto"});
			});
		}
	});
	// END :: tab Menu

	// oled Ace Slide
	try{
		$(".oled-ace__slide:not('.oled-ace__slide--type2)").each(function(index, element) {
			var $this = $(this);
			$this.addClass('instance-' + index);
			$this.siblings().find(".oled-ace__pg").addClass('instance_pg-' + index);
	
			var p_data = new Swiper('.instance-' + index, {
				slidesPerView: '1',
				spaceBetween: 10,
				speed: 500,
				observer: true,
				observeParents: true,
				navigation: {
					nextEl: $this.find('.oled-ace__controller .swiper-button-next'),
					prevEl: $this.find('.oled-ace__controller .swiper-button-prev'),
				},
				pagination: {
					el: $this.find('.swiper-pagination'),
					clickable: true
				},
			});
	
			// Ensure we are referencing the correct slide
			p_data.on("slideChange", function() {
				$this.find('video').each(function() {
					$(this).get(0).pause();
					$(this).siblings('.common-int-play').css('opacity', '1');
				});
	
				var activeSlide = $this.find('.swiper-slide').eq(p_data.activeIndex);
				if (activeSlide.find("video").length > 0) {
					var video = activeSlide.find("video")[0];
				}
			});
	
			// Initialize video elements and controls
			$this.find('.swiper-slide').each(function(slideIndex) {
				var vidElementPC = $(this).find('#DeVidPC-' + index + '-' + slideIndex)[0];
				var vidElementMO = $(this).find('#DeVidMO-' + index + '-' + slideIndex)[0];
				var playPauseBtn = $(this).find('#playPauseBtn-' + index + '-' + slideIndex)[0];

				if (vidElementPC && vidElementMO && playPauseBtn) {
					vidElementPC.muted = true;
					vidElementMO.muted = true;
	
					vidElementPC.addEventListener('ended', function() {
						playPauseBtn.style.opacity = '1';
					});
	
					vidElementMO.addEventListener('ended', function() {
						playPauseBtn.style.opacity = '1';
					});
	
					playPauseBtn.addEventListener('click', function() {
						console.log('Play/Pause button clicked');
						if (vidElementPC.paused) {
							vidElementPC.play();
							vidElementMO.play();
							playPauseBtn.style.opacity = '0';
						} else {
							vidElementPC.pause();
							vidElementMO.pause();
							playPauseBtn.style.opacity = '1';
						}
					});
				}
			});
		});


	}catch(e){}
	// END :: oled Ace Slide


	// OLED-2 counting animation
	const $counters = $(".counting-box .counting");

	const exposurePercentage = 100;
	const duration = 1000;

	const addCommas = true; // true = 1,000 / false = 1000

	function updateCounter($el, start, end) {
		let startTime;
		function animateCounter(timestamp) {
			if (!startTime) startTime = timestamp;
			const progress = (timestamp - startTime) / duration;
			const current = Math.round(start + progress * (end - start));
			const formattedNumber = addCommas ? current.toLocaleString() : current;
			$el.text(formattedNumber);
			
			if (progress < 1) {
				requestAnimationFrame(animateCounter);
			} else {
				$el.text(addCommas ? end.toLocaleString() : end);
			}
		}
		requestAnimationFrame(animateCounter);
	}


	$(window).on('scroll', function() {
		$counters.each(function() {
			const $el = $(this);
			if (!$el.data('scrolled')) {
				const rect = $el[0].getBoundingClientRect();
				const winHeight = window.innerHeight;
				const contentHeight = rect.bottom - rect.top;
				
				if (rect.top <= winHeight - (contentHeight * exposurePercentage / 100) && rect.bottom >= (contentHeight * exposurePercentage / 100)) {
					const start = parseInt($el.data("start"));
					const end = parseInt($el.data("end"));
					updateCounter($el, start, end);
					$el.data('scrolled', true);
				} 
			}
		});
	}).scroll();
	// END :: OLED-2 counting animation


	// oled-3 > effect
	/* 20240603 수정 */
	$('.oled-other__link, .other-view__link').on('mouseover', function(){
		$(this).addClass('active');
	}).on('mouseleave', function(){
		$(this).removeClass('active');
	});
	/* // 20240603 수정 */
	// END :: oled-3 > effect

	// oled-meta-spec__scroll
	// oled-meta-spec__list

	// showGradient();
	$('.oled-meta-spec__scroll').on('scroll', function() {
		showGradient.call(this);
	});
	
	function showGradient() {
		var $scrollContainer = $(this);
		var scrollLeft = $scrollContainer.scrollLeft();
		var scrollWidth = $scrollContainer[0].scrollWidth;
		var containerWidth = $scrollContainer.width();
		
		if (scrollLeft === 0) {
			console.log('처음');
		} else if (Math.ceil(scrollLeft + containerWidth) >= scrollWidth) {
			$(this).addClass('active');
		} else {
			$(this).removeClass('active');
		}
	}
	


});
// End-load

/* 20240605 추가 */

/* // 20240605 추가 */