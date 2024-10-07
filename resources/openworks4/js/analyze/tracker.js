// 검색엔진 확인용
var anlzSearchEngine = new Array();
anlzSearchEngine.push("daum.net");
anlzSearchEngine.push("nate.com");
anlzSearchEngine.push("naver.com");
anlzSearchEngine.push("bing.com");
anlzSearchEngine.push("yahoo.com");
anlzSearchEngine.push("yahoo.co.kr");
anlzSearchEngine.push("google.com");
anlzSearchEngine.push("google.co.kr");
anlzSearchEngine.push("zum.com");

/**
 * 쿠키 생성
 */
var setAnlzCookie = function(key, value) {
    var argsVal = arguments;
    var argsLength = arguments.length;

    var tempExp = (argsLength > 2) ? argsVal[2] : '';
    var tempDomain = (argsLength > 3) ? argsVal[3] : '';

    if (tempExp !== '') {
        var date = new Date();
        date.setDate(date.getDate() + Number(tempExp));
        tempExp = date.toGMTString();
        document.cookie = key + '=' + value + ';expires=' + tempExp + ';domain=' + tempDomain + ';path=';
    } else {
        // 브라우저가 열려있는 동안에만 쿠키를 유지함.
        document.cookie = key + '=' + value + ';domain=' + tempDomain + ';path=';
    }
};

/**
 * 쿠키 삭제
 */
var delAnlzCookie = function(key, domain) {
    document.cookie = key + '=;expires=-1' + ';domain=' + domain + ';path=';
};

/**
 * 쿠키 값 조회
 */
var getAnlzCookie = function(key) {
    var allcookies = document.cookie;
    var cookies = allcookies.split('; ');
    for (var i = 0; i < cookies.length; i++) {
        var keyValues = cookies[i].split('=');
        if (keyValues[0] == key) {
            return unescape(keyValues[1]);
        }
    }
    return '';
};

/**
 * anlzSearchEngine 선언된 검색엔진을 통해 유입되었는지 여부
 */
var getAnlzSearchEngineYn = function(urlStr) {
    if (urlStr === '')
        return 'N';

    // Host명을 찾음(QueryString 중에 검색엔진명이 들어가 있는것을 방지하기 위함.)
    var _hostIndex1 = urlStr.indexOf('//') + 2;
    var _hostIndex2 = urlStr.substr(_hostIndex1).indexOf('/');
    urlStr = urlStr.substr(_hostIndex1, _hostIndex2);

    for (var i = 0; i < anlzSearchEngine.length; i++) {
        if (urlStr.indexOf(anlzSearchEngine[i]) >= 0)
            return 'Y';
    }
    return 'N';
};

/**
 * 세션아이디를 기준으로 페이지 조회
 */
var getAnlzPageViewCnt = function() {
    var anlzVisitCnt = getAnlzCookie(anlzSessionId);

    if (anlzVisitCnt == '') {
        // 첫페이지인 경우
        anlzVisitCnt = 1;
    }
    setAnlzCookie(anlzSessionId, (Number(anlzVisitCnt) + 1), '', location.hostname);
    return anlzVisitCnt;
};

/**
 * 새로고침(F5) 이벤트에 대해서 처리 여부를 결정한다
 */
var checkAnlzReflash = function(url, ref) {

    return true;
};

/**
 * 최초 접속여부를 구분한다
 * 
 * @param flag
 *            ALL : 최초접속여부(전체) HOUR : 최초접속여부(시) DATE : 최초접속여부(일) WEEK : 최초접속여부(주) MONTH : 최초접속여부(월)
 */
