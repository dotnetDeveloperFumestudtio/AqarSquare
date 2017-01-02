app.factory("RegService", function ($http, $q) {
    return {
        IsUserNameAvailablle: function (userName) {
            // Get the deferred object
            var deferred = $q.defer();
            // Initiates the AJAX call
            $http({
              method: 'GET',
              url: $scope.URL + 'IsUserNameAvailable?userName=' + userName
            }).success(deferred.resolve).error(deferred.reject);
            // Returns the promise - Contains result once request completes
            return deferred.promise;
        }
    }
});