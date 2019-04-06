// ui-search 定义
$.fn.UiSearch = function() {
    var ui = $(this);
    $('.ui-search-selected', ui).on('click', function(event) {
        $('.ui-search-select-list', ui).show();
        return false;
    });
    $('.ui-search-select-list a', ui).on('click', function(event) {
        $('.ui-search-select-list', ui).hide();
        $('.ui-search-selected', ui).text($(this).text());
        return false;
    });
    $('body').on('click', function(event) {
        $('.ui-search-select-list').hide();
    });

}

// ui-tab 处理

/**
 *  @param {string} header  TAB组件的所有选项卡.item
 *  @param {string} content TAB组件的内容区域所有.item
 *  @param {string} focus_prefix 选项卡高亮样式前缀，可选
 */
$.fn.UiTab = function(header, content, focus_prefix) {
    var ui = $(this);
    var tabs = $(header, ui);
    var cons = $(content, ui);

    tabs.on('click', function(event) {
        var index = $(this).index();
        tabs.removeClass(focus_prefix).eq(index).addClass(focus_prefix);
        cons.hide().eq(index).show();
        return false;
    });

}

$.fn.UiSlider = function() {

    var ui = $(this);
    var btn_prev = $('.btn-left', ui);
    var btn_next = $('.btn-right', ui);
    var wrap = $('.ui-table-wrap', ui);
    var items = $('.ui-table-wrap .item', ui);

    var current = 0;
    var width = 665;
    var size = items.size();


    wrap.on('move_prev', function(event) {
        if (current > 0) {
            current--;
            wrap.css('left', current * width * -1);
        }

    }).on('move_next', function(event) {
        if (current < size - 1) {
            current++;
            wrap.css('left', current * width * -1);
        }
    });

    btn_prev.on('click', function(event) {
        wrap.triggerHandler('move_prev');
    });

    btn_next.on('click', function(event) {
        wrap.triggerHandler('move_next');
    });


}

var week = ['日', '一', '二', '三', '四', '五', '六'];
var full_date = new Date();
var year, month, date, day;

// 插入表格 更新数据
$.fn.UiAddData = function(content) {

    var ui = $(this);
    var items = $(content, ui);

    // 插入所有的表格
    for (var i = 0; i < 6; i++) {
        var add_item = $('<table class="item" cellspacing="0">' + items.eq(0).html() + '</option>');
        ui.append(add_item);
    }

    // 页头日期
    var th_date = $('.item-date th', ui);
    // 预约情况
    var td_focus = $('.item .td_focus', ui);

    var th_size = th_date.size();
    var td_focus_size = td_focus.size();

    GetNewDate(full_date);

    // 更新日期数据
    for (var i = 0; i < th_size; i++) {
        th_date.eq(i).html('星期' + week[day] + '<br>' + year + '-' + month + '-' + date);
        full_date.setDate(date + 1);
        GetNewDate(full_date);
    }

    $('.item .afternoon td', ui).on('add_focus', function(event) {
        $(this).text('约满').addClass('td_focus');
        return false;
    }).trigger('add_focus');

}

// 获取新日期
var GetNewDate = function(full_date) {
    year = full_date.getFullYear();
    month = full_date.getMonth() + 1;
    date = full_date.getDate();
    day = full_date.getDay();
}

// 页面的脚本逻辑
$(function() {
    $('.ui-search').UiSearch();
    $('.content').UiTab('.caption > .item', '.content-item', 'item_focus');

    $('.ui-table-wrap').UiAddData('.item');
    $('.item-tab').UiSlider();
});