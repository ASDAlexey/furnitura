declare var angular:any;
declare var _:any;
interface IColorModel {
    switchCheck(model:boolean):void;
    model:boolean;
}
class ColorCtrl implements IColorModel {
    model:boolean;
    static $inject = ["$scope"];

    constructor(private $scope) {
    }

    switchCheck(model:boolean):void {
        console.log(model);
        this.$scope.model = !model
    }
}
class Color implements ng.IDirective {
    //Directive settings
    restrict:string = 'E';
    template = require("./templates/color.jade");
    replace = true;
    transclude = true;
    scope:any = {
        checked: "=",
        value: "@",
        model: "="
    };
    controller:any = ColorCtrl;
    controllerAs = "vmColor";
    //Take timeout argument in the constructor
    constructor(private $scope) {
    }

    link:ng.IDirectiveLinkFn = (scope:ng.IScope, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {
        if (!_.isUndefined(attrs.checked))
            scope.model = true;
        else
            scope.model = false;
    };
    //Expose a static func so that it can be used to register directive.
    static factory():ng.IDirectiveFactory {
        //Create factory function which when invoked with dependencies by
        //angular will return newed up instance passing the timeout argument
        var directive:ng.IDirectiveFactory =
            () => new Color();
        //directive's injection list
        return directive;
    }
}

angular.module('App')
    .directive('color', Color.factory());