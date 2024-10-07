function MakeBSquery(query) {
    //& => and; + => or; ! => not; ^ => with; ~ => near;
    var newS = "";
    var status = 0;
    for (var i = 0; i < query.length; i++) {
        var temp = query.charAt(i);
        if (temp == '&') {
            newS += ' AND ';
            status = 1;
        } else if (temp == '+') {
            newS += ' OR ';
            status = 1;
        } else if (temp == '!') {
            newS += ' NOT ';
            status = 1;
        } else if (temp == '^') {
            newS += ' WITH ';
            status = 1;
        } else if (temp == '~') {
            newS += ' NEAR ';
            status = 1;
            //}else if(temp == ' ' && status == 0){
            //        newS += '* ';
        } else {
            newS += temp;
            status = 0;
        }
    }

    //앞에서 공백검색을 체크하면 이러한 경우는 오지않는다.
    /*        if(query.length == 0 || query == "@docn")
            	return "@docn";*/

    if (status == 0)
        return newS;
    else return newS;
}

function MakeBSquery1(query) {
    //& => and; + => or; ! => not; ^ => with; ~ => near;
    var newS = "";
    var status = 0;
    for (var i = 0; i < query.length; i++) {
        var temp = query.charAt(i);
        if (temp == '&') {
            newS += ' AND ';
            status = 1;
        } else if (temp == '+') {
            newS += ' OR ';
            status = 1;
        } else if (temp == '!') {
            newS += ' NOT ';
            status = 1;
        } else if (temp == '^') {
            newS += ' WITH ';
            status = 1;
        } else if (temp == '~') {
            newS += ' NEAR ';
            status = 1;
            //}else if(temp == ' ' && status == 0){
            //        newS += '* ';
        } else {
            newS += temp;
            status = 0;
        }
    }

    /*if(query.length == 0)
    	return "(@docn)";*/

    return newS;
}

function makeSangQuery(szQuery, szAndWord, szOrWord, szNotWord) {
    var szRet = "";

    var tmpWordA = "";
    var tmpWordO = "";
    var tmpWordN = "";

    var splitAndWord;
    var splitOrWord;
    var splitNotWord;
    splitAndWord = [];
    splitOrWord = [];
    splitNotWord = [];

    var nLoop = 0;
    var tmpWord = "";

    if (szAndWord != "") {
        splitAndWord = szAndWord.split(" ");
        tmpWord = "";

        for (nLoop = 0; nLoop < splitAndWord.length; nLoop++) {
            if (splitAndWord[nLoop] != "")
                tmpWord = tmpWord + " AND " + splitAndWord[nLoop];
        }

        tmpWordA = szQuery + tmpWord;
        //tmpWordA = f.queryWord.value + " AND " + f.andWord.value;
    } else {
        tmpWordA = szQuery;
        //tmpWordA = f.queryWord.value;
    }

    if (szOrWord != "") {
        splitOrWord = szOrWord.split(" ");
        tmpWord = "";

        for (nLoop = 0; nLoop < splitOrWord.length; nLoop++) {
            if (splitOrWord[nLoop] != "")
                tmpWord = tmpWord + " OR " + splitOrWord[nLoop];
        }

        tmpWordO = "(" + tmpWordA + ")" + tmpWord;
        //tmpWordO = tmpWordA + tmpWord;					
        //tmpWordO = tmpWordA + " OR " + f.orWord.value;
    } else {
        tmpWordO = tmpWordA;
    }

    if (szNotWord != "") {
        splitNotWord = szNotWord.split(" ");
        tmpWord = "";

        for (nLoop = 0; nLoop < splitNotWord.length; nLoop++) {
            if (splitNotWord[nLoop] != "")
                tmpWord = tmpWord + " NOT " + splitNotWord[nLoop];
        }

        tmpWordN = "(" + tmpWordO + ")" + tmpWord;

        //tmpWordN = "(" + tmpWordO + ") NOT " + f.notWord.value;
    } else {
        tmpWordN = tmpWordO;
    }

    //f.searchWord.value = tmpWordN;		

    szRet = tmpWordN;

    return szRet;
}

