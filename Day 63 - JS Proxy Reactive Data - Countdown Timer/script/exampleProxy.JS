    	var wizards = {
			neville: 'Gryffindor',
			malfoy: 'Slitherin',
			cedric: 'Hufflepuff'
		};

		// Getter and Setter
		var handler = {
			get: function(obj, prop) {

				// Do stuff when someone gets a property
				console.log('The value of ' + prop + ' is ' + obj[prop]);

				// Return the value
				// This is what happens by default when you don't have a Proxy
				return obj[prop];

			},
			set: function(obj, prop, value) {

				// Do stuff when someone sets a property
				console.log('Set ' + prop + ' to ' + value);

				// Set a property
				// This is what happens by default when you don't have a Proxy
				obj[prop] = value;

				// Indicate success
				// This is required
				return true;

			},
			deleteProperty: function (obj, prop) {

				// Do stuff when someone deletes a property
				console.log('Deleted ' + prop);

				// Delete the property
				delete obj[prop];

				// Indicate success
				// This is required
				return true;

			}
		};

		// Create a proxy
		var wizardsProxy = new Proxy(wizards, handler);

		// Get/Set/Delete smoe data
		
       // wizardsProxy.neville;
       // wizardsProxy.gilderoy = 'Ravenclaw';
	//	delete wizardsProxy.malfoy;