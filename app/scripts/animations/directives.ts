//require('./plugins/lory');
var lory = require('../plugins/lory');
declare var angular:any;
class BgSlider {
    restrict = 'A';
    link = (scope, element, attrs:ng.IAttributes) => {
        var percentage = document.querySelectorAll('.js_percentage');
        percentage.forEach((element, index)=> {
            var lorySlider = lory(element, {
                infinite: 1
            });
            var mainInterval;
            var autoScroll = ()=> {
                mainInterval = setInterval((function () {
                    lorySlider.next();
                }), 5000);
            };
            autoScroll();
            element.querySelectorAll('.arrows-bg-slider').forEach((el, i)=> {
                el.addEventListener('click', ()=> {
                    clearInterval(mainInterval);
                    autoScroll();
                });
            });
        });
    }
}
class Multislides implements ng.IDirective {
    //Directive settings
    lorySlider:any;
    restrict:string = 'A';
    scope:any = {
        multislides: "@",
        countInSlide: "="
    };
    //Take timeout argument in the constructor
    constructor(private $timeout:ng.ITimeoutService) {
    }

    link:ng.IDirectiveLinkFn = (scope:ng.IScope, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {
        let getWindowSize = ():{}=> {
            var w = window,
                d = document,
                e = d.documentElement,
                g = d.getElementsByTagName('body')[0],
                x = w.innerWidth || e.clientWidth || g.clientWidth,
                y = w.innerHeight || e.clientHeight || g.clientHeight;
            return {
                width: x,
                height: y
            }
        };
        //resizeWindow
        let resizeWindow = ()=> {
            if (getWindowSize().width < 1620)
                scope.countInSlide = parseInt((getWindowSize().width - 210) / 235);
            else
                scope.countInSlide = 6;
            let lorySlider;
            if (lorySlider)
                lorySlider.destroy();
            this.$timeout(function () {
                lorySlider = lory(element[0], {
                    infinite: 1
                });
            }, 300);
        };
        resizeWindow();
        window.addEventListener("resize", resizeWindow, false);
    };
    //Expose a static func so that it can be used to register directive.
    static factory():ng.IDirectiveFactory {
        //Create factory function which when invoked with dependencies by
        //angular will return newed up instance passing the timeout argument
        var directive:ng.IDirectiveFactory =
            ($timeout:ng.ITimeoutService) => new Multislides($timeout);
        //directive's injection list
        directive.$inject = ["$timeout"];
        return directive;
    }
}

angular.module('App')
    .directive('bgSlider', () => {
        return new BgSlider();
    })
    .directive('multislides', Multislides.factory());