class Dog{

    constructor(dogObject){
        this.id = dogObject.id;
        this.name = dogObject.name;
        this.image = dogObject.image;
        this.isGoodDog = dogObject.isGoodDog;
    }

    isGoodDogString(){
        if (this.isGoodDog) return "Good Dog!"
        else return "Bad Dog!"
    }
    
    createH2(){
        let h2 = document.createElement('h2');
        h2.innerText = this.name;
        return h2;
    }

    createImg(){
        let img = new Image();
        img.src = this.image;
        return img;
    }

    createSpan(){
        let span = document.createElement('span');
        span.innerText = this.name;
        return span;
    }

    createButton(){
        let button = document.createElement('button');
        button.innerText = this.isGoodDogString();
        return button;
    }
}