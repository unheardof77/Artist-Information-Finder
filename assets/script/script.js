let searchedArtist = document.querySelector(`input`).value;
const artist = '';

function top10ArtistTracks(){

};

function top10ArtistAlbum(){
    
};

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '08d6ec9a26mshf44c883a36529a8p13ff3ejsn3ee88f8bb6b3',
		'X-RapidAPI-Host': 'genius.p.rapidapi.com'
	}
};

fetch('https://genius.p.rapidapi.com/search?q=' + (searchedArtist), options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));

function relatedArtist(event){
    event.preventDefault();
    if(searchedArtist.val().trim()!==''){
        artist = searchedArtist.val().trim();
        currentArtist(artist);
    }
}
