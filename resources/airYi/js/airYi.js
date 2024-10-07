//메인미세먼지
var mainAirYiArea = function(jsonData, area) {

    $.each(jsonData, function(i, item) {
        if (item.name == area) {
            var resultArr = iconCheck(item.PM10, item.PM25, item.O3);

            $(".dust_state").text(resultArr[1]);
            $(".dust_state2").text(resultArr[3]);
            $(".dust_state").addClass(resultArr[0]);
            $(".dust_state2").addClass(resultArr[2]);

        }
    });
}

//미세먼지 초미세먼지 오존
var airYiArea = function(area) {

    $.each(jsonData, function(i, item) {
        if (item.name == area) {
            $("#area").text(item.name);
            $("#date").text(item.data_time);
            $("button[id='" + item.name + "']").addClass("current")

            $("#pm10_num").text(item.PM10);
            $("#pm25_num").text(item.PM25);
            $("#o3_num").text(item.O3);

            var resultArr = iconCheck(item.PM10, item.PM25, item.O3);

            $("#pm10_img").attr("class", resultArr[0]);
            $("#pm10_txt").attr("class", resultArr[0]);
            $("#pm10_txt").text(resultArr[1]);

            $("#pm25_img").attr("class", resultArr[2]);
            $("#pm25_txt").attr("class", resultArr[2]);
            $("#pm25_txt").text(resultArr[3]);

            $("#o3_img").attr("class", resultArr[4]);
            $("#o3_txt").attr("class", resultArr[4]);
            $("#o3_txt").text(resultArr[5]);

        }
    });
}


//측정소리스트
var airYiCenterList = function() {
    //측정소일반리스트
    $.each(jsonData, function(i, item) {
        var option = "<option value='" + item.name + "'>" + item.name + "</option>";
        $("#centerNmList").append(option);
    });

    //어린이집검색리스트
    $.each(jsonDataChild, function(i, item) {
        var num = 0;

        $.each($("#sensorList").children('option'), function(k, itemk) {

            if (itemk.text == item.sensorName) {
                num++;
            }
        });

        //중복리스트는 제외
        if (num == 0) {
            var option = "<option value='" + item.sensorName + "'>" + item.sensorName + "</option>";
            $("#sensorList").append(option);
        }
    });
}


//측정소검색
var airYiCenterFind = function() {
    var htmlTxt = "";

    $("#centerList *").remove();

    $.each(jsonData, function(i, item) {

        var resultArr = iconCheck(item.PM10, item.PM25, item.O3);

        htmlTxt = "";
        htmlTxt += "<tr>";
        htmlTxt += "<td>" + item.name + "</td>";
        htmlTxt += "<td><img src='/resources/airYi/images/" + resultArr[0] + ".png' alt='미세먼지 보통'><br>" + item.PM10 + "</td>";
        htmlTxt += "<td><img src='/resources/airYi/images/" + resultArr[2] + ".png' alt='초미세먼지 보통'><br>" + item.PM25 + "</td>";
        htmlTxt += "<td><img src='/resources/airYi/images/" + resultArr[4] + ".png' alt='오존 보통'><br>" + item.O3 + "</td>";
        htmlTxt += "</tr>";

        if (item.name == $("#centerNmList").val()) {
            $("#centerList *").remove();
            $("#centerList").append(htmlTxt);

            return false;
        } else {
            $("#centerList").append(htmlTxt);
        }

    });
}

//어린이집리스트
var airYiNurserySchoolList = function() {
    $("#childCenterNmList *").remove();

    //측정센서콤보
    var option = "<option value='' selected>전체</option>";
    $("#childCenterNmList").append(option);

    //어린이집콤보
    $.each(jsonDataChild, function(i, item) {
        if (item.sensorName == $("#sensorList").val()) {
            option = "<option value='" + item.nurserySchool + "'>" + item.nurserySchool + "</option>";
            $("#childCenterNmList").append(option);
        }

    });
}


//어린이집검색테이블
var childCenterList = function() {
    var htmlTxt = "";

    $("#childCenterList *").remove();
    $("#childDate").text("");

    $.each(jsonDataChild, function(i, item) {

        var resultArr = iconCheck(item.PM10, item.PM25, item.O3);

        htmlTxt = "";
        htmlTxt += "<tr>";
        htmlTxt += "<td>" + item.nurserySchool + "</td>";
        htmlTxt += "<td><img src='/resources/airYi/images/" + resultArr[0] + ".png' alt='미세먼지 보통'><br>" + item.PM10 + "</td>";
        htmlTxt += "<td><img src='/resources/airYi/images/" + resultArr[2] + ".png' alt='초미세먼지 보통'><br>" + item.PM25 + "</td>";
        htmlTxt += "<td><img src='/resources/airYi/images/" + resultArr[4] + ".png' alt='오존 보통'><br>" + item.O3 + "</td>";
        htmlTxt += "</tr>";

        if ('' != $("#sensorList").val() && '' != $("#childCenterNmList").val()) {
            if (item.sensorName == $("#sensorList").val() && item.nurserySchool == $("#childCenterNmList").val()) {
                $("#childCenterList *").remove();
                $("#childCenterList").append(htmlTxt);
                //console.log("1: "+htmlTxt);

                return false;
            }
        } else if ('' != $("#sensorList").val() && '' == $("#childCenterNmList").val()) {
            if (item.sensorName == $("#sensorList").val()) {
                $("#childCenterList").append(htmlTxt);
                //console.log("2: "+htmlTxt);
            }
        } else {
            //console.log("3: "+htmlTxt);
            $("#childCenterList").append(htmlTxt);
        }

        //측정일시
        if (i == 0) $("#childDate").append("측정일시 : " + item.data_time);
    });
}

//상태정보
var iconCheck = function(PM10, PM25, O3) {
    //미세먼지
    if (PM10 <= 30) {
        pm10_class = "excell";
        pm10_text = '좋음';
    } else if (PM10 <= 80) {
        pm10_class = "good";
        pm10_text = '보통';
    } else if (PM10 <= 150) {
        pm10_class = "ang";
        pm10_text = '나쁨';
    } else if (PM10 > 150) {
        pm10_class = "bad";
        pm10_text = '매우나쁨';
    } else {
        pm10_class = "nodata";
        pm10_text = '-';
    }

    //초미세먼지
    if (PM25 <= 15) {
        pm25_class = "excell";
        pm25_text = '좋음';
    } else if (PM25 <= 35) {
        pm25_class = "good";
        pm25_text = '보통';
    } else if (PM25 <= 75) {
        pm25_class = "ang";
        pm25_text = '나쁨';
    } else if (PM25 > 75) {
        pm25_class = "bad";
        pm25_text = '매우나쁨';
    } else {
        pm25_class = "nodata";
        pm25_text = '-';
    }

    //o3
    if (O3 <= 15) {
        o3_class = "excell";
        o3_text = '좋음';
    } else if (O3 <= 35) {
        o3_class = "good";
        o3_text = '보통';
    } else if (O3 <= 75) {
        o3_class = "ang";
        o3_text = '나쁨';
    } else if (O3 > 75) {
        o3_class = "bad";
        o3_text = '매우나쁨';
    } else {
        o3_class = "nodata";
        o3_text = '-';
    }

    return [pm10_class, pm10_text, pm25_class, pm25_text, o3_class, o3_text];
}