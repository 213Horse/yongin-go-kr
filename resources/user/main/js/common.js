$(function() {
    //탭메뉴
    tabmenu();
    tabmenuMinwon();

    if ($('#slideshows').length > 0) {
        /**/
        var slider = $('#slideshows').bxSlider({
            auto: true,
            speed: 700,
            mode: 'fade',
            controls: false,
            autoControls: false,
            pagerCustom: true,
            preventDefaultSwipeX: false,
            /*touchEnabled : (navigator.maxTouchPoints > 0),*/
            onSliderLoad: function(currentIndex) {
                currentIndex = currentIndex + 1;
                $('#slide-counter .current-index').text(currentIndex);
            },
            onSlideBefore: function($slideElement, oldIndex, newIndex) {
                $('#slide-counter .current-index').text(newIndex + 1);
            }
        });

        if (window.navigator.userAgent.toLowerCase().indexOf("chrome") > 0) {
            $("body").on("mousedown", ".bx-viewport a", function() {
                if ($(this).attr("href") && $(this).attr("href") != "#") {
                    window.location = $(this).attr("href");
                }
            });
        }

        $('#main_prev').on('click', function(e) {
            e.preventDefault();
            slider.goToPrevSlide(); //이전 슬라이드 배너로 이동
            return false; //<a>에 링크 차단
        });

        //다음 버튼을 클릭하면 다음 슬라이드로 전환
        $('#main_next').on('click', function(e) {
            e.preventDefault();
            slider.goToNextSlide(); //다음 슬라이드 배너로 이동
            return false;
        });
        $('#main_pause').on('click', function(e) {
            e.preventDefault();
            slider.stopAuto();
            return false;
        });
        $('#main_play').on('click', function(e) {
            e.preventDefault();
            slider.startAuto();
            return false;
        });
        $('#main_play').click(function() {
            $('#main_pause').show().focus();
            $('#main_play').hide();
        });
        $('#main_pause').click(function() {
            $('#main_pause').hide();
            /*$('#pz_play').css('display','block');*/
            $('#main_play').show().focus();
        });
        $('#slide-counter').append(slider.getSlideCount());
        $('#slideshows li').focusin(function() { //무한슬라이드 배너 포커스표시
            slider.stopAuto();
            slider.css('transform', 'translate3d(0, 0px, 0px)')
        })



        /* 팝업존 */
        var pzslider = $('#slideshows_popup').bxSlider({
            auto: true,
            speed: 700,
            // mode:'fade',
            controls: false,
            autoControls: false,
            pagerCustom: true,
            onSliderLoad: function(currentIndex) {
                $('#slide-counter-popup .current-index-popup').text(currentIndex + 1);
            },
            onSlideBefore: function($slideElement, oldIndex, newIndex) {
                $('#slide-counter-popup .current-index-popup').text(newIndex + 1);
            }
        });
        $('#pz_prev').on('click', function(e) {
            e.preventDefault();
            pzslider.goToPrevSlide(); //이전 슬라이드 배너로 이동
            return false; //<a>에 링크 차단
        });

        //다음 버튼을 클릭하면 다음 슬라이드로 전환
        $('#pz_next').on('click', function(e) {
            e.preventDefault();
            pzslider.goToNextSlide(); //다음 슬라이드 배너로 이동
            return false;
        });
        $('#pz_pause').on('click', function(e) {
            e.preventDefault();
            pzslider.stopAuto();
            return false;
        });
        $('#pz_play').on('click', function(e) {
            e.preventDefault();
            pzslider.startAuto();
            return false;
        });
        $('#pz_play').click(function() {
            $('#pz_pause').show().focus();
            $('#pz_play').hide();
        });
        $('#pz_pause').click(function() {
            $('#pz_pause').hide();
            $('#pz_play').css('display', 'block');
            $('#pz_play').show().focus();
        });
        $('#slide-counter-popup').append(pzslider.getSlideCount());
        $('#slideshows_popup li').focusin(function() { //무한슬라이드 배너 포커스표시
            pzslider.stopAuto();
            pzslider.css('transform', 'translate3d(0, 0px, 0px)')
        })
        /* 팝업존 알림마당 리스트 팝업 추가 */
        function pz_list() {
            //화면의 높이와 너비를 구한다.
            var pzmaskHeight = $(document).height();
            var pzmaskWidth = $(window).width();

            //마스크의 높이와 너비를 화면 것으로 만들어 전체 화면을 채운다.
            $('#mask').css({
                'width': pzmaskWidth,
                'height': pzmaskHeight
            });

            //애니메이션 효과 - 일단 1초동안 까맣게 됐다가 80% 불투명도로 간다.
            $('#mask').fadeIn(500);
            $('#mask').show("slow", 0.6);

            //윈도우 같은 거 띄운다.
            $('.window').show();
        }

        $(document).ready(function() {
            //검은 막 띄우기
            $('#pz_list').click(function(e) {
                e.preventDefault();
                pz_list();
            });

        });

        $(function() {
            jQuery.fn.center_pz_list = function() {
                this.css("position", "absolute");
                this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) + "px");
                this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft()) + "px");
                return this;
            }

            show_pz_list = function() {
                /*$("#pz_list_popup").attr('tabindex', '0');*/
                $("#pz_list_popup").show();
                /*$("#pz_list_popup").focus();*/
                $("#pz_list_popup").center();
                $("#pz_list_popup").attr('tabindex', '0');
                $("#pz_list_popup").focus();
            }
            $('.pz_list_close').click(function() {
                $('#pz_list_popup').hide();
            })
            $('.pz_list_close').click(function(e) {
                e.preventDefault();
                $('#mask, .window').hide();
            });

        });


        $('#pz_list_popup').on('hide', function() {
            $(this).removeAttr('tabindex');
            $('#pz_list').focus();
        });

        (function($) {
            $.each(['show', 'hide'], function(i, ev) {
                var el = $.fn[ev];
                $.fn[ev] = function() {
                    this.trigger(ev);
                    return el.apply(this, arguments);
                };
            });
        })(jQuery);

        $(document).keydown(function(event) {
            if (event.keyCode != 27) return true;
            if ($("#pz_list_popup").attr('tabindex') == "0") {
                $('#pz_list_popup').hide();
                event.preventDefault();
                $('#mask, .window').hide();
            }
            return false;
        });
        /**/
        var ctslider = $('#slideshows_ct').bxSlider({
            //mode:'fade',

            maxSlides: 4,
            slideWidth: 235,
            slideMargin: 20,
            moveSlides: 1,
            auto: true,
            speed: 700,
            // mode:'fade',
            controls: false,
            autoControls: false,
            pagerCustom: true,
            infiniteLoop: false,
            /* 2020접근성 */
            onSliderLoad: function(currentIndex) {
                $('#slide-counter-ct .current-index-ct').text(currentIndex + 1);
            },
            onSlideBefore: function($slideElement, oldIndex, newIndex) {
                $('#slide-counter-ct .current-index-ct').text(newIndex + 1);
            }
        });
        $('#ct_prev').on('click', function(e) {
            e.preventDefault();
            ctslider.goToPrevSlide(); //이전 슬라이드 배너로 이동
            return false; //<a>에 링크 차단
        });

        //다음 버튼을 클릭하면 다음 슬라이드로 전환
        $('#ct_next').on('click', function(e) {
            e.preventDefault();
            ctslider.goToNextSlide(); //다음 슬라이드 배너로 이동
            return false;
        });
        $('#ct_pause').on('click', function(e) {
            e.preventDefault();
            ctslider.stopAuto();
            return false;
        });
        $('#ct_play').on('click', function(e) {
            e.preventDefault();
            ctslider.startAuto();
            return false;
        });
        $('#ct_play').click(function() {
            $('#ct_pause').show().focus;
            $('#ct_play').hide();
        });
        $('#ct_pause').click(function() {
            $('#ct_pause').hide();
            $('#ct_play').css('display', 'block');
            $('#ct_play').show().focus;
        });
        $('#slide-counter-ct').append(ctslider.getSlideCount());
        $('#slideshows_ct li').focusin(function() { //무한슬라이드 배너 포커스표시
            ctslider.stopAuto(); //웹접근성 수정
            ctslider.css('transform', 'translate3d(0, 0px, 0px)')
        })
    }
    /**/
    var footer_slide = $('#footer_slide').bxSlider({
        auto: true,
        speed: 700,
        //mode:'fade',
        touchEnabled: false,
        controls: true,
        autoControls: false,
        infiniteLoop: false,
        pagerCustom: true,
        moveSlides: 1, // 슬라이드 이동시 개수
        slideWidth: 130, // 슬라이드 너비
        minSlides: 6, // 최소 노출 개수
        maxSlides: 6, // 최대 노출 개수
        slideMargin: 30, // 슬라이드간의 간격
        onSliderLoad: function() {
            console.log('onSliderLoad'); //executed
        },
        onSlideAfter: function($slideElement) {
            console.log('onSlideAfter'); //not executed if useCSS: true
        },
        onSlideBefore: function($slideElement, oldIndex, newIndex) {
            console.log('onSlideBefore'); //executed
        },
        onSlideNext: function($slideElement, oldIndex, newIndex) {
            console.log('onSlideNext'); //executed
        }
    });

    $('#footer_prev').on('click', function() {
        //footer_slide.goToPrevSlide();  //이전 슬라이드 배너로 이동
        $('#footer_slide li').each(function(e) {
            if ($('#footer_slide li').eq(e).attr('aria-hidden') == 'true') {
                $('#footer_slide li').eq(e).find('a').attr('tabindex', -1);
            } else {
                $('#footer_slide li').eq(e).find('a').attr('tabindex', 0);
            }
        });
        return false; //<a>에 링크 차단
    });

    //다음 버튼을 클릭하면 다음 슬라이드로 전환
    $('#footer_next').on('click', function() {
        //footer_slide.goToNextSlide();  //다음 슬라이드 배너로 이동
        $('#footer_slide li').each(function(e) {
            if ($('#footer_slide li').eq(e).attr('aria-hidden') == 'true') {
                $('#footer_slide li').eq(e).find('a').attr('tabindex', -1);
            } else {
                $('#footer_slide li').eq(e).find('a').attr('tabindex', 0);
            }
        });
        return false;
    });

    $('#footer_stop').on('click', function() {
        //footer_slide.stopAuto();
        return false;
    });

    $('#footer_play').on('click', function() {
        //footer_slide.startAuto();
        return false;
    });

    $('#footer_play').click(function() {
        $('#footer_stop').show();
        $('#footer_play').hide();
    });
    $('#footer_stop').click(function() {
        $('#footer_stop').hide();
        $('#footer_play').show();
    });

    //웹접근성 수정 START
    $('#footer_prev').focusin(function() { //무한슬라이드 배너 포커스표시
        footer_slide.stopAuto();
        footer_slide.css('transform', 'translate3d(0, 0px, 0px)');
    });
    //웹접근성 수정 END

    setInterval(function() {
        $('#footer_slide li').each(function(e) {
            if ($('#footer_slide li').eq(e).attr('aria-hidden') == 'true') {
                $('#footer_slide li').eq(e).find('a').attr('tabindex', -1);
            } else {
                $('#footer_slide li').eq(e).find('a').attr('tabindex', 0);
            }
        });
    }, 1000);




});

