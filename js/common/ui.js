$(document).ready(function(){

	/* 사이트맵상 채용 메뉴 노출 변경 - 채용 메뉴 2Depth로 수정 */
	$(".sitemap_wrap .depth03").eq(2).css("display","none");
	$(".sitemap_wrap .depth03").eq(3).css("display","none");
	$(".sitemap_wrap .depth03").eq(4).css("display","none");

	var docHeight = $(document).height();
	var winWidth = $(window).width();
	var winHeight = $(window).height();
	var body = $("body");
	var header = $("#header");
	var headerHeight = header.outerHeight();
	var headerTop = header.offset().top;
	var footer = $("#footer");
	var footerHeight = footer.outerHeight();
	var topBanner = $(".top_banner");
	var topBannerHeight = topBanner.outerHeight();
	var headerBannerHeight = headerHeight + topBannerHeight;
	var gnbEasing = "easeOutExpo";
	var sitemap = $("#sitemap");
	var sitemapBox = $(".sitemap");
	var sitemapBgSpeed = 500;
	var nowScrollTop = $(window).scrollTop();
	var lastScrollTop = 0;
	var delta = 5;
	var mobile = 1200;
	var dataWidth = $(".re_img").data('width');
	var dataHeight = $(".re_img").data('height');

	//AOS init
	if ( !body.is(".main, .aos_none") ){
		AOS.init({
			duration: 800,
			once: true
		});
	};

	// mCustomScrollbar
	function scrollbarInit(){
		if ( $(".mCustomScrollbar").length > 0 ){
			$(".mCustomScrollbar").mCustomScrollbar({
				theme: "dark",
				//mouseWheelPixels : 300
			});
		};
	};
	scrollbarInit();

	// load
	$(window).load(function(){
		docHeight = $(document).height();
		body.addClass("load");
		btnTopPosition();
		tabBar();
		fixSize();
		gnbHeight();
		gnbActiveLine();
	});

	// resize
	$(window).resize(function(){
		docHeight = $(document).height();
		winWidth = $(window).width();
		winHeight = $(window).height();
		headerHeight = header.outerHeight();
		headerTop = header.offset().top;
		footerHeight = footer.outerHeight();
		topBannerHeight = topBanner.outerHeight();
		nowScrollTop = $(window).scrollTop();

		//$(".btn_pop_close").trigger("click");

		gnbHeight();
		gnbActiveLine();
		sitemapSize();
		headerPosition();
		tabBar();
		tabSelect();
		btnTopPosition();
		fixSize();
		popResize();
		ellipsisWidth();
		ellipsisTxt();

		if ( $(".history_slide").length > 0 ){
			historyBar();
		};
	});

	// gnb
	var gnb = $("#gnb");
	gnb.append("<div class='line_gnb'></div><div class='bg_gnb'></div>");
	var lineGnb = $(".line_gnb");
	var bgGnb = $(".bg_gnb");
	var gnbStartEasing = "easeOutQuint";
	var gnbEndEasing = "easeInOutCirc";
	var gnbStartSpeed = 800;
	var gnbEndSpeed = 650;
	var gnbActiveLineSpeed = 300;
	var flagGnbDepth = false;

	function gnbDefaultOnNumber(){
		if ( $("#gnb > ul > .on").length > 0 ){
			var on = $("#gnb > ul > .on");
			var index = on.index();
			gnb.attr("data-default-index", index);
		};
	};
	gnbDefaultOnNumber();

	function gnbHeight(){
		$("#gnb > ul > li").each(function(){
			var depth = $(this).find(".depth");

			if ( depth.outerHeight() != "0" ){
				var h = 0;
				depth.children("li").each(function(){
					h = h + $(this).outerHeight();
				});
				depth.attr("data-height", h);
				depth.height("0");
			};
		});
	};

	function gnbActiveLine(){
		if ( $("#gnb > ul > .on").length > 0 ){
			var on = $("#gnb > ul > .on > a");
			var w = on.width();
			var p = parseInt(on.css("padding-left"));
			var l = on.offset().left + p;

			if ( lineGnb.is(".on") ){
				//console.log("gnb bar : move");
				lineGnb.stop().animate({ "width": w, "left": l }, gnbActiveLineSpeed);
			}
			else {
				//console.log("gnb bar : load");
				lineGnb.stop().animate({ "width": w }, gnbActiveLineSpeed).css({ "left": l }).addClass("on");
			};
		};
	};

	function gnbIsDepth(){
		$("#gnb .depth02").each(function(){
			$(this).prev().addClass("is_depth");
		});
	};
	gnbIsDepth();

	$(document).on("mouseenter", "#gnb > ul > li > a", function(){
		var depth = $(this).next(".depth");
		var depthSbs = $(this).parent().siblings().find(".depth");
		var bgGnbHeight = depth.attr("data-height");


		if ( !gnb.is(".on") ){
			gnb.addClass("on");
		};

		flagGnbDepth = false;
		gnbHeight();
		depthSbs.stop().animate({ "height": "0" }, gnbStartSpeed, gnbStartEasing);
		depthSbs.find(".on").removeClass("on");
		bgGnb.stop().animate({ "height": bgGnbHeight }, gnbStartSpeed, gnbStartEasing);
		depth.stop().animate({ "height": bgGnbHeight }, gnbStartSpeed, gnbStartEasing, function(){
			flagGnbDepth = true;
		});

		$(this).parent().addClass("on").siblings().removeClass("on");

		gnbActiveLine();
	});

	$(document).on("click", "#gnb .depth > li > a", function(){
		var li = $(this).parent();
		var depth = $(this).parent().parent();
		var depth02 = $(this).next();

		if ( flagGnbDepth == true ){
			depth.removeAttr("style");
			li.toggleClass("on").siblings().removeClass("on");

			var h = depth.outerHeight();

			bgGnb.outerHeight(h);
		};
	});

	$(document).on("mouseleave", "#header", function(){
		if ( winWidth > mobile ){
			var depth = $("#gnb .depth");
			var depth02 = $("#gnb .depth02");

			if ( $("#gnb > ul > .on").length > 0 ){
				var on = $("#gnb > ul > .on > a");
				var onLeft = on.offset().left + parseInt(on.css("padding-left"));
			};

			if ( gnb.is(".on") ){
				gnb.find("li").removeClass("on");

				if ( gnb.is("[data-default-index]") ){
					var index = gnb.attr("data-default-index");
					$("#gnb > ul > li").eq(index).addClass("on");
					gnbActiveLine();
				}
				else {
					//console.log("gnb bar : leave");
					lineGnb.stop().animate({ "width": "0" }, gnbEndSpeed, function(){
						lineGnb.css({ "left": onLeft }).removeClass("on");
					});
				};

				depth.stop().animate({ "height": "0" }, gnbEndSpeed, gnbEndEasing);
				bgGnb.stop().animate({ "height": "0" }, gnbEndSpeed, gnbEndEasing, function(){
					bgGnb.removeAttr("style");
					gnb.removeClass("on");
					flagGnbDepth = false;
				});
			};
		};
	});

	// sitemap
	function sitemapSize(){
		if ( $(".dim_nav").length == 0 ){
			sitemap.append("<div class='dim_nav'></div>");
		};

		if ( winWidth > mobile ){
			var headerHeight = header.outerHeight();

			if ( docHeight > winHeight ){
				sitemapBox.css("height", winHeight);
			}
			else {
				sitemapBox.css("height", winHeight - headerHeight);
			};

			if ( $(".tit_back").length > 0 ){
				$(".tit_back").remove();
			};
		}
		else {
			sitemapBox.removeAttr("style");
			if ( $(".tit_back").length < 1 ){
				$(".sitemap [class*='depth']").each(function(){
					var clone = $(this).prev("a").clone().addClass("tit_back");
					$(this).prepend(clone);
				});
			};
		};

		if ( sitemap.is(".on") ){
			$(".icon_full_sitemap_open").trigger("click");
		};

		$(".sitemap li a").each(function(){
			if ( $(this).next("[class*='depth']").length > 0 ){
				if ( !$(this).is(".tit_back") ){
					$(this).addClass("is_depth");
				};
			};
		});
	};
	sitemapSize();

	$(document).on("click", ".icon_full_sitemap_open", function(){
		sitemap.toggleClass("on");

		if ( winWidth > mobile ){
			if ( gnb.is(".on") ){
				header.trigger("mouseleave");
			};

			if ( sitemap.is(".on") ){
				sitemapBox.stop().fadeIn(sitemapBgSpeed);
			}
			else {
				sitemapBox.stop().fadeOut(sitemapBgSpeed);
			};
		};
	});

	$(document).on("click", ".icon_full_sitemap_close", function(){
		if ( sitemap.is(".on") ){
			$(".icon_full_sitemap_open").trigger("click");
		};
	});

	$(document).on("click", "#sitemap li a", function(){
		if ( winWidth <= mobile ){
			var ul = $(".sitemap_wrap > ul");
			var step;

			if ( $(this).is(".tit_back") ){
				var stepBack = ul.attr("data-step") - 1;
				ul.attr("data-step", stepBack);
			}
			else {
				$(this).parent().addClass("on").siblings().removeClass("on");
			};

			if ( $(this).next(".depth").length > 0 ){
				step = 1;
			}
			else if ( $(this).next(".depth02").length > 0 ){
				step = 2;
			};

			ul.attr("data-step", step);
		};
	});

	// top_banner
	function isBanner(){
		if ( topBanner.length > 0 && body.is(".is_banner") == false ){
			body.addClass("is_banner");
		};
		headerPosition();
	};
	isBanner();

	function headerPosition(){
		if ( body.is(".is_banner") ){
			if ( body.is(".fixed") == false ){
				header.css("margin-top", topBannerHeight);
			};
		}
		else {
			header.removeAttr("style");
		};
	};

	$(document).on("click", ".today_close, .icon_full_banner_close", function(){
		body.removeClass("is_banner");
		headerPosition();
	});

	// 210818 수정 
	$(document).on("click", ".footer_banner .icon_full_banner_close", function(){
		$('.footer_banner').hide();
	});

	// 스크롤
	$(window).on("scroll", function(){
		btnTopPosition();
		hasScrolled();

		if ( $(".history_slide").length > 0 ){
			historyBar();
		};
	});

	// 스크롤 (header)
	function hasScrolled(){
		nowScrollTop = $(window).scrollTop();

		if ( Math.abs(lastScrollTop - nowScrollTop) <= delta ){
			return;
		};

		if ( nowScrollTop > lastScrollTop ){ //down
			if ( body.is(".is_banner") ){
				headerHeight = header.outerHeight() + topBanner.outerHeight();
			}
			else {
				headerHeight = header.outerHeight();
			};
			if ( nowScrollTop > headerHeight ){ //현재 scroll 값이 header의 높이 보다 큰경우
				if ( body.is(".is_banner") ){
					header.removeAttr("style");
				};
				body.addClass("fixed");
				body.removeClass("up");
			};
		}
		else { //up
			if ( nowScrollTop > headerHeight ){ //현재 scroll 값이 header의 높이 보다 큰경우
				body.addClass("transition up");
			}
			else {
				if ( body.is(".is_banner") ){
					if ( nowScrollTop <= topBannerHeight ){
						header.css("margin-top", topBannerHeight);
						body.removeClass("fixed up transition");
					};
				}
				else {
					if ( nowScrollTop <= 5 ){
						body.removeClass("fixed up transition");
					};
				};
			};
		};

		lastScrollTop = nowScrollTop;
	};

	// language
	$(document).on("click", ".icon_full_language", function(){
		var language = $(".language");
		language.toggleClass("on");
	});

	// tab
	$(document).on("click", ".tabOn > ul > li > a", function(e){
		e.preventDefault();

		var tab = $(this).parents(".tabOn");
		var target = $(this).attr("href");
		var onIndex = $(this).parent().index();

		$(this).parent().addClass("on").siblings().removeClass("on");

		if ( target != "#" && target != "#none" && target != "" ){
			$(target).addClass("on").siblings().removeClass("on");
			$(this).parents().find(".tabOn").removeClass("on");
		};

		tabSelect();
		btnTopPosition();

		if ( tab.is(".list_layer") ){
			if ( $(this).parents(".tab_layer_detail").length < 1 ){
				$(".list_bg_layer > div").eq(onIndex).addClass("on").siblings().removeClass("on");
			};
		};
	});

	$(document).on("click", ".tab03 li > a", function(e){
		tabBar();
	});

	$(document).on("click", ".btn_slt_tab", function(e){
		$(this).parent().toggleClass("on");
	});

	// tab (bar / scroll / swiper)
	function tabBar(){
		var tabEle = $(".tab03");
		var tabCont = $(".tab_cont");
		var tabSwiper;
		var tabSpeed = 200;

		if ( tabEle.length > 0 ){
			var li = tabEle.find("li");
			var on = tabEle.find(".on");
			var ul = tabEle.find("ul");
			var onWidth = on.outerWidth();
			var mgLeft = parseInt(on.css("margin-left"));
			var poLeft = on.position().left + mgLeft;
			var ulWidth = 0;
			var liWidth = 0;
			var onPrevWidth = 0;
			var onPosition = 0;
			var brk = true;

			// tab bar
			tabEle.each(function(){
				if ( $(this).find(".tab_bar").length == 0 ){
					$(this).append("<div class='tab_bar'></div>");
				};
				if ( $(this).find(".tab_bar").length > 0 ){
					$(this).find(".tab_bar").css({ "width": onWidth, "left": poLeft });
				};
			});

			// tab scroll
			if ( winWidth <= mobile ){
				li.each(function(){
					liWidth = $(this).outerWidth();
					liMargin = parseInt($(this).css("margin-left"));
					ulWidth += (liWidth + liMargin);

					if ( on.index() != 0 ){
						onPrevWidth = on.prev().outerWidth();
					};

					if ( $(this).is(".on") == false && brk == true ){
						onPosition += (liWidth + liMargin);
					}
					else {
						brk = false;
					};
				});

				if ( !ul.is(".tab_slide") ){
					ul.addClass("tab_slide").css("width", ulWidth);
				};

				if ( tabEle.outerWidth() < ul.outerWidth() ){
					if ( on.index() == (li.length - 1) ){
						onPosition = onPosition + onPrevWidth;
					}
					else {
						onPosition = onPosition - onPrevWidth;
					};

					if ( on.index() > 0 ){
						if ( tabEle.is(".tabOn") ){ // 페이지 이동이아닌 탭의경우
							tabEle.stop().animate({ scrollLeft: onPosition }, tabSpeed);
						}
						else { // 페이지 이동인 탭의경우
							tabEle.scrollLeft(onPosition);
						};
					};
				};
			}
			else {
				if ( ul.is(".tab_slide") ){
					ul.removeClass("tab_slide").removeAttr("style");
				};
			};
		};
	};

	// tab (select)
	function tabSelect(){
		if ( $(".tab01").length > 0 ){
			body.addClass("is_tab");
		};

		$(".tab01,.tab02").each(function(){
			if ( winWidth > mobile ){
				$(this).find(".btn_slt_tab").remove();
			}
			else {
				if ( $(this).find(".btn_slt_tab").length == 0 ){
					$(this).prepend("<strong class='btn_slt_tab' title='현재페이지'></strong>");
				};
				var txt = $(this).find(".on").text();
				$(this).find(".btn_slt_tab").text(txt);
			};
		});
	};
	tabSelect();

	function layerClose(){
		$(this).parents("li.on").removeClass("on");
	};
	$(document).on("click", ".btn_layer_close", layerClose);

	// 탭 바로가기
	function tabShortCut(e){
		e.preventDefault();
		var target = $(this).attr("href");
		var top = $(target).offset().top;
		$("html, body").stop().delay(50).animate({ "scrollTop": top }, 600);
	};
	$(document).on("click", ".tab_shortcut li > a", tabShortCut);

	//210812 scroll_down 추가 
	$(window).scroll(function () {
		var scrollPosition = $(this).scrollTop();
		if (scrollPosition > 10) {
			$('.scroll_down').hide();
		} else {
			$('.scroll_down').fadeIn();
		}
	});

	// btn_top
	function btnTopPosition(){
		docHeight = parseInt($(document).height());
		winHeight = parseInt($(window).height());
		nowScrollTop = $(window).scrollTop();
		var btn = $(".btn_top");
		var btnStart = winHeight / 2;
		var footerOffset = footer.offset().top;
		var endOffset = nowScrollTop + winHeight;
		var scrPercent = Math.round((nowScrollTop / (docHeight - winHeight - footerHeight)) * 100);

		btn.find("span").height(scrPercent + "%");

		if ( winWidth > mobile ){
			var btnPosition = 50;
		}
		else {
			var btnPosition = 20;
		};

		if ( nowScrollTop > btnStart ){
			btn.addClass("on");

			if ( endOffset < footerOffset ){
				btn.css("bottom", btnPosition);
			}
			else {
				btn.css("bottom", endOffset - (footerOffset - btnPosition));
			};
		}
		else {
			btn.removeClass("on");
		};
	};

	function btnTop(e){
		e.preventDefault();
		$("html, body").stop().animate({ "scrollTop": 0 }, 850, "easeOutExpo");
		if ( body.is(".main") ){
			$(".product_menu_list li:first-child a").trigger("click");
		};
	};
	$(document).on("click", ".btn_top", btnTop);

	// slb_box
	function sltBox(){
		$(document).on("click", ".btn_slt", function(){
			var $this = $(this).parent();
			$(".slt_box").not($this).removeClass("on");
			$(this).parent().toggleClass("on");
		});
		$(document).on("click", ".slt_box.change li > a", function(){
			var txt = $(this).text();
			$(this).parents(".slt_box").find(".btn_slt").text(txt);
		});
		$(document).on("click", function(e){
			var target = e.target;
			var targetClass = target.className;
			if ( targetClass != "btn_slt" ){
				$(".slt_box").removeClass("on");
			};
			if ( targetClass != "btn_slt_sort" ){
				$(".slt_sort_box").removeClass("on");
			};
			if ( targetClass != "btn_slt_tab" ){
				$(".tab01").removeClass("on");
			};
		});
	};
	sltBox();

	// location_select
	function locationSelect(){
		$(document).on("click", ".location_select strong", function(){
			$(this).parents(".location_select").toggleClass("on");
		});
		$(document).on("click", ".location_select li > a", function(){
			var txt = $(this).text();
			$(this).parents(".location_select").find("strong").text(txt);
			$(this).parent().addClass("on").siblings().removeClass("on");
			$(this).parents(".location_select").removeClass("on");
		});
		$(document).on("click", function(e){
			var target = e.target;
			var targetClass = target.className;
			if ( targetClass != "btn_location_slt" ){
				$(".location_select").removeClass("on");
			};
		});
	};
	locationSelect();

	// 말줄임 (2줄이상)
	function ellipsisTxt(){
		if ( $("[data-ellipsis]").length > 0 ){
			$("[data-ellipsis]").each(function(){
				var txt = $(this).text();
				var leng = txt.length;
				var lengMax = $(this).attr("data-ellipsis");
				var lengStart = 0;

				if ( $(this).find(".flag").length > 0 ){
					var flag = $(this).find(".flag").clone();
					lengStart = $(this).find(".flag").text().length;
					lengMax = lengMax - lengStart;
				};

				if ( winWidth > mobile ){
					if ( leng > lengMax ){
						if ( !$(this).is("[data-default-txt]") ){
							$(this).attr("data-default-txt", txt);
						};

						if ( $(this).find(".flag").length > 0 ){
							$(this).text( txt.substr(lengStart,lengMax) + '...' ).prepend(flag);
						}
						else {
							$(this).text( txt.substr(lengStart,lengMax) + '...' );
						};
					};
				};
			});
		};
	};
	ellipsisTxt();

	//ellipsis width
	function ellipsisWidth() {
		if ( winWidth > mobile ){
			$('.board_infor_list > li .tit').each(function() {
				var widthPluse = $(this).parent().children(".btnWrap").outerWidth() + 10;

				$(this).attr("style","width:calc(100% - "+ widthPluse + "px)");
			});
		}else {
			$('.board_infor_list > li .tit').each(function() {
				$(this).attr("style","width:100%");
			});
		}
	};ellipsisWidth();

	// 이미지 리사이즈
	function fixSize() {
		var $img = $(".re_img");
		var width = $img.width();
		var height = width*dataHeight/dataWidth;
		$img.height(height);
	}

	//차트 애니메이션
	$(".vGraph.graph_ani > ul > li .gBar").each(function(){
		var index = $(this).parent().index();
		var percentage = $(this).data("percent");
		$(this).delay(index*500)
			.animate({
				height : percentage + "%"
			},1000);
	});

	//아코디언
	$(document).on("click", ".acodi_wrap > li", function(){
		$(this).toggleClass("on");
		if ($(this).hasClass('on')) {
			$(this).children(".acodi_cont,.acodi_list").slideUp();
		}else{
			$(this).children(".acodi_cont,.acodi_list").slideDown();
		}
	});

	// map world
	$(document).on("click", ".legend > ul > li > a", function(){
		$(this).parent().addClass("active").siblings().removeClass("active");
		var legend = $(".legend > ul > li");

		if ( legend.eq(0).is(".active")){
			$(".txt_list > li").removeClass("disnone");
			$(".list_map_company_location.world > li").removeClass("hideLi");
			$(".list_map_company_location.world > li:nth-child(4) .txt_list").css("top","140px");
		}else if(legend.eq(1).is(".active")){
			$(".txt_list > li").removeClass("disnone");
			$(".list_map_company_location.world > li").removeClass("hideLi");
			$(".txt_list > li .blt_triangle01,.txt_list > li .blt_square02,.txt_list > li .blt_star01,.txt_list > li .blt_star02").parent().addClass("disnone");
			$(".list_map_company_location.world > li").eq(0).addClass("hideLi");
			$(".list_map_company_location.world > li").eq(1).addClass("hideLi");
			$(".list_map_company_location.world > li").eq(3).addClass("hideLi");
			$(".list_map_company_location.world > li").eq(6).addClass("hideLi");
			$(".list_map_company_location.world > li").eq(7).addClass("hideLi");
		}else if(legend.eq(2).is(".active")){
			$(".txt_list > li").removeClass("disnone");
			$(".list_map_company_location.world > li").removeClass("hideLi");
			$(".list_map_company_location.world > li:nth-child(4) .txt_list").css("top","115px");
			$(".txt_list > li .blt_triangle01,.txt_list > li .blt_circle03,.txt_list > li .blt_star01,.txt_list > li .blt_star02").parent().addClass("disnone");
			$(".list_map_company_location.world > li").eq(0).addClass("hideLi");
			$(".list_map_company_location.world > li").eq(2).addClass("hideLi");
			$(".list_map_company_location.world > li").eq(5).addClass("hideLi");
			$(".list_map_company_location.world > li").eq(7).addClass("hideLi");
		}else if(legend.eq(3).is(".active")){
			$(".txt_list > li").removeClass("disnone");
			$(".list_map_company_location.world > li").removeClass("hideLi");
			$(".txt_list > li .blt_triangle01,.txt_list > li .blt_circle03,.txt_list > li .blt_square02,.txt_list > li .blt_star02").parent().addClass("disnone");
			$(".list_map_company_location.world > li").eq(0).addClass("hideLi");
			$(".list_map_company_location.world > li").eq(1).addClass("hideLi");
			$(".list_map_company_location.world > li").slice(3,8).addClass("hideLi");
		}else if(legend.eq(4).is(".active")){
			$(".txt_list > li").removeClass("disnone");
			$(".list_map_company_location.world > li").removeClass("hideLi");
			$(".list_map_company_location.world > li:nth-child(4) .txt_list").css("top","35px");
			$(".txt_list > li .blt_star01,.txt_list > li .blt_circle03,.txt_list > li .blt_square02,.txt_list > li .blt_star02").parent().addClass("disnone");
			$(".list_map_company_location.world > li").eq(2).addClass("hideLi");
			$(".list_map_company_location.world > li").eq(5).addClass("hideLi");
			$(".list_map_company_location.world > li").eq(6).addClass("hideLi");
		}else if(legend.eq(5).is(".active")){
			$(".txt_list > li").removeClass("disnone");
			$(".list_map_company_location.world > li").removeClass("hideLi");
			$(".txt_list > li .blt_star01,.txt_list > li .blt_circle03,.txt_list > li .blt_square02,.txt_list > li .blt_triangle01").parent().addClass("disnone");
			$(".list_map_company_location.world > li").eq(0).addClass("hideLi");
			$(".list_map_company_location.world > li").eq(1).addClass("hideLi");
			$(".list_map_company_location.world > li").slice(3,8).addClass("hideLi");
		}
	});

	// 연혁
	if ( $(".history_slide").length > 0 ){
		var settingsHistory = {
			speed: 500,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			}
		};
		var historySwiper = new Swiper('.history_slide', settingsHistory);
		historySwiper.on("slideChange", function(){
			historyOn();
			historyBar();
			btnTopPosition();
		});

		function historyOn(){
			var sec = $(".sec_history");
			sec.removeClass("prev next").eq(historySwiper.activeIndex).addClass("on").siblings().removeClass("on");
			sec.eq(historySwiper.activeIndex).prev().addClass("prev");
			sec.eq(historySwiper.activeIndex).next().addClass("next");
		};
		historyOn();

		function historyBar(){
			nowScrollTop = $(window).scrollTop();
			winHeight = $(window).height();
			var secArea = $(".sec_history_area");
			var sec = $(".sec_history");
			var secOn = $(".sec_history.on");
			var secItem = secOn.find(".sec_history_item");
			var line = $(".bg_his_line");

			if ( winWidth > mobile ){ var z = 50; }
			else { var z = 100; };

			var y = (winHeight / 3) * 2 - z;
			var p = (nowScrollTop+y);

			if ( line.length < 1 ){
				sec.prepend("<div class='bg_his_line'></div>");
			};

			if ( sec.length > 0 ){
				if ( p > secArea.offset().top ){
					line.height(p - secArea.offset().top);
				};
				secItem.each(function(){
					var top = $(this).offset().top;
					if ( p > top ){
						$(this).addClass("on");
					}
					else {
						$(this).removeClass("on");
						secItem.eq(0).addClass("on");
					};
				});
				secOn.find(".sec_history_item.on").last().addClass("light").siblings().removeClass("light");
			};
		};
		historyBar();
	};

	// popup
	// popup z-index
	$(".popup").each(function(index){
		var popZindex = 1000 + index;
		if ( $(this).is(".on") && $(this).find("button, a").is(".btn_pop_open") ){
			$(this).css("z-index", 998);
		}
		else {
			$(this).css("z-index", popZindex);
		};
	});

	// popup resize
	function popResize(){
		$(".popup").each(function(){
			if ( $(this).is(".on") ){
				var href = "#" + $(this).attr("id");

				$(href).find(".pop_content").removeAttr("style");

				var popHeight = $(href).find(".pop_wrap").outerHeight();
				var popHeaderHeight = $(href).find(".pop_header").outerHeight();
				var tabOn = $(href).find(".tabOn").outerHeight();

				if ( winWidth > mobile ){
					var winPadding = 100;
				}
				else {
					var winPadding = 40;
				};

				if ( winHeight <= popHeight + winPadding ){
					$(href).find(".pop_content").outerHeight(winHeight - popHeaderHeight - winPadding);
				};

				if( $(href).find(".tabOn").length > 0 ){
					var tabPadding = 90;
					$(href).find(".pop_content").addClass("no_scroll");
					$(href).find(".tab_cont .mCustomScrollbar").outerHeight(winHeight - popHeaderHeight - winPadding - tabOn - tabPadding);
				};

				if ( $(href).find(".pop_content").is("[data-custom-scroll]") == true ){
					$(href).find(".pop_content").addClass("mCustomScrollbar");
					scrollbarInit();
				};
			};
		});
	};

	// popup 열기
	function popOn(e){
		e.preventDefault();
		$(".dim").stop().fadeIn(100);
		var href = $(this).attr("href");
		$(href).stop().fadeIn(200).addClass("on").attr("tabindex", "0").focus();

		if ( $(this).parents("div").is(".popup") ){
			$(this).parents(".popup").attr("data-open-popup-id", href);
			var target = $(this).parents(".popup").attr("data-open-popup-id");
			var zIndex = $(target).css("z-index");
			$(".dim").css("z-index", zIndex);
		};

		if ( $(href).is(".on") ){
			popResize();
		};
	};
	$(document).on("click", ".btn_pop_open", popOn);

	// popup 닫기
	function popOff(){
		var popId = $(this).parents(".popup").attr("id");
		var prevPopId = $(".popup[data-open-popup-id='" + "#" + popId + "']");
		var prevPopAttr = prevPopId.attr("data-open-popup-id");
		$(this).parents(".popup").stop().fadeOut(100).removeClass("on");
		$(this).parents(".popup").find(".pop_content").removeAttr("style");
		$(this).parents(".popup").removeAttr("data-open-popup-id").removeAttr("tabindex");
		$("[href='" + "#" + popId + "']").focus();
		$(".popup").each(function(index){
			var popZindex = 1000 + index;
			if ( $(this).is(".on") && $(this).attr("data-open-popup-id") != prevPopAttr ){
				$(this).css("z-index", 998);
			}
			else {
				$(this).css("z-index", popZindex);
				$(".dim").css("z-index", 999);
			};
		});
		if ( $(".popup.on").length < 1 ){
			$(".dim").stop().fadeOut(100);
		};
		if ( $(this).parents(".popup").find(".pop_content").is(".mCustomScrollbar") ){
			$(this).parents(".popup").find(".pop_content").mCustomScrollbar('destroy');
		};
	};
	$(document).on("click", ".btn_pop_close, .btn_pop_cancel", popOff);

	// popup esc 버튼 닫기
	function escClose(e){
		if ( e.keyCode == 27 ){
			$(".btn_pop_close, .btn_pop_cancel").trigger("click");
		};
	};
	$(document).on("keydown", escClose);

	// popup 전부 닫기
	function popAllOff(){
		$(".btn_pop_close, .btn_pop_cancel").trigger("click");
	};
	$(document).on("click", ".btn_pop_esc", popAllOff);

	/* 2022/02/21 수정 부분 */
	function toggleList() {
		let target = $('.toggle-list li > a');
		$.each(target,function() {
			$(this).on('click',function() {
				$(this).closest('li').toggleClass('active').siblings().removeClass('active');
			})
		})
	}
	toggleList();
	/* //2022/02/21 수정 부분 */
});





// 북마크 (사이트맵 > COMPANY > 기업개요)
function bookmark(e){
	var $this = $(e);
	var target = $this.attr("data-target");
	var margin = 50;
	var moveDelay = 200;
	var moveSpeed = 700;
	var moveEasing = "easeOutExpo";
	var winWidth = $(window).width();
	var mobile = 1200;

	if ( $this.attr("data-margin") != undefined ){
		margin = $this.attr("data-margin");
	};

	if ( winWidth <= mobile ){
		margin = margin / 2;
	};

	if ( $(target).length > 0 ){
		var top = $(target).offset().top - margin;

		// 사이트맵 닫기
		$("#sitemap").removeClass("on");
		$(".sitemap").stop().fadeOut(moveDelay);

		// 스크롤 이동
		setTimeout(function(){
			$("html, body").stop().animate({ "scrollTop": top }, moveSpeed, moveEasing);
		}, moveDelay + 100);
	};
};