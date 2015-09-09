var ColorCtrl = (function () {
    function ColorCtrl($scope) {
        this.$scope = $scope;
    }
    ColorCtrl.prototype.switchCheck = function (model) {
        console.log(model);
        this.$scope.model = !model;
    };
    ColorCtrl.$inject = ["$scope"];
    return ColorCtrl;
})();
var Color = (function () {
    //Take timeout argument in the constructor
    function Color($scope) {
        this.$scope = $scope;
        //Directive settings
        this.restrict = 'E';
        this.template = require("./templates/color.jade");
        this.replace = true;
        this.transclude = true;
        this.scope = {
            checked: "=",
            value: "@",
            model: "="
        };
        this.controller = ColorCtrl;
        this.controllerAs = "vmColor";
        this.link = function (scope, element, attrs) {
            if (!_.isUndefined(attrs.checked))
                scope.model = true;
            else
                scope.model = false;
        };
    }
    //Expose a static func so that it can be used to register directive.
    Color.factory = function () {
        //Create factory function which when invoked with dependencies by
        //angular will return newed up instance passing the timeout argument
        var directive = function () { return new Color(); };
        //directive's injection list
        return directive;
    };
    return Color;
})();
angular.module('App')
    .directive('color', Color.factory());
//# sourceMappingURL=common.directives.js.map