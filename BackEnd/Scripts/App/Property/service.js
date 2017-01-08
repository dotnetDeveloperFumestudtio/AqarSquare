app.service("PropertyService", function ($http) {

  //get All Employee  
  this.getCities = function (Property) {
    var response = $http({
      method: "post",
      url: "/Project/FetchPropertyByPageSize",
      data: JSON.stringify(Property),
      dataType: "json"
    });

    return response; 
  };

  this.deleteProperty = function (Property) {
    var response = $http({
      method: "post",
      url: "/Project/DeleteProperty",
      data: JSON.stringify(Property),
      dataType: "json"
    });
    return response;
  }
  this.deletePropertySelected = function (PropertyId) {
    var response = $http({
      method: "post",
      url: "/Project/DeletePropertySelected",
      data: { 'PropertyId': PropertyId },
      dataType: "json"
    });
    return response;
  }
  //<--Calls the update method on server -->  
  this.updateProperty = function (Property) {
    var response = $http({
      method: "post",
      url: "/Project/UpdateProperty",
      data: JSON.stringify(Property),
      dataType: "json"
    });
    return response;
  }
});