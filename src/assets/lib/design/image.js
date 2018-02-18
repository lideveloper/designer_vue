function Mimage(id, imageObj, snapshoot) {
    this.id = id;
    this.imageObj = imageObj;
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.naturalWidth = 0;
    this.naturalHeight = 0;
    this.crop = {x: 0, y: 0, width: 0, height: 0};
    this.rotationDeg = 0;
    this.scale = [1, 1];
    this.image = null;
    this.imageLayer = null;
    this.imageGroup = null;
    this.rgb = [0, 0, 0, 0];
    this.zindex = 0;
    this.paintToStage = function (stage) {

        if (!snapshoot) {
            snapshoot = {};
        }
        var imageObj = this.imageObj;

        this.naturalHeight = imageObj.naturalHeight;
        this.naturalWidth = imageObj.naturalWidth;

        this.crop.x = 0//snapshoot.crop ? snapshoot.crop.x ? snapshoot.crop.x : 0 : 0;
        this.crop.y = 0//snapshoot.crop ? snapshoot.crop.y ? snapshoot.crop.y : 0 : 0;
        this.crop.width = this.naturalWidth;
        this.crop.height = this.naturalHeight;

        var ratio = imageObj.naturalWidth / imageObj.naturalHeight;
        /*var width = imageObj.naturalWidth;
        var height = imageObj.naturalHeight;*/
        var width = 0;
        var height = 0;
        if (ratio >= 1) {
            width = 200;
            height = Math.round(width / ratio);
        } else {
            height = 200;
            width = Math.round(height * ratio);
        }

        /* if (snapshoot.height) {
             height = snapshoot.height;
         }
         if (snapshoot.width) {
             width = snapshoot.width
         }*/

        this.height = height;
        this.width = width;
        this.x = width / 2 + 40;
        this.y = height / 2 + 50;

        /*if (snapshoot.x) {
            this.x = snapshoot.x;
        }
        if (snapshoot.y) {
            this.y = snapshoot.y
        }
        if (snapshoot.rgb) {
            this.rgb = snapshoot.rgb;
        }
*/
        //需要显示的图片
        var image = new Kinetic.Image({
            x: 0,
            y: 0,
            crop: this.crop,
            image: imageObj,
            id: this.id,
            name: 'image',
            width: width,
            height: height,
            /*offsetX: width / 2,
            offsetY: height / 2,*/
        });
        //image.filters([Kinetic.Filters.RGB]);
        if (this.rgb[0]) {
            image.cache();
            image.filters([Kinetic.Filters.RGB]);
            image.red(this.rgb[1]).green(this.rgb[2]).blue(this.rgb[3]);
        }

        var layer_image = new Kinetic.Layer({
            name: 'layer_image'
        });

        //图片鼠标样式
        image.on("mouseover", function () {
            container.style.cursor = 'pointer';
        });
        image.on("mouseout", function () {
            container.style.cursor = 'default';
        });

        this.imageGroup = new Kinetic.Group({
            name: 'group_image',
            id: 'group_image_' + this.id,
            width: width,
            height: height,
            x: this.x,
            y: this.y,
            offsetX: width / 2,
            offsetY: height / 2
        });
        this.imageGroup.add(image);
        layer_image.add(this.imageGroup);
        stage.add(layer_image);
        this.image = image;
        this.imageLayer = layer_image;

        this.recoverSnapshoot(snapshoot);
    }
    this.resistClickEvent = function (fn) {
        this.imageGroup.on("click", function (evt) {
            fn(evt);
        });
    }
    this.setX = function (x) {
        this.imageGroup.setX(x);
        this.x = x;
    }
    this.setY = function (y) {
        this.imageGroup.setY(y);
        this.y = y;
    }
    this.setWidth = function (width) {
        this.image.clearCache();
        this.image.setWidth(width);
        this.imageGroup.setWidth(width);
        this.imageGroup.setOffsetX(width / 2);
        this.width = width;

        if (this.rgb[0]) {
            this.image.cache();
            this.image.filters([Kinetic.Filters.RGB]);
            this.image.red(this.rgb[1]).green(this.rgb[2]).blue(this.rgb[3]);
        }

    }
    this.setHeight = function (height) {
        this.image.clearCache();
        this.image.setHeight(height);
        this.imageGroup.setHeight(height);
        this.imageGroup.setOffsetY(height / 2);
        this.height = height;

        if (this.rgb[0]) {
            this.image.cache();
            this.image.filters([Kinetic.Filters.RGB]);
            this.image.red(this.rgb[1]).green(this.rgb[2]).blue(this.rgb[3]);
        }

    }
    this.setRotationDeg = function (deg) {


        this.imageGroup.setRotationDeg(deg);
        this.rotationDeg = deg;
        this.imageLayer.draw();
        /* this.image.cache();
         this.image.red(this.rgb[0]).green(this.rgb[1]).blue(this.rgb[2]);*/


    }
    this.setScale = function (scale) {
        this.imageGroup.setScaleX(this.imageGroup.getScaleX() * scale[0]);
        this.imageGroup.setScaleY(this.imageGroup.getScaleY() * scale[1]);
        this.scale = [this.imageGroup.getScaleX(), this.imageGroup.getScaleY()];
        this.imageLayer.draw();
    }
    this.draw = function () {
        this.imageLayer.draw();
    }
    this.setRgb = function (rgb) {
        this.rgb = rgb;
        if (this.rgb[0]) {
            this.image.useFilter = 1;
            this.image.cache();
            this.image.filters([Kinetic.Filters.RGB]);
            this.image.red(this.rgb[1]).green(this.rgb[2]).blue(this.rgb[3]);
        }
    }
    this.setCrop = function (crop) {
        //是否需要重新cache过滤器，待确认
        this.image.clearCache();
        this.image.setCrop(crop);
        this.crop = crop;
        if (this.rgb[0]) {
            this.image.cache();
            this.image.filters([Kinetic.Filters.RGB]);
            this.image.red(this.rgb[1]).green(this.rgb[2]).blue(this.rgb[3]);
        }
        /* this.image.draw();*/
    }

    this.moveUp = function () {
        this.imageLayer.moveUp();
        this.zindex = this.imageLayer.getZIndex();
    }

    this.moveDown = function () {
        this.imageLayer.moveDown();
        this.zindex = this.imageLayer.getZIndex();
    }

    this.moveToTop = function () {
        this.imageLayer.moveToTop();
        this.zindex = this.imageLayer.getZIndex();
    }

    this.moveToBottom = function () {
        this.imageLayer.moveToBottom();
        this.zindex = this.imageLayer.getZIndex();
    }
    this.remove = function () {
        this.imageLayer.remove();
        this.imageLayer = null;
        this.image = null;
    }
    this.getSnapshoot = function () {
        return {
            id: this.id,
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
            crop: this.crop,
            rotationDeg: this.rotationDeg,
            scale: this.scale,
            rgb: this.rgb,
            url: this.imageObj.src,
            zindex: this.imageLayer.getZIndex()
        }
    };

    this.recoverSnapshoot = function (snapshoot) {
        if (snapshoot.x != undefined && this.x != snapshoot.x) {
            this.setX(snapshoot.x)
        }
        if (snapshoot.y != undefined && this.y != snapshoot.y) {
            this.setY(snapshoot.y)
        }
        if (snapshoot.width != undefined && this.width != snapshoot.width) {
            this.setWidth(snapshoot.width)
        }
        if (snapshoot.height != undefined && this.height != snapshoot.height) {
            this.setHeight(snapshoot.height)
        }
        if (snapshoot.rotationDeg != undefined && this.rotationDeg != snapshoot.rotationDeg) {
            this.setRotationDeg(snapshoot.rotationDeg);
        }
        if (snapshoot.scale != undefined && this.scale != snapshoot.scale) {
            this.setScale(snapshoot.scale);
        }
        if (snapshoot.crop != undefined && this.crop != snapshoot.crop) {
            this.setCrop(snapshoot.crop);
        }
        if (snapshoot.rgb != undefined && this.rgb != snapshoot.rgb) {
            this.setRgb(snapshoot.rgb)
        }
        /*    if (this.rgb != snapshoot.rgb) {
                this.setRgb(snapshoot.rgb)
            }*/
        if (snapshoot.zindex != undefined && this.zindex != snapshoot.zindex) {
            if (this.zindex > snapshoot.zindex) {
                while (this.zindex > snapshoot.zindex) {
                    this.moveDown();
                }
            } else {
                while (this.zindex < snapshoot.zindex) {
                    this.moveUp();
                }
            }
        }
        this.draw();
    };

    this.recoverStatus = function (type, snapshoot, imageObj) {
        /*if (type == 'add') {
            this.imageLayer.remove();
        }
        if (type == 'delete') {
            return new Mimage(this.id, imageObj, snapshoot);
        }*/
       /* if (type == 'change') {*/
            this.recoverSnapshoot(snapshoot);
        /*}*/
    }
}