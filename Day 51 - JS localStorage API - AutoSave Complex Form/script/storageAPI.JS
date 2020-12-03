//
		// Variables
		//
		var formAutoSave = document.querySelectorAll('.save-me input, .save-me textarea, .save-me select');
		var formFields = Array.prototype.slice.call(formAutoSave);
		var storagePrefix = 'form-autosave-';
		var storageId = 'form-autosave';

		//
		// Methods
		//

		var populateFormFromStorage = function(){

/* 			formFields.forEach(function(field){
				var id = getId(field);
				if(!id) return;

				// get saved localStorage
				var savedValue = localStorage.getItem(storagePrefix + id);
				if(!savedValue) return;
				field.value= savedValue;
			}); */

			var formSaved = localStorage.getItem(storageId);
			if(!formSaved) return;

			formSaved = JSON.parse(formSaved);
			formFields.forEach(function(field){
				var id = getId(field);
				if(!id) return;

				if(!formSaved[id]) return;

				if(field.type == 'radio' && field.value == formSaved[id]){
					field.checked = true;
				}

				field.value= formSaved[id];
			});

		}

		var clearFormData = function(){
			//if(event.target.type != 'submit') return;
			console.log('clear storage data and form');

			//console.log(formFields);
			formFields.forEach(function(field){
				var id = getId(field);
				if(!id) return;
				localStorage.removeItem(storagePrefix + id);
			});
		//	localStorage.removeItem(storageId);
		}

		var saveFormData = function(){
			

			console.log(formFields);

			var getValues={};
			formFields.forEach(function(field){

				if((field.type == 'radio' || field.type == 'checkbox')  && field.checked){
					getValues[field.name]= field.value;
				} else if(field.type == 'text') {
					getValues[field.name]= field.value;
				}; 

			localStorage.setItem(storageId,JSON.stringify(getValues) );
			});
		}

		var getId = function(field){
			if(field.id.length > 0){
				return field.id;
			}
			if(field.name.length > 0){
				return field.name;
			}
			return null;
		}

		var clickHandler = function (event) {
			// Stop form re-submitting/page reload
			event.preventDefault();

			if(event.target.id !='save-me') return;

			saveFormData();
			// go and clear data
			clearFormData();
		};

		var inputHandler = function (event) {

			// to add if closest is .save-me form only then save to local storage
			// had it so must have dropped earlier.

			if(!event.target.closest('.save-me')) return;

			// Let see if input filed has an id (if not create one)
			var id = getId(event.target);

			if(!id) return;

			//var inputName = event.target.getAttribute('id');
			var inputVal = event.target.value;
			// save individual fields 
			localStorage.setItem(storagePrefix + id,inputVal);
			//sessionStorage.setItem(storagePrefix + id,,inputVal);
			// save the whole form as one localStorage variable
			var formSaved = localStorage.getItem(storageId);
			// check if already exists 
			formSaved = formSaved ? JSON.parse(formSaved) : {};
			// now save back to localStorage with  key and value of the current field
			formSaved[id]= inputVal;

			localStorage.setItem(storageId, JSON.stringify(formSaved));
		};

		//
		// Inits & Event Listeners
		//

		populateFormFromStorage();

		// Listen for click events
		// to listen for form submisison listed for 'submit' event not as my original click.
		document.addEventListener('submit', clickHandler, false);
		document.addEventListener('input', inputHandler, false);