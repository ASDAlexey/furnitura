declare var angular:any;
'use strict';
angular.module("common.filters", []).filter("splitSpace", function () {
    return function (input) {
        if (input) {
            return input.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        }
    };
}).filter("round2", function () {
    return function (quantity) {
        return Math.ceil(quantity * 100) / 100;
    };
}).filter('slice', function () {
    return function (arr, start, end) {
        return arr.slice(start, end);
    };
})
    .filter("persent", function () {
        return function (input) {
            if (input) {
                return input * 100;
            }
        };
    }).filter("toMb", function () {
        return function (input) {
            if (input) {
                return Math.round(input * 100 / 1048576) / 100;
            }
        };
    }).filter("toArr0", function () {
        return function (input) {
            if (input) {
                return input.split(';')[0];
            }
        };
    }).filter("toArr1", function () {
        return function (input) {
            if (input) {
                return input.split(';')[1];
            }
        };
    });