/**
 * <p>상세 이동</p>
 */

var btnEvent = {
    goDetail: function go(e) {
        if (e) e.preventDefault();
        var id = $(this).data("id");
        var tab = $(this).data("tab");

        var path = '';
        var value = '';

        if (tab == 'schedule') {
            path = '/' + $(this).data("lang") + '/company/investment/ir-activity';
            value = 'postId';
        } else if (tab == 'press') {
            path = '/' + $(this).data("lang") + '/company/media-center/latest-news';
            value = 'contentId';
        } else if (tab == 'sns') {
            path = $(this).data("link");
        }

        if (id && path != '') {
            $(location).attr("href", path + "?" + value + "=" + id);
        } else {
            $(location).attr("href", path);
        }
    },
    goSearch: function go(e) {
        if ((e.type == 'keypress' && e.which == 13) || e.type == 'click') {
            var $form = $("form[name='page']");
            if ($form.find("input[name='word']").val() != '') {
                $form.submit();
            } else {
                e.preventDefault();
            }
        }
    },
    ready: function ready() {
        $("li.goDetail").on("click", btnEvent.goDetail);
        $(".goSearch").on("click", btnEvent.goSearch);
        $("#inp_search").on("keypress", btnEvent.goSearch);
    }
};