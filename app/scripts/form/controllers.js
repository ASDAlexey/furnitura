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
        if (formValidate.$valid) {
            angular.element(document.getElementById(form))[0].submit();
        }
        else {
            this.form_set_dirty(formValidate);
        }
    };
    return FilterCtrl;
})();
var FormCtrl = (function () {
    function FormCtrl($rootScope, $timeout, $http) {
        this.$rootScope = $rootScope;
        this.$timeout = $timeout;
        this.httpService = $http;
        this.address_count = 1;
        this.dataForm = {
            data: {
                address_cart: [
                    {
                        "name": "address_cart1",
                        "value": ""
                    }
                ]
            },
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
            angular.forEach(form, function (input, key) {
                if (typeof input === 'object' && input.$name !== undefined) {
                    return form[input.$name].$setViewValue((form[input.$name].$viewValue !== undefined ? form[input.$name].$viewValue : ""));
                }
            });
        }
    };
    FormCtrl.prototype.thanksShowTime = function () {
        var _this = this;
        this.$rootScope.formIsValide = true;
        this.$timeout(function () {
            _this.$rootScope.hideThank();
        }, 2000);
    };
    FormCtrl.prototype.clear = function (formValidate) {
        this.dataForm.data = {};
        this.dataForm = {
            data: {
                address_cart: [
                    {
                        "name": "address_cart1",
                        "value": ""
                    }
                ]
            },
            hidden: {}
        };
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
            if (angular.element(document.getElementById('form-cart')).length) {
                angular.element(document.getElementById('form-cart'))[0].submit();
            }
            else {
                this.sendData(sendOptions);
                this.clear(formValidate);
            }
        }
        else {
            this.form_set_dirty(formValidate);
        }
    };
    FormCtrl.prototype.addAddress = function (address_cart, address_count) {
        this.address_count++;
        var obj = {};
        obj['name'] = address_cart + (address_count + 1);
        obj['value'] = "";
        this.dataForm.data.address_cart.push(obj);
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