//
		// Variables
		//
		var url = 'https://gist.githubusercontent.com/cferdinandi/14c92124674d4069ed65d0ceb005605a/raw/d2e1623424c7ff329a1b17a29c3d83fa58497b8a/'
		// The monsters and socks
		var monsters = [
			'monster1',
			'monster2',
			'monster3',
			'monster4',
			'monster5',
			'monster6',
			'monster7',
			'monster8',
			'monster9',
			'monster10',
			'monster11',
			'sock'
		];

		// Get the #app element
		var app = document.querySelector('#app');

		// The number of monsters who have been found
		// @Bug 5 - Variable set and not used does not break the code but is redundant 
		// However script uses found to keep track of how many found so we shoud rename it

		//var count;
		var found;

		//
		// Methods
		//

		/**
		 * Randomly shuffle an array
		 * https://stackoverflow.com/a/2450976/1293256
		 * @param  {Array} array The array to shuffle
		 * @return {String}      The first item in the shuffled array
		 */
		var shuffle = function (array) {

			var currentIndex = array.length;
			var temporaryValue, randomIndex;

			// While there remain elements to shuffle...
			while (0 !== currentIndex) {
				// Pick a remaining element...
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex -= 1;

				// And swap it with the current element.
				temporaryValue = array[currentIndex];
				array[currentIndex] = array[randomIndex];
				array[randomIndex] = temporaryValue;
			}

			return array;

		};

		/**
		 * Render the grid of monsters onto the game board
		 */
		var renderMonsters = function () {

			// Reset the number of monsters who have been found
			found = 0;

			// Shuffle the monsters array
			shuffle(monsters);

			console.log(monsters);

			// Create the HTML and inject it into the DOM
			// A button element is focusable and conveys to screen readers that it can be clicked
			// The data-monster-id stores the index of the monster in our array
			app.innerHTML =
				'<p>Click a door to reveal a monster. Try not to find the sock.</p>' +
				'<div class="row">' +
					monsters.map(function (monster, index) {
						var html =
							'<div class="grid">' +
								'<button data-monster-id="' + index + '">' +
									'<img alt="Click the door to see what\'s behind it" src="'+ url + 'door.svg">' +
								'</button>' +
							'</div>';
						return html;
					}).join('') +
				'</div>';

		};

		/**
		 * Render a new UI when the player loses
		 */
		var renderLost = function () {
			app.innerHTML =
				'<img class="img-full" alt="" src="https://media.giphy.com/media/13zUNhE9WZspMc/giphy.gif">' +
				'<h2>Oops, you found a sock!</h2>' +
				'<p>' +
					'<button class="btn" data-monster-play-again>Play Again</button>' +
				'</p>';
		};

		/**
		 * Render a new UI when the player wins
		 */
		var renderWon = function () {
			app.innerHTML =
				'<img class="img-full" alt="" src="https://media.giphy.com/media/1242bJFCbb3FxC/giphy.gif">' +
				'<h2>You won!</h2>' +
				'<p>You found all of the monsters. Congrats!</p>' +
				'<p>' +
					'<button data-monster-play-again>Play Again</button>' +
				'</p>';
		};

		/**
		 * Handle click events
		 * @param  {Event} event The event object
		 */
		var clickHandler = function (event) {
			// If a "play again" button was clicked, reset the UI and end the callback function
			
			// @Bug No4 element.hasAttribute use "name" so no need for []
			//	if (event.target.hasAttribute('[data-monster-play-again]')) {
			if (event.target.hasAttribute('data-monster-play-again')) {
				renderMonsters();
				return;
			}


			// Check if clicked element or it's parent has a [data-monster-id] attribute
			// If not, it's not a monster
			// return and stop running our callback function
			
			// @Bug No1 - closest attribute needs to be enclosed in []
			//var monster = event.target.closest('data-monster-id');
			var monster = event.target.closest('[data-monster-id]');
			if (!monster) return;



			// Get the monster's index in the array
			var id = monster.getAttribute('data-monster-id');

			// If the door reveals a sock, render the lost UI
			// Then, end the callback function

			// @Bug No2 - checking condition needs to be == or === and not = asign as it returns true
			// @Bug No3 - we have a sock image and not sokcks not as it returns true
			//if (monsters[id] = 'socks') {
			if (monsters[id] === 'sock') {
				renderLost();
				return;
			}

			// Update the HTML for the button's parent element
			// This will replace the button so that the content can't be clicked again
			// We'll use the id to get the monster from our shuffled array
			monster.parentNode.innerHTML = '<img alt="' + monsters[id] + '" src="' + url + monsters[id] + '.svg">';

			// Increase the number of monsters who have been found by 1
			found++;


			// If the number of monsters found is equal to the total number (-1 for the sock)
			// then all monsters have been found and we can render the win UI
			if (found === (monsters.length - 1)) {
				renderWon();
			}

		};


		//
		// Inits & Event Listeners
		//

		// Render the initial game board
		renderMonsters();

		// Listen for click events
		document.addEventListener('click', clickHandler, false);