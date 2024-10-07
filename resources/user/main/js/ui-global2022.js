//
// 용인 산하 Global UI
//

// Skip Nav
// $(document).on('click', '#skip a', function (e) {
// 	var tg = $(this).attr('href');
// 	$(tg).attr('tabindex', '0').focus();
// 	e.preventDefault();
// });

// 테이블 스크롤 표시
$(document).ready(function() {
    if ($('.scroll-container').length > 0) {
        tableScroll();
    }
});

function tableScroll() {
    var table = $('.scroll-container');

    table.each(function() {
        var $this = $(this),
            ingClass = 'scroll-ing',
            endClass = 'scroll-end';
        $this.on('scroll', function(e) {
            var wrap = $(this).closest('.table-scroll'),
                currLeft = this.scrollLeft,
                scrWidth = this.scrollWidth,
                cliWidth = this.clientWidth;

            if (currLeft === 0) {
                wrap.removeClass(ingClass).removeClass(endClass);
            } else if (currLeft !== 0 && currLeft + cliWidth < scrWidth) {
                wrap.addClass(ingClass).removeClass(endClass);
            } else {
                wrap.addClass(endClass);
            }
        });
    });
}

// 탭메뉴
$(document).ready(function() {
    $('.tab-list').each(function() {
        var itemLength = $('>li', this).length;
        if (itemLength > 6) {
            $(this).parent('.tab-menu').addClass('tab-matrix-lg');
        }
        if (itemLength > 2) {
            $(this).parent('.tab-menu').addClass('tab-matrix-md');
        }
        if (itemLength > 9) {
            $(this).parent('.tab-menu').addClass('tab-dropdown-sm');
        }
    });
    $('.tab-list .on a').each(function() {
        $(this).attr('title', '선택됨');
        var tg = $(this).attr('href');
        if (tg !== '#' && tg !== '#;' && tg.charAt(0) === '#') {
            $(tg + '.tab-content').css('display', 'block');
        }
    });

    // 점프투 타입 추가
    $('.tab-content-jumpto').each(function() {
        $(this).prepend('<a href="#;" class="btn btn-xs btn-outline-default btn-jumpto-totop">메뉴로 <i class="ico ico-chevron-up-gray ml-1"></i></a>');
    });

    $(document).on('click', '.btn-jumpto-totop', function(e) {
        $('body, html').animate({
            scrollTop: $('.tab-menu-jumpto').offset().top,
        }, 300);
        var tg = $(this).closest('.tab-content-jumpto').attr('id');
        setTimeout(function() {
            $('.tab-menu-jumpto a[href="#' + tg + '"]').focus();
        }, 400);
    });

    $('.tab-list a').on('click', function(e) {
        var tg = $(this).attr('href');
        $(this).attr('title', '선택됨').parent('li').addClass('on').siblings('li').removeClass('on').children('a').removeAttr('title');
        if (!$(this).closest('.tab-menu').hasClass('tab-not-active')) {
            $(this).parent('li').addClass('on').siblings('li').removeClass('on');
        }
        if (tg === '#' || tg === '' || tg === '#;') {
            e.preventDefault();
        } else if (tg.charAt(0) === '#') {
            if ($(tg).hasClass('tab-content')) {
                $(tg).show().siblings('.tab-content').hide();
                e.preventDefault();

                // URL 해시 업데이트
                if ($(this).closest('.tab-menu').hasClass('tab-menu1') || $(this).closest('.tab-menu').hasClass('tab-menu-department')) {
                    history.pushState('', document.title, window.location.pathname + window.location.search + tg);
                }
            } else if ($(tg).length) {
                // 점프 투
                e.preventDefault();
                if ($(window).width() > 1024) {
                    $('body, html').animate({
                        scrollTop: $(tg).offset().top - 78 - 40,
                    }, 300);
                    $('.btn-jumpto-totop', tg).focus();
                } else {

                    if (!$(this).parent('li').hasClass('on')) {

                        $('body, html').animate({
                            scrollTop: $(tg).offset().top - 30,
                        }, 300);
                        $('.btn-jumpto-totop', tg).focus();

                    }
                }
            } else {
                console.log('콘텐츠가 없습니다.');
            }
        }

        // 모바일 드롭다운
        var $currentTab = $(this).closest('.tab-menu');
        if ($(window).width() < 768 && $currentTab.hasClass('tab-dropdown-sm')) {
            $('.tab-menu').not($currentTab).removeClass('opened');
            $currentTab.toggleClass('opened');
            if ($(this).parent('li').hasClass('on')) {
                e.preventDefault();
            }
        }
    });

    //점프 투 모바일
    if ($(window).width() < 1024) {
        $('.tab-menu-jumpto li a').off('click').on('click', function(e) {
            var tg = $(this).attr('href');
            $('.tab-menu-jumpto').toggleClass('opened');
            $('body, html').animate({
                scrollTop: $(tg).offset().top - 70,
            }, 300);
        })
    }
});

