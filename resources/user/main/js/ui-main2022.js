// // 대표홈 메인 전용 스크립트
// $(document).ready(function () {
// 	// 용인시 재난 문자, 용인시 교통 정보
// 	$('#disaster-rolling, #traffic-rolling').not('.slick-initialized').slick({
// 		arrows: false,
// 		draggable: false,
// 		slidesToShow: 1,
// 		slidesToScroll: 1,
// 		infinite: true,
// 		speed: 700,
// 		autoplay: true,
// 		autoplaySpeed: 3000,
// 		vertical: true
// 	});

// 	// 팝업존 슬라이더
// 	$('#popupzone-slider').not('.slick-initialized').slick({
// 		arrows: false,
// 		draggable: false,
// 		slidesToShow: 3,
// 		slidesToScroll: 3,
// 		infinite: true,
// 		dots: true,
// 		speed: 1500,
// 		autoplay: true,
// 		autoplaySpeed: 3000,
// 		responsive: [{
// 			breakpoint: 1025,
// 			settings: {
// 				draggable: true,
// 				slidesToShow: 1,
// 				slidesToScroll: 1
// 			}
// 		}],
// 		customPaging: function (slick, index) {
// 			$('.popupzone-info .count span').text(slick.slideCount);
// 		}
// 	}).on('afterChange', function (event, index, slick, currentSlide) {
// 		$('.popupzone-info .count strong').text(slick + 1);
// 	});
// 	$('.popupzone-info').prepend(
// 		'<div class="btn-ctrl"><button type="button" class="btn-prev">prev</button><button type="button" class="btn-pause">stop</button><button type="button" class="btn-next">next</button></div>'
// 	);
// 	$('.popupzone-info .btn-ctrl button').on('click', function () {
// 		if ($(this).hasClass('btn-pause')) {
// 			$('#popupzone-slider').slick('slickPause');
// 			$(this).removeClass('btn-pause').addClass('btn-play');
// 			$(this).text('play');
// 		} else if ($(this).hasClass('btn-play')) {
// 			$('#popupzone-slider').slick('slickPlay');
// 			$(this).removeClass('btn-play').addClass('btn-pause');
// 			$(this).text('stop');
// 		} else if ($(this).hasClass('btn-prev')) {
// 			$('#popupzone-slider').slick('slickPrev');
// 		} else {
// 			$('#popupzone-slider').slick('slickNext');
// 		}
// 	});

// 	// 알림존 슬라이더
// 	$('#noticezone-slider').not('.slick-initialized').slick({
// 		arrows: false,
// 		draggable: false,
// 		slidesToShow: 1,
// 		slidesToScroll: 1,
// 		infinite: true,
// 		dots: true,
// 		speed: 700,
// 		autoplay: true,
// 		autoplaySpeed: 3000,
// 		fade: true,
// 		responsive: [{
// 				breakpoint: 1025,
// 				settings: {
// 					draggable: true,
// 					centerMode: true,
// 					centerPadding: '192px',
// 					fade: false
// 				}
// 			},
// 			{
// 				breakpoint: 768,
// 				settings: {
// 					centerMode: true,
// 					centerPadding: '85px',
// 					fade: false
// 				}
// 			}
// 		],
// 		customPaging: function (slick, index) {
// 			$('.noticezone-info .count span').text(slick.slideCount);
// 		}
// 	}).on('afterChange', function (event, index, slick, currentSlide) {
// 		$('.noticezone-info .count strong').text(slick + 1);
// 	});
// 	$('.noticezone-info').append(
// 		'<div class="btn-ctrl"><button type="button" class="btn-prev">prev</button><button type="button" class="btn-pause">stop</button><button type="button" class="btn-next">next</button></div>'
// 	);
// 	$('.noticezone-info .btn-ctrl button').on('click', function () {
// 		if ($(this).hasClass('btn-pause')) {
// 			$('#noticezone-slider').slick('slickPause');
// 			$(this).removeClass('btn-pause').addClass('btn-play');
// 			$(this).text('play');
// 		} else if ($(this).hasClass('btn-play')) {
// 			$('#noticezone-slider').slick('slickPlay');
// 			$(this).removeClass('btn-play').addClass('btn-pause');
// 			$(this).text('stop');
// 		} else if ($(this).hasClass('btn-prev')) {
// 			$('#noticezone-slider').slick('slickPrev');
// 		} else {
// 			$('#noticezone-slider').slick('slickNext');
// 		}
// 	});

