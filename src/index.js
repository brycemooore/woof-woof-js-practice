const URL = 'http://localhost:3000/pups';

document.addEventListener('DOMContentLoaded', () =>{

    fetch(URL)
    .then(res => res.json())
    .then(dogs => dogs.forEach(dog => renderDogSpan(dog)));

    document.getElementById('good-dog-filter').addEventListener('click', filterDogs);
})

function toggleGood(event){
    let dogId = event.target.dataset.id;
    let status = event.target.value == 'true'
    let updatedDog ={
        'isGoodDog': !status
    }
     
    let requestObject = new Object();
    requestObject.method = 'PATCH';
    requestObject.headers = {
        'Content-Type': 'application/json'
    };
    requestObject.body = JSON.stringify(updatedDog);
    fetch(URL + '/' + dogId, requestObject)
    .then(res => res.json())
    .then(dog => {
        if(dog.isGoodDog) {
            event.target.innerText = 'Good Dog!'
            event.target.value = !status
        }
        else {
            event.target.innerText = 'Bad Dog!'
            event.target.value = !status
        }
    })
}

function renderDogInfo(event){
    let dogId = event.target.dataset.id;
    fetch(URL + '/' + dogId)
    .then(res => res.json())
    .then(dog => {
        let infoDiv = document.getElementById('dog-info');
        while (infoDiv.firstChild) {
            infoDiv.removeChild(infoDiv.firstChild);
        }
        let dogImage = document.createElement('img');
        dogImage.src = dog.image;
        let dogName = document.createElement('h2');
        dogName.append(dog.name);
        let dogStatus = document.createElement('button');
        if (dog.isGoodDog) {
            dogStatus.append('Good Dog!')
            dogStatus.value = true;
        }
        else {
            dogStatus.append('Bad Dog!')
            dogStatus.value = false;
        }
        dogStatus.dataset.id = dogId;
        dogStatus.addEventListener('click', toggleGood)
        infoDiv.appendChild(dogImage);
        infoDiv.appendChild(dogName);
        infoDiv.appendChild(dogStatus);
    })
}

function renderDogSpan(dog){
    let dogBar = document.getElementById('dog-bar');
    let dogSpan = document.createElement('span');
    dogSpan.append(dog.name);
    dogSpan.dataset.id = dog.id;
    dogSpan.addEventListener('click', renderDogInfo);
    dogBar.appendChild(dogSpan);
}

function filterDogs(event){
    let filterStatus = event.target.value == 'true';
    filterStatus = !filterStatus;
    event.target.value = filterStatus;
    console.log(filterStatus);
    let dogBar = document.getElementById('dog-bar');
    while (dogBar.firstChild) {
        dogBar.removeChild(dogBar.firstChild);
    }
    let dogs = getDogs();
    if (filterStatus){
        dogs = dogs.then(dogs => {
            return dogs.filter(dog => dog.isGoodDog)
        })
        dogs.then(console.log)
        event.target.innerText = 'Filter good dogs: ON'
    }else event.target.innerText = 'Filter good dogs: OFF'

    dogs.then(dogs => dogs.forEach(renderDogSpan));
}

function getDogs(){
    return fetch(URL)
    .then(res => res.json());
}