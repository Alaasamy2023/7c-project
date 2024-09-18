/**
 * 페이징
 *
 * @param page
 * @param size
 */
var pagination = function pagination(page) {
  var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
  if (!size) size = 5;
  var $form = $("form[name='page']");
  var $searchForm = $("form[name='search']");

  if ($form.length <= 0) {
    var formHtml = "<form name='page'>";
    formHtml += "<input name='page' type='hidden' value=''><input name='size' type='hidden' value=''>";
    if($searchForm.length > 0){
      formHtml += "<input name='searchTitle' type='hidden' value='" + $searchForm.find('input[name="searchTitle"]').val()+"'>";
    }
    formHtml += "</form>";
    $(document).find("body").append(formHtml);
    //var ele = $(document).find("body").append("<form name=page><input name='page' type='hidden' value=''><input name='size' type='hidden' value=''></form>");
    //$form = $("form[name='page']");
  }

  $form.find("input[name='size']").val(size);
  $form.find("input[name='page']").val(page);
  $form.submit();
};

/**
 * <p>상세 이동</p>
 * <pre>
 *     goDetail.ready(); 이벤트 등록.
 *     html 하단에 선언 또는 $(document).ready()에 선언.
 *     <a class="... goDetail" data-id="[id]" data-value="[value]">태그를 찾는다.
 * </pre>
 *
 * @param id
 */
var goDetail = {
  go: function go(e) {
    if (e) e.preventDefault();
    var $target = $(e.target);
    var id = $target.data("id");
    var value = $target.data("value");

    if (id) {
      var pathname = $(location).attr("pathname").slice(-1) == "/" ? $(location).attr("pathname").slice(0, -1) : $(location).attr("pathname");
      var result = pathname.match(/.*(\/\d+\/?)/);
      var path = pathname;
      if (result && result.length > 1) path = pathname.substring(0, pathname.length - result[1].length);
      $(location).attr("href", path + "?" + value + "=" + id);
    }
  },
  goList: function goList(e) {
    if (e) e.preventDefault();
    var $target = $(e.target);
    var pathname = $(location).attr("pathname");
    var result = pathname.match(/.*(\/\d+\/?)/);
    var path = pathname;
    if (result && result.length > 1) path = pathname.substring(0, pathname.length - result[1].length);
    $(location).attr("href", path);
  },
  goSelect: function goSelect(e) {
    if (e) e.preventDefault();
    var $target = $(e.target);
    $(location).attr("href", $target.val());
  },
  ready: function ready() {
    $("a.goDetail").on("click", goDetail.go);
    $("a.goList").on("click", goDetail.goList);
  }
};

/**
 * 메인 오늘 하루 그만보기
 */
const hiddenOneDay = function(e){
  if(e) e.preventDefault();
  const $target = $(e.target);
  const $popup = $target.closest(".popup_wrap");
  const name = "popup_" + $popup.data("id");

  // Cookie
  let value = $popup.data("id");
  let todayDate = new Date();
  let expiredDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate(), 23, 59, 59).toUTCString();
  document.cookie = name + "=" + value + ";expires=" + expiredDate;

  $popup.hide();
}

/**
 * 메인 팝업
 */
const mainBasicPopupOpen = function(){
  if ($("#mainBasicPopup").length > 0 ) {
    $("#mainBasicPopup").stop().fadeIn(200).addClass("on").attr("tabindex", "0").focus();
  }
}
