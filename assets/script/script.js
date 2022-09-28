let searchedArtist = document.querySelector(`search`).value;
replaceAll(` `, `-`);

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

function top10ArtistAlbum(){
    
};

function displayTop10Tracks(data){
    let $ul = document.getElementById(`bestof`);
    for(i=0; i < 10; i++ ){
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

fetch('https://genius.p.rapidapi.com/search?q=' + (searchedArtist), options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