// 	// 주요 사이트
// 	$(window).on('scroll', function () {
// 		if ($(window).width() > 1024) {
// 			if (checkVisible($('.section-service'))) {
// 				$('.section-majorsite').removeClass('fixed');
// 			} else {
// 				$('.section-majorsite').addClass('fixed');
// 			}
// 		}
// 	});

// 	// 자주찾는 사이트
// 	$(document).on('mouseenter focus', '.familysite-list dt button', function () {
// 		$(this).closest('.item').addClass('opened').siblings('.item').removeClass('opened');
// 	}).on('mouseleave', '.item', function () {
// 		$(this).removeClass('opened');
// 	}).on('keydown', '.familysite-list .item:last-child li:last-child > a', function (e) {
// 		if (e.keyCode == 9 && !e.shiftKey) { // tab
// 			$('.familysite-list .item').removeClass('opened');
// 		}
// 	}).on('keydown', '.familysite-list dt button', function (e) {
// 		if (e.keyCode == 9 && e.shiftKey) { // shift + tab
// 			$('.familysite-list .item').removeClass('opened');
// 		}
// 	});

// 	// 배너모음 슬라이더
// 	$('#banner-slider').not('.slick-initialized').slick({
// 		arrows: false,
// 		draggable: false,
// 		slidesToShow: 6,
// 		slidesToScroll: 1,
// 		infinite: true,
// 		speed: 700,
// 		autoplay: true,
// 		autoplaySpeed: 3000
// 	});
// 	$('.banner-info').append(
// 		'<div class="btn-ctrl"><button type="button" class="btn-prev">prev</button><button type="button" class="btn-pause">stop</button><button type="button" class="btn-next">next</button></div>'
// 	);
// 	$('.banner-info .btn-ctrl button').on('click', function () {
// 		if ($(this).hasClass('btn-pause')) {
// 			$('#banner-slider').slick('slickPause');
// 			$(this).removeClass('btn-pause').addClass('btn-play');
// 			$(this).text('play');
// 		} else if ($(this).hasClass('btn-play')) {
// 			$('#banner-slider').slick('slickPlay');
// 			$(this).removeClass('btn-play').addClass('btn-pause');
// 			$(this).text('stop');
// 		} else if ($(this).hasClass('btn-prev')) {
// 			$('#banner-slider').slick('slickPrev');
// 		} else {
// 			$('#banner-slider').slick('slickNext');
// 		}
// 	});

// 	// 관심정보 서비스 레이어팝업
// 	$('.box-toggle-info dt.on').each(function () {
// 		$(this).next('dd').show();
// 	});
// 	$(document).on('click', '.box-toggle-info .btn-toggle', function () {
// 		$(this).parent('dt').toggleClass('on').next('dd').slideToggle('fast');
// 		return false;
// 	}).on('click', '.latest-list dt a', function () {
// 		$(this).parent('dt').addClass('on').siblings('dt').removeClass('on');
// 		return false;
// 	});

// 	applyLayer();
// });

// // 모든 민원 신청 레이어팝업
// $(window).resize(function () {
// 	applyLayer();
// });

// function applyLayer() {
// 	$('.apply-item dt a').unbind('click');
// 	if ($(window).width() <= 1024) {
// 		$('.apply-item dt a').click(function () {
// 			$(this).parent('dt').toggleClass('on').next('dd').slideToggle('fast');
// 		});
// 	}
// }

// // 영역 노출 여부 확인
// function checkVisible(tg) {
// 	var vpH = $(window).height(), // Viewport Height
// 		st = $(window).scrollTop(), // Scroll Top
// 		y = $(tg).offset().top,
// 		h = $(tg).height() + 90;
// 	return (y > st && y + h < (vpH + st));
// }

