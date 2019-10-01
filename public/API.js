// DECLARING VARIABLES

const baseURL = 'https://images-api.nasa.gov/search'
const searchForm = document.querySelector('form');
const searchTerm = document.getElementById('searchTerm');
const results = document.getElementById('imgResults');
const picOfTheDay = document.getElementById('apotd');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const nav = document.querySelector('nav');

let pageNumber = 1;
let url;

nav.style.display = 'none'




// ADDING EVENT LISTENERS

searchForm.addEventListener('submit', fetchResults);
nextBtn.addEventListener('click', nextPage);
prevBtn.addEventListener('click', previousPage);

// ASTRONOMY PICTURE OF THE DAY FETCH

fetch('https://api.nasa.gov/planetary/apod?api_key=eSaZPbegaRWyVamEoLXoWLSs6yz5utpICQf46e2U ')
    .then(function(data){
        return data.json();
    })
    .then(function(json){
        console.log(json); // LOGS THE JSONIFIED DATA

        picOfTheDay.src = json.url
    })

// FETCH RESULTS FUNCTIONS

function fetchResults(e) {
    e.preventDefault();

    url = baseURL+'?q='+searchTerm.value+'&page='+pageNumber;

    console.log(url) // LOGS THE ENDPOINT URL

    fetch(url)
        .then(function(data){
            return data.json();
        })
        .then(function(json){

            console.log(json); // LOGS THE JSONIFIED DATA

            console.log(json.collection.items[0].links[0].href) // LOGS THE IMG ENPOINT WE'RE TRYING TO REACH
            displayResults(json);

        })         
    }
    

// DISPLAY RESULTS FUNCTION

function displayResults(json) {

    while(imgResults.firstChild){
        imgResults.removeChild(imgResults.firstChild)
    }

    
    for(img in json.collection.items){
        
        let image = document.createElement('img')
        
        image.src = json.collection.items[img].links[0].href;
        
        image.setAttribute('class', 'resultImage');
        
        results.appendChild(image);        
    }
    if(imgResults.firstChild){
        nav.style.display = 'block'
    }
}

// PREVIOUS AND NEXT PAGE FUNTION

function nextPage(e) {
    pageNumber++;
    fetchResults(e)
}

function previousPage(e) {
    if(pageNumber > 1){
        pageNumber--
        fetchResults(e)
    } else {
        return;
    }
    fetchResults(e);
}