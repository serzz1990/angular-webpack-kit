'use strict';

module.exports = function ($routeProvider, $locationProvider) {

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




};