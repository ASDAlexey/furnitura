//require('./plugins/lory');
var lory = require('../plugins/lory');
var BgSlider = (function () {
    function BgSlider() {
        this.restrict = 'A';
        this.link = function (scope, element, attrs) {
            var percentage = document.querySelectorAll('.js_percentage');
            percentage.forEach(function (element, index) {
                var lorySlider = lory(element, {
                    infinite: 1
                });
                var mainInterval;
                var autoScroll = function () {
                    mainInterval = setInterval((function () {
                        lorySlider.next();
                    }), 5000);
                };
                autoScroll();
                element.querySelectorAll('.arrows-bg-slider').forEach(function (el, i) {
                    el.addEventListener('click', function () {
                        clearInterval(mainInterval);
                        autoScroll();
                    });
                });
            });
        };
    }
    return BgSlider;
})();
var Multislides = (function () {
    //Take timeout argument in the constructor
    function Multislides($timeout) {
        var _this = this;
        this.$timeout = $timeout;
        this.restrict = 'A';
        this.scope = {
            multislides: "@",
            countInSlide: "="
        };
        this.link = function (scope, element, attrs) {
            var getWindowSize = function () {
                var w = window, d = document, e = d.documentElement, g = d.getElementsByTagName('body')[0], x = w.innerWidth || e.clientWidth || g.clientWidth, y = w.innerHeight || e.clientHeight || g.clientHeight;
                return {
                    width: x,
                    height: y
                };
            };
            //resizeWindow
            var resizeWindow = function () {
                if (getWindowSize().width < 1620)
                    scope.countInSlide = parseInt((getWindowSize().width - 210) / 235);
                else
                    scope.countInSlide = 6;
                var lorySlider;
                if (lorySlider)
                    lorySlider.destroy();
                _this.$timeout(function () {
                    lorySlider = lory(element[0], {
                        infinite: 1
                    });
                }, 300);
            };
            resizeWindow();
            window.addEventListener("resize", resizeWindow, false);
        };
    }
    //Expose a static func so that it can be used to register directive.
    Multislides.factory = function () {
        //Create factory function which when invoked with dependencies by
        //angular will return newed up instance passing the timeout argument
        var directive = function ($timeout) { return new Multislides($timeout); };
        //directive's injection list
        directive.$inject = ["$timeout"];
        return directive;
    };
    return Multislides;
})();
angular.module('App')
    .directive('bgSlider', function () {
    return new BgSlider();
})
    .directive('multislides', Multislides.factory());
//# sourceMappingURL=directives.js.map