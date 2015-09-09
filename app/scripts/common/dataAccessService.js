var DataAccessService = (function () {
    function DataAccessService($resource) {
        this.$resource = $resource;
    }
    DataAccessService.prototype.getProductResource = function () {
        return this.$resource("/api/products/:productId");
    };
    DataAccessService.$inject = ["$resource"];
    return DataAccessService;
})();
exports.DataAccessService = DataAccessService;
angular.module("common.services", []).service("dataAccessService", DataAccessService);
//# sourceMappingURL=dataAccessService.js.map