var MultislidesCtrl = (function () {
    function MultislidesCtrl($timeout) {
        var _this = this;
        this.$timeout = $timeout;
        this.popular = [];
        this.group = [];
        this.countInSlide = 0;
        this.$timeout(function () {
            var count;
            if (_this.popular.length % _this.countInSlide == 0)
                count = parseInt(_this.popular.length / _this.countInSlide);
            else
                count = parseInt(_this.popular.length / _this.countInSlide) + 1;
            _this.group = _.fill(new Array(count), true);
        }, 100);
    }
    MultislidesCtrl.$inject = ["$timeout"];
    return MultislidesCtrl;
})();
exports.MultislidesCtrl = MultislidesCtrl;
angular.module("App")
    .controller("App.animations.multislidesCtrl", MultislidesCtrl);
//# sourceMappingURL=controllers.js.map