// 입력값이 숫자인지를 검사한다.
function isNumber(str) {
    var re = new RegExp("[^0-9]", "g");
    var r = str.match(re);
    if (r == null) {
        return true;
    } else { // 숫자 이외의 문자가 존재하는 경우
        return false;
    }
}

// 특수문자체크
function hasSpecialCharacter(str) {
    // "체크한다.
    for (var i = 0; i < str.length; i++) {
        var temp = str.charAt(i);
        if (temp == '\"' || temp == '#' || temp == '[' || temp == ']' || temp == '%' || temp == '_' || temp == '=')
            return true;
        if (temp == '<' || temp == '>' || temp == '{' || temp == '}' || temp == '|' || temp == '(' || temp == ')')
            return true;
        if (temp == '$' || temp == '-' || temp == ';' || temp == '\'' || temp == '`' || temp == '?')
            return true;
    }


    //	var re = new RegExp("[@#$%_~|/=><}{]()-]", "g");
    //	var r = str.match(re);
    //	if(r != null) {
    //		return true;
    //	}
    //	else {
    //		return false;
    //	}
}

// " => '로 바꾼다.
function escape(query) {
    var newS = "";
    for (var i = 0; i < query.length; i++) {
        var temp = query.charAt(i);
        if (temp == '\"')
            newS += " ";
        else
            newS += temp;
    }

    return newS;
}

//////////////////////////////////////////////////////////////////////////////
// edited by Gabby
// 2002-04-07
//////////////////////////////////////////////////////////////////////////////

// 문자열의 왼쪽 화이트스페이스(공백, 탭, 개행문자등)를 제거한다.
function leftTrim(str) {
    if (str.length == 0) {
        return str;
    }
    var resultString = "";
    for (var i = 0; str.charAt(i) == ' '; i++) {}
    resultString = str.substring(i, str.length);
    return resultString;
}

// 문자열의 오른쪽 화이트스페이스(공백, 탭, 개행문자등)를 제거한다.
function rightTrim(str) {
    if (str.length == 0) {
        return str;
    }
    var resultString = "";
    for (var i = str.length - 1; str.charAt(i) == ' '; i--) {}
    resultString = str.substring(0, i + 1);
    return resultString;
}

// 문자열의 왼쪽 및 오른쪽 화이트스페이스(공백, 탭, 개행문자등)를 제거한다.
function trimString(str) {
    var temp = leftTrim(str);
    temp = rightTrim(temp);
    return temp;
}

// 입력값이 공백인지를 검사한다.
function isBlank(str) {
    if (trimString(str) == "") {
        return true;
    } else {
        return false;
    }
}

// 입력값에 한글이 포함되어 있는지를 검사한다.
function hasHangul(str) {
    var re = new RegExp("[\u3130-\u318F\u1100-\u11FF\uAC00-\uD7AF]", "g");
    var r = str.match(re);
    if (r != null) { // 한글자모 또는 한글문자가 존재하는 경우
        return true;
    } else {
        return false;
    }
}

// 입력값에 한글자모가 포함되어 있는지를 검사한다.
function hasHangulJamo(str) {
    var re = new RegExp("[\u3130-\u318F\u1100-\u11FF]", "g");
    var r = str.match(re);
    if (r != null) { // 한글자모가 존재하는 경우
        return true;
    } else {
        return false;
    }
}

// 특수문자체크
function hasSpecialCharacter2(str) {
    var re = new RegExp("[@#$%_\"]", "g");
    var r = str.match(re);
    if (r != null) {
        return true;
    } else {
        return false;
    }
}

// 검색어가 빈값일 경우
function hasNullCharacter(str) {
    //검색어가 없을경우
    if (str.length == 0) {
        return true;
    }
}


