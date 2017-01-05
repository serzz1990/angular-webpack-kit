'use strict';

var _private = {};


module.exports = function ($http) {

	'ngInject';

	class Service {


		constructor() {


		}


		login (params) {

			return $http.post(_private.services.login, params).then(function (res) {

				return res.data;

			});

		}

	}

	return Service;

};


_private.services = {
	login : '/login'
};