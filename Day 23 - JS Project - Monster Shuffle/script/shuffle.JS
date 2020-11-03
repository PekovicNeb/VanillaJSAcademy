//
//Variables
//
var btnMixMonsters = document.querySelector('#MixMonsters');
var app =  document.querySelector('#app');

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

var url='https://gist.githubusercontent.com/cferdinandi/3e6b13f1e501e50ce90e92e1f6241258/raw/0891e58c68be46e5d6a6fc8b513ddc016c9d8ebb/';
//
//Methods
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


//click Handler
var clickHandler = function(event){
    //console.log(event.target.getAttribute('id'));
    //As click handler is on the document elemeent and most evenet bublle to the top 
    //lets get event target id attribute value and pass it to the all function(s) 
    //called in event Handler
    var btnClicked = event.target.getAttribute('id');
    btnShuffleMonsters(btnClicked);
};

var btnShuffleMonsters = function(btnClicked){
    if(btnClicked != btnMixMonsters.getAttribute('id')) return;
    ShowMonsters();
};


var ShowMonsters = function(){
    var html = '<div class="row">';
    html += shuffle(monsters).map(function(monster){
        var img = '<div class = "grid"><img src ="' + url + monster + '.svg" /></div>';
        return img;
    }).join('') + "</div>";
    //console.log(html);
    app.innerHTML = html;
};


ShowMonsters();

//
//Event Listeners
//
document.addEventListener('click',clickHandler);
