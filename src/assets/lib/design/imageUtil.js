function initStage(stage) {

    //被选中的image控件，用于click事件
    var click_layer_image;

    //被选中的可操作图层
    var click_actionable;


    //背景图层zindex=0



    return {
        paintImage: function (imageObj) {
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

            var timestamp = (new Date()).valueOf();
            //需要显示的图片
            var image = new Kinetic.Image({
                x: width / 2 + 40,
                y: height / 2 + 50,
                image: imageObj,
                id: timestamp,
                name: 'image',
                width: width,
                height: height,
                offsetX: width / 2,
                offsetY: height / 2,
            });

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

            //图片点击显示操作层
            image.on("click", function (evt) {

                var container = stage.getContainer();
                container.style.cursor = 'move';

                if (click_actionable) {
                    click_actionable.remove();
                }

                click_actionable = new Actionable(image.getId(), image.getX(), image.getY(),
                    image.getWidth(), image.getHeight(), image.getRotationDeg());
                click_actionable.addToStage(stage);

                /**
                 * 注册相关事件
                 */
                click_actionable.registDragmoveEvent(function (actionable) {
                    image.setX(actionable.x);
                    image.setY(actionable.y);
                    image.parent.draw();
                });

                click_actionable.registMouseoverEvent(function () {
                    container.style.cursor = 'move';
                });
                click_actionable.registMouseoutEvent(function () {
                    container.style.cursor = 'default';
                });
                click_actionable.registMousedownEvent(function () {

                });
                click_actionable.registRotateEvent(function (actionable) {
                    image.setRotationDeg(actionable.rotateDeg);
                    image.parent.draw();
                });

                click_actionable.registStretchEvent(function (actionable) {
                    image.setX(actionable.x);
                    image.setY(actionable.y);
                    image.setWidth(actionable.width);
                    image.setHeight(actionable.height);
                    image.setOffsetX(actionable.width/2);
                    image.setOffsetY(actionable.height/2);
                    image.parent.draw();
                })


                click_layer_image = layer_image;


            });

            layer_image.add(image);
            stage.add(layer_image);

        }
    }
}
