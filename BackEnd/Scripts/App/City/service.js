app.service("cityService", function ($http) {

  //get All Employee  
  this.getCities = function (city) {
    var response = $http({
      method: "post",
      url: "/Project/FetchCityByPageSize",
      data: JSON.stringify(city),
      dataType: "json"
    });

    return response; 
  };

  this.deleteCity = function (city) {
    var response = $http({
      method: "post",
      url: "/Project/Deletecity",
      data: JSON.stringify(city),
      dataType: "json"
    });
    return response;
  }
  this.deleteCitySelected = function (cityId) {
    var response = $http({
      method: "post",
      url: "/Project/DeleteCitySelected",
      data: { 'cityId': cityId },
      dataType: "json"
    });
    return response;
  }
  //<--Calls the update method on server -->  
  this.updateCity = function (city) {
    var response = $http({
      method: "post",
      url: "/Project/UpdateCity",
      data: JSON.stringify(city),
      dataType: "json"
    });
    return response;
  }
});