//탭메뉴 공통
function tabmenu() {
    $('.wrap_tab li').click(function() {
        var tabnum = $(this);
        $(this).parent().find('li.active').removeClass('active');
        tabnum.addClass('active');
        $(this).parent().parent().siblings('.tabbox').hide();
        $(this).parent().parent().siblings('.tabbox').eq(tabnum.index()).stop().fadeIn(200);
    });
}

function tabmenuMinwon() {
    $('.wrap_tab2 li > a').click(function() {
        var tabnum2 = $(this);
        tabnum2.parent().parent().find('li').removeClass('active');
        tabnum2.parent('li').addClass('active');
    });
}




//푸터 배너
$(function() {
    //    $(".gnb_wrap > li").bind("mouseenter focusin", function() {
    //        $(this).addClass("on").siblings().removeClass("on");
    //    });
    //    $(".gnb_wrap > li ").bind("mouseleave focusout", function() {
    //        $(this).removeClass("on");
    //    });
    $(".gnb_wrap > li").bind("click", function() {
        if ($(this).hasClass("on")) {
            $(this).removeClass("on");
        } else {
            $(this).addClass("on").siblings().removeClass("on");
        }
    });

});

//one click 팝업
function wrapWindowByMask() {
    //화면의 높이와 너비를 구한다.
    var maskHeight = $(document).height();
    var maskWidth = $(window).width();

    //마스크의 높이와 너비를 화면 것으로 만들어 전체 화면을 채운다.
    $('#mask').css({
        'width': maskWidth,
        'height': maskHeight
    });

    //애니메이션 효과 - 일단 1초동안 까맣게 됐다가 80% 불투명도로 간다.
    $('#mask').fadeIn(1000);
    $('#mask').show("slow", 0.6);

    //윈도우 같은 거 띄운다.
    $('.window').show();
}

