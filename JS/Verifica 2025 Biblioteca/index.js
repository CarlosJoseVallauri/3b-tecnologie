"use strict"

const navbarContent = document.getElementById("navbarContent");
const tbody = document.getElementsByTagName("tbody")[0];

addListeners();
loadBooks("All");

function loadBooks(genre){
    tbody.innerHTML = "";
    let bibliotecaLst = genre !== "All" ? biblioteca.filter(function(book){ return book[4] === genre }) : biblioteca;
    
    bibliotecaLst.forEach(function(book){
        const ROW = document.createElement("tr");

        for(let i = 0; i < 5; i++){
            if(i === 3){
                continue;
            }
            const CELL = document.createElement("td");
            CELL.textContent = book[i];
            ROW.append(CELL); 
        }

        ROW.append(createCellFromString(
            `${"<i class='bi bi-star-fill'></i>".repeat(starCount(book[6])) + 
               "<i class='bi bi-star'></i>".repeat(5 - starCount(book[6]))}`
        ));

        const SEARCH = document.createElement("td");
        const SEARCHICON = document.createElement("i");
        SEARCHICON.classList.add("bi", "bi-search");
        SEARCHICON.addEventListener("click", function(){
            const MODAL = document.getElementById("modal-details");
            const CARD = MODAL.querySelector("div.card.shadow.p-3");
            CARD.innerHTML = "";

            const TITLE = document.createElement("h2");
            TITLE.classList.add("card-title", "text-center", "mb-3");
            TITLE.textContent = book[1];
            CARD.append(TITLE);

            const IMG = document.createElement("img");
            IMG.classList.add("mx-auto", "d-block", "mb-3", "w-50");
            IMG.setAttribute("src", `./img/${book[1].replaceAll("'", "_").replaceAll(" ", "_").toLowerCase()}.jpg`);
            IMG.setAttribute("alt", book[1]);
            CARD.append(IMG);

            const CONTAINER = document.createElement("div");

            for(let i = 0; i < book.length - 1; i++){
                if(i === 1){
                    continue;
                }

                const CARDROW = document.createElement("div");
                CARDROW.classList.add("row", "mb-2");

                const LABEL = document.createElement("div");
                LABEL.classList.add("col-4", "fw-bold", "text-end");
                LABEL.textContent = headers[i];
                CARDROW.append(LABEL);

                const CONTENT = document.createElement("div");
                CONTENT.classList.add("col-8");

                const CONTENTBOX = document.createElement("input");
                CONTENTBOX.value = book[i];
                CONTENTBOX.setAttribute("type", "text");
                CONTENTBOX.setAttribute("readonly", "true");
                CONTENTBOX.classList.add("form-control");

                CONTENT.append(CONTENTBOX);
                CARDROW.append(CONTENT);

                CONTAINER.append(CARDROW);
            }
   
            CARD.append(CONTAINER);

            new bootstrap.Modal(MODAL).show();
        });
        SEARCH.append(SEARCHICON);
        ROW.append(SEARCH);

        const TRASH = document.createElement("td");
        const TRASHICON = document.createElement("i");
        TRASHICON.classList.add("bi", "bi-trash");
        TRASHICON.addEventListener("click", function(){
            biblioteca = biblioteca.filter(function(bk){ return bk !== book; });
            loadBooks("All");
            setActive(document.querySelector("ul.dropdown-menu > li > a.dropdown-item:first-of-type"));
        });
        TRASH.append(TRASHICON);
        ROW.append(TRASH);

        tbody.append(ROW);
    });
}

function addListeners(){
    document.getElementById("btnLogin").addEventListener("click", function(){
        document.getElementById("alert-login").classList.remove("d-none");
    });

    document.querySelector("div.alert > button.btn-close").addEventListener("click", function(){
        document.getElementById("alert-login").classList.add("d-none");
    });

    document.querySelectorAll("ul.dropdown-menu > li > a.dropdown-item").forEach(function(item){
        item.addEventListener("click", function(){
            loadBooks(this.textContent);
            setActive(this);
        });
    });

    const NEWBOOK = document.getElementById("modal-add-newbook");
    const NEWBOOKMODAL = new bootstrap.Modal(NEWBOOK);

    navbarContent.querySelector("ul button:first-of-type").addEventListener("click", function(){
            const NEWBOOK = document.getElementById("modal-add-newbook");
            NEWBOOKMODAL.show();
    });

    NEWBOOK.querySelector("button.btn.btn-success").addEventListener("click", function(){
        const INPUTS = NEWBOOK.querySelectorAll("input[type=text]");
        let book = new Array(7);

        for(let i = 0; i < 7; i++){
            book[i] = INPUTS[i].value;
        }

        biblioteca.push(book);
        loadBooks("All");
        setActive(document.querySelector("ul.dropdown-menu > li > a.dropdown-item:first-of-type"));
        NEWBOOKMODAL.hide();
    });
}

function starCount(val){
    if(val >= 100_000_000){
        return 5;
    }
    if(val >= 60_000_000){
        return 4;
    }
    if(val >= 30_000_000){
        return 3;
    }
    if(val >= 1_000_000){
        return 2;
    }
    return 1;
}

function createCellFromString(str){
    const CELL = document.createElement("td");
    CELL.innerHTML += str;
    return CELL;
}

function setActive(elem){
    document.querySelector("ul.dropdown-menu > li > a.dropdown-item.active").classList.remove("active");
    elem.classList.add("active");
}