// 게시판 등록 : 파일첨부
$(function() {
    var fileTarget = $('.form-file');
    fileTarget.on('change', function() {
        if (window.FileReader) {
            var filename = $(this)[0].files[0].name;
        } else {
            var filename = $(this).val().split('/').pop().split('\\').pop();
        }
        $(this).next('.file-name').val(filename);
    });

    $('.file-attatch-item .file-name').on('click', function() {
        $(this).prev('.form-file').click();
    });
});

// 맨 위로
// (function toTop() {
// 	var $header = $('#header');

// 	$(window).scroll(function () {
// 		if ($(this).scrollTop() > 320) {
// 			$('#btn-totop').addClass('show');
// 			$header.addClass('bg-fadein')
// 		} else {
// 			$('#btn-totop').removeClass('show');
// 			$header.removeClass('bg-fadein');
// 		}
// 	});

// 	$(document).on('click', '#btn-totop', function (e) {
// 		e.preventDefault();
// 		$('body, html').animate({
// 			scrollTop: 0
// 		}, 300);
// 		return false;
// 	});
// })();

// 데이트피커
setTimeout(function() {
    $('.form-datepicker').each(function() {
        setDatepicker($(this));
    }).on('click', function() {
        openCalendar($(this));
    });
}, 200);

function removeDatepicker() {
    if ($('#inseq-datepicker').length > 0) {
        $('#inseq-datepicker').remove();
    }
}

$(document).on('click', '.btn-datepicker', function(e) {
    e.preventDefault();
    openCalendar($(this).prev());
});

function setDatepicker(obj) {
    $(obj).wrap('<span class="datepicker"></span>');
    if ($(obj).hasClass('full')) {
        $(obj).parent('.datepicker').addClass('full');
    }
    $(obj).after('<button type="button" class="btn btn-datepicker"><i class="ico ico-datepicker-primary"></i><span class="sr-only">달력</span></button>');
}

// 일반 레이어
$(function() {
    $('.layer-popup.show').each(function() {
        openLayer($(this), null);
    });
});

function openLayer(_target, _opener) {
    if ($(_target).length > 0) {
        layerOpener = _opener;
        setTimeout(function() {
            $(_target).addClass('show').removeClass('hide').css({
                left: $(_opener).position().left,
                top: $(_opener).outerHeight() + $(_opener).position().top,
            });
        }, 100);
        setTimeout(function() {
            $('.popup-inner', _target).attr('tabindex', '0').focus();
            $(_target).scrollTop(0);
        }, 300);
    }
}

function closeLayer(_target, _opener) {
    var tg = $(_target);
    if (tg.hasClass('show')) {
        if ($('.layer-popup.show').length == 1) {}
        tg.addClass('hide').removeClass('show');
        var modalOpener = $(_opener);
        if (modalOpener.length) {
            modalOpener.focus();
        }
    } else {
        alert('닫을 레이어를 올바로 지정해 주세요. \n closeLayer(\'#레이어아이디\')')
    }
}

var layerOpener = null;
$(document).on('click', '.layer-popup .btn-close-popup', function() {
    var target = $(this).closest('.layer-popup').attr('id');
    closeModal('#' + target, layerOpener);
});

// 모달 레이어
$(function() {
    $('.modal-popup.show').each(function() {
        openModal($(this), null);
    });
    // URL 해시 레이어 활성화
    var hash = location.hash;
    if (!(hash === '#' || hash === '' || hash === '#;')) {
        setTimeout(
            function() {
                if ($(hash).hasClass('modal-popup')) openModal(hash);
            }, 300);
    }
});

