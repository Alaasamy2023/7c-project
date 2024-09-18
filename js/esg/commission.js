var onReady = function() {
    $('.2021').hide();
    $('.2020').hide();
};

function search(target){
    const year = $("select[name='slt_search_year']").val();
    if (year == '2022') {
        $('.2022').show();
        $('.2021').hide();
        $('.2020').hide();
    } else if (year == '2021') {
        $('.2022').hide();
        $('.2020').hide();
        $('.2021').show();
    } else if (year == '2020') {
        $('.2022').hide();
        $('.2021').hide();
        $('.2020').show();
    }
};

$(document).ready(onReady)
    .on('click', '#search', search);