$(function(){
	// 1. slide kv
	var mainKV = new Swiper('.main-kv', {
		slidesPerView: '1',
		spaceBetween: 0,
		// freeMode:true,
		loop:true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		speed:500,
		navigation: {
			nextEl: $('.main-kv__controller .swiper-button-next'),
			prevEl: $('.main-kv__controller .swiper-button-prev')
		},
		pagination: {
			el: $('.main-kv .common-prod__pg'),
			clickable: true
		},
		threshold : 15,
		breakpoints: {
			1200: {
				threshold : 0,
				// allowTouchMove: true,
				// slidesPerView: '1',
			}
		}
	});

	mainKV.on("slideChange", function(){
		$(".main-kv .swiper-slide video").each(function(){
			$(this).get(0).currentTime = 0;
			// $(this).get(0).pause();
		});
	
		// if ($(".main-kv .swiper-slide").eq(mainKV.activeIndex).find("video").length > 0) {
		// 	console.log(mainKV.activeIndex);
		// 	var video = $(".main-kv .swiper-slide").eq(mainKV.activeIndex).find("video")[0];
		// 	video.play();
		// }
	});
	



	// 2. products random relocation
	function shuffle(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

	const containers = document.querySelectorAll('.main-prod__flex');

	containers.forEach(container => {
		const boxes = Array.from(container.querySelectorAll('.main-prod__box'));
		const shuffledBoxes = shuffle(boxes);

		shuffledBoxes.forEach(box => container.removeChild(box));
		shuffledBoxes.forEach(box => container.appendChild(box));
	});

	$('.main-prod__box').on('mouseover', function(){
		$(this).find('.main-prod__type02').stop().fadeIn(300);
	}).on('mouseleave', function(){
		$(this).find('.main-prod__type02').stop().fadeOut(300);
	});

	if($(window).width() <= 767){
		$('.main-prod__box').on('click', function(){
			$('.main-prod__box .main-prod__type02').stop().fadeOut(300);
		});
	}

	// $('.main-prod__type01').on('mouseover', function(){
	// 	$(this).fadeOut(200);
	// 	$(this).parent().find('.main-prod__type02').fadeIn(200);
	// });

	// $('.main-prod__type02').on('mouseleave', function(){
	// 	$(this).fadeOut(200);
	// 	$(this).parent().find('.main-prod__type01').fadeIn(200);
	// });



	// 3. esg Area
	var p_data = new Swiper('.main-esg__slide .swiper-container', {
		slidesPerView: 3,
		slidesPerGroup: 3,
		spaceBetween: 10,
		// autoHeight : true,
		// freeMode:true,
		loop:false,
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		speed:1200,
		loopFillGroupWithBlank : true,
		navigation: {
			nextEl: $('.main-esg__controller .swiper-button-next'),
			prevEl: $('.main-esg__controller .swiper-button-prev')
		},
		breakpoints: {
			1200: {
				slidesPerView: 1,
				slidesPerGroup: 1,
				autoHeight : false,
			}
		}
	});

	

	// 페이지가 로드될 때 높이를 조정합니다.
	updateSwiperHeight();

	// 슬라이드가 전환될 때 높이를 조정합니다.
	p_data.on('slideChangeTransitionEnd', function () {
		updateSwiperHeight();
	});

	// 브라우저 창 크기가 변경될 때 높이를 조정합니다.
	$(window).resize(function () {
		updateSwiperHeight();
	});





	// 4. news Area
	var p_data = new Swiper('.main-news__slide', {
		slidesPerView: 'auto',
		spaceBetween: 19,
		// freeMode:true,
		loop:true,
		centeredSlides: true,
		speed:1000,
		navigation: {
			nextEl: $('.main-news__controller .swiper-button-next'),
			prevEl: $('.main-news__controller .swiper-button-prev')
		},
		pagination: {
			el: $('.main-news__slide .swiper-pagination'),
			clickable: true
		},
		breakpoints: {
			767: {
				// allowTouchMove: true,
				// slidesPerView: '1',
			}
		}
	});
});

function updateSwiperHeight() {
	var maxHeight = 0;
	$('.main-esg__slide .swiper-slide').each(function () {
		var slideHeight = $(this).outerHeight();
		if (slideHeight > maxHeight) {
			maxHeight = slideHeight;
		}
	});

	// Swiper 컨테이너의 높이를 가장 큰 슬라이드 높이로 설정합니다.
	$('.main-esg__slide .swiper-container').css('height', maxHeight + 'px');
}