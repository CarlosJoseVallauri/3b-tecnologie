"use strict"

let films = [
    // Id, Title, Favorite, Watch date, Rating (0-5)
    [1, "Pulp Fiction", true, "10-03-2024", 5],
    [2, "21 Grammi", true, "17-03-2024", 3],
    [3, "Star Wars", false, "15-03-2024", 1],
    [4, "Matrix", false, "01-01-2023", 4],
    [5, "Shrek", false, "21-03-2024", 2],
    [6, "Kill Bill Vol. 1", true, "22-04-2024", 5],
    [7, "Inception", true, "18-04-2024", 5]
];

const TABLE = document.querySelector("tbody");

loadFilms();

function loadFilms(filmList){
    if(filmList){
        films = filmList;
    }

    TABLE.innerHTML = "";

    films.forEach((film) => {
        const ROW = document.createElement("tr");

        // ID and Title
        for(let i = 0; i < 2; i++){
            ROW.append(createCellFromElement(film[i]));
        }

        // Favorite
        const CHECK = document.createElement("input");
        CHECK.type = "checkbox";
        CHECK.checked = film[2];
        CHECK.disabled = true;
        ROW.append(createCellFromElement(CHECK));

        // Watch date
        ROW.append(createCellFromElement(film[3]));

        // Rating
        ROW.append(createCellFromElement(`${"<i class='bi bi-star-fill'></i>".repeat(film[4]) + "<i class='bi bi-star'></i>".repeat(5 - film[4])}`));

        TABLE.append(ROW);
    });
}

function createCellFromElement(element){
    const CELL = document.createElement("td");
    
    if(typeof(element) === 'string' && element.match("<\/?[a-z][\s\S]*>")){
        CELL.innerHTML += element;
    }
    else{
        CELL.append(element);
    }

    return CELL;
}

function newFilm(){
    const name = prompt("Nuovo film:");

    if(name && films.every(film => film[1] != name)){
        films.push([
            films[films.length - 1] ? films[films.length - 1][0] + 1 : 1,
            name,
            randInt(0, 2) == 1,
            new Date().toLocaleDateString().replaceAll("/", "-"),
            randInt(1, 6)
        ]);
        
        loadFilms();
    }
}

function countFilms(){
    document.getElementById("span-n-films").textContent = films.length;
    new bootstrap.Modal(document.getElementById("modal-count-films")).show();
}

function showLogin(){
    const loginAlert = document.getElementById("alert-login");

    loginAlert.classList.remove("d-none");
    
    setTimeout(() => {
        loginAlert.classList.add("d-none");
    }, 3000);
}

function randInt(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}