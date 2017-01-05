'use strict';


module.exports = function (APP) {

	APP.config(function ($routeProvider, $locationProvider) {

		'ngInject';

		//$locationProvider.html5Mode(true);

		$routeProvider

			.when('/', {
				template: require('./pages/main/template.html'),
				controller: require('./pages/main/controller.js'),
				resolve : {
					//userData: ['User', User => User.getData()]
				}
			})

			.otherwise('/');

	});


};