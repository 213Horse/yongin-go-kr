// 메인 검색 레이어 포커스
$(document).on("focusin", ".content_search_input input", function() {
    $(".content_search_box").addClass("focusin");
}).on("focusout", ".content_search_input input", function() {
    $(".content_search_box").removeClass("focusin");
});

$(document).ready(function() {

    // visual_slide
    $("#slide_counter01").prepend("<span class='current_index'></span>/");

    var visual_slide_thumb = $("#visual_slide_thumb").bxSlider({
        //mode: "fade",
        speed: 700,
        auto: true,
        controls: false,
        infiniteLoop: true,
        autoControls: false,
        pagerCustom: true,
        adaptiveHeight: true,
        touchEnabled: (navigator.maxTouchPoints > 0),
        onSliderLoad: function(currentIndex) {
            $("#slide_counter01 .current_index").text(currentIndex + 1);
        },
        onSlideBefore: function($slideElement, oldIndex, newIndex) {
            $("#slide_counter01 .current_index").text(newIndex + 1);
        }
    });

    if ($("#slide_counter01").length) {
        $("#slide_counter01").append(visual_slide_thumb.getSlideCount());
    }

    $("#visual_slide_prev").on("click", function() {
        visual_slide_thumb.stopAuto();
        visual_slide_thumb.goToPrevSlide();
        return false;
    });

    $("#visual_slide_next").on("click", function() {
        visual_slide_thumb.stopAuto();
        visual_slide_thumb.goToNextSlide();
        return false;
    });

    $("#visual_slide_stop").on("click", function() {
        visual_slide_thumb.stopAuto();
        return false;
    });

    $("#visual_slide_play").on("click", function() {
        visual_slide_thumb.startAuto();
        return false;
    });

    $("#visual_slide_play").click(function() {
        $("#visual_slide_stop").css("display", "flex");
        $("#visual_slide_play").hide();
    });

    $("#visual_slide_stop").click(function() {
        $("#visual_slide_stop").hide();
        $("#visual_slide_play").css("display", "flex");
    });

    $("#visual_slide_next").keydown(function(e) {
        if (e.keyCode == 9 && !e.shiftKey) {
            $("#visual_slide_thumb div a").focusin(function() {
                visual_slide_thumb.goToSlide(0);
                visual_slide_thumb.stopAuto();
                $("#visual_slide_stop").hide();
                $("#visual_slide_play").css("display", "flex");
                return false;
            });
        }
    });

    if ($(window).width() > 767) {

        // 	// service_group
        // 	var service_slide = $(".service_slide").bxSlider({
        // 		slideWidth: 140,
        // 		moveSlides: 1,
        // 		maxSlides: 8,
        // 		slideMargin: 20,
        // 		speed: 500,
        // 		pause: 4000,
        // 		auto: true,
        // 		controls: false,
        // 		infiniteLoop : false,
        // 		pager: false,
        // 		touchEnabled : (navigator.maxTouchPoints > 0)
        // 	});
        // 	$("#service_slide_prev").on("click", function () {
        // 		service_slide.stopAuto();
        // 		service_slide.goToPrevSlide();
        // 		return false;
        // 	});
        // 	$("#service_slide_next").on("click", function () {
        // 		service_slide.stopAuto();
        // 		service_slide.goToNextSlide();
        // 		return false;
        // 	});
        // 	$("#service_slide_next").keydown(function (e) {
        // 		if(e.keyCode == 9 && !e.shiftKey ){
        // 			$(".service_slide li a").focusin(function () {
        // 				service_slide.goToSlide(0);
        // 				service_slide.stopAuto();
        // 				return false;
        // 			});
        // 		}
        // 	});


        // } else {
        // //mobile

        // 	// 보도자료
        // 	var notice_group_slide = $(".notice_group ul").bxSlider({
        // 		slideWidth: 244,
        // 		moveSlides: 1,
        // 		maxSlides: 3,
        // 		slideMargin: 15,
        // 		speed: 500,
        // 		pause: 4000,
        // 		auto: false,
        // 		controls: false,
        // 		infiniteLoop : false,
        // 		pager: true,
        // 		touchEnabled : (navigator.maxTouchPoints > 0)
        // 	});

    }

    // 용인시 소식
    $(".news_group dt a").click(function() {
        if ($(this).attr("href").indexOf("javascript") > -1) {
            $(this).parent("dt").addClass("on").siblings("dt").removeClass("on");
            return false;
        }
    });

    // popupzone
    $("#slide_counter02").prepend("<span class='current_index'></span>/");

    var popupzone_slide_thumb = $("#popupzone_slide_thumb").bxSlider({
        //mode: "fade",
        speed: 700,
        auto: true,
        controls: false,
        infiniteLoop: true,
        autoControls: false,
        pagerCustom: true,
        adaptiveHeight: true,
        touchEnabled: (navigator.maxTouchPoints > 0),
        onSliderLoad: function(currentIndex) {
            $("#slide_counter02 .current_index").text(currentIndex + 1);
        },
        onSlideBefore: function($slideElement, oldIndex, newIndex) {
            $("#slide_counter02 .current_index").text(newIndex + 1);
        }
    });

    if ($("#slide_counter02").length) {
        $("#slide_counter02").append(popupzone_slide_thumb.getSlideCount());
    }

    $("#popupzone_slide_prev").on("click", function() {
        popupzone_slide_thumb.stopAuto();
        popupzone_slide_thumb.goToPrevSlide();
        return false;
    });

    $("#popupzone_slide_next").on("click", function() {
        popupzone_slide_thumb.stopAuto();
        popupzone_slide_thumb.goToNextSlide();
        return false;
    });

    $("#popupzone_slide_stop").on("click", function() {
        popupzone_slide_thumb.stopAuto();
        return false;
    });

    $("#popupzone_slide_play").on("click", function() {
        popupzone_slide_thumb.startAuto();
        return false;
    });

    $("#popupzone_slide_play").click(function() {
        $("#popupzone_slide_stop").css("display", "flex");
        $("#popupzone_slide_play").hide();
    });

    $("#popupzone_slide_stop").click(function() {
        $("#popupzone_slide_stop").hide();
        $("#popupzone_slide_play").css("display", "flex");
    });

    $("#popupzone_slide_next").keydown(function(e) {
        if (e.keyCode == 9 && !e.shiftKey) {
            $("#popupzone_slide_thumb div a").focusin(function() {
                popupzone_slide_thumb.goToSlide(0);
                popupzone_slide_thumb.stopAuto();
                $("#popupzone_slide_stop").hide();
                $("#popupzone_slide_play").css("display", "flex");
                return false;
            });
        }
    });

    // business_section
    $(".business_section dt a").click(function() {
        $(this).parent("dt").addClass("on").siblings("dt").removeClass("on");
        var height = $(this).parent().next("dd").children("ul").height();
        var height_t = height + 100;
        var $body = $("body");
        var widthChk = ($body.width() < 1400) ? true : false;
        if (widthChk) {
            $(".business_section dl").animate({
                height: height_t + "px"
            }, 400);
            return false;
        }
        return false;
    });

});