// 20231012
// 용인시 메인 비주얼 슬라이드
$(document).ready(function () {
    $('.visual_section .tab-list li a').on('click', function () {
        $('.main-news-slider .slider-inner').slick('setPosition');
        $('.main-news-slider .slider-inner').slick('slickGoTo', 0);
    })

    var nums = 0;

    $('#tab-content1-1-1 .main-news-slider .slider-inner').slick({
        autoplay: true,
        speed: 1000,
        slidesToShow: 1,
        //slidesToScroll: 1,
        variableWidth: false,
        /* 20230403 start */
        // infinite: false,
        fade: true,
        /* 20230403 end */
        //false: true,
        arrows: true,
        dots: true,
        focusOnChange: true,
        accessibility: false,
        // prevArrow: $('#tab-content1-1-1 .btn-prev'),
        // nextArrow: $('#tab-content1-1-1 .btn-next'),
        customPaging: function (slick, index) {
            if (slick.slideCount < 10) {
                $("#tab-content1-1-1 .main-news-slider .slide-control .nums > span").text("0" + slick.slideCount);
            } else {
                $("#tab-content1-1-1 .main-news-slider .slide-control .nums > span").text(slick.slideCount);
            }
            $("#tab-content1-1-1 .slide-control .nums .bar span").css({
                width: (100 / nums) + "%"
            })
            nums1 = slick.slideCount;
        }
    }).on('afterChange', function (event, index, slick, currentSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        if (slick + 1 < 10) {
            $("#tab-content1-1-1 .main-news-slider .slide-control .nums strong").text("0" + (slick + 1));
        } else {
            $("#tab-content1-1-1 .main-news-slider .slide-control .nums strong").text((slick + 1));
        }
        $("#tab-content1-1-1 .slide-control .nums .bar span").css({
            width: ((100 / nums1) * (slick + 1)) + "%"
        })
    });

    $('#tab-content1-1-2 .main-news-slider .slider-inner').slick({
        autoplay: true,
        speed: 1000,
        slidesToShow: 1,
        //slidesToScroll: 1,
        variableWidth: false,
        Infinity: false,
        //false: true,
        arrows: true,
        dots: true,
        focusOnChange: true,
        accessibility: false,
        // prevArrow: $('#tab-content1-1-2 .btn-prev'),
        // nextArrow: $('#tab-content1-1-2 .btn-next'),
        customPaging: function (slick, index) {
            if (slick.slideCount < 10) {
                $("#tab-content1-1-2 .main-news-slider .slide-control .nums > span").text("0" + slick.slideCount);
            } else {
                $("#tab-content1-1-2 .main-news-slider .slide-control .nums > span").text(slick.slideCount);
            }
            $("#tab-content1-1-2 .slide-control .nums .bar span").css({
                width: (100 / nums) + "%"
            })
            nums2 = slick.slideCount;
        }
    }).on('afterChange', function (event, index, slick, currentSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        if (slick + 1 < 10) {
            $("#tab-content1-1-2 .main-news-slider .slide-control .nums strong").text("0" + (slick + 1));
        } else {
            $("#tab-content1-1-2 .main-news-slider .slide-control .nums strong").text((slick + 1));
        }
        $("#tab-content1-1-2 .slide-control .nums .bar span").css({
            width: ((100 / nums2) * (slick + 1)) + "%"
        })
    });

    $('#tab-content1-1-3 .main-news-slider .slider-inner').slick({
        autoplay: true,
        speed: 1000,
        slidesToShow: 1,
        //slidesToScroll: 1,
        variableWidth: false,
        Infinity: false,
        //false: true,
        arrows: true,
        dots: true,
        focusOnChange: true,
        accessibility: false,
        // prevArrow: $('.btn-prev'),
        // nextArrow: $('.btn-next'),
        customPaging: function (slick, index) {
            if (slick.slideCount < 10) {
                $("#tab-content1-1-3 .main-news-slider .slide-control .nums > span").text("0" + slick.slideCount);
            } else {
                $("#tab-content1-1-3 .main-news-slider .slide-control .nums > span").text(slick.slideCount);
            }
            $("#tab-content1-1-3 .slide-control .nums .bar span").css({
                width: (100 / nums) + "%"
            })
            nums3 = slick.slideCount;
        }
    }).on('afterChange', function (event, index, slick, currentSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        if (slick + 1 < 10) {
            $("#tab-content1-1-3 .main-news-slider .slide-control .nums strong").text("0" + (slick + 1));
        } else {
            $("#tab-content1-1-3 .main-news-slider .slide-control .nums strong").text((slick + 1));
        }
        $("#tab-content1-1-3 .slide-control .nums .bar span").css({
            width: ((100 / nums3) * (slick + 1)) + "%"
        })
    });

    $('#tab-content1-2 .main-news-slider .slider-inner').slick({
        autoplay: true,
        speed: 1000,
        slidesToShow: 1,
        //slidesToScroll: 1,
        variableWidth: false,
        Infinity: false,
        //false: true,
        arrows: true,
        dots: true,
        focusOnChange: true,
        accessibility: false,
        // prevArrow: $('.btn-prev'),
        // nextArrow: $('.btn-next'),
        customPaging: function (slick, index) {
            if (slick.slideCount < 10) {
                $("#tab-content1-2 .main-news-slider .slide-control .nums > span").text("0" + slick.slideCount);
            } else {
                $("#tab-content1-2 .main-news-slider .slide-control .nums > span").text(slick.slideCount);
            }
            $("#tab-content1-2 .slide-control .nums .bar span").css({
                width: (100 / nums) + "%"
            })
            nums4 = slick.slideCount;
        }
    }).on('afterChange', function (event, index, slick, currentSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        if (slick + 1 < 10) {
            $("#tab-content1-2 .main-news-slider .slide-control .nums strong").text("0" + (slick + 1));
        } else {
            $("#tab-content1-2 .main-news-slider .slide-control .nums strong").text((slick + 1));
        }
        $("#tab-content1-2 .slide-control .nums .bar span").css({
            width: ((100 / nums4) * (slick + 1)) + "%"
        })
    });

    $('.visual-main-mobile .main-news-slider .slider-inner').slick({
        autoplay: true,
        speed: 1000,
        slidesToShow: 1,
        //slidesToScroll: 1,
        variableWidth: false,
        Infinity: false,
        //false: true,
        arrows: true,
        dots: true,
        focusOnChange: true,
        accessibility: false,
        // prevArrow: $('.visual-main-mobile .btn-prev'),
        // nextArrow: $('.visual-main-mobile .btn-next'),
        customPaging: function (slick, index) {
            if (slick.slideCount < 10) {
                $(".visual-main-mobile .main-news-slider .slide-control .nums > span").text("0" + slick.slideCount);
            } else {
                $(".visual-main-mobile .main-news-slider .slide-control .nums > span").text(slick.slideCount);
            }
            $(".visual-main-mobile .slide-control .nums .bar span").css({
                width: (100 / nums) + "%"
            })
            nums5 = slick.slideCount;
        }
    }).on('afterChange', function (event, index, slick, currentSlide) {
        if (slick + 1 < 10) {
            $(".visual-main-mobile .main-news-slider .slide-control .nums strong").text("0" + (slick + 1));
        } else {
            $(".visual-main-mobile .main-news-slider .slide-control .nums strong").text((slick + 1));
        }
        $(".visual-main-mobile .slide-control .nums .bar span").css({
            width: ((100 / nums5) * (slick + 1)) + "%"
        })
    });

    $(".slide-control .btn-ctrl").append(
        '<button type="button" class="btn-pause">stop</button>'
    );

    $(".main-news-slider .slide-control .btn-ctrl button").on('click', function () {
        if (!$(this).hasClass("btn-play")) {
            $('.main-news-slider .slider-inner').slick('slickPause');
            $(this).removeClass("btn-pause").addClass("btn-play");
            $(this).text("Stop")
        } else {
            $('.main-news-slider .slider-inner').slick('slickPlay');
            $(this).removeClass("btn-play").addClass("btn-pause");
            $(this).text("Play");
        }

    });

    /*$('.service_group .slide-inner').slick({
        autoplay: true,
        speed: 1000,
        slidesToShow: 6,
        //slidesToScroll: 1,
        variableWidth: false,
        arrows: true,
        dots: false,
        focusOnChange: true,
        accessibility: false,
        prevArrow: $('#service_slide_prev'),
        nextArrow: $('#service_slide_next'),
        responsive: [ // 반응형 웹 구현 옵션
            { 
                breakpoint: 1024, //화면 사이즈 768px
                settings: {	
                    slidesToShow:5
                } 
            },
            { 
                breakpoint: 768, //화면 사이즈 768px
                settings: {	
                    slidesToShow:4
                }
            },
        ]
    })*/

    let serviceSlider = $('.service_group .slide-inner');
    let serviceSlickOpt = {
        autoplay: true,
        speed: 1000,
        slidesToShow: 5,
        //slidesToScroll: 1,
        variableWidth: false,
        arrows: true,
        dots: false,
        focusOnChange: true,
        accessibility: false,
        prevArrow: $('#service_slide_prev'),
        nextArrow: $('#service_slide_next'),
        responsive: [ // 반응형 웹 구현 옵션
            {
                breakpoint: 1025, //화면 사이즈 1024px
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 768, //화면 사이즈 768px
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 425,
                settings: {
                    slidesToShow: 2
                }
            }
        ]
    }

    /* 20240131 start */
    serviceSlider.not('.slick-initialized').slick(serviceSlickOpt);

    /*
    $(window).on('load resize', function() {
        let wid = $(window).width();
        if(wid <= 1200) {
        } else {
            serviceSlider.filter('.slick-initialized').slick('unslick');
        }
    });
    */
    /* 20240131 end */

    //자주찾는 메뉴
    $('.favorite-shortcut-slider .slider-inner').slick({
        autoplay: false,
        speed: 1000,
        slidesToShow: 8,
        slidesToScroll: 1,
        variableWidth: true,
        Infinity: false,
        arrows: true,
        dots: false,
        accessibility: true,
        responsive: [{
            breakpoint: 1024,
            settings: 'unslick'
        }],
    });


    $('.section-service .tab-list li a').on('click', function () {
        $('.service-shortcut-slider .slider-inner').slick('setPosition');

    })

    $('.service-shortcut-slider .slider-inner').each(function () {
        $(this).not('.slick-initialized').slick({
            autoplay: false,
            speed: 1000,
            slidesToShow: 8,
            slidesToScroll: 1,
            variableWidth: true,
            Infinity: false,
            arrows: true,
            dots: false,
            accessibility: true,
            responsive: [{
                breakpoint: 1024,
                settings: 'unslick'
            }],
        });
    });

    /* 20230207 start */
    //포토슬라이드
    $('.photo-slider .slider-inner').not('.slick-initialized').slick({
        autoplay: true,
        autoplaySpeed: 15000,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: false,
        arrows: true,
        prevArrow: $('.btn-prev'),
        nextArrow: $('.btn-next'),
        dots: true,
        dotsClass: 'slick-dots dots-white ',
        accessibility: false,
        responsive: [{
            breakpoint: 1024,
            settings: {
                arrows: false,
            }
        }],
    });
    /* 20230207 end */

    $(".photo-slider .slide-control .btn-ctrl button").on('click', function () {
        if (!$(this).hasClass("btn-play")) {
            $('.photo-slider .slider-inner').slick('slickPause');
            $(this).removeClass("btn-pause").addClass("btn-play");
            $(this).text("Stop")
        } else {
            $('.photo-slider .slider-inner').slick('slickPlay');
            $(this).removeClass("btn-play").addClass("btn-pause");
            $(this).text("Play");
        }

    });

    // 배너모음 슬라이더
    $('#banner-slider').not('.slick-initialized').slick({
        arrows: false,
        draggable: false,
        slidesToShow: 5,
        slidesToScroll: 1,
        infinite: true,
        speed: 700,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 2
            }
        }]
    });
    $('.banner-info').append(
        '<div class="btn-ctrl"><button type="button" class="btn-prev">prev</button><button type="button" class="btn-next">next</button><button type="button" class="btn-pause">stop</button></div>'
    );
    $('.banner-info .btn-ctrl button').on('click', function () {
        if ($(this).hasClass('btn-pause')) {
            $('#banner-slider').slick('slickPause');
            $(this).removeClass('btn-pause').addClass('btn-play');
            $(this).text('play');
        } else if ($(this).hasClass('btn-play')) {
            $('#banner-slider').slick('slickPlay');
            $(this).removeClass('btn-play').addClass('btn-pause');
            $(this).text('stop');
        } else if ($(this).hasClass('btn-prev')) {
            $('#banner-slider').slick('slickPrev');
        } else {
            $('#banner-slider').slick('slickNext');
        }
    });
});
// 20231012 />