var modalOpener = null;
$(document).on('click', 'a.js-layer-open', function(e) {
    var tg = $(this).attr('href');
    openModal(tg, $(this));
    e.preventDefault();
}).on('click', '.modal-popup .btn-close-popup, .modal-popup .dimed', function() {
    var target = $(this).closest('.modal-popup').attr('id');
    closeModal('#' + target, modalOpener);
}).on('keydown', '.modal-popup .popup-inner', function(e) {
    if ($('.popup-inner').is(e.target) && e.keyCode == 9 && e.shiftKey) { // shift + tab
        e.preventDefault();
        $(this).find('.btn-close-popup').focus();
    }
}).on('keydown', '.modal-popup .btn-close-popup', function(e) {
    if (e.keyCode == 9 && !e.shiftKey) { // tab
        e.preventDefault();
        $(this).closest('.popup-inner').attr('tabindex', '0').focus();
        $(this).unbind('keydown').keydown();
    }
});

function openModal(_target, _opener) {
    if ($(_target).length > 0) {
        modalOpener = _opener;
        $(_target).appendTo('body');
        bodyScroll(true, $('body').width());
        $('body').addClass('modal-open');
        setTimeout(function() {
            $(_target).addClass('show').removeClass('hide');
        }, 100);
        setTimeout(function() {
            $('.popup-inner', _target).attr('tabindex', '0').focus();
            $(_target).scrollTop(0);
        }, 300);
    }
}

function closeModal(_target, _opener) {
    var tg = $(_target);
    if (tg.hasClass('show')) {
        if ($('.modal-popup.show').length == 1) {
            bodyScroll(false);
        }
        tg.addClass('hide').removeClass('show');
        var modalOpener = $(_opener);
        if (modalOpener.length) {
            modalOpener.focus();
        }
        // 레이어 해시 제거
        history.pushState('', document.title, window.location.pathname + window.location.search);
    } else {
        alert('닫을 레이어를 올바로 지정해 주세요. \n closeModal(\'#레이어아이디\')')
    }
}

var modalScrollTop;

function bodyScroll(_status, _orgWidth) {
    var $fixedModal = $('body');

    if (_status) {
        $fixedModal.addClass('modal-open');
        var scrollbarWidth = $('body').width() - _orgWidth;
        if (scrollbarWidth > 0) {
            $fixedModal.css({
                'margin-right': scrollbarWidth
            });
            $('.fixed-header #header').css({
                'right': scrollbarWidth
            });
        }
    } else {
        $fixedModal.removeClass('modal-open');
        $fixedModal.css({
            'margin-right': '',
        });
        $('.fixed-header #header').css({
            'right': '',
        });
    }
}

// 윈도우 팝업 오픈
var popOpenBtn = null;

function openWindow(_obj, popName, w, h, _opener) {
    var popW = 900;
    var popH = 600;
    var myUrl = _obj;

    if (typeof _obj !== 'string') {
        if ($(_obj).prop('tagName') === 'A') {
            popOpenBtn = $(_obj);
            myUrl = $(_obj).attr('href');
        } else if (_opener) {
            popOpenBtn = $(_opener);
        }
    }

    if (w) popW = w;
    if (h) popH = h;
    var left = window.screenX + (window.outerWidth - popW) / 2;
    var top = window.screenY + (window.outerHeight - popH) / 2;
    window.open(myUrl, popName, 'width=' + popW + ', height=' + popH + ', left=' + left + ', top=' + top + ', scrollbars=yes');
}

function closeWindow() {
    if (window.opener != null) {
        window.opener.openerFocus();
    }
    window.close();
}

function openerFocus() {
    if (popOpenBtn != null) {
        $(popOpenBtn).focus();
        popOpenBtn = null;
    }
}

// 리사이즈 감지
var term = 0,
    timer = null;

$(window).on('load resize', function() {
    clearTimeout(timer);
    timer = setTimeout(_modeDetect, term);
    term = 300;
});

var _mode;

function _modeDetect() {
    var widthScreen = $(window).width();
    var beforeMode = _mode;

    if (widthScreen > 1024) {
        _mode = 'pc';
    } else if (widthScreen >= 768) {
        _mode = 'tablet';
    } else {
        _mode = 'mobile';
    }
}
//초기 디바이스 확인용 함수 실행
_modeDetect();

