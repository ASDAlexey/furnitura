var FormAuthCtrl = (function () {
    function FormAuthCtrl() {
        this.dataForm = {};
    }
    FormAuthCtrl.prototype.form_set_dirty = function (form) {
        if (form.$setDirty) {
            form.$setDirty();
            return angular.forEach(form, function (input, key) {
                if (typeof input === 'object' && input.$name !== undefined) {
                    return form[input.$name].$setViewValue((form[input.$name].$viewValue !== undefined ? form[input.$name].$viewValue : ""));
                }
            });
        }
    };
    FormAuthCtrl.prototype.send = function (dataForm, formValidate, action, form) {
        if (formValidate.$valid) {
            angular.element(document.getElementById(form))[0].submit();
        }
        else {
            this.form_set_dirty(formValidate);
        }
    };
    return FormAuthCtrl;
})();
var FilterCtrl = (function () {
    function FilterCtrl() {
        this.dataForm = {};
    }
    FilterCtrl.prototype.form_set_dirty = function (form) {
        if (form.$setDirty) {
            form.$setDirty();
            return angular.forEach(form, function (input, key) {
                if (typeof input === 'object' && input.$name !== undefined) {
                    return form[input.$name].$setViewValue((form[input.$name].$viewValue !== undefined ? form[input.$name].$viewValue : ""));
                }
            });
        }
    };
    FilterCtrl.prototype.send = function (dataForm, formValidate, action, form) {
        console.log('snedForm');
        if (formValidate.$valid) {
            angular.element(document.getElementById(form))[0].submit();
        }
        else {
            console.log('valid');
            this.form_set_dirty(formValidate);
        }
    };
    return FilterCtrl;
})();
exports.FilterCtrl = FilterCtrl;
var FormCtrl = (function () {
    function FormCtrl($rootScope, $timeout, $http) {
        this.$rootScope = $rootScope;
        this.$timeout = $timeout;
        this.httpService = $http;
        this.dataForm = {
            data: {},
            hidden: {}
        };
        $rootScope.hideThank = function () {
            return $rootScope.formIsValide = false;
        };
    }
    FormCtrl.prototype.form_set_pristine = function (form) {
        if (form.$setPristine) {
            return form.$setPristine();
        }
    };
    FormCtrl.prototype.form_set_dirty = function (form) {
        if (form.$setDirty) {
            form.$setDirty();
            return angular.forEach(form, function (input, key) {
                if (typeof input === 'object' && input.$name !== undefined) {
                    return form[input.$name].$setViewValue((form[input.$name].$viewValue !== undefined ? form[input.$name].$viewValue : ""));
                }
            });
        }
    };
    FormCtrl.prototype.thanksShowTime = function () {
        var _this = this;
        console.log('start');
        this.$rootScope.formIsValide = true;
        this.$timeout(function () {
            _this.$rootScope.hideThank();
        }, 2000);
    };
    FormCtrl.prototype.clear = function (formValidate) {
        this.dataForm.data = {};
        this.form_set_pristine(formValidate);
    };
    FormCtrl.prototype.sendData = function (sendOptions) {
        this.httpService({
            url: sendOptions.action,
            method: sendOptions.method,
            data: sendOptions.data
        }).then(function () {
            this.clear(sendOptions.formValidate);
        });
    };
    FormCtrl.prototype.send = function (dataForm, formValidate, action) {
        var sendOptions;
        if (formValidate.$valid) {
            this.thanksShowTime();
            sendOptions = {
                formValidate: formValidate,
                action: action,
                method: "POST",
                data: angular.copy(dataForm)
            };
            this.sendData(sendOptions);
            this.clear(formValidate);
        }
        else {
            this.form_set_dirty(formValidate);
        }
    };
    FormCtrl.$inject = ["$rootScope", "$timeout", "$http"];
    return FormCtrl;
})();
exports.FormCtrl = FormCtrl;
angular.module("App")
    .controller("App.form.FormAuthCtrl", FormAuthCtrl)
    .controller("App.form.FormCtrl", FormCtrl)
    .controller("App.FilterCtrl", FilterCtrl);
//# sourceMappingURL=controllers.js.map