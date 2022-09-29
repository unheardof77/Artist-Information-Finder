<<<<<<< HEAD
=======
let formSubmit = document.querySelector(`form`);
//Grabs information from spotify api
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
        .then(response => displayTopAlbumTrackImg(response))
        .catch(err => console.error(err));
};
//Runs after submit event listener, passes searched artist through to API fetch
function searchAllApi(event){
    event.preventDefault();
    let searchedArtist = document.querySelector(`input`).value.trim().replaceAll(` `, `+`);
    $artistName = document.getElementById(`artistName`)
    $artistName.textContent = ""
    $artistName.textContent = searchedArtist.replaceAll(`+`, ` `);
    getArtistInformation(searchedArtist);
};
// takes the info from the spotify api and displays it.
function displayTopAlbumTrackImg(data){
    console.log(data)
    let $artistImg = document.getElementById(`artistImg`);
    let $ulTopTracks = document.getElementById(`bestOf`);
    let $ulTopAlbums = document.getElementById(`listedAlbums`);
    $artistImg.src = `${data.artists.items[0].data.visuals.avatarImage.sources[0].url}`;
    $ulTopTracks.innerHTML = "";
    for(i=0; i < data.tracks.items.length; i++ ){
        let $li = document.createElement(`li`);
        $li.textContent = data.tracks.items[i].data.name;
        $ulTopTracks.appendChild($li);
    };
    $ulTopAlbums.innerHTML = "";
    for(i=0; i < data.albums.items.length; i ++){
        let $albumLi = document.createElement(`li`);
        $albumLi.textContent = data.albums.items[i].data.name;
        $ulTopAlbums.appendChild($albumLi);
    }
};
//Listens for the submit on the input to run searchAllApi function.
formSubmit.addEventListener(`submit`, searchAllApi);
>>>>>>> 52043a88dc76f27ba0d12c22faa0af1e8da81b2a