$(document).ready(function() {
    // 입력필드 인터랙션
    $('.form-move .form-control').each(function() {
        var value = Boolean($(this).val());
        var $container = $(this).closest('.form-move');

        // 최초 세팅
        $container.toggleClass('active', value);

        // 포커스
        $(this).on('focusin', function() {
            $container.addClass('active focus');
        }).on('focusout', function() {
            value = Boolean($(this).val());
            $container.toggleClass('active', value);
            $container.removeClass('focus');
        });
    });

    // 토글박스
    $('.toggle-title.on').each(function() {
        $(this).next('.toggle-content').show();
    });
    $('.toggle-title .btn').click(function() {
        $(this).parent('.toggle-title').toggleClass('on').next('.toggle-content').slideToggle('fast');
    });

    // 토글버튼
    $('[data-toggle-btn]').click(function() {
        var toggleContent = $(this).data('toggle-btn');
        $('[data-toggle-content=' + toggleContent + ']').toggle();
    });

    // 반응형 이미지맵
    if ($('img[usemap]').length > 0) {
        $('img[usemap]').rwdImageMaps();
    }
});

//
// 레이아웃
//

// 헤더 스티키
var didScroll;
var lastScrollTop = 0;
var delta = 5;

$(window).on('scroll', function() {
    didScroll = true;
});

// GNB
var defaultH, close, openedH;
$(document).on('mouseenter focus', '.gnb-list > li > a', function(e) {
        e.preventDefault();

        if (!$(this).parent().hasClass('active')) {
            $(this).next('.lnb').show().parent('li').addClass('active').siblings('li').removeClass('active').children('.lnb').hide();
            $('body').addClass('gnb-opened');
        }
    }).on('mouseleave', '#gnb', function() {
        gnbClose();
    })
    .on('keydown', '#gnb .gnb-list>li:last-child .lnb ul > li:last-child > a', function(e) {
        if (e.keyCode == 9 && !e.shiftKey) { // tab
            gnbClose();
        }
    })

function gnbClose() {
    $('body').removeClass('gnb-opened');
    $('.gnb-list > li').removeClass('active');
    close = setTimeout(function() {
        $('#gnb .lnb').slideUp('fast');
    }, 0);
}

// $(document).on('click', '.part-list > li > a', function (e) {
// 	e.preventDefault();
// 	$(this).parent('li').addClass('on').siblings('li').removeClass('on');
// 	var tg = $(this).attr('href');
// 	$(tg).show().siblings('.part-content').hide();
// 	$('#header').css({
// 		height: defaultH + $(this).closest('.lnb').outerHeight()
// 	});
// });

// 화면 확대 축소
var scale = 1;
$(document).on('click', '.screen-scale .btn', function() {
    if ($(this).hasClass('btn-scale-up')) {
        scale += 0.1;
    } else if ($(this).hasClass('btn-scale-down')) {
        scale -= 0.1;
    } else if ($(this).hasClass('btn-scale-default')) {
        scale = 1;
    }
    $('body').attr('style', 'transform : scale(' + scale + ')');
});

// 모바일 검색 여닫기
$(document).on('click', '.btn-search-open, .btn-search-close', function(e) {
    e.preventDefault();
    $('.btn-right-group').toggleClass('on');
    //$('#global-search').slideToggle('fast');
});

// 헤더 내 드롭다운
$(document).on('mouseenter', '.dropdown-list', function() {
    $(this).addClass('hover');
    $(this).find('.btn').attr('title', '접기');
}).on('mouseleave', '.dropdown-list', function() {
    $(this).removeClass('hover');
    $(this).find('.btn').attr('title', '펼치기');
}).on('focus', '.dropdown-list', function() {
    $(this).closest('.dropdown-list').addClass('hover');
}).on('keydown', '.dropdown-list dt a', function(e) {
    if (e.keyCode == 9 && e.shiftKey) {
        $(this).closest('.dropdown-list').removeClass('hover');
    }
}).on('keydown', '.dropdown-list li:last-child>a', function(e) {
    if (e.keyCode == 9 && !e.shiftKey) {
        $(this).closest('.dropdown-list').removeClass('hover');
    }
}).on('mouseenter', '.dropdown-list .btn-closed', function(e) {
    $(this).closest('.dropdown-list').removeClass('hover');
});

