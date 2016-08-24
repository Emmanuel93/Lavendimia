var utils = angular.module('Utils', ['ngCookies']);

utils.factory('utils', Utils);

Utils.$inject = ['$cookies','$rootScope', '$timeout'];

function Utils ($cookies, $rootScope, $timeout) {

	Number.prototype.moneyFormat = function(c, d, t) {
	    var n = this;
		c = isNaN(c = Math.abs(c)) ? 2 : c;
		d = d === undefined ? "." : d;
		t = t === undefined ? "," : t;
		var s = n < 0 ? "-" : "";
		var i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "";
		var j = (j = i.length) > 3 ? j % 3 : 0;

	    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
	};

	var setSessionData = function (name, data) {
		if(typeof(data) == 'object') {
			$cookies.put(name, JSON.stringify(data));
		} else {
			$cookies.put(name, data);
		}
	};

	var getSessionData = function (name) {
		var data = $cookies.get(name);

		if(data) {
			if(data[0] == '{') {
				return JSON.parse($cookies.get(name));
			} else {
				return $cookies.get(name);
			}
		} else {
			return false;
		}
	};

	var removeSessionData = function (name) {
		$cookies.remove(name);
		return true;
	};

	return {
		moneyFormat: Number.prototype.moneyFormat,
		session: {
			get: getSessionData,
			set: setSessionData,
			remove: removeSessionData
		}
	};
}
