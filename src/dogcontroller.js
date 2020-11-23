class DogController{

    static async initial(){
        let dogArray = await DogController.getDogs(); 
        // debugger;
        console.log(dogArray);
        DogController.fillDogBar(dogArray);
        console.log('hi');
    }

    static async getDogs(){
        let returnArray = [];
        await Adapter.getObjects().then(dogs => dogs.forEach(dog => {
            returnArray.push(new Dog(dog));
        }))
        return returnArray;
    }

    static fillDogBar(dogArray){
        let barDiv = document.getElementById('dog-bar');
        dogArray.forEach(dog => {
            console.log(dog);
            barDiv.append(dog.createSpan());
        })
    }
}