$(document).on('click', '.btn-allmenu-open', function(e) {
    // openModal('#desktop-allmenu', this);
    if ($(window).width() < 1024) {
        e.preventDefault();
    }
    $('body').addClass('allmenu-open');
}).on('click', '.btn-allmenu-close', function() {
    $('body').removeClass('allmenu-open');
}).on('click', '.lnb-item .collapse > a', function(e) {
    $(this).next('ul').slideToggle('fast').parent('li').toggleClass('on');
    e.preventDefault();
}).on('click', '.language-list dt button', function() {
    $(this).attr('title', '접기').closest('.language-list').addClass('on');

}).on('click', '.language-list .btn-close-popup', function() {
    $(this).closest('.language-list').removeClass('on').find('dt button').attr('title', '펼치기');
});

// 스크롤 내비게이션
$(document).ready(function() {
    mobileAllmenu();
    familySiteMenu();
    gnbExpand();
});

function mobileAllmenu() {
    //처인성 전용
    $('#allmenu .language-list dt button').attr('title', '펼치기');

    $('.lnb-item ul ul').each(function() {
        $(this).parent('li').addClass('collapse');
    });

    var nav, scrollArea, scrollItem, ranges;

    nav = $('#mobile-allmenu .menu-area li a');
    scrollArea = $('#mobile-allmenu .allmenu-lnb');
    scrollItem = $('#mobile-allmenu .lnb-item');

    getPosition();

    nav.on('click', function(e) {
        getPosition();

        // setActive($(this));

        // scrollArea.stop().animate({
        // 	scrollTop: ranges[$(this).parent('li').index()][0]
        // }, 300);
        e.preventDefault();
    });

    $.fn.scrollStopped = function(callback) {
        var that = this,
            $this = scrollArea;

        $this.scroll(function(e) {
            clearTimeout($this.data('scrollTimeout'));
            $this.data('scrollTimeout', setTimeout(callback.bind(that), 150, e));
        });
    };

    // scrollArea.scrollStopped(function (e) {
    // 	var pos = Math.ceil($(this).scrollTop());

    // 	$.each(ranges, function (i, range) {
    // 		if (pos >= range[0] && pos < range[1]) {
    // 			setActive(nav.eq(i)[0]);
    // 			return;
    // 		}
    // 	});
    // });

    // function setActive(elem) {
    // 	$(elem).parent('li').addClass('on').siblings('li').removeClass('on');
    // }

    function getPosition() {
        ranges = scrollItem.map(function(i) {
            var defaultT = scrollItem.eq(0).position().top;
            var lnbT = scrollItem.eq(i).position().top - defaultT;
            return [
                [lnbT, scrollItem.eq(i).outerHeight() + lnbT + 1]
            ];
        });
    }

}

// 대표 홈 외 GNB
function gnbExpand() {
    // 모바일 화면에서
    if ($(window).width() < 1024) {
        if (!$('header').hasClass('header-www')) {
            $('.lnb-item ul').each(function() {
                $(this).prev('.lnb-title').addClass('collapse');
            });

            $('.lnb-item > .collapse').on('click', function(e) {
                e.preventDefault();
                $(this).toggleClass('on')
                $(this).next('ul').slideToggle('fast');
            });
        }
    }

    if (!$('header').hasClass('header-www')) {
        $('.lnb-list ul').each(function() {
            $(this).parent('li').addClass('collapse');
        });

        $('.lnb-list .collapse > a').on('click', function(e) {
            e.preventDefault();
            $(this).next('ul').slideToggle('fast').parent('li').toggleClass('on');
        });
    }

    // 대표 홈 GNB
    $('.header-www .allmenu-lnb .lnb-item').eq($('.header-www .allmenu-list > li.on').index()).show();
    $('.header-www .allmenu-list > li').on('click', function(e) {

        const allMenuIdx = $(this).index();
        $(this).addClass('on').siblings().removeClass('on');
        $('.allmenu-lnb .lnb-item').hide();
        $('.allmenu-lnb .lnb-item').eq(allMenuIdx).show();
    })

    //정책포털
    if ($('header').hasClass('header-fake')) {
        $('.gnb-list li a').on('click', function(e) {
            var tg = $(this).attr('href');
            $(tg).attr('tabindex', '0').focus();
            e.preventDefault();
        })
    }
}

// Breadcrumb
$(document).on('click', '.breadcrumb-list>li>a', function(e) {
    if ($(this).next('.sub-list-wrap').length) {
        e.preventDefault();
        $(this).parent('li').toggleClass('on').siblings('li').removeClass('on');
    }
}).on('keydown', '.breadcrumb-list ul>li:last-child>a', function(e) {
    if (e.keyCode == 9 && !e.shiftKey) {
        $('.breadcrumb-list>li').removeClass('on');
    }
});

