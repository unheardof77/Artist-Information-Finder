let searchedArtist = document.querySelector(`input`).value.trim().replaceAll(` `, `-`);

function top10ArtistTracks(){
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
    let $ul = document.getElementById(`idOfUl`);
    for(i=0; i < 10; i++ ){
        let $li = document.createElement(`li`);
        $li.textContent = data.track[i].strTrack;
        $ul.appendChild($li);
    }
}