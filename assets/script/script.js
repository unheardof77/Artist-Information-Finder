let formSubmit = document.querySelector(`form`);
//Controls all search functions.
function searchAllApi(event){
    event.preventDefault();
    let searchedArtist = document.querySelector(`input`).value.trim().replaceAll(` `, `-`);
    top10ArtistTracks(searchedArtist);
};
//fetches information for top 10 artist
function top10ArtistTracks(searchedArtist){
    fetch(`https://theaudiodb.com/api/v1/json/523532/track-top10.php?s=${searchedArtist}`)
        .then(function(response){
            if(response.ok){
                response.json().then(function(data){
                    displayTop10Tracks(data);
                    return
                })
            }else{
                //We'll have it run a error page.
            };
        })
        .catch(function(error){
            //have it tell them we cannot find the artist they searched for.
        })
};
//Displays the information gathered from top10ArtistTracks.
function displayTop10Tracks(data){
    let $ul = document.getElementById(`bestOf`);
    for(i=0; i < 10; i++ ){
        let $li = document.createElement(`li`);
        $li.textContent = data.track[i].strTrack;
        $ul.appendChild($li);
    }
};

formSubmit.addEventListener(`submit`, searchAllApi);