$(document).on('mousedown', function(e) {
    var $obj = $('.breadcrumb-list');
    if ($obj.length > 0) {
        var objPos = $obj.offset();
        objPos.right = (objPos.left + $obj.width());
        objPos.bottom = (objPos.top + $obj.height());
        if ((e.pageX < objPos.left || e.pageX > objPos.right || e.pageY < objPos.top || e.pageY > objPos.bottom) && !$(e.target).closest('.breadcrumb-list').length) {
            $('.breadcrumb-list>li').removeClass('on');
        }
    }
});

// Sidebar
function snbSetting() {
    $('.snb-list ul').each(function() {
        $(this).parent('li').addClass('collapse');
    });
    if (!$('#sidebar').hasClass('sidebar-floating')) {
        $('.snb-list li.on>ul, .allmenu-list li.on>ul').each(function() {
            $(this).show();
        });
    }
}

$(document).on('click', '.snb-list .collapse > a', function(e) {
    e.preventDefault();
    $(this).next('ul').slideToggle('fast').parent('li').toggleClass('on');
});

$(document).ready(function() {
    // 전체메뉴 및 snb 세팅
    if ($('#sidebar').length > 0) {
        snbSetting();
    }
});

$(document).ready(function() {
    // 토글 전체 여닫기
    $('.btn-toggle-all').click(function() {
        $(this).toggleClass('on');
        if ($(this).hasClass('on')) {
            $('.toggle-list .toggle-title').addClass('on').next('.toggle-content').slideDown('fast');
        } else {
            $('.toggle-list .toggle-title').removeClass('on').next('.toggle-content').slideUp('fast');
        }
    });
});

// quickbar
$(document).ready(function() {
    var top;

    $(window).on("load scroll", function() {
        var top = 148;
        if ($(this).scrollTop() > top) {
            $("#quickmenu").addClass('fixed');
        } else {
            $("#quickmenu").removeClass('fixed');
        }
    });
});

// 패밀리 사이트
function familySiteMenu() {

    $('.familysite-list .selectbox-wrap').each(function() {
        $(this).children('.btn-selectbox').on('click', function(e) {
            $(this).next().slideToggle('fast').closest('.selectbox-wrap').toggleClass('on').parent('li').siblings('li').children('.selectbox-wrap').removeClass('on').children('.selectbox-inner').slideUp();

            if ($(this).parent().hasClass('on')) {
                $(this).attr('title', '닫기');
            } else {
                $(this).attr('title', '펼치기')
            }
        })
    })

    $('.familysite-list li:last-child').on('keydown', function() {
        $(this).closest('.selectbox-wrap').removeClass('on').children('.selectbox-inner').slideUp()
    })
}

// 박물관 공유
$(document).on('click', '.btn-share-open', function() {
    $('#page-share-body').addClass('opened');
    return false;
}).on('click', '.btn-share-close', function() {
    $('#page-share-body').removeClass('opened');
});

