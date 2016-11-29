'use strict';

module.exports = ['$q', '$location', function ($q, $location) {

	this.responseError = function(response) {

		if (response.status == 401){
			$location.path('login');
		}

		return $q.reject(response);

	};

}];