//특수문자체크
function removeSpecialCharacter(str) {
    // "체크한다.
    var buffer = new Array();
    var isspec = false;
    for (var i = 0; i < str.length; i++) {
        var temp = str.charAt(i);
        isspec = false;
        if (temp == '\"' || temp == '#' || temp == '[' || temp == ']' || temp == '%' || temp == '_' || temp == '=')
            isspec = true;
        if (temp == '<' || temp == '>' || temp == '{' || temp == '}' || temp == '|' || temp == '(' || temp == ')')
            isspec = true;
        if (temp == '$' || temp == '-' || temp == ';' || temp == '\'' || temp == '`' || temp == '?')
            isspec = true;

        if (isspec == false) buffer.push(temp);
    }
    return buffer.join("");
}

//검색어 자동완성 관련 AJAX

function BSchkAjaBrowser() {
    var a, ua = navigator.userAgent;
    this.bw = {
        safari: ((a = ua.split('AppleWebKit/')[1]) ? a.split('(')[0] : 0) >= 124,
        konqueror: ((a = ua.split('Konqueror/')[1]) ? a.split(';')[0] : 0) >= 3.3,
        mozes: ((a = ua.split('Gecko/')[1]) ? a.split(" ")[0] : 0) >= 20011128,
        opera: (!!window.opera) && ((typeof XMLHttpRequest) == 'function'),
        msie: (!!window.ActiveXObject) ? (!!createHttpRequest()) : false
    }
    return (this.bw.safari || this.bw.konqueror || this.bw.mozes || this.bw.opera || this.bw.msie)
}

function BScreateXMLHttpRequest() {
    if (window.ActiveXObject) {
        return new ActiveXObject("Microsoft.XMLHTTP");
    } else if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    }
}

function BSgetById(id, where) {
    if (where == null || where == "")
        return document.getElementById(id);
    else
        return eval(where + ".document.getElementById('" + id + "')");
}

function BSgetClientType() {
    if (navigator.appName.indexOf("Microsoft") != -1) return "IE";
    else if (navigator.appName.indexOf("Netscape") != -1) return "MOZ";
    else return 0;
}

function BSsendRequest(callback, data, method, url, async, sload, user, password) {
    var oj = BScreateXMLHttpRequest();
    if (oj == null) return null;

    var sload = (!!BSsendRequest.arguments[5]) ? sload : false;
    if (sload || method.toUpperCase() == 'GET') url += "?";
    //if(sload)url=url+"t="+(new Date()).getTime();

    var bwoj = new BSchkAjaBrowser();
    var opera = bwoj.bw.opera;
    var safari = bwoj.bw.safari;
    var konqueror = bwoj.bw.konqueror;
    var mozes = bwoj.bw.mozes;

    if (opera || safari || mozes) {
        oj.onload = function() {
            callback(oj);
        }
    } else {
        oj.onreadystatechange = function() {
            if (oj.readyState == 4) {
                callback(oj);
            }
        }
    }

    if (method.toUpperCase() == 'GET') {
        url += data
    }

    oj.open(method, url, async, user, password);

    setEncHeader(oj)

    oj.send(data);

    function setEncHeader(oj) {
        var contentTypeUrlenc = 'application/x-www-form-urlencoded; charset=UTF-8';
        if (!window.opera) {
            oj.setRequestHeader('Content-Type', contentTypeUrlenc);
        } else {
            if ((typeof oj.setRequestHeader) == 'function')
                oj.setRequestHeader('Content-Type', contentTypeUrlenc);
        }
        return oj
    }

    function uriEncode(data) {

        if (data != "") {
            var encdata = '';
            var datas = data.split('&');
            for (i = 1; i < datas.length; i++) {
                var dataq = datas[i].split('=');
                encdata += '&' + encodeURIComponent(dataq[0]) + '=' + encodeURIComponent(dataq[1]);
            }
        } else {
            encdata = "";
        }
        return encdata;
    }
    return oj
}