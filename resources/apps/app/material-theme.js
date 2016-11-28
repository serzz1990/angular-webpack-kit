'use strict';

module.exports = function (APP) {

	APP.config(['$mdThemingProvider', function ($mdThemingProvider) {

		//$mdThemingProvider.disableTheming();

		$mdThemingProvider.theme('default')
			.primaryPalette('deep-purple')
			//.accentPalette('deep-purple');


	}]);

};