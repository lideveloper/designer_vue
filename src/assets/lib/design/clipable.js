function Clipable(id, x, y, width, height, crop, imageObj) {
    this.id = id;
    this.width = width * (imageObj.naturalWidth / crop.width);
    this.height = height * (imageObj.naturalHeight / crop.height);
    this.x = (x - width / 2) - (crop.x * width / crop.width  ) + this.width / 2;
    this.y = (y - height / 2) - (crop.y * height / crop.height ) + this.height / 2;
    this.layer = null;
    this.group = null;
    this.groupBg = null;
    this.rect = null;
    this.crop = crop;
    this.image = null;
    this.points = null;
    this.imageObj = imageObj;
    this.shadesObj = null;
    this.naturalHeight = 0;
    this.naturalWidth = 0;
    var createBackgroundImage = function () {
        this.naturalHeight = imageObj.naturalHeight;
        this.naturalWidth = imageObj.naturalWidth;

        /* var ratio = imageObj.naturalWidth / imageObj.naturalHeight;
         /!*var width = imageObj.naturalWidth;
         var height = imageObj.naturalHeight;*!/
         var width = 0;
         var height = 0;
         if (ratio >= 1) {
             width = 200;
             height = Math.round(width / ratio);
         } else {
             height = 200;
             width = Math.round(height * ratio);
         }

         this.width = width;
         this.height = height;*/

        var image = new Kinetic.Image({
            x: 0,
            y: 0,
            image: this.imageObj,
            id: 'image-background-' + this.id,
            name: 'image-background',
            width: this.width,
            height: this.height
        });

        return image;
    }
    //添加可操作性的分组
    var createGroup = function () {
        var _this = this;
        var crop = _this.crop;

        var naturalHeight = this.imageObj.naturalHeight;
        var naturalWidth = this.imageObj.naturalWidth;

        /* var heightRatio = crop.height / naturalHeight;
         var widthRatio = crop.width / naturalWidth;*/

        var group = new Kinetic.Group({
            /*  x: x,
              y: y,
              height: height,
              width: width,
              offsetX: width / 2,
              offsetY: height / 2,*/
            x: this.x - this.width / 2 + crop.x / naturalWidth * this.width + crop.width / naturalWidth * this.width / 2,
            y: this.y - this.height / 2 + crop.y / naturalHeight * this.height + crop.height / naturalHeight * this.height / 2,
            height: crop.height / naturalHeight * this.height,
            width: crop.width / naturalWidth * this.width,
            offsetX: crop.width / naturalWidth * this.width / 2,
            offsetY: crop.height / naturalHeight * this.height / 2,
            draggable: true,
            id: 'group_' + this.id,
            name: 'group_clipable',
            dragBoundFunc: function (newNodePos, evt) {
                var group = _this.group;
                var bgImage = _this.groupBg;
                var bg_left = bgImage.getX() - bgImage.getWidth() / 2;
                var bg_right = bgImage.getX() + bgImage.getWidth() / 2;
                var bg_top = bgImage.getY() - bgImage.getHeight() / 2;
                var bg_bottom = bgImage.getY() + bgImage.getHeight() / 2;

                if (newNodePos.x - group.getWidth() / 2 < bg_left) {
                    newNodePos.x = bg_left + group.getWidth() / 2;
                }

                if (newNodePos.y - group.getHeight() / 2 < bg_top) {
                    newNodePos.y = bg_top + group.getHeight() / 2;
                }

                if (newNodePos.x + group.getWidth() / 2 > bg_right) {
                    newNodePos.x = bg_right - group.getWidth() / 2;
                }

                if (newNodePos.y + group.getHeight() / 2 > bg_bottom) {
                    newNodePos.y = bg_bottom - group.getHeight() / 2;
                }

                return newNodePos;
            }
        });

        group.on('dragmove', function () {
            _this.shadesObj.reDraw();
        });

        return group;
    }

    //添加包围图片的矩形
    var createRect = function () {
        var rect = new Kinetic.Rect({
            x: 0,
            y: 0,
            width: crop.width / this.naturalWidth * this.width,
            height: crop.height / this.naturalHeight * this.height,
            stroke: "grey",
            opacity: 0.5,
            //边缘线宽度
            strokeWidth: 1,
            /*dash: [5],*/
            id: 'rect_' + this.id,
            name: 'rect_actionable'
        });
        return rect;
    }

    var createShade = function (id, group, bgImage) {

        var left = function () {
            return (group.getX() - group.getWidth() / 2) - (bgImage.getX() - bgImage.getWidth() / 2);
        }
        var top = function () {
            return (group.getY() - group.getHeight() / 2) - (bgImage.getY() - bgImage.getHeight() / 2);
        }
        var right = function () {
            return (bgImage.getX() + bgImage.getWidth() / 2) - (group.getX() + group.getWidth() / 2);
        }
        var bottom = function () {
            return (bgImage.getY() + bgImage.getHeight() / 2) - (group.getY() + group.getHeight() / 2);
        }

        var getShades = function () {
            return [
                {
                    name: 'left',
                    x: 0,
                    y: 0,
                    width: left(),
                    height: bgImage.getHeight()
                }, {
                    name: 'top',
                    x: left(),
                    y: 0,
                    width: group.getWidth(),
                    height: top()
                }, {
                    name: 'right',
                    x: bgImage.getWidth() - right(),
                    y: 0,
                    width: right(),
                    height: bgImage.getHeight()
                }, {
                    name: 'bottom',
                    x: left(),
                    y: bgImage.getHeight() - bottom(),
                    width: group.getWidth(),
                    height: bottom()
                }
            ]
        }
        var shades = getShades();
        var shadeRect = [];
        for (var i = 0; i < shades.length; i++) {
            var shade = shades[i];
            shadeRect.push(new Kinetic.Rect({
                x: shade.x,
                y: shade.y,
                width: shade.width,
                height: shade.height,
                fill: 'grey',
                opacity: 0.3,
                name: 'rect_shade_actionable'
            }));
        }
        return {
            addToGroup: function (g) {
                for (var i = 0; i < shadeRect.length; i++) {
                    g.add(shadeRect[i]);
                }
            },
            reDraw: function () {
                var shades = getShades();
                for (var i = 0; i < shadeRect.length; i++) {
                    shadeRect[i].setX(shades[i].x);
                    shadeRect[i].setY(shades[i].y);
                    shadeRect[i].setWidth(shades[i].width);
                    shadeRect[i].setHeight(shades[i].height);
                }
                // group.draw();
            }
        }

    }


    //创建八角可拉伸控件
    var createPoints = function (id, group, bgImage) {
        var points = [{
            name: 'left',
            position: function () {
                return [-10, group.getHeight() / 2];
            },
            //拉伸按钮旋转方向
            dragOffset: function () {
                return 0;
            },
            getMoveData: function (evt) {
                var new_x = evt.target.getX();

                var addx = new_x - this.position()[0];
                return {
                    addx: addx / 2,
                    addy: 0,
                    add_width: -addx,
                    add_height: 0
                }
            }
        },
            {
                name: 'right',
                position: function () {
                    return [group.getWidth() + 10, group.getHeight() / 2];
                },
                dragOffset: function () {
                    return 180;
                },
                getMoveData: function (evt) {
                    var new_x = evt.target.getX();
                    var addx = new_x - this.position()[0];

                    return {
                        addx: addx / 2,
                        addy: 0,
                        add_width: addx,
                        add_height: 0
                    }
                }
            },
            {
                name: 'top',
                position: function () {
                    return [group.getWidth() / 2, -10];
                },
                dragOffset: function () {
                    return 90;
                },
                getMoveData: function (evt) {
                    var new_y = evt.target.getY();
                    var addy = new_y - this.position()[1];

                    return {
                        addx: 0,
                        addy: addy / 2,
                        add_width: 0,
                        add_height: -addy
                    }
                }
            },
            {
                name: 'bottom',
                position: function () {
                    return [group.getWidth() / 2, group.getHeight() + 10];
                },
                dragOffset: function () {
                    return 270;
                },
                getMoveData: function (evt) {
                    var new_y = evt.target.getY();
                    var addy = new_y - this.position()[1];

                    return {
                        addx: 0,
                        addy: addy / 2,
                        add_width: 0,
                        add_height: addy
                    }
                }
            }
        ];

        //初始化八个方向的按钮
        for (var i = 0; i < points.length; i++) {

            (function (i) {
                var point = points[i];
                var _point = new Kinetic.Image({
                    x: point.position()[0],
                    y: point.position()[1],
                    id: 'point_' + id + '_' + i,
                    name: 'point_clipable_' + id,
                    width: 30,
                    height: 30,
                    offsetX: 15,
                    offsetY: 15,
                    rotationDeg: point.dragOffset(),
                    draggable: true,
                    dragBoundFunc: function (newNodePos, evt) {

                        var bg_left = bgImage.getX() - bgImage.getWidth() / 2;
                        var bg_right = bgImage.getX() + bgImage.getWidth() / 2;
                        var bg_top = bgImage.getY() - bgImage.getHeight() / 2;
                        var bg_bottom = bgImage.getY() + bgImage.getHeight() / 2;

                        var group_left = group.getX() - group.getWidth() / 2;
                        var group_right = group.getX() + group.getWidth() / 2;
                        var group_top = group.getY() - group.getHeight() / 2;
                        var group_bottom = group.getY() + group.getHeight() / 2;


                        switch (point.dragOffset()) {
                            case 0:
                                newNodePos.y = group.getY();
                                if (newNodePos.x + 20 > group_right) {
                                    newNodePos.x = group_right - 20;
                                }
                                if (newNodePos.x + 10 < bg_left) {
                                    newNodePos.x = bg_left - 10;
                                }
                                break;

                            case 90:
                                newNodePos.x = group.getX();
                                if (newNodePos.y + 20 > group_bottom) {
                                    newNodePos.y = group_bottom - 20;
                                }
                                if (newNodePos.y + 10 < bg_top) {
                                    newNodePos.y = bg_top - 10;
                                }

                                break;

                            case 180:
                                newNodePos.y = group.getY();
                                if (newNodePos.x - 20 < group_left) {
                                    newNodePos.x = group_left + 20;
                                }
                                if (newNodePos.x - 10 > bg_right) {
                                    newNodePos.x = bg_right + 10;
                                }
                                break;

                            case 270:
                                newNodePos.x = group.getX();
                                if (newNodePos.y - 20 < group_top) {
                                    newNodePos.y = group_top + 20;
                                }
                                if (newNodePos.y - 10 > bg_bottom) {
                                    newNodePos.y = bg_bottom + 10;
                                }
                                break;
                        }

                        return newNodePos;
                    }
                });
                var pointImage = new Image();
                pointImage.src = "image/arrow3.png";
                point._point = _point;
                pointImage.onload = function () {
                    _point.setImage(pointImage);
                    _point.draw();
                }


            })(i);


        }
        return points;
    }


    var registStretchEvent = function () {
        var _this = this;
        var group = this.group;
        var point_map = this.point_map;
        var points = this.points;
        for (var i = 0; i < this.points.length; i++) {
            (function (i) {
                var point = points[i];
                var _point = point._point;

                _point.on("dragmove", function (evt) {

                    var moveData = point.getMoveData(evt);


                    //移动后相应的组件需要跟着移动
                    group.setX(group.getX() + moveData.addx);
                    group.setY(group.getY() + moveData.addy);
                    group.setWidth(group.getWidth() + moveData.add_width);
                    group.setHeight(group.getHeight() + moveData.add_height);
                    group.setOffsetX(group.getWidth() / 2);
                    group.setOffsetY(group.getHeight() / 2);


                    _this.x = group.getX();
                    _this.y = group.getY();
                    _this.width = group.getWidth();
                    _this.height = group.getHeight();

                    points[0]._point.setX(points[0].position()[0]);
                    points[0]._point.setY(points[0].position()[1]);

                    points[1]._point.setX(points[1].position()[0]);
                    points[1]._point.setY(points[1].position()[1]);


                    points[2]._point.setX(points[2].position()[0]);
                    points[2]._point.setY(points[2].position()[1]);

                    points[3]._point.setX(points[3].position()[0]);
                    points[3]._point.setY(points[3].position()[1]);


                    _this.rect.setWidth(group.getWidth());
                    _this.rect.setHeight(group.getHeight());

                    _this.shadesObj.reDraw();

                })
            })(i);

        }
    }

    this.addToStage = function (stage) {
        this.layer = new Kinetic.Layer({
            name: 'layer_clipable',
            id: 'layer_' + id,
        });

        this.image = createBackgroundImage.call(this);

        this.groupBg = new Kinetic.Group({
            x: this.x,
            y: this.y,
            height: this.height,
            width: this.width,
            offsetX: this.width / 2,
            offsetY: this.height / 2,
            name: 'group_bg_clipable'
        });
        this.groupBg.add(this.image);

        this.group = createGroup.call(this);

        this.shadesObj = createShade(this.id, this.group, this.groupBg);
        this.shadesObj.addToGroup(this.groupBg);

        this.textOk = new Kinetic.Text({
            x: this.groupBg.getWidth() + 10,
            y: 0,
            height: 20,
            width: 30,
            text: '确认',
            fontSize: 14,
            fill: 'green',
            name: 'group_bg_clipable'
        });
        this.groupBg.add(this.textOk);


        this.textCancel = new Kinetic.Text({
            x: this.groupBg.getWidth() + 10,
            y: 24,
            height: 20,
            width: 30,
            text: '取消',
            fontSize: 14,
            fill: 'green',
            name: 'group_bg_clipable'
        });
        this.groupBg.add(this.textCancel);

        this.layer.add(this.groupBg);

        //创建group


        //创建包裹图片的矩形
        this.rect = createRect.call(this);
        this.group.add(this.rect);

        this.points = createPoints(this.id, this.group, this.groupBg);

        for (var i = 0; i < this.points.length; i++) {
            this.group.add(this.points[i]._point);
        }

        this.layer.add(this.group);

        stage.add(this.layer);
        var _this = this;
        this.textCancel.on("click", function () {
            _this.layer.remove();
        });

        var container = stage.getContainer();
        //图片鼠标样式
        this.textCancel.on("mouseover", function () {
            container.style.cursor = 'pointer';
        });
        this.textCancel.on("mouseout", function () {
            container.style.cursor = 'default';
        });

        this.textOk.on("mouseover", function () {
            container.style.cursor = 'pointer';
        });
        this.textOk.on("mouseout", function () {
            container.style.cursor = 'default';
        });

        this.group.on("mouseover", function () {
            container.style.cursor = 'move';
        });

        this.group.on("mouseout", function () {
            container.style.cursor = 'default';
        });

        registStretchEvent.call(this);
    }

    this.registOkEvent = function (fn) {
        var _this = this;
        this.textOk.on("click", function () {
            var group = _this.group;
            var bgImage = _this.groupBg;

            var startX = bgImage.getX() - bgImage.getWidth() / 2;
            var startY = bgImage.getY() - bgImage.getHeight() / 2;

            var srcX = group.getX() - group.getWidth() / 2 - startX;
            var srcY = group.getY() - group.getHeight() / 2 - startY;

            var srcWidth = group.getWidth();
            var srcHeight = group.getHeight();

            var ratioWidth = _this.naturalWidth / bgImage.getWidth();
            var ratioHeight = _this.naturalHeight / bgImage.getHeight();

            var crop = {
                x: srcX * ratioWidth,
                y: srcY * ratioHeight,
                width: srcWidth * ratioWidth,
                height: srcHeight * ratioHeight
            }
            var img = {
                width: group.getWidth(),
                height: group.getHeight(),
                x: group.getX(),
                y: group.getY()
            }
            fn(crop, img);
            _this.layer.remove();
        })
    }

    this.remove = function () {
        this.layer.remove();
    }
}