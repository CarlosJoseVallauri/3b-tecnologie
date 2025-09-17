"use strict"

const CONTENT = document.getElementById("content");
const GENRES = document.querySelectorAll(".dropdown-menu li");
for (let GENRE of GENRES) {
	GENRE.addEventListener("click", () => { loadSongs(GENRE.textContent); })
}

const iFriends = document.getElementById("i-friends");
iFriends.addEventListener("click", () => {
	alertFriends.classList.remove("d-none");

	setTimeout(() => {
		alertFriends.classList.add("d-none");
	}, 3000);
});
const alertFriends = document.getElementById("alert-friends");

const iSearch = document.getElementById("i-search");
iSearch.addEventListener("click", () => {
	txtSearch.classList.toggle("d-none");
});
const txtSearch = document.getElementById("txt-search");

loadSongs();

function loadSongs(genre){
	CONTENT.innerHTML = "";
	let songList = songs;

	if(genre && genre !== "All"){
		songList = songs.filter(song => song[5] === genre);
	}

	const numTitle = document.createElement("h3");
	numTitle.textContent = `Numero di canzoni: ${songList.length}`;
	CONTENT.append(numTitle);

	for(const song of songList){
		// Main row container
		const CONTAINER = document.createElement("div");
		CONTAINER.classList.add("row", "border", "rounded", "p-3", "m-2");

		// Layout handler
		const LAYOUT = document.createElement("div");
		LAYOUT.classList.add("col-md-4", "col-xl-3");
		CONTAINER.append(LAYOUT);

		// Cover art
		const IMG = document.createElement("img");
		IMG.src = `./img/cover${song[0]}.jpg`;
		IMG.classList.add("w-100", "rounded");
		LAYOUT.append(IMG);

		// Track info
		const INFO = document.createElement("div");
		INFO.classList.add("col-md-8", "col-xl-9");

		// Track title
		const TITLE = document.createElement("h2");
		TITLE.textContent = `${song[0]} - ${song[1]}`;
		INFO.append(TITLE);

		// Track artist
		const ARTIST = document.createElement("h5");
		ARTIST.textContent = `Artista: ${song[2]}`;
		INFO.append(ARTIST);

		// Track album
		const ALBUM = document.createElement("h5");
		ALBUM.textContent = `Album: ${song[3]}`;
		INFO.append(ALBUM);

		// Track length
		const DURATION = document.createElement("h5");
		DURATION.textContent = `Duration: ${parseInt(song[4] / 60)}m ${song[4] % 60}s`;
		INFO.append(DURATION);

		// Streams number
		const STREAMS = document.createElement("h5");
		STREAMS.textContent = `Streams: ${song[6]}`;
		INFO.append(STREAMS);

		// Play button
		const PLAY = document.createElement("button");
		PLAY.textContent = "Play";
		PLAY.classList.add("btn", "btn-secondary");
		PLAY.addEventListener("click", () => {
			new bootstrap.Modal("#play-modal").show();
		});
		INFO.append(PLAY);

		CONTAINER.append(INFO);

		CONTENT.append(CONTAINER);
	}
}





