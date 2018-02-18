function InitMenuUtil(container) {

    var menu = $("<div class='menu'>" +
        "<div class='item' type='rotation'>" +
        "   <img src='/src/assets/image/design/rotation.png'/><div class='text'>旋转</div><img src='/src/assets/image/design/arrow4.png' class='icon-right'/>" +
        "</div>" +
        "<div class='item' type='filter'>" +
        "   <img src='/src/assets/image/design/flip.png'/><div class='text'>滤镜</div><img src='/src/assets/image/design/arrow4.png' class='icon-right'/>" +
        "</div>" +
        "<div class='item' type='up'>" +
        "   <img src='/src/assets/image/design/up.png'/><div class='text'>上移</div>" +
        "</div>" +
        "<div class='item' type='uptotop'>" +
        "   <img src='/src/assets/image/design/uptotop.png'/><div class='text'>置顶</div>" +
        "</div>" +
        "<div class='item' type='down'>" +
        "   <img src='/src/assets/image/design/down.png'/><div class='text'>下移</div>" +
        "</div>" +
        "<div class='item' type='downtobottom'>" +
        "   <img src='/src/assets/image/design/downtobottom.png'/><div class='text'>置底</div>" +
        "</div>" +
        "<div class='item' type='delete'>" +
        "   <img src='/src/assets/image/design/delete.png'/><div class='text'>删除</div>" +
        "</div>" +
        "</div>");

    var subMenuRotate = $("<div class='subMenu'>" +
        "<div class='item' type='left90' value='90'>" +
        "   <img src='/src/assets/image/design/87-transform-rotate-counterclockwise.png'/><div class='text'>左旋90°</div>" +
        "</div>" +

        "<div class='item' type='right90' value='-90'>" +
        "   <img src='/src/assets/image/design/88-transform-rotate-clockwise.png'/><div class='text'>右旋90°</div>" +
        "</div>" +

        "<div class='item' type='rotate180' value='180'>" +
        "   <img style='width:16px;height:16px;padding: 7px'  src='/src/assets/image/design/totate180.jpg'/><div class='text'>旋转180°</div>" +
        "</div>" +

        "<div class='item' type='left90' value='x'>" +
        "   <img style='width:16px;height:16px;padding: 7px' src='/src/assets/image/design/50.png'/><div class='text'>左右翻转</div>" +
        "</div>" +

        "<div class='item' type='right90' value='y'>" +
        "   <img style='width:16px;height:16px;padding: 7px' src='/src/assets/image/design/51.png'/><div class='text'>上下翻转</div>" +
        "</div>" +

        "</div>");

    var subMenuFilter = $("<div class='subMenu'>" +
        "<div class='item' type='colorPicker' value='colorPicker'>" +
        "   <img style='width:16px;height:16px;padding: 7px' src='/src/assets/image/design/50.png'/><div class='text'>颜色过滤</div>" +
        "</div>" +
        "<div class='item' type='imgClip' value='imgClip'>" +
        "   <img style='width:16px;height:16px;padding: 7px' src='/src/assets/image/design/cut.png'/><div class='text'>图片剪切</div>" +
        "</div>" +
        "</div>");

    var registRotationEvent = function (objFn) {
        menu.children("[type='rotation']").mouseenter(function () {
            subMenuRotate.css("left", $(this).parent()[0].offsetLeft + $(this).outerWidth() + 3);
            subMenuRotate.css("top", $(this).parent()[0].offsetTop);
            subMenuRotate.appendTo($(container));
            subMenuRotate.mouseleave(function () {
                subMenuRotate.remove();
            });
            //子旋转菜单点击事件
            subMenuRotate.children().click(function () {
                var fn = objFn[$(this).attr("value")];
                if (fn) {
                    fn();
                }
                subMenuRotate.remove();
                menu.remove();
            });
            return false;
        });
    };

    var registFilterEvent = function (objFn) {
        menu.children("[type='filter']").mouseenter(function () {
            subMenuFilter.css("left", $(this).parent()[0].offsetLeft + $(this).outerWidth() + 3);
            subMenuFilter.css("top", $(this).parent()[0].offsetTop + $(this).outerHeight());
            subMenuFilter.appendTo($(container));
            subMenuFilter.mouseleave(function () {
                // subMenuFilter.remove();
            });
            //子菜单点击事件
            subMenuFilter.children().click(function () {
                var fn = objFn[$(this).attr("value")];
                switch ($(this).attr("value")) {
                    case 'colorPicker':
                        $(container).colpick({

                            flat: true,

                            layout: 'hex',

                            submit: 0,
                            onChange: function (hsb, hex, rgb, el, bySetColor) {
                                if (fn) {
                                    fn(rgb);
                                }
                            }

                        });
                        $(container).children(".colpick").css('position', 'absolute')
                            .css('left', $(this).parent()[0].offsetLeft + $(this).outerWidth() + 3)
                            .css('top', $(this).parent()[0].offsetTop);
                        break;
                    default:
                        fn();
                }
                /*
                                subMenuFilter.remove();
                                menu.remove();*/
            });

            return false;
        });
    };

    var registMainEvent = function (objFn) {
        menu.children(":not([type='rotation'])").filter(":not([type='filter'])").click(function () {
            var fn = objFn[$(this).attr("type")];
            if (fn) {
                fn();
            }
            menu.remove();
        });
    };

    var registOtherEvent = function () {
        menu.children(":not([type='rotation'])").mouseenter(function () {
            subMenuRotate.remove();
        });

        menu.children(":not([type='filter'])").mouseenter(function () {
            subMenuFilter.remove();
        });
    };

    return {
        showMainMenu: function (left, top, menuFns) {
            menu.css("left", left);
            menu.css("top", top);
            menu.appendTo($(container));
            registMainEvent(menuFns);
            registRotationEvent(menuFns);
            registFilterEvent(menuFns);
            registOtherEvent();
        },
        removeMainMenu: function () {
            menu.remove();
            subMenuRotate.remove();
            subMenuFilter.remove();
            var colpick = $(container).children(".colpick");
            if (colpick.attr('id')) {
                $('#' + colpick.attr('id')).hide();
            }
        }
    }


};
