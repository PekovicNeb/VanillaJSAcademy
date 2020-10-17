// my code goes here
//
// Classes
//

class Password {
  constructor(pass){
    this.pass=pass;
  }
//Get validation
  get getStatus(){
    return this.checkValidation();
  }

  checkValidation(){
  if(this.pass.length < 6){
      return "Length too short";
    }else {
      return "Validation passed";
    }
  }
}

//
//Variables
//
//NodeList
var passwords = document.querySelectorAll('.password');  
//get NodeList into an array object ti be able to use all array methods
var passArray = Array.prototype.slice.call(passwords);

var toggle = document.querySelector('#show-password');  

//
//Methods
//

var changePasswordType = function(newType){
  passArray.forEach(function(pass, index){
    pass.type=newType;
    console.log(pass.value);
    p = new Password(pass.value);
    console.log(p.getStatus);
});
}

/**
 * Handle click events
 * @param {Event} event The event object
 */
var clickHandler = function(event){
    //console.log(event.target);
    //Only run if show-password checkbox is clicked
    var eventTarget = event.target.getAttribute('id');

    if(eventTarget!="toggle") return;
    //console.log(eventTarget);
    //console.log(event.target.checked);
    if(event.target.checked){
      changePasswordType('text');
      //password.type = 'text';
    } else {
      changePasswordType('password');
      // password.type = 'password';
    }

};

//Event Listeners

//Listen for the clicks in DOM
//event gets passed implicitly
document.addEventListener('click',clickHandler);

