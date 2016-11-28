'use strict';

var _private = {};


module.exports = ['$http', '$q', function ($http, $q) {

	class Service {


		constructor() {


		}


		getData (force) {

			if (this.data && !force) {
				return $q.resolve(this.data);
			}

			return $http.get(_private.services.user).then(function (res){

				this.data = res.data;

			}.bind(this), function () {

				console.log(arguments)

			});

		}


	}

	return new Service;

}];



_private.services = {
	user: '/api/user'
};