/* 20230403 start */
$(function () {
    var spec_banner = $('.specialcity_banner');
    $('.specialcity_banner a').on('focus', function () {
        spec_banner.addClass('on');
    }).on('blur', function () {
        spec_banner.removeClass('on');
    });


    $('.main-news-slider .slick-slide a').on('focus', function () { });
});
/* 20230403 end */

/* 20230410 start */
$(function () {
    var popPlayer, popOpt;

    popPlayer = $('.videoPopup iframe').attr('src');
    popOpt = '?autoplay=1&mute=1&playsinline=1';

    $('.prom_video a').on('click', function () {
        var headTop = $('header').offset().top;

        $('html, body').stop().animate({
            scrollTop: headTop
        });
        $('.videoPopup').show();
        $('.prom_video .video_wrap iframe')[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        $('.videoPopup iframe').attr('src', popPlayer + popOpt);
        $('.videoPopup button').focus();
    });

    $('.videoPopup button').on('click', function () {
        $(this).parents('.videoPopup').hide();
        $('.prom_video .video_wrap iframe')[0].contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        $('.videoPopup iframe').attr('src', popPlayer);
        $('.prom_video a').focus();
    });

    // 홍보영상 배너 닫기
    $('.prom_video .chkClose button').on('click', function () {
        $('.prom_video').hide();
    });
});
/* 20230410 end */

// 2023 06 14 스와이프 관련 스크립트
$(function () {
    $('.business_section_inner dd > ul li').addClass('swiper-slide')

    const options = {
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        observer: true,
        observeParents: true,
        slidesPerView: 7,
        spaceBetween: 20,
        breakpoints: {
            1400: {
                slidesPerView: 5,
            },
            768: {
                slidesPerView: 4,
                spaceBetween: 0,
            },
            375: {
                slidesPerView: 3,
                spaceBetween: 0,
            }
        }
    };

    let swiper1 = new Swiper(".swiper-container.cont1", options);
    let swiper2 = new Swiper(".swiper-container.cont2", options);
    let swiper3 = new Swiper(".swiper-container.cont3", options);
    let swiper4 = new Swiper(".swiper-container.cont4", options);

    $('#tabCon1 a').on('click', function (e) {
        swiper1.slideTo(0, 0);
        swiper1.update()
    });

    $('#tabCon2 a').on('click', function (e) {
        swiper2.slideTo(0, 0);
        swiper2.update()
    });

    $('#tabCon3 a').on('click', function (e) {
        swiper3.slideTo(0, 0);
        swiper3.update()
    });

    $('#tabCon4 a').on('click', function (e) {
        swiper4.slideTo(0, 0);
        swiper4.update()
    });


});

// 2023 06 14 end


// 2023 06 23
$(function () {
    if ($('.prom_video').is(":visible")) {
        $('.header_2021').css({
            top: $('.prom_video').height()
        })
    } else {
        $('.header_2021').css({
            top: 0
        })

    }
    $('.chkClose button').click(function () {
        $('.header_2021').css({
            top: 0
        })
    })
})
// 2023 06 23 />