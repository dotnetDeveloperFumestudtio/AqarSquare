

app.directive('useravail', ['RegService', function (RegService) {
    var directive = {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            element.on('blur', function (evt) {
               
                if (!ngModel || !element.val()) return;
                var curValue = element.val();
               
                RegService.IsUserNameAvailablle(curValue)
                .then(function (response) {
       
                        ngModel.$setValidity('unique', response);
                }, function () {
                    //If there is an error while executing AJAX
                   
                    ngModel.$setValidity('unique', true);
                });

            });

        }
    }
    return directive;
}]);
