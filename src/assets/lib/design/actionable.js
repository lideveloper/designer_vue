function Actionable(id, x, y, width, height, rotateDeg) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.rotateDeg = rotateDeg;
    this.layer = null;
    this.group = null;
    this.rect = null;
    this.points = null;
    this.point_map = null;
    this.rotation = null;
    //添加可操作性的分组
    var createGroup = function (id, x, y, width, height, rotateDeg) {
        var group = new Kinetic.Group({
            x: x,
            y: y,
            height: height,
            width: width,
            offsetX: width / 2,
            offsetY: height / 2,
            rotationDeg: rotateDeg,
            draggable: true,
            id: 'group_' + id,
            name: 'group_actionable'
        });
        return group;
    }

    //添加包围图片的矩形
    var createRect = function (id, width, height) {
        var rect = new Kinetic.Rect({
            x: -2,
            y: -2,
            width: width + 4,
            height: height + 4,
            stroke: "yellow",
            //边缘线宽度
            strokeWidth: 1,
            dash: [5],
            id: 'rect_' + id,
            name: 'rect_actionable'
        });
        return rect;
    }

    //创建八角可拉伸控件
    var createPoints = function (id, group) {
        var point_map = {};
        var points = [{
            name: 'left',
            position: function () {
                return [-10, group.getHeight() / 2];
            },
            rotationDeg: function () {
                return 0;
            },//拉伸按钮旋转方向
            dragOffset: function () {
                return 0;
            },//设置拖拽的时候方向限制
            setPoint: function (point) {
                point_map[this.name] = point;
                this._point = point;
            },
            getMoveData: function (evt) {
                var new_x = evt.target.getX();

                var add = new_x - this.position()[0];

                var addx = add / 2 * Math.cos((2 * Math.PI / 360) * group.getRotationDeg());
                var addy = add / 2 * Math.sin((2 * Math.PI / 360) * group.getRotationDeg());
                return {
                    addx: addx,
                    addy: addy,
                    add_width: -add,
                    add_height: 0
                }
            }
        },
            {
                name: 'right',
                position: function () {
                    return [group.getWidth() + 10, group.getHeight() / 2];
                },
                rotationDeg: function () {
                    return 180;
                },
                dragOffset: function () {
                    return 180;
                },
                setPoint: function (point) {
                    point_map[this.name] = point;
                    this._point = point;
                },
                getMoveData: function (evt) {
                    var new_x = evt.target.getX();
                    var add = new_x - this.position()[0];

                    var addx = add / 2 * Math.cos((2 * Math.PI / 360) * (group.getRotationDeg() ));
                    var addy = add / 2 * Math.sin((2 * Math.PI / 360) * (group.getRotationDeg()));

                    return {
                        addx: addx,
                        addy: addy,
                        add_width: add,
                        add_height: 0
                    }
                }
            },
            {
                name: 'top',
                position: function () {
                    return [group.getWidth() / 2, -10];
                },
                rotationDeg: function () {
                    return 90;
                },
                dragOffset: function () {
                    return 90;
                },
                setPoint: function (point) {
                    point_map[this.name] = point;
                    this._point = point;
                },
                getMoveData: function (evt) {
                    var new_y = evt.target.getY();
                    var add = new_y - this.position()[1];

                    var addx = add / 2 * Math.cos((2 * Math.PI / 360) * (group.getRotationDeg() + 90));
                    var addy = add / 2 * Math.sin((2 * Math.PI / 360) * (group.getRotationDeg() + 90));

                    return {
                        addx: addx,
                        addy: addy,
                        add_width: 0,
                        add_height: -add
                    }
                }
            },
            {
                name: 'bottom',
                position: function () {
                    return [group.getWidth() / 2, group.getHeight() + 10];
                },
                rotationDeg: function () {
                    return 270;
                },
                dragOffset: function () {
                    return 270;
                },
                setPoint: function (point) {
                    point_map[this.name] = point;
                    this._point = point;
                },
                getMoveData: function (evt) {
                    var new_y = evt.target.getY();
                    var add = new_y - this.position()[1];
                    //console.log(add)
                    var addx = add / 2 * Math.cos((2 * Math.PI / 360) * (group.getRotationDeg() + 90));
                    var addy = add / 2 * Math.sin((2 * Math.PI / 360) * (group.getRotationDeg() + 90));

                    return {
                        addx: addx,
                        addy: addy,
                        add_width: 0,
                        add_height: add
                    }
                }
            },

            {
                name: 'left-top',
                position: function () {
                    if (group.getWidth() > group.getHeight()) {
                        return [-6, -6 * group.getHeight() / group.getWidth()];
                    } else {
                        return [-6 * group.getWidth() / group.getHeight(), -6];
                    }
                },
                rotationDeg: function () {
                    return Math.atan(group.getHeight() / group.getWidth()) / (2 * Math.PI) * 360;
                },
                dragOffset: function () {
                    return Math.atan(group.getHeight() / group.getWidth()) / (2 * Math.PI) * 360;
                },
                setPoint: function (point) {
                    point_map[this.name] = point;
                    this._point = point;
                },
                getMoveData: function (evt) {
                    var new_x = evt.target.getX();
                    var new_y = evt.target.getY();
                    var add_x = new_x - this.position()[0];
                    var add_y = new_y - this.position()[1];

                    //left
                    var addx_left = add_x / 2 * Math.cos((2 * Math.PI / 360) * group.getRotationDeg());
                    var addy_left = add_x / 2 * Math.sin((2 * Math.PI / 360) * group.getRotationDeg());
                    //top
                    var addx_top = add_y / 2 * Math.cos((2 * Math.PI / 360) * (group.getRotationDeg() + 90));
                    var addy_top = add_y / 2 * Math.sin((2 * Math.PI / 360) * (group.getRotationDeg() + 90));

                    var addx = addx_left + addx_top;
                    var addy = addy_left + addy_top;

                    return {
                        addx: addx, //addx,
                        addy: addy, //addx,
                        add_width: -add_x, //-add_x,
                        add_height: -add_y, //-add_y
                    }
                }
            },
            {
                name: 'right-top',
                position: function () {
                    if (group.getWidth() > group.getHeight()) {
                        return [group.getWidth() + 6, -6 * group.getHeight() / group.getWidth()];
                    } else {
                        return [group.getWidth() + 6 * group.getWidth() / group.getHeight(), -6];
                    }
                },

                rotationDeg: function () {
                    return Math.atan(group.getWidth() / group.getHeight()) / (2 * Math.PI) * 360 + 90;
                },
                dragOffset: function () {
                    return Math.atan(group.getWidth() / group.getHeight()) / (2 * Math.PI) * 360 + 90;
                },
                setPoint: function (point) {
                    point_map[this.name] = point;
                    this._point = point;
                },
                getMoveData: function (evt) {
                    var new_x = evt.target.getX();
                    var new_y = evt.target.getY();

                    var add_x = new_x - this.position()[0];
                    var add_y = new_y - this.position()[1];


                    //right
                    var addx_right = add_x / 2 * Math.cos((2 * Math.PI / 360) * (group.getRotationDeg() ));
                    var addy_right = add_x / 2 * Math.sin((2 * Math.PI / 360) * (group.getRotationDeg()));

                    //top
                    var addx_top = add_y / 2 * Math.cos((2 * Math.PI / 360) * (group.getRotationDeg() + 90));
                    var addy_top = add_y / 2 * Math.sin((2 * Math.PI / 360) * (group.getRotationDeg() + 90));

                    var addx = addx_right + addx_top;
                    var addy = addy_right + addy_top;

                    return {
                        addx: addx,
                        addy: addy,
                        add_width: add_x,
                        add_height: -add_y
                    }
                }
            },
            {
                name: 'right-bottom',
                position: function () {
                    if (group.getWidth() > group.getHeight()) {
                        return [group.getWidth() + 6, group.getHeight() + 6 * group.getHeight() / group.getWidth()];
                    } else {
                        return [group.getWidth() + 6 * group.getWidth() / group.getHeight(), group.getHeight() + 6];
                    }
                },

                rotationDeg: function () {
                    return Math.atan(group.getHeight() / group.getWidth()) / (2 * Math.PI) * 360 + 180;
                },
                dragOffset: function () {
                    return Math.atan(group.getHeight() / group.getWidth()) / (2 * Math.PI) * 360 + 180;
                },
                setPoint: function (point) {
                    point_map[this.name] = point;
                    this._point = point;
                },
                getMoveData: function (evt) {

                    var new_x = evt.target.getX();
                    var new_y = evt.target.getY();

                    var add_x = new_x - this.position()[0];
                    var add_y = new_y - this.position()[1];

                    //right
                    var addx_right = add_x / 2 * Math.cos((2 * Math.PI / 360) * (group.getRotationDeg()));
                    var addy_right = add_x / 2 * Math.sin((2 * Math.PI / 360) * (group.getRotationDeg()));
                    //bottom
                    var addx_bottom = add_y / 2 * Math.cos((2 * Math.PI / 360) * (group.getRotationDeg() + 90));
                    var addy_bottom = add_y / 2 * Math.sin((2 * Math.PI / 360) * (group.getRotationDeg() + 90));

                    var addx = addx_right + addx_bottom;
                    var addy = addy_right + addy_bottom;

                    return {
                        addx: addx,
                        addy: addy,
                        add_width: add_x,
                        add_height: add_y
                    }
                }
            }
            ,
            {
                name: 'left-bottom',
                position: function () {
                    if (group.getWidth() > group.getHeight()) {
                        return [-6, group.getHeight() + 6 * group.getHeight() / group.getWidth()];
                    } else {
                        return [-6 * group.getWidth() / group.getHeight(), group.getHeight() + 6];
                    }
                },

                rotationDeg: function () {
                    return Math.atan(group.getWidth() / group.getHeight()) / (2 * Math.PI) * 360 + 270;
                },
                dragOffset: function () {
                    return Math.atan(group.getWidth() / group.getHeight()) / (2 * Math.PI) * 360 + 270;
                },
                setPoint: function (point) {
                    point_map[this.name] = point;
                    this._point = point;
                },
                getMoveData: function (evt) {
                    var new_x = evt.target.getX();
                    var new_y = evt.target.getY();

                    var add_x = new_x - this.position()[0];
                    var add_y = new_y - this.position()[1];

                    //left
                    var addx_left = add_x / 2 * Math.cos((2 * Math.PI / 360) * group.getRotationDeg());
                    var addy_left = add_x / 2 * Math.sin((2 * Math.PI / 360) * group.getRotationDeg());
                    //bottom
                    var addx_bottom = add_y / 2 * Math.cos((2 * Math.PI / 360) * (group.getRotationDeg() + 90));
                    var addy_bottom = add_y / 2 * Math.sin((2 * Math.PI / 360) * (group.getRotationDeg() + 90));

                    var addx = addx_left + addx_bottom;
                    var addy = addy_left + addy_bottom;
                    return {
                        addx: addx,
                        addy: addy,
                        add_width: -add_x,
                        add_height: add_y
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
                    name: 'point_actionable_' + id,
                    width: 30,
                    height: 30,
                    offsetX: 15,
                    offsetY: 15,
                    rotationDeg: point.rotationDeg(),
                    draggable: true,
                    dragOffset: point.dragOffset,
                    dragBoundFunc: function (newNodePos, evt) {

                        var deg = group.getRotationDeg() + point.dragOffset();

                        var x = newNodePos.x - group.getX();

                        var y = newNodePos.y - group.getY();

                        var length1 = Math.sin((2 * Math.PI / 360) * deg) == 0 ? 0 : y / Math.sin((2 * Math.PI / 360) * deg);
                        var x1 = length1 * Math.cos((2 * Math.PI / 360 ) * deg);

                        x2 = x - x1;
                        var length2 = x2 * Math.cos((2 * Math.PI / 360) * deg);

                        var length = length1 + length2;

                        /*console.log(group.getWidth() / 2 - length);*/
                        //限制拉伸范围
                        if (point.dragOffset() / 90 % 2 == 1) {//上下方向参考高度
                            if (group.getHeight() / 2 - length <= 40) {

                                length = group.getHeight() / 2 - 40;

                            }
                        } else { //左右方向参考宽度
                            if (group.getWidth() / 2 - length <= 40) {

                                length = group.getWidth() / 2 - 40;

                            }
                        }


                        newNodePos.x = group.getX() + length * Math.cos((2 * Math.PI / 360) * deg);
                        newNodePos.y = group.getY() + length * Math.sin((2 * Math.PI / 360) * deg);

                        return newNodePos;
                    }
                });
                point.setPoint(_point);
                var pointImage = new Image();
                pointImage.src = "image/arrow3.png";

                pointImage.onload = function () {
                    _point.setImage(pointImage);
                    _point.draw();
                }


            })(i);


        }
        return {
            points: points,
            point_map: point_map
        }
    }


    var createRotation = function (id, group) {
        var circle = new Kinetic.Image({
            x: group.getWidth() / 2,
            y: -40,
            width: 20,
            height: 20,
            offsetX: 10,
            offsetY: 10,
            id: 'rotation_' + id,
            name: 'rotation_actionable',
            draggable: true,
            dragBoundFunc: function (newNodePos, evt) {
                var center = [group.getWidth() / 2, group.getHeight() / 2];
                var start = [group.getWidth() / 2, -40];

                var radius = Math.pow(((center[0] - start[0]) * (center[0] - start[0]) + (center[1] - start[1]) * (center[1] - start[1])), 0.5);
                var end = [newNodePos.x - group.getX() + group.getWidth() / 2, newNodePos.y - group.getY() + group.getHeight() / 2];
                var var_distance = Math.pow(((center[0] - end[0]) * (center[0] - end[0]) + (center[1] - end[1]) * (center[1] - end[1])), 0.5);
                var ratio = radius / var_distance;
                newNodePos.x = group.getX() - group.getWidth() / 2 + center[0] + (end[0] - center[0]) * ratio;
                newNodePos.y = group.getY() - group.getHeight() / 2 + center[1] + (end[1] - center[1]) * ratio;

                return newNodePos;
            }
        });
        var rotationImage = new Image();
        rotationImage.src = "image/rotation.png";

        rotationImage.onload = function () {
            circle.setImage(rotationImage);
            circle.draw();
        }
        return circle;
    }

    this.addToStage = function (stage) {
        var id = this.id;
        this.layer = new Kinetic.Layer({
            name: 'layer_actionable',
            id: 'layer_' + id,
        });
        //创建group
        this.group = createGroup(this.id, this.x, this.y, this.width, this.height, this.rotateDeg);

        //创建包裹图片的矩形
        this.rect = createRect(this.id, this.width, this.height);
        this.group.add(this.rect);
        //创建八角可拉伸控件
        var points_obj = createPoints(this.id, this.group);
        this.points = points_obj.points;
        this.point_map = points_obj.point_map;
        for (var i = 0; i < this.points.length; i++) {
            this.group.add(this.points[i]._point);
        }

        //创建可旋转控件
        this.rotation = createRotation(this.id, this.group);
        this.group.add(this.rotation);

        this.layer.add(this.group);

        stage.add(this.layer);
        var _this = this;


        //点击页面任何其他地方去掉操作控件
        $('body').click(function () {
            if (_this.layer) {

                _this.layer.remove();
                stage.draw();
            }
        });
        return this;
    };


    this.registDragmoveEvent = function (fn) {
        var _this = this;
        var group = this.group;
        this.group.on("dragmove", function (evt) {
            _this.x = group.getX();
            _this.y = group.getY();
            fn(_this, evt);
        });
    };
    this.registMouseoverEvent = function (fn) {
        var _this = this;
        this.group.on("mouseover", function (evt) {
            fn(_this, evt);
        });
    };
    this.registMouseoutEvent = function (fn) {
        var _this = this;
        this.group.on("mouseout", function (evt) {
            fn(_this, evt);
        });
    };
    this.registMousedownEvent = function (fn) {
        var _this = this;
        this.group.on("mousedown", function (evt) {
            fn(evt);
        });
    }
    this.registMouseupEvent = function (fn) {
        var _this = this;
        this.group.on("mouseup", function (evt) {
            fn(evt);
        });
    }
    this.registStretchEvent = function (fn) {
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
                    fn(_this, evt);

                    point_map['left'].setX(points[0].position()[0]);
                    point_map['left'].setY(points[0].position()[1]);

                    point_map['right'].setX(points[1].position()[0]);
                    point_map['right'].setY(points[1].position()[1]);


                    point_map['top'].setX(points[2].position()[0]);
                    point_map['top'].setY(points[2].position()[1]);

                    point_map['bottom'].setX(points[3].position()[0]);
                    point_map['bottom'].setY(points[3].position()[1]);

                    point_map['left-top'].setRotationDeg(points[4].rotationDeg());
                    point_map['left-top'].setX(points[4].position()[0]);
                    point_map['left-top'].setY(points[4].position()[1]);


                    point_map['right-top'].setRotationDeg(points[5].rotationDeg());
                    point_map['right-top'].setX(points[5].position()[0]);
                    point_map['right-top'].setY(points[5].position()[1]);


                    point_map['right-bottom'].setRotationDeg(points[6].rotationDeg());
                    point_map['right-bottom'].setX(points[6].position()[0]);
                    point_map['right-bottom'].setY(points[6].position()[1]);


                    point_map['left-bottom'].setRotationDeg(points[7].rotationDeg());
                    point_map['left-bottom'].setX(points[7].position()[0]);
                    point_map['left-bottom'].setY(points[7].position()[1]);


                    _this.rect.setWidth(group.getWidth() + 4);
                    _this.rect.setHeight(group.getHeight() + 4);

                    _this.rotation.setX(group.getWidth() / 2);
                    _this.rotation.setY(-40);
                })
            })(i);

        }
    }
    this.registRotateEvent = function (fn) {
        var group = this.group;
        var _this = this;
        this.rotation.on("dragmove", function (evt) {
            var start = [group.getWidth() / 2, -40];

            var deg = group.getRotationDeg();

            var end = [evt.target.getX(), evt.target.getY()];


            var center = [group.getWidth() / 2, group.getHeight() / 2];
            var radius = Math.pow(((center[0] - start[0]) * (center[0] - start[0]) + (center[1] - start[1]) * (center[1] - start[1])), 0.5);


            var x1 = start[0] - center[0];
            var x2 = end[0] - center[0];
            var y1 = start[1] - center[1];
            var y2 = end[1] - center[1];


            var x = Math.abs(x1 - x2);
            var y = Math.abs(y1 - y2);
            var z = Math.sqrt(x * x + y * y);
            var rotat = 0;
            if (z != 0) {
                rotat = Math.round(parseFloat((Math.asin(y / z) / Math.PI * 180)) * 100) * 0.02;
            }

            if (x2 >= x1) {
                rotat = rotat;
            } else if (x2 < x1) {
                rotat = -rotat;
            }


            group.setRotationDeg(rotat + group.getRotationDeg());

            _this.rotateDeg = group.getRotationDeg();
            fn(_this, evt);

            _this.rotation.setX(group.getWidth() / 2);
            _this.rotation.setY(-40);
        });
    }
    this.setRotateDeg = function (deg) {
        this.group.setRotationDeg(deg);
        this.layer.draw();
    };
    this.remove = function () {
        var parent = this.layer.parent;
        this.layer.remove();
        if (parent) {
            parent.draw();
        }

    }
}