const URL = 'http://localhost:3000/pups';

document.addEventListener('DOMContentLoaded', () =>{

    fetch(URL)
    .then(res => res.json())
    .then(dogs => dogs.forEach(dog => renderDogSpan(dog)));
})

function renderDogInfo(dog){
    console.log(dog);
    let infoDiv = document.getElementById('dog-info');
    let dogImage = document.createElement('img');
    dogImage.src = dog.image;
    let dogName = document.createElement('h2');
    dogName.append(dog.name);
    let dogStatus = document.createElement('button');
    if (dog.isGoodDog) dogStatus.append('Good Dog!')
    else dogStatus.append('Bad Dog!')
    infoDiv.appendChild(dogImage);
    infoDiv.appendChild(dogName);
    infoDiv.appendChild(dogStatus);
}

function renderDogSpan(dog){
    let dogBar = document.getElementById('dog-bar');
    let dogSpan = document.createElement('span');
    dogSpan.append(dog.name);
    dogSpan.addEventListener('click', renderDogInfo(dog));
    dogBar.appendChild(dogSpan);
}