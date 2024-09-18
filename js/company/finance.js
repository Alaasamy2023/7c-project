var onReady = function() {
    $(".search_type").trigger("change");
};

function searchTypeChange(){
    const type = $("select[name='download_type']").val();
    const year = $("select[name='download_year']").val();

    allHide();
    /* 220420 수정 */
    /* 240424 수정 */
    if (type == 'income') {
        if (year == '2024') {
            $('.2024_income').show();
        }
        // //20230426 추가
        else if (year == '2023') {
            $('.2023_income').show();
            // //20230426 추가
        } else if (year == '2022') {
            $('.2022_income').show();
        } else if (year == '2021') {
            $('.2021_income').show();
        } else if (year == '2020') {
            $('.2020_income').show();
        } else if (year == '2019') {
            $('.2019_income').show();
        } else if (year == '2018') {
            $('.2018_income').show();
        } else if (year == '2017') {
            $('.2017_income').show();
        }
    } else if (type == 'financial') {
        if (year == '2024') {
            $('.2024_financial').show();
        }
        // 20230426 추가
        else if (year == '2023') {
            $('.2023_financial').show();
            // //20230426 추가
        } else if (year == '2022') {
            $('.2022_financial').show();
        } else if (year == '2021') {
            $('.2021_financial').show();
        } else if (year == '2020') {
            $('.2020_financial').show();
        } else if (year == '2019') {
            $('.2019_financial').show();
        } else if (year == '2018') {
            $('.2018_financial').show();
        } else if (year == '2017') {
            $('.2017_financial').show();
        }
    } else if (type == 'cashflow') {
        if (year == '2023') {
            $('.2023_cashflow').show();
        }
        // 20230426 추가
        else if (year == '2024') {
            $('.2024_cashflow').show();
            // //20230426 추가
        } else if (year == '2022') {
            $('.2022_cashflow').show();
        } else if (year == '2021') {
            $('.2021_cashflow').show();
        } else if (year == '2020') {
            $('.2020_cashflow').show();
        } else if (year == '2019') {
            $('.2019_cashflow').show();
        } else if (year == '2018') {
            $('.2018_cashflow').show();
        } else if (year == '2017') {
            $('.2017_cashflow').show();
        }
    }
    /* // 240424 수정 */
};

function allHide() {
    // 20240424 추가
    $('.2024_income').hide();
    $('.2024_financial').hide();
    $('.2024_cashflow').hide();
    // 20230426 추가
    $('.2023_income').hide();
    $('.2023_financial').hide();
    $('.2023_cashflow').hide();
    // //20230426 추가
    $('.2022_income').hide();
    $('.2022_financial').hide();
    $('.2022_cashflow').hide();
    /* //220420 수정 */
    $('.2021_income').hide();
    $('.2021_financial').hide();
    $('.2021_cashflow').hide();
    $('.2020_income').hide();
    $('.2020_financial').hide();
    $('.2020_cashflow').hide();
    $('.2019_income').hide();
    $('.2019_financial').hide();
    $('.2019_cashflow').hide();
    $('.2018_income').hide();
    $('.2018_financial').hide();
    $('.2018_cashflow').hide();
    $('.2017_income').hide();
    $('.2017_financial').hide();
    $('.2017_cashflow').hide();
};

$(document).ready(onReady)
    .on('change', '.search_type', searchTypeChange);