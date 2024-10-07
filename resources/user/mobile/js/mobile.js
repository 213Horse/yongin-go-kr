$(document).ready(function() {

    $('#allmenu').attr('aria-hidden', 'true');
    $('.tab_list ul').find('li').each(function(e) {
        if ($('.tab_list ul').find('li').eq(e).hasClass('on')) {
            $('.tab_list ul').find('li').eq(e).find('a').eq(e).attr('title', '선택됨');
        }
    });

    /* 2023.04.04 start */
    $('.tab_list a').on('click', function(e) {
        $(this).attr('title', '선택됨').parent('li').siblings('li').children('a').removeAttr('title');
    });
    /* 2023.04.04 end */

    // 전체메뉴
    var handler = function(e) {
        e.preventDefault();
    }
    $('#btn_allmenu').click(function() {
        $('#allmenu').attr('aria-hidden', 'false');
        $('#allmenu').animate({
            'left': '0'
        }, 300);
        $('#allmenu .bg, #btn_allmenu_close').delay(200).fadeIn(100);
        $('#btn_allmenu_close').animate({
            'left': '240px'
        }, 300);
        $('#allmenu .bg, #containerWrap, #m_main').bind('touchmove', handler);
        $('html').addClass('no_scroll');
        return false;
    });
    $('#btn_allmenu_close, #allmenu .bg').click(function() {
        $('#allmenu').attr('aria-hidden', 'true');
        $('#allmenu').animate({
            'left': '-100%'
        }, 300);
        $('#allmenu .bg, #btn_allmenu_close').delay(200).fadeOut(100);
        $('#allmenu .bg, #containerWrap, #m_main').unbind('touchmove', handler);
        $('html').removeClass('no_scroll');
    });
    $('#allmenu a').click(function() {
        if ($(this).next('ul').length) {
            $(this).next('ul').slideToggle(300);
            $(this).parent('li').toggleClass('on').siblings('li').removeClass('on').children('ul').slideUp(300);
            return false;
        }
    });
    $('#allmenu a').next('ul').parent('li').addClass('depth'); //20200614 하위 메뉴가 있을 경우 depth 추가

    // 모바일 로케이션
    $('#mobile_location dt a').click(function() {
        $(this).parent('dt').next('dd').slideToggle(300).siblings('dd').slideUp(300);
        $(this).parent('dt').toggleClass('on').siblings('dt').removeClass('on');
        return false;
    });
    $('#mobile_location .btn_loc_close').click(function() {
        $(this).closest('dd').slideUp(300);
        $('#mobile_location dt').removeClass('on');
    });

    // 메인 비주얼
    if ($('.notice_banner').length > 0) {
        var swiper = new Swiper('.notice_banner', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            autoplay: 2500,
            autoplayDisableOnInteraction: false
        });
    }

    // 메인 탭메뉴
    $('.latest_list dt a').click(function() {
        $(this).parent('dt').addClass('on').siblings('dt').removeClass('on');
        return false;
    });

    // 메인 신청예약코너
    if ($('.reservation').length > 0) {
        var swiper = new Swiper('.reservation .monthly', {
            pagination: '.swiper-pagination',
            slidesPerView: 3,
            slidesPerColumn: 2,
            paginationClickable: true,
            spaceBetween: 0
        });

        var swiper = new Swiper('.reservation .fixmenu', {
            pagination: '.swiper-pagination',
            slidesPerView: 3,
            slidesPerColumn: 3,
            paginationClickable: true,
            spaceBetween: 0
        });
    }

    // 교육포털 메인 탭메뉴
    $('.tapmenu_edu dt:nth-child(1) a, .tapmenu_edu dt:nth-child(3) a, .tapmenu_edu dt:nth-child(5) a, .tapmenu_edu dt:nth-child(7) a, .tapmenu_edu dt:nth-child(9) a').click(function() {
        $(this).parent('dt').addClass('on').siblings('dt').removeClass('on');
        return false;
    });
});