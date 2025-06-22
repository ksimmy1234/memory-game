let btn = document.querySelector("button");
let gameseq=[];
let userseq = [];
let highScore = 0;

let btns = ["red","green","yellow","blue"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress",function(){
    if(started == false){
        console.log("game started");
        started = true;

        Levelup();
    }
});

document.getElementById("start-btn").addEventListener("click", function () {
    if (!started) {
        started = true;
        Levelup();
    }
});

function Levelup(){
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;  //It will change the value of h2 innertext to new level and will print that
    
    let randomIndex = Math.floor(Math.random()*3);
    let randColour = btns[randomIndex];
    let randBtn = document.querySelector(`.${randColour}`);
    // console.log(randColour);
    // console.log(randBtn);
    gameseq.push(randColour);
    console.log(gameseq);
    gameflash(randBtn);
}

function gameflash(btn){
    btn.classList.add("gameflash");
    setTimeout(function(){
        btn.classList.remove("gameflash");
    },250);
}

function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },500);
}

function btnPress(){
    let btn = this;
    userflash(btn);

    userColor = btn.getAttribute("id");
    userseq.push(userColor);

    checkAns(userseq.length-1);
}

function checkAns(idx) {
    if(userseq[idx] == gameseq[idx]){
        if(userseq.length == gameseq.length){
            setTimeout(Levelup,1000);
        }
    }
    else{
        if(level > highScore){
            highScore = level;
        }
        h2.innerHTML = `Game Over! Your score was <b>${level}\u{1F389}</b> <br> Highest Score: <b>${highScore}</b> . Press any key to start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "#333";
        },150)
        reset();
    }

}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}

