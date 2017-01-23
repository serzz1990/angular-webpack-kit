'use strict';

// WIKI: https://github.com/angular-ui/ui-router/wiki
// https://ui-router.github.io/docs/0.3.1/#/api/ui.router

module.exports = function (APP) {

	APP.config(function ($stateProvider, $locationProvider, $urlRouterProvider) {

		'ngInject';

		//$locationProvider.html5Mode(true);

		$stateProvider

			.state('main', {
				url: '/',
				template: require('./pages/main/template.html'),
				controller: require('./pages/main/controller.js'),
				resolve : {
					//userData: ['User', User => User.getData()]
				}
			})

			.state('auth', {
				abstract: true,
				url: '/auth',
				template: require('./layouts/auth/template.html'),
				controller: require('./layouts/auth/controller.js')
			})

			.state('auth.login', {
				url: '/login',
				views: {
					'content': {
						template:  require('./pages/auth/login/template.html'),
						controller:  require('./pages/auth/login/controller.js')
					}
				}
			})

		$urlRouterProvider.otherwise('/');

	});


};