module app.form {
    declare var angular:any;
    interface ITabsModel {
        currentTab:number;
        switchTab(index:number):void;
    }
    export class TabCtrl implements ITabsModel {
        currentTab:number;

        constructor() {
            this.currentTab = 0;
        }

        switchTab(index:number):void {
            this.currentTab=index
        }
    }
    angular.module("App").controller("App.tabs.TabCtrl", TabCtrl);
}

