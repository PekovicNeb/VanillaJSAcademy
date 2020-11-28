//
		// Variables
		//

		var formAutoSave = document.querySelector('.save-me');


		//
		// Methods
		//

		var populateFormFromStorage = function(){

			for (i = 0; i < formAutoSave.elements.length; i++){
				if(formAutoSave.elements[i].type!='submit'){
					formAutoSave.elements[i].value = localStorage.getItem(formAutoSave.elements[i].name);
				};
			}
		}

		var clearFormData = function(event){

			console.log(event.target.id);

			//if(event.target.type != 'submit') return;
			console.log('clear storage data and form');
			var i=0;
			// Clear Form Data and remove localStorage values
			for (i = 0; i < formAutoSave.elements.length; i++){
				if(formAutoSave.elements[i].type!='submit'){
					formAutoSave.elements[i].value = '';
					localStorage.removeItem(formAutoSave.elements[i].name);
					sessionStorage.removeItem(formAutoSave.elements[i].name);
				};
			}

		}

		var clickHandler = function (event) {
			// Stop form re-submitting/page reload
			event.preventDefault();

			if(event.target.id !='save-me') return;

			// go and clear data
			clearFormData(event);
		};

		var inputHandler = function (event) {

			// to add if closest is .save-me form only then save to local storage
			// had it so must have dropped earlier.

			var inputName = event.target.getAttribute('id');
			var inputVal = event.target.value;

			localStorage.setItem(inputName,inputVal);
			sessionStorage.setItem(inputName,inputVal);

			//saveFormData(event);
		};

		//
		// Inits & Event Listeners
		//

		populateFormFromStorage();

		// Listen for click events
		// to listen for form submisison listed for 'submit' event not as my original click.
		document.addEventListener('submit', clickHandler, false);
		document.addEventListener('input', inputHandler, false);