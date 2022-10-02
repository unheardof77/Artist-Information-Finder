//On the three lines below we are globally defining some of our variables.
const formSubmit = document.querySelector(`form`);
const bioElement = document.querySelector('#bioInfo');
const relatedElement = document.querySelector('#relatedArtist');
const inputX = document.getElementById(`searchX`);
//Runs after form has been submitted.  It prevents the page from being refreshed and and passes the artist name to the getArtistInformation function.
function searchAllApi(event){
    event.preventDefault();
    searchedArtist = document.getElementById(`search`).value.trim().replaceAll(` `, `+`);
    $artistName = document.getElementById(`artistName`);
    $artistName.textContent = "";
    $artistName.textContent = searchedArtist.replaceAll(`+`, ` `);
    getArtistInformation(searchedArtist);
};
//Runs when user clicks on the 'x' to erase the text in the search bar.
inputX.addEventListener("click", function() {
    document.getElementById(`search`).value = " ";
});
//SaveTopAlbumTrackImg function saves data from its fetch call to local storage.
function saveTopAlbumTrackImg(data){
    let savedTATIData = {
        img: `${data.artists.items[0].data.visuals.avatarImage.sources[0].url}`,
        tracks: [],
        albums: []
    };
    for(i=0; i < data.tracks.items.length; i++ ){
        let tracks = data.tracks.items[i].data.name;
        savedTATIData.tracks.push(tracks);
    };
    for(i=0; i < data.albums.items.length; i ++){
        let albums = data.albums.items[i].data.name;
        savedTATIData.albums.push(albums);
    };
    localStorage.setItem(`savedTATIData`,JSON.stringify(savedTATIData));
    let savedTopData = JSON.parse(localStorage.getItem(`savedTATIData`));
    console.log(savedTopData);
    displayTopAlbumTrackImg(savedTopData);
};
//SaveRelated function takes information from the fetch call and stores it in local storage.
function saveRelated(response){
    console.log(response)
    let artistBio = {
        bio: `${response.artist.bio.summary}`,
        related: []
    };
    for(i = 0 ; i < response.artist.similar.artist.length; i++) {
        let related = response.artist.similar.artist[i]
        artistBio.related.push(related);
    };
    localStorage.setItem(`artistBioInfo`,JSON.stringify(artistBio));
    let savedBioRelatedData = JSON.parse(localStorage.getItem(`artistBioInfo`));
    displayArtistBio(savedBioRelatedData);
};
//Grabs information from spotify api first then runs displayTopAlbumTrackImg.  After that it grabs information from audioScrobbler and runs displayArtistBio.
function getArtistInformation(searchedArtist){
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '2e1c461465msh776fc0b587cf4abp196211jsn661d7c8e28a0',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };
    
    fetch(`https://spotify23.p.rapidapi.com/search/?q=${searchedArtist}&type=multi&offset=0&limit=10&numberOfTopResults=5`, options)
        .then(response => response.json())
        .then(response => saveTopAlbumTrackImg(response))
        .catch(err => console.error(err));

    fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${searchedArtist}&api_key=9195d8a142e3b0b3cc4437139475f607&format=json`)
        .then((response) => response.json())
        .then((response) => saveRelated(response))
        .catch((err) => console.error(err));
};
// takes the info from the spotify api and displays it.
function displayTopAlbumTrackImg(data){
    console.log(data);
    let $artistImg = document.getElementById(`artistImg`);
    let $ulTopTracks = document.getElementById(`bestOf`);
    let $ulTopAlbums = document.getElementById(`listedAlbums`);
    $artistImg.src = `${data.img}`;
    $ulTopTracks.innerHTML = "";
    for(i=0; i < data.tracks.length; i++ ){
        let $li = document.createElement(`li`);
        $li.textContent = data.tracks[i];
        $ulTopTracks.appendChild($li);
    };
    $ulTopAlbums.innerHTML = "";
    for(i=0; i < data.albums.length; i ++){
        let $albumLi = document.createElement(`li`);
        $albumLi.textContent = data.albums[i];
        $ulTopAlbums.appendChild($albumLi);
    };
};
//Takes in data from the audioScrobbler and displays a bio about the artist and displays similar artist.
function displayArtistBio(response) {
    console.log(response);
    const bio = response.bio;
    const relatedArtistArray = response.related;
    const relatedArtist = [];
    relatedArtistArray.forEach((element) => {
        const name = element.name;
        relatedArtist.push(name);
    });
    if (relatedArtist.length > 5) {
        relatedArtist.length = 5;
    };
    bioElement.innerHTML = bio;
    relatedElement.innerHTML = '';
    relatedArtist.forEach((item) => {
        let li = document.createElement('li');
        li.innerText = item;
        relatedElement.appendChild(li);
    });
};
//Listens for the submit on the input to run searchAllApi function.
    formSubmit.addEventListener(`submit`, searchAllApi);
//checks if there is saved data in local storage and if there is then it runs its correlating  function passing it along as a parameter.
if(JSON.parse(localStorage.getItem(`savedTATIData`)) !== null){
    let saved = JSON.parse(localStorage.getItem(`savedTATIData`));
    displayTopAlbumTrackImg(saved);
};
//checks if there is saved data in local storage and if there is then it runs its correlating  function passing it along as a parameter.
if(JSON.parse(localStorage.getItem(`artistBioInfo`)) !== null){
    let savedBioInfo = JSON.parse(localStorage.getItem(`artistBioInfo`));
    displayArtistBio(savedBioInfo);
};