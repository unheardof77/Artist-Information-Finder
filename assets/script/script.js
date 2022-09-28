console.log("There is a turkey in my shoes.");
console.log("His name is frankie.");



let formSubmit = document.querySelector(`form`);
//Controls all search functions.
function searchAllApi(event){
    event.preventDefault();
    let searchedArtist = document.querySelector(`input`).value.trim().replaceAll(` `, `+`);
    top10ArtistTracks(searchedArtist);
    relatedArtistData(searchedArtist);
};
//fetches information for top 10 artist
function top10ArtistTracks(searchedArtist){
    fetch(`https://theaudiodb.com/api/v1/json/523532/track-top10.php?s=${searchedArtist}`)
        .then(function(response){
            if(response.ok){
                response.json().then(function(data){
                    displayTop10Tracks(data, searchedArtist);
                })
            }else{
                //We'll have it run a error page.
            };
        })
        .catch(function(error){
            //have it tell them we cannot find the artist they searched for.
        })
};


function displayTop10Tracks(data){
    let $ul = document.getElementById(`bestOf`);
    $ul.innerHTML = "";
    for(i=0; i < data.track.length; i++ ){
        let $li = document.createElement(`li`);
        $li.textContent = data.track[i].strTrack;
        $ul.appendChild($li);
    }
}

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