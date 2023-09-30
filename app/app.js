const gameScreen = document.getElementById("game-screen")
const startScreen = document.getElementById("start-screen")

const petTitle = document.getElementById("pet-title")

// input elements for the form
const petNameForm = document.getElementById("petNameForm");
const petNameInput = document.getElementById("petNameInput");




// create class for creating tamagotchi objects
class Cat {
    constructor(name) {
        this.hunger = 0;
        this.sleepiness = 0;
        this.boredom = 0;
        this.age = 0;
        this.name=name
    }

}

petNameForm.addEventListener("submit", (e)=>{
    e.preventDefault();

    var newCat = new Cat(petNameInput.value)
    petTitle.innerHTML = newCat.name
    gameScreen.style.display= "flex"
    startScreen.style.display= "none"
    

})







// making the class right here