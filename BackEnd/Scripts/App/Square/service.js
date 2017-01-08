app.service("SquareService", function ($http) {

  //get All Employee  
  this.getCities = function (square) {
    var response = $http({
      method: "post",
      url: "/Project/FetchSquareByPageSize",
      data: JSON.stringify(square),
      dataType: "json"
    });

    return response;
  };

  this.deleteSquare = function (square) {
    var response = $http({
      method: "post",
      url: "/Project/DeleteSquare",
      data: JSON.stringify(square),
      dataType: "json"
    });
    return response;
  }
  this.deleteSquareSelected = function (squareId) {
    var response = $http({
      method: "post",
      url: "/Project/DeleteSquareSelected",
      data: { 'SquareId': squareId },
      dataType: "json"
    });
    return response;
  }
  //<--Calls the update method on server -->  
  this.updateSquare = function (square) {
    var response = $http({
      method: "post",
      url: "/Project/UpdateSquare",
      data: JSON.stringify(square),
      dataType: "json"
    });
    return response;
  }

});