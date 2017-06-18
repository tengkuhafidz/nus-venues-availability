'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    var date = new Date().getTime();

    return uuid.replace(/[xy]/g, function (c) {
        var r = (date + Math.random() * 16) % 16 | 0;
        date = Math.floor(date / 16);
        return (c === 'x' ? r : r & 0x3 | 0x8).toString(16);
    });
};

var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';

;