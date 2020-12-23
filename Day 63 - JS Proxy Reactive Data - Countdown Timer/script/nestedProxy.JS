var handler = function () {
	return {
		get: function (obj, prop) {
			console.log('got it!');
			if (['[object Object]', '[object Array]'].indexOf(Object.prototype.toString.call(obj[prop])) > -1) {
				return new Proxy(obj[prop], handler());
			}
            return obj[prop];
		},
		set: function (obj, prop, value) {
			console.log('set it');
            obj[prop] = value;
			return true;
        },
        deleteProperty: function (obj, prop) {
			console.log('delete it');
            delete obj[prop];
			return true;
		}
	};
};

var data = new Proxy({
	todos: ['Eat', 'drink', 'be merry']
}, handler());