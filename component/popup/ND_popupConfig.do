/* 공통 초기화 기능 */
    $(document).ready(function() {
        processPopup();
    });

    var POPUP_URL = "/component/popup/ND_selectOpenPopup.do";
    var LAYER_URL = "/component/popup/ND_selectOpenLayer.do";
    // 문서 로드가 끝나면 실행되어 팝업을 종류에 맞게 생성한다.
    var processPopup = function() {
        if(opPopupConfigList && opPopupConfigList.length > 0) {
            for(var i = 0 ; i < opPopupConfigList.length ; i++) {
                var popupConf = opPopupConfigList[i];

                var cookieName = popupConf.cookiePrefix + popupConf.sn;
                var value = Cookies.get(cookieName);

                if(!value || popupConf.popupCycle == "3040") {
                    switch(popupConf.popupTy) {
                    case "1010":
                        opShowPopup(popupConf);
                        break;
                    case "1020":
                        opShowLayer(popupConf);
                        break;
                    case "1030":
                        opShowExpand(popupConf);
                        break;
                    case "1040":
                        opNoticeExpand(popupConf);
                        break;
                    default:
                        break;
                    }
                }
            }
        }
    };

    // 팝업 오픈
    var opShowPopup = function(popupConf) {
        var option = "chrome, centerscreen, dependent=yes, left="+ popupConf.leftLc +", top="+ popupConf.upendLc +",";
        option += "width="+ popupConf.widthSize +", height="+ popupConf.vrticlSize +", ";
        option += "dialog=yes, modal=yes, resizable=yes, scrollbars=yes, location=0, status=0, menubar=0, toolbar=0";

        var href = POPUP_URL + "?sn=" + popupConf.sn;
        var popupOpenWin = window.open(href, "opShowPopup"+ popupConf.sn, option);
        //popupOpenWin.focus();

        return false;
    };

    // 레이어 오픈
    var opShowLayer = function(popupConf) {
        var style = "style=\"z-index:10000;position: absolute; top: "+popupConf.upendLc+"px; left: "+popupConf.leftLc+"px; width: "+popupConf.widthSize+"px; height: "+popupConf.vrticlSize+"px;\"";
        var layerWin = "<div id=\"opShowPopup"+popupConf.sn+"\" "+ style +"><div>";

        $("body").prepend(layerWin);

        var params = {
            sn : popupConf.sn
        };
        $("#opShowPopup"+popupConf.sn).load(LAYER_URL, params, function(responseTxt, statusTxt, response) {
            if(statusTxt == "success") {
            } else {
            }
        });
    };

    // 상단 펼침
    var opShowExpand = function(popupConf) {
        var style = "style=\"display:none; z-index:10000; clear: both; margin :2px auto; width: "+popupConf.widthSize+"px; \"";
        var layerWin = "<div id=\"opShowPopup"+popupConf.sn+"\" "+ style +"><div>";

        $("body").prepend(layerWin);

        var params = {
            sn : popupConf.sn
        };
        $("#opShowPopup"+popupConf.sn).load(LAYER_URL, params, function(responseTxt, statusTxt, response) {
            if(statusTxt == "success") {
                $(this).slideDown( "slow", function() { });
            } else {
            }
        });
    };

    // 공지사항 펼침
    var opNoticeExpand = function(popupConf) {
        var style = "style=\"display:none; z-index:10000; clear: both; margin :2px auto; width: "+popupConf.widthSize+"px; \"";
        var layerWin = "<div id=\"opShowPopup"+popupConf.sn+"\" "+ style +"><div>";

        $("body").prepend(layerWin);

        var params = {
            sn : popupConf.sn
        };
        $("#opShowPopup"+popupConf.sn).load(LAYER_URL, params, function(responseTxt, statusTxt, response) {
            if(statusTxt == "success") {
                $(this).slideDown( "slow", function() { });
            } else {
            }
        });
    };

    // 팝업 레이어 접두어
    var prefixPopupLayerId = "opShowPopup";

    /* 부모창으로 URL 이동하고 창닫기 */
    var opPopupParent = function(aObj) {
        var href = $(aObj).attr("href");
        if(href) {
            location.href = href;
        }
        opHidePopupLayer(aObj);
    };

    /* 새창을 열어 URL 이동하고 창닫기 */
    var opPopupCloseWin = function(aObj) {
        var href = $(aObj).attr("href");
        if(href) {
            var option = "chrome, centerscreen, dependent=yes, dialog=yes, modal=yes, ";
            option += "resizable=yes, scrollbars=yes, location=yes, status=yes, menubar=yes, toolbar=yes";
            var newPopupWin = window.open(href, "opPopupWin", option);
            newPopupWin.focus();
        }
        opHidePopupLayer(aObj);
    };

    /* 새창을 열어 URL 이동하고 창유지 */
    var opPopupWin = function(aObj) {
        var href = $(aObj).attr("href");
        if(href) {
            var option = "chrome, centerscreen, dependent=yes, dialog=yes, modal=yes, ";
            option += "resizable=yes, scrollbars=yes, location=yes, status=yes, menubar=yes, toolbar=yes";
            var newPopupWin = window.open(href, "opPopupCloseWin", option);
            newPopupWin.focus();
        }
    };

    // 현재 클릭된 오브젝트의 팝업 레이어를 hide 시킨다.
    var opHidePopupLayer = function(clickEl) {
        var $popupLayerSn = null;
        var $targetEl = $(clickEl);
        while(!$popupLayerSn) {
            $popupLayerSn = opFindPopupLayerId($targetEl);
            $targetEl = $targetEl.parent();
        }
        $("#"+prefixPopupLayerId+$popupLayerSn).hide();
    };

    // 현재 POP 내용의 레이어 ID를 찾는다.
    var opFindPopupLayerId = function($child) {
        var $parent = $child.parent();
        var parentId = $parent.attr("id");
        if(parentId && parentId.indexOf(prefixPopupLayerId) === 0) {
            var len = prefixPopupLayerId.length;
            return parentId.substring(len);
        }
        return null;
    };
    
    /* 새창을 열어 URL 이동하고 창유지 */
    var opPopupSizeWin = function(aObj) {
        var href = $(aObj).attr("href");
        if(href) {
            var option = "chrome, centerscreen, dependent=yes, dialog=yes, modal=yes, width=450, height=383, ";
            option += "resizable=yes, scrollbars=yes, location=no, status=no, menubar=no, toolbar=no";
            var newPopupWin = window.open(href, "_blank", option);
            newPopupWin.focus();
        }
    };;
var opPopupConfigList = {}