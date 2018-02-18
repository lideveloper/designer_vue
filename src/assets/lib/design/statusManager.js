function InitStage(stage) {

    var click_actionable = null;
    var menuUtil = InitMenuUtil(stage.getContainer());

    var historyUtil = HistoryUtil();

    window.historyUtil = historyUtil;

    var layer_background = new Kinetic.Layer({
        id: 'background',
        name: 'background'
    });
    var background = new Kinetic.Rect({
        x: 0,
        y: 0,
        id: 'background',
        name: 'background',
        fill: 'white',
        height: stage.getHeight(),
        width: stage.getWidth(),
        draggable: false
    });
    background.on("click", function (evt) {
        /*console.log("background click");*/
        if (click_actionable) {
            click_actionable.remove();
        }
        menuUtil.removeMainMenu();
    });

    //stage失去焦点时候隐藏操作控件，防止导出图片时候将操作控件导出
    $(stage.getContainer()).click(function () {
        return false;
    });

    background.on("mousedown", function (evt) {
        evt.cancelBubble = true;
    });

    layer_background.add(background);
    stage.add(layer_background);


    /*$(stage.getContainer()).mousedown(function () {
        console.log("mousedown")
    });*/

    var statusManager = {
        addImage: function (id, url, snapshoot, callback) {

            var image = new Image();
            image.src = url;
            var id = snapshoot ? snapshoot.id : id;//new Date().valueOf();

            $(image).one('load', function () {
                var imageObj = this;


                var container = stage.getContainer();
                var mimage = new Mimage(id, imageObj, snapshoot);

                //
                mimage.paintToStage(stage);
                if (!snapshoot) {//判断是否为快照，快照更新不计入历史
                    historyUtil.addHistory("add", mimage);
                }
                mimage.resistClickEvent(function (evt) {
                    if (click_actionable) {
                        click_actionable.remove();
                    }

                    click_actionable = new Actionable(mimage.id, mimage.x, mimage.y,
                        mimage.width, mimage.height, mimage.rotationDeg);
                    click_actionable.addToStage(stage);


                    /**
                     * 注册相关事件
                     */
                    click_actionable.registDragmoveEvent(function (actionable) {
                        //historyUtil.addHistory("change", mimage);
                        mimage.setX(actionable.x);
                        mimage.setY(actionable.y);
                        mimage.draw();
                    });

                    click_actionable.registMouseoverEvent(function () {
                        container.style.cursor = 'move';
                    });
                    click_actionable.registMouseoutEvent(function () {
                        container.style.cursor = 'default';
                    });
                    click_actionable.registMousedownEvent(function (evt) {
                        var event = evt.evt;
                        if (event.button == 2) {//鼠标右键
                            menuUtil.showMainMenu(event.offsetX, event.offsetY,
                                {
                                    'up': function () {
                                        mimage.moveUp();
                                        click_actionable.layer.moveToTop();
                                        layer_background.moveToBottom();
                                        historyUtil.addHistory("change", mimage);

                                    },

                                    'down': function () {
                                        mimage.moveDown();
                                        click_actionable.layer.moveToTop();
                                        layer_background.moveToBottom();
                                        historyUtil.addHistory("change", mimage);

                                    },
                                    'uptotop': function () {
                                        mimage.moveToTop();
                                        click_actionable.layer.moveToTop();
                                        layer_background.moveToBottom();

                                        historyUtil.addHistory("change", mimage);
                                    },

                                    'downtobottom': function () {
                                        mimage.moveToBottom()
                                        click_actionable.layer.moveToTop();
                                        layer_background.moveToBottom();

                                        historyUtil.addHistory("change", mimage);
                                    },
                                    'delete': function () {
                                        historyUtil.addHistory("delete", mimage);
                                        mimage.imageLayer.remove();
                                        mimage.imageLayer = null;
                                        mimage.image = null;
                                        click_actionable.remove();
                                        click_actionable = null;

                                    },
                                    'x': function () {
                                        mimage.setScale([-1, 1]);
                                        historyUtil.addHistory("change", mimage);
                                    },
                                    'y': function () {
                                        mimage.setScale([1, -1]);
                                        historyUtil.addHistory("change", mimage);
                                    },
                                    '90': function () {
                                        mimage.setRotationDeg(parseFloat(mimage.rotationDeg + 90));
                                        if (click_actionable) {
                                            click_actionable.setRotateDeg(mimage.rotationDeg);
                                        }
                                        historyUtil.addHistory("change", mimage);

                                    },
                                    '-90': function () {
                                        mimage.setRotationDeg(parseFloat(mimage.rotationDeg - 90));
                                        if (click_actionable) {
                                            click_actionable.setRotateDeg(mimage.rotationDeg);
                                        }
                                        historyUtil.addHistory("change", mimage);
                                    },
                                    '180': function () {
                                        mimage.setRotationDeg(parseFloat(mimage.rotationDeg + 180));
                                        if (click_actionable) {
                                            click_actionable.setRotateDeg(mimage.rotationDeg);
                                        }
                                        historyUtil.addHistory("change", mimage);
                                    },
                                    'colorPicker': function (value) {
                                        mimage.setRgb([1, value.r, value.g, value.b]);
                                        mimage.draw();
                                        historyUtil.addHistory("change", mimage);
                                    },
                                    'imgClip': function () {

                                        var clipable = new Clipable(mimage.id, mimage.x, mimage.y,
                                            mimage.width, mimage.height, mimage.crop, mimage.imageObj);
                                        clipable.addToStage(stage);
                                        clipable.registOkEvent(function (crop, img) {
                                            mimage.setHeight(img.height);
                                            mimage.setWidth(img.width);
                                            mimage.setX(img.x);
                                            mimage.setY(img.y);
                                            mimage.setCrop(crop);
                                            mimage.draw();
                                            historyUtil.addHistory("change", mimage);
                                        })
                                        menuUtil.removeMainMenu();
                                        if (click_actionable) {
                                            click_actionable.remove();
                                            click_actionable = null;
                                        }

                                    }
                                })
                        }
                    });
                    click_actionable.registMouseupEvent(function (evt) {//松开鼠标时候记录历史
                        if (event.button == 0) {//鼠标左键
                            /* console.log("鼠标左键");*/
                            // if (!historyUtil.isEqual(mimage.getSnapshoot(), historyUtil.getCurrentStatus()['snapshoot'])) {
                            historyUtil.addHistory("change", mimage);
                            //  }

                        }
                    });
                    click_actionable.registStretchEvent(function (actionable) {
                        mimage.setX(actionable.x);
                        mimage.setY(actionable.y);
                        mimage.setWidth(actionable.width);
                        mimage.setHeight(actionable.height);

                        mimage.draw();
                    });
                    click_actionable.registRotateEvent(function (actionable) {
                        mimage.setRotationDeg(actionable.rotateDeg);
                        mimage.draw();
                    })

                })
                if (callback) {
                    callback(mimage);
                }
            });
        },
        removeImage: function (mimage) {
            mimage.imageLayer.remove();
            stage.draw();
        },
        addRotateDeg: function (mimage, deg) {
            mimage.setRotationDeg(parseFloat(mimage.rotationDeg + deg));
            if (click_actionable) {
                click_actionable.setRotationDeg(mimage.rotationDeg);
            }
        },
        setScale: function (mimage, scale) {
            mimage.setScale(scale);
        },
        getJsonData: function () {

            if (click_actionable) {
                click_actionable.remove();
                click_actionable = null;
            }

            var result = [];
            var layers = stage.getChildren();
            for (var layerIndex = 1; layerIndex < layers.length; layerIndex++) {
                var data = {};
                var layer = layers[layerIndex];
                data['zindex'] = layer.getZIndex();
                var group = layer.getChildren()[0];
                data['x'] = group.getX();
                data['y'] = group.getY();
                data['width'] = group.getWidth();
                data['height'] = group.getHeight();
                data['rotationDeg'] = group.getRotationDeg();

                var image = group.getChildren()[0];

                data['crop'] = image.getCrop();
                data['rgb'] = image.useFilter ? [1, image.getRed(), image.getGreen(), image.getBlue()] : [0, 0, 0, 0];
                data['url'] = image.image().src;
                data['id'] = image.getId();

                result.push(data);
            }
            result.sort(function (data1, data2) {
                return data1['zindex'] - data2['zindex']
            })
            return result;
        },
        loadJsonData: function (data) {
            for (var i = 0; i < data.length; i++) {
                var ele = data[i];
                this.addImage(ele.id, ele.url, ele);
            }
        }
    }

    $(document).keydown(function (event) {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e && e.ctrlKey && e.which == 90) {
            //要做的事情
            if (click_actionable) {
                click_actionable.remove();
            }

            historyUtil.goback(statusManager)
        }

        if (e && e.ctrlKey && e.which == 89) {
            //要做的事情
            if (click_actionable) {
                click_actionable.remove();
            }

            historyUtil.gofont(statusManager)
        }

    });

    return statusManager;
}