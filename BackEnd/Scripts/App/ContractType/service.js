app.service("ContractTypeService", function ($http) {

  //get All Employee  
  this.getCities = function (ContractType) {
    var response = $http({
      method: "post",
      url: "/Project/FetchContractTypeByPageSize",
      data: JSON.stringify(ContractType),
      dataType: "json"
    });

    return response; 
  };

  this.deleteContractType = function (ContractType) {
    var response = $http({
      method: "post",
      url: "/Project/DeleteContractType",
      data: JSON.stringify(ContractType),
      dataType: "json"
    });
    return response;
  }
  this.deleteContractTypeSelected = function (ContractTypeId) {
    var response = $http({
      method: "post",
      url: "/Project/DeleteContractTypeSelected",
      data: { 'ContractTypeId': ContractTypeId },
      dataType: "json"
    });
    return response;
  }
  //<--Calls the update method on server -->  
  this.updateContractType = function (ContractType) {
    var response = $http({
      method: "post",
      url: "/Project/UpdateContractType",
      data: JSON.stringify(ContractType),
      dataType: "json"
    });
    return response;
  }
});