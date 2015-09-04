module app.form {
    declare var angular:any;
    interface IGMapCtrlModel {
        map:{};
        options:{
            scrollwheel:boolean
        };
    }
    export class GMapCtrl implements IGMapCtrlModel {
        map:{};
        options:{
            scrollwheel:boolean
        };

        constructor() {
            this.map={};
            this.options={
                scrollwheel:false
            };
        }

    }

    angular.module("App")
        .controller("App.map.GMapCtrl", GMapCtrl);
}



