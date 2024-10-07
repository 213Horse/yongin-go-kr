$(document).ready(function() {
    depSetting();
});

// // language
// $(document).on("click", ".language .language_btn", function () {
//     var $this = $(this),
//         $Parent = $this.parent(".language"),
//         IsActive = $Parent.is(".active"),
//         $Layer = $this.siblings(".lang_list").find("ul");
//     if(!IsActive){
//         $Parent.addClass("active");
//         $Layer.slideDown(300);
//         $("#kr a").focus();
//     } else{
//         $Parent.removeClass("active");
//         $Layer.slideUp(300);
//     };
// });
// $(document).on("click", ".language .lang_list .close", function () {
//     var $this = $(this),
//         $Parent = $this.parents(".language"),
//         $Layer = $this.siblings("ul"),
//         $language_btn = $(".language .language_btn");
//     $Layer.slideUp(300, function() {
//         $Parent.removeClass("active");
//         $language_btn.focus();
//     });
// });
// language 접근성
$(document).on("focus", "#logo > a", function() {
    var $this = $(".language .lang_list .close"),
        $Parent = $this.parents(".language"),
        $Layer = $this.siblings("ul"),
        $language_btn = $(".language .language_btn");
    $Layer.slideUp(300, function() {
        $Parent.removeClass("active");
    });
});

// 상단 검색 레이어
$(document).on("click", "#btn_search_open", function() {
    $("#header_search").addClass("opened").attr("tabindex", "0").focus();
    $("#btn_search_open").hide();
    $("#btn_search_close").show();
    $(".mask").show();
}).on("click", "#btn_search_close", function() {
    $("#header_search").removeClass("opened");
    $("#btn_search_close").hide();
    $("#btn_search_open").show();
    $(".mask").hide();
}).on("focus", ".btn_sitemap", function() {
    $("#header_search").removeClass("opened");
    $("#btn_search_close").hide();
    $("#btn_search_open").show();
    $(".mask").hide();
});

if ($(window).width() > 1216) {
    // PC
    var $header = $("#header");

    $(document).on("mouseenter focus", "#gnb > li > a", function() {
        $header.addClass("on");
        $(".mask").show();
        $(".gnb_menu li").removeClass("on");
        $(this).parent("li").addClass("on").siblings("li").removeClass("on");
    }).on("mouseleave", "#gnb", function() {
        $header.removeClass("on");
        $(".mask").hide();
        $("#gnb li").removeClass("on");
    }).on("mouseenter focus", ".gnb_menu_inner > ul > li > a", function() {
        $(this).parent("li").addClass("on").siblings("li").removeClass("on");
        return false;
    }).on("mouseenter focus", ".gnb_menu_inner > ul > li > ul > li > a", function() {
        $(this).parent().parent().parent("li").addClass("on").siblings("li").removeClass("on");
        return false;
    }).on("mouseleave", ".gnb_menu > ul > li.drop", function() {
        $(this).removeClass("on").find("li").removeClass("on")
        $(this).find("ul").hide();
        return false;
    }).on("click", ".gnb_menu > ul > li > ul > li.drop > a", function() {
        $(this).next("ul").slideToggle().parent("li").toggleClass("on");
        return false;
    }).on("keydown", "#gnb > li:last-child > .gnb_menu > .gnb_menu_inner > ul > li:last-child > a", function(e) {
        if (e.keyCode == 9 && !e.shiftKey) { // tab
            $header.removeClass("on");
            $(".mask").hide();
            $("#gnb li").removeClass("on");
        }
    }).on("keydown", "#gnb > li:first-child > a", function(e) {
        if (e.keyCode == 9 && e.shiftKey) { // shift + tab
            $(".mask").hide();
            $("#gnb li").removeClass("on");
        }
    });
} else {
    // Mobile
    $(document).on("click", "#gnb > li > a", function() {
        $(this).parent("li").addClass("on").siblings("li").removeClass("on")
        $(this).parent("li").siblings("li").children(".gnb_menu").children("ul").find("ul").hide().end().find("li").removeClass("on");
        return false;
    }).on("click", ".gnb_menu li.drop > a", function() {
        $(this).next("ul").slideToggle({
            duration: 300,
            easing: "easeOutQuint"
        });
        $(this).parent("li").toggleClass("on");
        return false;
    });
}

function depSetting() {
    $(".gnb_menu ul ul").each(function() {
        $(this).parent("li").addClass("drop");
    });
}

// 모바일 전체메뉴 여닫기
$(document).on("click", "#btn_gnb_open", function() {
    $("body").addClass("allmenu_opened");
    $("#gnb > li:first-child").addClass("on").siblings("li").removeClass("on");
    $("#container").on("scroll touchmove mousewheel", function(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    });
    return false;
}).on("click", "#btn_allmenu_close", function() {
    $("body").removeClass("allmenu_opened");
    $("#container").off("scroll touchmove mousewheel");
    $("#btn_gnb_open").focus();
    $(".gnb_menu ul li").removeClass("on");
    $(".gnb_menu ul ul").hide();
});

// 패밀리 사이트
$(document).on("click", ".layeropen", function() {
    var $this = $(this),
        $layer = $this.siblings(".list"),
        IsActive = $this.parent().is(".on");
    if (!IsActive) {
        $this.parent().addClass("on").siblings("li").removeClass("on");
        $layer.slideDown().parent("li").siblings().children(".list").slideUp();
        $layer.children("ul").children("li:first").children("a").focus();
    };
});
$(document).on("click", ".layerclose", function() {
    var $this = $(this),
        $layer = $this.parent(".list"),
        $layeropen = $layer.siblings(".layeropen");
    $this.parent().parent().removeClass("on");
    $layer.slideUp();
    $layeropen.focus();
});

// popup
var modalOpener = null;
$(document).on("click", "a.js-modal-open", function(e) {
    var tg = $(this).attr("href");
    modalOpen(tg, $(this));
    e.preventDefault();
}).on("click", ".js-modal-close", function() {
    var target = $(this).closest(".modal-popup").attr("id");
    modalClose("#" + target, modalOpener);
}).on("keydown", ".modal-popup .btn-close-modal", function(e) {
    if (e.keyCode == 9 && !e.shiftKey) { // tab
        e.preventDefault();
        $(this).siblings(".modal-title").attr("tabindex", "0").focus();
    }
}).on("keydown", ".modal-title", function(e) {
    if (e.keyCode == 9 && e.shiftKey) { // shift + tab
        e.preventDefault();
        $(this).siblings(".btn-close-modal").focus();
    }
});

function modalOpen(_target, _opener) {
    modalOpener = _opener;
    $(_target).fadeIn("fast").addClass("show");
    $(_target).attr("tabindex", "0").focus();
    bodyScroll(true, $("body").width());
}

function modalClose(_target, _opener) {

    bodyScroll(false);
    var tg = null;

    if (_opener) {
        tg = $(_target);
        modalOpener = $(_opener);
    } else {
        tg = $(".modal-popup.show");
        modalOpener = null;
    }

    $(tg).hide().removeClass("show");
    if (modalOpener !== null) {
        modalOpener.focus();
        modalOpener = null;
    }
}

function bodyScroll(_status, _orgWidth) {
    var $fixedObj = $("body");
    if (_status) {
        $("body").addClass("modal-opened");
        if ($("html").get(0).scrollWidth > $("html").width() === false) {
            $fixedObj.css("margin-right", $("body").width() - _orgWidth);
        }
    } else {
        $fixedObj.css("margin-right", "");
        $("body").removeClass("modal-opened");
    }
}