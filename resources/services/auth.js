'use strict';

var _private = {};


module.exports = ['$http', function ($http) {

	class Service {


		constructor() {


		}


		login (params) {

			return $http.post(_private.services.login, params).then(function (res) {

				return res.data;

			});

		}

	}

	return new Service;

}];


_private.services = {
	login : '/login'
};