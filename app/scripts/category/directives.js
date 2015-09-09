var customSelect = (function () {
    //Take timeout argument in the constructor
    function customSelect($timeout) {
        this.$timeout = $timeout;
        //Directive settings
        this.restrict = 'E';
        this.scope = {
            inputModel: "=name",
            outputModel: "="
        };
        this.replace = true;
        this.transclude = true;
        this.template = require("./templates/custom-select.jade");
        this.link = function (scope, element, attrs) {
            if (!scope.inputModel)
                scope.inputModel = [];
            element[0].querySelectorAll('.options-block options').forEach(function (el, index) {
                scope.inputModel.push({
                    "maker": el.innerHTML,
                    "ticked": el.hasAttribute('selected'),
                    "value": el.getAttribute('value')
                });
            });
            element[0].querySelector('.options-block').remove();
        };
    }
    //Expose a static func so that it can be used to register directive.
    customSelect.factory = function () {
        //Create factory function which when invoked with dependencies by
        //angular will return newed up instance passing the timeout argument
        var directive = function ($timeout) { return new customSelect(); };
        directive.$inject = ["$timeout"];
        //directive's injection list
        return directive;
    };
    return customSelect;
})();
angular.module('App')
    .directive('customSelect', customSelect.factory());
//# sourceMappingURL=directives.js.map