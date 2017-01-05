'use strict';

module.exports = function ($q, $location) {

	'ngInject';

	this.responseError = function(response) {

		if (response.status == 401){
			$location.path('login');
		}

		return $q.reject(response);

	};

};