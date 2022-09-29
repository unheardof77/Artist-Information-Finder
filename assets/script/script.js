let formSubmit = document.querySelector(`form`);
//Controls all search functions.
function searchAllApi(event){
    event.preventDefault();
    let searchedArtist = document.querySelector(`input`).value.trim().replaceAll(` `, `+`);
    $artistName = document.getElementById(`artistName`)
    $artistName.textContent = ""
    $artistName.textContent = searchedArtist.replaceAll(`+`, ` `);
    top10ArtistTracks(searchedArtist);
    relatedArtistData(searchedArtist);
    getArtistInformation(searchedArtist);
};


//fetches information for top 10 artist
function top10ArtistTracks(searchedArtist){
    fetch(`https://theaudiodb.com/api/v1/json/523532/track-top10.php?s=${searchedArtist}`)
    .then(function(response){
        if(response.ok){
            response.json().then(function(data){
                displayTop10Tracks(data);
            })
        }else{
            //We'll have it run a error page.
        };
    })
    .catch(function(error){
        //have it tell them we cannot find the artist they searched for.
    })
};
//displays the data for top tracks
function displayTop10Tracks(data){
    let $ul = document.getElementById(`bestOf`);
    $ul.innerHTML = "";
    for(i=0; i < data.track.length; i++ ){
        let $li = document.createElement(`li`);
        $li.textContent = data.track[i].strTrack;
        $ul.appendChild($li);
    }
}

//Gets artist information from audio db
function getArtistInformation(searchedArtist){
    fetch(`https://theaudiodb.com/api/v1/json/523532/search.php?s=${searchedArtist}`)
    .then(function(response){
        if(response.ok){
            response.json().then(function(data){
                displayArtistBio(data);
                displayArtistImg(data);
            })
        };
    })
    .catch(function(error){
        //have it tell them we cannot find the artist they searched for.
    })
};
//Displays Artist information from audio db
function displayArtistBio(data){
    console.log(data)
    let $artistAbout = document.getElementById(`artistAbout`);
    let $artistBirthday = document.getElementById(`artistBirthday`);
    let $artistLivingStatus = document.getElementById(`artistLivingStatus`);
    $artistAbout.textContent = "";
    $artistBirthday.textContent = "";
    $artistAbout.textContent = `${data.artists[0].strBiographyEN}`;
    $artistBirthday.textContent = `${data.artists[0].intBornYear}`;
    $artistLivingStatus.textContent = "";
    if(data.artists[0].intDiedYear == null){
        $artistLivingStatus.textContent = `Still alive and kicking.`;
    }else{
        $artistLivingStatus.textContent = `Sadly passed away in the year ${data.artists[0].intDiedYear}.`;
    };
};
//Displays an image from the audio DB
function displayArtistImg(data){
    let $artistImg = document.getElementById(`artistImg`);
    $artistImg.src = `${data.artists[0].strArtistFanart}`
};


const options = {
    method: 'GET',
	headers: {
        'X-RapidAPI-Key':'08d6ec9a26mshf44c883a36529a8p13ff3ejsn3ee88f8bb6b3',
		'X-RapidAPI-Host': 'genius.p.rapidapi.com'
	}
};


function relatedArtistData(searchedArtist) {
    fetch(`https://genius.p.rapidapi.com/search?q=${searchedArtist}${options}`)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err))
};

formSubmit.addEventListener(`submit`, searchAllApi);
