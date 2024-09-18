var onReady = function() {
    $(".chkrdo").trigger("change");
};

function questionTypeChange(){
    const questionType = $('input[name="chk_button"]:checked').val();

    if (questionType == "product") {
        $('.sendmail').hide();
        $('.product').show();
        $('.recruit').hide();
    } else if (questionType == "recruit") {
        $('.sendmail').hide();
        $('.product').hide();
        $('.recruit').show();
    } else {
        $('.sendmail').show();
        $('.product').hide();
        $('.recruit').hide();
    }
};

function sendmail() {

    const lang = $('input[name="selectLang"]').val();

    if (!$('input[name="agreeCheckYn"]').is(":checked")) {
        alert_popup($('input[name="alertAgree"]').val());
        return;
    }

    if ($('input[name="inp_title"]').val() == '') {
        alert_popup($('input[name="alertTitle"]').val());
        return;
    }

    if ($('textarea[name="txtarea_dsc"]').val() == '') {
        alert_popup($('input[name="alertContent"]').val());
        return;
    }

    if ($('input[name="inp_name"]').val() == '') {
        alert_popup($('input[name="alertName"]').val());
        return;
    }

    if ($('input[name="inp_email"]').val() == '') {
        alert_popup($('input[name="alertEmail"]').val());
        return;
    }

    if (!checkEmailValidCheck($('input[name="inp_email"]').val())) {
        alert_popup($('input[name="alertEmailType"]').val());
        return;
    }

    const questionType = $('input[name="chk_button"]:checked').val().split('|')[0];
    /* 수정해야하는곳 - questionEamil > to array 로 바꿔야함 */
    /*const emails = email;*/
    const questionEamil = $('input[name="chk_button"]:checked').val().split('|')[1]; //설정된 받는 메일
    const title = $('input[name="inp_title"]').val();
    const desc = $('textarea[name="txtarea_dsc"]').val().replaceAll("\n", "<br/>");
    const name = $('input[name="inp_name"]').val();
    const email = $('input[name="inp_email"]').val(); //사용자 입력 이메일  : 회신 받는 메일


    const mainEmail = $('input[name="mainEmail"]').val(); //대표메일

    var content = "<!DOCTYPE html>\n" +
        "<html lang=\"ko\">\n" +
        "<head>\n" +
        "<title>LG디스플레이 문의/제안</title>\n" +
        "<meta charset=\"utf-8\" />\n" +
        "</head>\n" +
        "<body>\n" +
        "<table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n" +
        "\t<tr>\n" +
        "\t\t<td align=\"center\">\n" +
        "\t\t\t<table cellpadding=\"0\" cellspacing=\"0\" width=\"750\">\n" +
        "\t\t\t\t<tr>\n" +
        "\t\t\t\t\t<td><img src=\"https://bokiri.cafe24.com/LGD/images/mailing/img_mailing1.png\" width=\"750\" height=\"124\" alt=\"LG Display\"></td>\n" +
        "\t\t\t\t</tr>\n" +
        "\t\t\t\t<tr>\n" +
        "\t\t\t\t\t<td style=\"color:#555;font-size:14px;line-height:170%;padding:0 40px;font-family:'Malgun Gothic';\">\n" +
        "\t\t\t\t\t\t<strong style=\"color:#111;font-size:32px;\"><span style=\"color:#aa033e;\">1:1 문의가 등록</span>되었습니다.</strong><br><br>\n" +
        "\t\t\t\t\t\t안녕하세요.<br><br>\n" +
        "\t\t\t\t\t\tLG디스플레이 문의/제안 코너에 1:1 문의가 등록되었습니다.<br>\n" +
        "\t\t\t\t\t\t문의 내용을 확인해 주세요.<br><br>\n" +
        "\t\t\t\t\t\t<div class=\"mBoard1\">\n" +
        "\t\t\t\t\t\t\t<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n" +
        "\t\t\t\t\t\t\t\t<tr>\n" +
        "\t\t\t\t\t\t\t\t\t<td colspan=\"2\" bgcolor=\"#333333\" height=\"1\"></td>\n" +
        "\t\t\t\t\t\t\t\t</tr>\n" +
        "\t\t\t\t\t\t\t\t<tr>\n" +
        "\t\t\t\t\t\t\t\t\t<th bgcolor=\"#fafafa\" width=\"105\" style=\"color:#555;font-size:14px;padding:10px 0 10px 15px;text-align:left;\">이름</th>\n" +
        "\t\t\t\t\t\t\t\t\t<td bgcolor=\"#ffffff\" style=\"color:#111;font-size:14px;padding:10px 0 10px 15px;\">" + name + "</td>\n" +
        "\t\t\t\t\t\t\t\t</tr>\n" +
        "\t\t\t\t\t\t\t\t<tr>\n" +
        "\t\t\t\t\t\t\t\t\t<td colspan=\"2\" bgcolor=\"#e8e8e8\" height=\"1\"></td>\n" +
        "\t\t\t\t\t\t\t\t</tr>\n" +
        "\t\t\t\t\t\t\t\t<tr>\n" +
        "\t\t\t\t\t\t\t\t\t<th bgcolor=\"#fafafa\" width=\"105\" style=\"color:#555;font-size:14px;padding:10px 0 10px 15px;text-align:left;\">이메일</th>\n" +
        "\t\t\t\t\t\t\t\t\t<td bgcolor=\"#ffffff\" style=\"color:#111;font-size:14px;padding:10px 0 10px 15px;\">" + email + "</td>\n" +
        "\t\t\t\t\t\t\t\t</tr>\n" +
        "\t\t\t\t\t\t\t\t<tr>\n" +
        "\t\t\t\t\t\t\t\t\t<td colspan=\"2\" bgcolor=\"#e8e8e8\" height=\"1\"></td>\n" +
        "\t\t\t\t\t\t\t\t</tr>\n" +
        "\t\t\t\t\t\t\t\t<tr>\n" +
        "\t\t\t\t\t\t\t\t\t<th bgcolor=\"#fafafa\" width=\"105\" style=\"color:#555;font-size:14px;padding:10px 0 10px 15px;text-align:left;\">문의유형</th>\n" +
        "\t\t\t\t\t\t\t\t\t<td bgcolor=\"#ffffff\" style=\"color:#111;font-size:14px;padding:10px 0 10px 15px;\">" + questionType + "</td>\n" +
        "\t\t\t\t\t\t\t\t</tr>\n" +
        "\t\t\t\t\t\t\t\t<tr>\n" +
        "\t\t\t\t\t\t\t\t\t<td colspan=\"2\" bgcolor=\"#e8e8e8\" height=\"1\"></td>\n" +
        "\t\t\t\t\t\t\t\t</tr>\n" +
        "\t\t\t\t\t\t\t\t<tr>\n" +
        "\t\t\t\t\t\t\t\t\t<th bgcolor=\"#fafafa\" width=\"105\" style=\"color:#555;font-size:14px;padding:10px 0 10px 15px;text-align:left;\">제목</th>\n" +
        "\t\t\t\t\t\t\t\t\t<td bgcolor=\"#ffffff\" style=\"color:#111;font-size:14px;padding:10px 0 10px 15px;\">" + title + "</td>\n" +
        "\t\t\t\t\t\t\t\t</tr>\n" +
        "\t\t\t\t\t\t\t\t<tr>\n" +
        "\t\t\t\t\t\t\t\t\t<td colspan=\"2\" bgcolor=\"#e8e8e8\" height=\"1\"></td>\n" +
        "\t\t\t\t\t\t\t\t</tr>\n" +
        "\t\t\t\t\t\t\t\t<tr>\n" +
        "\t\t\t\t\t\t\t\t\t<th bgcolor=\"#fafafa\" width=\"105\" style=\"color:#555;font-size:14px;padding:10px 0 10px 15px;text-align:left;\">내용</th>\n" +
        "\t\t\t\t\t\t\t\t\t<td bgcolor=\"#ffffff\" style=\"color:#111;font-size:14px;padding:10px 0 10px 15px;\">" + desc + "</td>\n" +
        "\t\t\t\t\t\t\t\t</tr>\n" +
        "\t\t\t\t\t\t\t\t<tr>\n" +
        "\t\t\t\t\t\t\t\t\t<td colspan=\"2\" bgcolor=\"#e8e8e8\" height=\"1\"></td>\n" +
        "\t\t\t\t\t\t\t\t</tr>\n" +
        "\t\t\t\t\t\t\t</table>\n" +
        "\t\t\t\t\t\t</div>\n" +
        "\t\t\t\t\t\t<br><br><br>\n" +
        "\t\t\t\t\t</td>\n" +
        "\t\t\t\t</tr>\n" +
        "\t\t\t\t<tr>\n" +
        "\t\t\t\t\t<td bgcolor=\"#f7f7f7\" style=\"color:#555;font-size:13px;line-height:170%;padding:32px 40px;\">\n" +
        "\t\t\t\t\t\t본 메일은 발신 전용메일이므로 회신이 불가능합니다.<br>\n" +
        "\t\t\t\t\t\t서울특별시 영등포구 여의대로 128, LG트윈타워  ㅣ  T. 02-3773-1114<br>\n" +
        "\t\t\t\t\t\t&copy; 2021 LG Display Co., Ltd. All Rights Reserved.\n" +
        "\t\t\t\t\t</td>\n" +
        "\t\t\t\t</tr>\n" +
        "\t\t\t</table>\n" +
        "\t\t</td>\n" +
        "\t</tr>\n" +
        "</table>\n" +
        "</body>\n" +
        "</html>";

    const param = {
        from: mainEmail,
        questionEmail: questionEamil,
        subject: "1:1 문의가 등록되었습니다.",
        /*to: emails,*/
        content: content
    };

    $.ajax({
        url: "/" + lang + "/question/sendmail",
        method: "post",
        type: "json",
        contentType: "application/json",
        data: JSON.stringify(param),
        success: function () {
            $.alert({
                title: '',
                content: $('input[name="alertRegister"]').val(),
                buttons: {
                    OK: function () {
                        location.href = "/" + lang + "/question";
                    }
                }
            });
        }
    });
};

var checkEmailValidCheck = function (email) {
    var reg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    return reg.test(email)
};

function alert_popup (content) {
    $.alert({
        title: '',
        content: content,
    });
}

$(document).ready(onReady)
    .on('change', '.chkrdo', questionTypeChange);
