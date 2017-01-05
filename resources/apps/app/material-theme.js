'use strict';

module.exports = function (APP) {

	APP.config(function ($mdThemingProvider) {

		'ngInject';

		//$mdThemingProvider.disableTheming();

		$mdThemingProvider.theme('default')
			.primaryPalette('deep-purple')
			//.accentPalette('deep-purple');


	});

};