declare var angular:any;
class customSelect implements ng.IDirective {
    //Directive settings
    restrict:string = 'E';
    scope:any = {
        inputModel: "=name",
        outputModel: "="
    };
    replace:boolean = true;
    transclude:boolean = true;
    template = require("./templates/custom-select.jade");
    //Take timeout argument in the constructor
    constructor(private $timeout:ng.ITimeoutService) {
    }

    link:ng.IDirectiveLinkFn = (scope:ng.IScope, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {
        if (!scope.inputModel)
            scope.inputModel = [];
        element[0].querySelectorAll('.options-block options').forEach((el, index)=> {
            scope.inputModel.push({
                "maker": el.innerHTML,
                "ticked": el.hasAttribute('selected'),
                "value": el.getAttribute('value')
            })
        });
        element[0].querySelector('.options-block').remove();
    };
    //Expose a static func so that it can be used to register directive.
    static factory():ng.IDirectiveFactory {
        //Create factory function which when invoked with dependencies by
        //angular will return newed up instance passing the timeout argument
        var directive:ng.IDirectiveFactory =
            ($timeout:ng.ITimeoutService) => new customSelect();
        //directive's injection list
        return directive;
    }
}

angular.module('App')
    .directive('customSelect', customSelect.factory());