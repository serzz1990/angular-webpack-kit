'use strict';

var _private = {};


module.exports = ['$location', '$q', function ($location, $q) {

	class Service {


		constructor() {


		}


		auth (res) {

			console.log('Errors', arguments);

			if (res && res.status) {
				if (res.status == 401) {
					$location.path('login');
				}
			}

			return $q.reject(res);

		}



	}

	return new Service;

}];