app.service("PropertyTypeService", function ($http) {

  //get All Employee  
  this.getCities = function (PropertyType) {
    var response = $http({
      method: "post",
      url: "/Project/FetchPropertyTypeByPageSize",
      data: JSON.stringify(PropertyType),
      dataType: "json"
    });

    return response; 
  };

  this.deletePropertyType = function (PropertyType) {
    var response = $http({
      method: "post",
      url: "/Project/DeletePropertyType",
      data: JSON.stringify(PropertyType),
      dataType: "json"
    });
    return response;
  }
  this.deletePropertyTypeSelected = function (PropertyTypeId) {
    var response = $http({
      method: "post",
      url: "/Project/DeletePropertyTypeSelected",
      data: { 'PropertyTypeId': PropertyTypeId },
      dataType: "json"
    });
    return response;
  }
  //<--Calls the update method on server -->  
  this.updatePropertyType = function (PropertyType) {
    var response = $http({
      method: "post",
      url: "/Project/UpdatePropertyType",
      data: JSON.stringify(PropertyType),
      dataType: "json"
    });
    return response;
  }
});