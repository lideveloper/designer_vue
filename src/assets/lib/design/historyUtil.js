function HistoryUtil() {
    //类型：'add''delete','change'
    function status(type, element, snapshoot) {
        this.type = type;
        this.id = snapshoot['id'];
        this.element = element;
        this.snapshoot = snapshoot;

    }

    status.equal = function (obj) {
        if (obj instanceof status) {
            var result = true;
            for (k in this.snapshoot) {
                if (this.snapshoot[k] != obj.snapshoot[k]) {
                    result = false;
                    break;
                }
            }
            return result;
        } else {
            return false;
        }
    }

    var currentIndex = -1;

    var log = [];
    var isEqual = function (snapshoot1, snapshoot2) {
        var result = true;
        for (k in snapshoot1) {
            if (snapshoot1[k] != snapshoot2[k]) {
                result = false;
                break;
            }
        }
        return result;
    }

    var getPreStatus = function (id) {
        for (var i = currentIndex - 1; i >= 0; i--) {
            if (log[i]['id'] == id) {
                return log[i];
            }
        }
    }

    var getNextStatus = function (id) {
        for (var i = currentIndex + 1; log.length < 0; i++) {
            if (log[i]['id'] == id) {
                return log[i];
            }
        }
    }

    return {
        addHistory: function (type, element) {
            var pre = log[currentIndex];
            if (!isEqual(element.getSnapshoot(),
                    pre ? pre['snapshoot'] : {}) || type != pre.type) {
                /* if (type == 'deleteBefore') {
                     for (var i = log.length - 1; i >= 0; i--) {
                         if (log[i]['element']['id'] == element['id'] && log[i]['type'] == 'change') {
                             log[i]['type'] = 'deleteBefore';
                             return;
                         }
                     }
                 } else {*/
                log[++currentIndex] = new status(type, element, element.getSnapshoot());
                log = log.slice(0, currentIndex + 1);
                //}

            }

        },
        getNextStatus: function () {
            return log[currentIndex + 1];
        },
        getPreStatus: function () {
            return log[currentIndex - 1];
        },
        getCurrentStatus: function () {
            return log[currentIndex];
        },
        getlog: function () {
            return {
                log: log,
                index: currentIndex,
            };
        },

        goback: function (statusManager) {
            if (currentIndex <= -1) {
                currentIndex = -1
                return;
            }

            var curr = this.getCurrentStatus();

            if (curr.type == 'delete') {
                var s = getPreStatus(curr.id);

                var element = s.element;
                var image = new Image();
                image.src = element.imageObj.src;
                $(image).one('load', function () {
                    var element = statusManager.addImage(s.snapshoot.id, s.snapshoot.url, s.snapshoot, function (element) {
                        //  element.recoverSnapshoot(s.snapshoot);
                        for (var i = 0; i < log.length; i++) {//用于替换日志中被删除的对象
                            if (log[i]['element']['id'] == element['id']) {
                                log[i]['element'] = element;
                            }
                        }
                    });
                });

            } else if (curr.type == 'change') {
                var s = getPreStatus(curr.id);
                s.element.recoverStatus(s.type, s.snapshoot, null);
            } else if (curr.type == 'add') {
                curr.element.remove();
            }

            currentIndex += -1;

        },
        gofont: function (statusManager) {
            if (currentIndex + 1 >= log.length) {
                currentIndex = log.length - 1;
                return;
            }
            var next = this.getNextStatus();

            if (next.type == 'add') {
                var s = next;

                var element = s.element;
                var image = new Image();
                image.src = element.imageObj.src;
                $(image).one('load', function () {
                    var element = statusManager.addImage(s.snapshoot.id, s.snapshoot.url, s.snapshoot, function (element) {
                        //  element.recoverSnapshoot(s.snapshoot);
                        for (var i = 0; i < log.length; i++) {//用于替换日志中被删除的对象
                            if (log[i]['element']['id'] == element['id']) {
                                log[i]['element'] = element;
                            }
                        }
                    });
                });
            } else if (next.type == 'change') {
                next.element.recoverStatus(next.type, next.snapshoot, null);
            } else if (next.type == 'delete') {
                next.element.remove();
            }
            currentIndex += 1;
        }

    }

}