var getFirstVisitYn = function(flag) {
    var anlzFirstVisitYn = '';

    var visitDate = new Date();
    visitDate.setMinutes(0);
    visitDate.setSeconds(-1);

    /*
     * 쿠키생성 날짜 계산하는 로직이 달라서 setAnlzCookie와는 별도로 구현함
     */
    var setAnlzCookie2 = function(key, value) {
        var argsVal = arguments;
        var argsLength = arguments.length;

        var tempDomain = (argsLength > 2) ? argsVal[2] : '';

        var tempExp = visitDate.toGMTString();
        document.cookie = key + '=' + value + ';expires=' + tempExp + ';domain=' + tempDomain + ';path=';

    };

    switch (flag) {
        case 'ALL':
            // 최초접속여부(전체)
            anlzFirstVisitYn = getAnlzCookie('anlzFirstVisitYn');
            // 첫페이지여부 값 셋팅(세션을 삭제하기 전까지는 계속 갱신됨-최대 마지막 접속 후 1년)
            setAnlzCookie('anlzFirstVisitYn', 'N', 365, location.hostname);
            break;
        case 'HOUR':
            // 최초접속여부(시)
            visitDate.setHours(visitDate.getHours() + 1);
            anlzFirstVisitYn = getAnlzCookie('anlzFirstVisitHourYn');
            setAnlzCookie2('anlzFirstVisitHourYn', 'N', location.hostname);
            break;
        case 'DATE':
            // 최초접속여부(일)
            visitDate.setDate(visitDate.getDate() + 1);
            visitDate.setHours(0);
            anlzFirstVisitYn = getAnlzCookie('anlzFirstVisitDateYn');
            setAnlzCookie2('anlzFirstVisitDateYn', 'N', location.hostname);
            break;
        case 'WEEK':
            // 최초접속여부(주)
            visitDate.setDate(visitDate.getDate() + (7 - visitDate.getDay()));
            visitDate.setHours(0);
            anlzFirstVisitYn = getAnlzCookie('anlzFirstVisitWeekYn');
            setAnlzCookie2('anlzFirstVisitWeekYn', 'N', location.hostname);
            break;
        case 'MONTH':
            // 최초접속여부(월)
            visitDate.setMonth(visitDate.getMonth() + 1);
            visitDate.setDate(1);
            visitDate.setHours(0);
            anlzFirstVisitYn = getAnlzCookie('anlzFirstVisitMonthYn');
            setAnlzCookie2('anlzFirstVisitMonthYn', 'N', location.hostname);
            break;
    }
    if (anlzFirstVisitYn === null || $.trim(anlzFirstVisitYn) === "") {
        anlzFirstVisitYn = 'Y';
    }
    return anlzFirstVisitYn;
};

var getAnlzUserId = function() {
    var anlzUserId = getAnlzCookie('anlzUserId');

    if ($.trim(anlzUserId) == '') {
        anlzUserId = anlzClientIp + '|' + (new Date()).getTime();
        setAnlzCookie('anlzUserId', anlzUserId, 365, location.hostname);

    }
    return anlzUserId;
};

var getAnlzReVisitPeriod = function() {

    var AnlzReVisitPeriod = 0;
    var anlzLastVisitDt = getAnlzCookie('anlzLastVisitDt');
    anlzCurrDt = (new Date()).getTime();

    if ($.trim(anlzLastVisitDt) !== '') {
        AnlzReVisitPeriod = (Number(anlzCurrDt) - Number(anlzLastVisitDt)) / 1000 / 60 / 60 / 24;
    }

    setAnlzCookie('anlzLastVisitDt', anlzCurrDt, 365, location.hostname);
    return parseInt(AnlzReVisitPeriod);

};

/**************************************************************************************************
 * 아래 부터는 데이터 수집에 필요한 내용임. 수집에 필요한 Function등은 상단에 기술함.
 ***************************************************************************************************/

/**
 * 데이터 수집
 */
var analyzePageLog = function() {

    // 페이지 새로고침 체크
    if (checkAnlzReflash(document.location.href, document.referrer) === false) {
        return false;
    }
    var pageSj = $.trim($("title").text());
    if (pageSj == "") {
        pageSj = "제목없음";
    }
    var _ANALYZE_PAGE_LOG_DATA = {
        // 사용자 고유 아이디
        userId: getAnlzUserId(),
        // 접속 도메인명
        domnNm: location.hostname,
        // 접속 메뉴코드
        userMenuCode: anlzMenuCode,
        // 페이지 URL
        url: document.location.href,
        // 이전페이지
        transrCours: document.referrer,
        // User-Agent
        userAgent: navigator.userAgent,
        // 해상도(width)
        rsoltnAr: screen.width,
        // 해상도(height)
        rsoltnHg: screen.height,
        // 색상Bit수
        scrinColorCo: screen.colorDepth,
        // 페이지 Title
        pgeSj: pageSj,
        // 최초페이지 여부
        frstConectrAt: getFirstVisitYn('ALL'),
        // 검색엔진 유입여부
        searchEngineInflowAt: getAnlzSearchEngineYn(document.referrer),
        // 페이지 조회 횟수
        pgeViewCo: getAnlzPageViewCnt(),
        // 최초접속여부(시)
        frstConectHourAt: getFirstVisitYn('HOUR'),
        // 최초접속여부(일)
        frstConectDeAt: getFirstVisitYn('DATE'),
        // 최초접속여부(주)
        frstConectWeekAt: getFirstVisitYn('WEEK'),
        // 최초접속여부(월)
        frstConectMtAt: getFirstVisitYn('MONTH'),
        // 재방문기간
        againVisitPd: getAnlzReVisitPeriod()
    };

    $.ajax("/component/anallyze/ND_insertTracking.do", {
        type: 'POST',
        data: _ANALYZE_PAGE_LOG_DATA,
        timeout: 5000
    });

};

$(document).ready(function() {
    analyzePageLog();
});