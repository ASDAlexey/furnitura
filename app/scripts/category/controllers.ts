declare var angular:any;
interface IFilterModel {
    //form_set_dirty(form:{}):void;
    //action:string;
    dataForm:{}
}
export class FilterCtrl implements IFilterModel {
    dataForm:{};
    //action:string;

    constructor() {
        this.dataForm = {};
    }


    //send(dataForm:{}, formValidate, action:string, form:string):void {
    //    if (formValidate.$valid) {
    //        angular.element(document.getElementById(form))[0].submit();
    //    } else {
    //        this.form_set_dirty(formValidate);
    //    }
    //}
}
angular.module("App")
    .controller("App.form.FilterCtrl", FilterCtrl);