$(document).ready(function() {
    //검은 막 띄우기
    $('#one_click').click(function(e) {
        e.preventDefault();
        wrapWindowByMask();
    });

});

$(function() {
    jQuery.fn.center = function() {
        this.css("position", "absolute");
        //this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) + "px");
        this.css("top", 0);
        this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft()) + "px");
        return this;
    }

    showPopup = function() {
        $("#one_click_popup").show();
        $("#one_click_popup").center();
        $("html, body").scrollTop(0);
    }
    $('#popup_close').click(function() {
        $('#one_click_popup').hide();
    })
    $('#popup_close').click(function(e) {
        e.preventDefault();
        $('#mask, .window').hide();
    });

});

//zoom
function zoom() {
    var nowZoom = 100;
    var Browser = {
        a: navigator.userAgent.toLowerCase()
    };
    Browser = {
        ie: /*@cc_on true || @*/ false,
        ie6: Browser.a.indexOf('msie 6') != -1,
        ie7: Browser.a.indexOf('msie 7') != -1,
        ie8: Browser.a.indexOf('msie 8') != -1,
        opera: !!window.opera,
        safari: Browser.a.indexOf('safari') != -1,
        safari3: Browser.a.indexOf('applewebkit/5') != -1,
        mac: Browser.a.indexOf('mac') != -1,
        chrome: Browser.a.indexOf('chrome') != -1,
        firefox: Browser.a.indexOf('firefox') != -1
    }

    $(".js-zoomin").click(function() {
        zoomIn();
    });
    $(".js-zoomout").click(function() {
        zoomOut();
    });

    function zooms() {
        if (Browser.firefox) {
            var nowffZoom = 1 + ((nowZoom * .01) - 1);
            $("body").css('-moz-transform', 'scale(' + nowffZoom + ')');
            $("body").css('transform-origin', '0 0');
        } else {
            document.body.style.zoom = nowZoom + '%';
        }
        if (nowZoom == 70) {
            alert("30%축소 되었습니다. 더 이상 축소할 수 없습니다.");
        }

        if (nowZoom == 500) {
            alert("500%확대 되었습니다. 더 이상 확대할 수 없습니다.");
        }
    }

    function zoomOut() {
        nowZoom -= 10;
        if (nowZoom < 70) {
            alert("더이상 축소할 수 없습니다.");
            nowZoom = 70;
        }
        zooms();
    }

    function zoomIn() {
        nowZoom += 10;
        if (nowZoom > 150) {
            alert("더이상 확대할 수 없습니다.");
            nowZoom = 150;
        }
        zooms();
    }
}

jQuery(function($) {
    zoom();
})

$(function() {
    $("#feosilder").bxSlider({
        auto: true,
        speed: 700,
        controls: false,
        pager: false
    });
});


$(function() {
    $(".footer_site").on("click", ".site_area button", function() {
        $(this).next(".site_list").show();
        $(".site_area .site_list").not($(this).next(".site_list")).hide();
        return false;
    });

    $(".site_list li a").click(function() {
        $(".site_area .site_list").hide();
    });

    $(".site_list .site_close").click(function() {
        $(this).parent(".site_list").hide();
        $(this).parent().parent().find("a").focus();
        return false;
    });

    $(".site_list .site_close").focusout(function() {
        $(this).parent(".site_list").hide();
    });
});