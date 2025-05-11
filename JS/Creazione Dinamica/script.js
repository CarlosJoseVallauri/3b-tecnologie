"use strict";

const wrapper = document.getElementById("wrapper");

for(let i = 0; i < 10; i++){
    for(let j = 0; j < 10; j++){
        const btn = document.createElement("button");
        btn.classList.add("btnStyle");

        btn.addEventListener("click", function(){
            const back = this.style.backgroundColor;
            this.style.backgroundColor = back == "rgb(200, 200, 200)" || back == "" || back == "green" ? "red" : "rgb(200, 200, 200)";
            this.innerText = this.innerText == "" ? `${i} - ${j}` : "";
        });
        if(i == j || i + j == 9 || i == 0 || j == 0 || i == 9 || j == 9){
            btn.style.borderColor = "blue";
            btn.click();
        }
        wrapper.appendChild(btn);
    }
    wrapper.appendChild(document.createElement("br"));
}

document.querySelectorAll("button").forEach(btn => btn.addEventListener("click", function(){
    this.nextElementSibling.style.backgroundColor = "green";
    this.nextElementSibling.innerText = "";
}));