// language
$(document).on("click", ".language .language_btn", function() {
    var $this = $(this),
        $Parent = $this.parent(".language"),
        IsActive = $Parent.is(".active"),
        $Layer = $this.siblings(".lang_list").find("ul");
    if (!IsActive) {
        $Parent.addClass("active");
        $Layer.slideDown(300);
        $("#kr a").focus();
    } else {
        $Parent.removeClass("active");
        $Layer.slideUp(300);
    };
});
$(document).on("click", ".language .lang_list .close", function() {
    var $this = $(this),
        $Parent = $this.parents(".language"),
        $Layer = $this.siblings("ul"),
        $language_btn = $(".language .language_btn");
    $Layer.slideUp(300, function() {
        $Parent.removeClass("active");
        $language_btn.focus();
    });
});
$(document).on("click", ".language .language_btn", function() {
    var $this = $(this),
        $Parent = $this.parents(".language"),
        $Layer = $this.siblings("ul"),
        $language_btn = $(".language .language_btn");
    $Layer.slideUp(300, function() {
        $Parent.removeClass("active");
        $language_btn.focus();
    });
});
// language 접근성
$(document).on("focus", "#logo > a", function() {
    var $this = $(".language .language_bt"),
        $Parent = $this.parents(".language"),
        $Layer = $this.siblings("ul"),
        $language_btn = $(".language .language_btn");
    $Layer.slideUp(300, function() {
        $Parent.removeClass("active");
    });
});

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
            'left': '305px'
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

    /*// 모바일 로케이션
    $('#mobile_location dt a').click(function() {
        $(this).parent('dt').next('dd').slideToggle(300).siblings('dd').slideUp(300);
        $(this).parent('dt').toggleClass('on').siblings('dt').removeClass('on');
        return false;
    });
    $('#mobile_location .btn_loc_close').click(function() {
        $(this).closest('dd').slideUp(300);
        $('#mobile_location dt').removeClass('on');
    });*/

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
    $('.tapmenu_edu dt:nth-child(1) a, .tapmenu_edu dt:nth-child(3) a, .tapmenu_edu dt:nth-child(5) a, .tapmenu_edu dt:nth-child(7) a, .tapmenu_edu dt:nth-child(9) a, .tapmenu_edu dt:nth-child(11) a').click(function() {
        $(this).parent('dt').addClass('on').siblings('dt').removeClass('on');
        return false;
    });

    // 20230907
    // 용인통계
    $('#toggleBox button').click(function() {
        $(this).toggleClass('current')
        $('#toggleBox').toggleClass('infoOn')
    })

    $('.tab_subList li').click(function() {
        let idx = $(this).index()
        $('.tab_subList li').removeClass('current');
        $('.graphTab_cont > div').removeClass('current');
        $(`.graphTab_cont > div`).eq(idx).addClass('current')
        $(this).addClass('current')
    })
    // 20230907 />
});

// 20240312
// 20240220
$(function() {
    if ($('.ps').attr('checked', true)) {
        $('.ps').next().addClass('checked')
        $('.only_ps').show()
        $('.only_cp').hide()
    } else if ($('.cp').attr('checked', true)) {
        $('.only_cp').show()
        $('.only_ps').hide()
    }

    $('.selfInsf_container .horz_tbl.inf_tbl input[type="radio"] ').click(function() {
        $('.selfInsf_container .horz_tbl input[type="radio"]').next().removeClass('checked');
    })

    $('.selfInsf_container .horz_tbl.inf_tbl').on('click', 'input[type="radio"]', function() {
        $(this).next().addClass('checked')
    })


    $('.selfInsf_container .rd_tbl form').on('click', 'label', function() {
        $(this).closest('form').find('input[type="radio"]').attr('checked', false);
        $(this).prev('input[type="radio"]').attr('checked', true);
        $(this).closest('form').find('label').removeClass('checked');
        $(this).addClass('checked');
    });


    $('.selfInsf_container').on('click', '.btn_prt', function() {
        $('.prt_box').show()
    })
    $('.selfInsf_container .prt_box').on('click', '.close', function() {
        $('.prt_box').hide()
    })


    $('#inpName').click(function() {
        $('.mng_inp').removeAttr('readonly')
        $('#noInclu').attr('checked', false)
        $('#hygiMagr').focus()
        $('#inpName').attr('checked', true)


        if ($('#inpName + label').hasClass('checked')) {
            $('.mng_inp').focus();
            $('.mng_inp').removeAttr('readonly');
        }
    })

    $('#noInclu').click(function() {
        $('#inpName').attr('checked', false)
        $('#noInclu').attr('checked', true)
        $('.mng_inp').val("")
        $('.mng_inp').attr({
            'readonly': 'readonly'
        });
    })






    // $('.selfInsf_container .horz_tbl .tbl_flex').on('focus', 'input[type="text"]' , function () {
    //   $(this).prev().addClass('checked')
    // })

    // $('.selfInsf_container .horz_tbl .tbl_flex input[type="text"]').on('blur', function () {
    //   const content = $(this).val();

    //   if (content.length === 0) {
    //     $(this).prev().removeClass('checked');
    //   }
    // });

})

//조회기간 설정하는 자바스크립트 코드
function setQueryDate(elementId) {

    // 조회기간 문자열 생성
    var dateRangeStr = "2024. 4. 29 ~ 7. 31";
    // DOM 엘리먼트에 조회기간 문자열 적용
    document.getElementById(elementId).textContent = dateRangeStr;
}
// 20240220 />

// 20240312 />