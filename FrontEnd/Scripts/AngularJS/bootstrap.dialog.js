(function () {
	'use strict';

	angular
			.module('msar')
			.factory('bootstrap.dialog', modalDialog);

	modalDialog.$inject = ['$modal', '$templateCache'];

	/* @ngInject */

	/*
	* Use this function to popup delete window -waiting add/edit/etc..-
	*This function create and store html tpl into $templateCache
	*/
	function modalDialog($modal, $templateCache) {
		//expose
		var service = {
			deleteDialog: deleteDialog,
			confirmationDialog: confirmationDialog
		};

		//create template and store it
		$templateCache.put('modalDialog.tpl.html',
						'<div>' +
						'    <div class="modal-header">' +
						'        <button type="button" class="close" data-dismiss="modal" ' +
						'            aria-hidden="true" data-ng-click="cancel()">&times;</button>' +
						'        <h3>{{title}}</h3>' +
						'    </div>' +
						'    <div class="modal-body">' +
						'        <p>{{message}}</p>' +
						'    </div>' +
						'    <div class="modal-footer">' +
						'        <button class="btn btn-primary" data-ng-click="ok()">{{okText}}</button>' +
						'        <button class="btn btn-info" data-ng-click="cancel()">{{cancelText}}</button>' +
						'    </div>' +
						'</div>');

		return service;

		/*
		*Use this finction to represent  delete dialog 
		*use itemName to display it in delete confirmation text
		*/
		function deleteDialog(itemName) {
			var title = 'Confirm Delete';
			itemName = itemName || 'item';
			var msg = 'Delete ' + itemName + '?';

			return confirmationDialog(title, msg);
		}
		/**
		*Use this to open popup window and send paremetars to display the dialog text
		*This function invoke the $modal to open popup window based on caller
		*title : Modal title text
		*msg : Modal msg text
		*okText : Modal Ok text
		*cancelText : Modal cancel text
		*/
		function confirmationDialog(title, msg, okText, cancelText) {

			var modalOptions = {
				templateUrl: 'modalDialog.tpl.html',
				controller: ModalInstance,
				keyboard: true,
				resolve: {
					options: function () {
						return {
							title: title,
							message: msg,
							okText: okText,
							cancelText: cancelText
						};
					}
				}
			};
			//show modal
			return $modal.open(modalOptions).result;
		}
	}

	ModalInstance.$inject = ['$scope', '$modalInstance', 'options'];

	/* @ngInject */

	/**
	*This is function is a controller function for modal dialog to store data in its scope to repersent data to the view 
	*options : list of values to pass it to $scope to display in the view
	*there are 2 functions for ok and cancel the popup window so the view send ok or cancel order back to the controller
	*/
	function ModalInstance($scope, $modalInstance, options) {
		$scope.title = options.title || 'Title';
		$scope.message = options.message || '';
		$scope.okText = options.okText || 'OK';
		$scope.cancelText = options.cancelText || 'Cancel';
		$scope.ok = function () {
			$modalInstance.close('ok');
		};
		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};
	}
})();