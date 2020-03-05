
let resultArea = document.getElementById("resultArea");
let chanceArea = document.getElementById("chanceArea");
let chanceLimit = 5;
let chance = chanceLimit;
let randomNumber=Math.ceil(Math.random()*100);
chanceArea.innerHTML=`Chance: ${chance}`;
let win = false;
let history = [];
let message = '';

let record=[];

let gameNumber = 1;
let timeLimit = 20;
let time = timeLimit; // time start from 0
let myTime; // timer will be assign to this variable
function timeCounting() {
    myTime = setInterval(() => {
        time -= 1;
        document.getElementById('timeCount').innerHTML = time;
        youLose();
    }, 1000);    // every 1 second, it will add 1 into time variable (computer use millisecond so 1000 is 1 second)
}

function timeOut() {
    clearInterval(myTime);
}


//input
let userGuess = document.getElementById("userInput");

//button
let guessButton = document.getElementById("guessButton");

let historyArea = document.getElementById("historyArea");

let resetButton = document.getElementById("reset");

let startButton = document.getElementById("startButton");

let recordButton = document.getElementById("recordButton");

let timeArea = document.getElementById('timeCount');

let recordArea = document.getElementById("recordArea");

startButton.addEventListener("click", start);
guessButton.addEventListener("click", guess); //when 'clicked', execute guess()
resetButton.addEventListener("click", reset);
recordButton.addEventListener("click",unhideRecord);

function youLose(){
    if((chance==0) || (time==0)){
        resultArea.innerHTML="You lost!";
        timeOut();
        //guessButton.disabled=true;
        recording();
        showRecord();
    }
}

function start(){
    reset();
    timeCounting();
}

function showMessage(){
    resultArea.innerHTML = `${message}`;
    chanceArea.innerHTML=`Chance: ${chance}`;
    historyArea.innerHTML = history;
    timeArea.innerHTML = time;
}

function reset() {
    chance=chanceLimit;
    history=[];
    message="Click Start to play the games";
    time=timeLimit;
    timeOut();
    win=false;
    randomNumber=Math.ceil(Math.random()*100);
    showMessage();
 };

function recording(){
    entry = {
        history: history,
        time: time,
        win: win
};
    record.push(entry);
}

function showRecord(){
    let para = document.createElement("div");
    para.innerHTML="<str>Game "+gameNumber+"</str><br>"+
    "Entries: "+record[gameNumber-1]["history"]+"<br>"+
    "Time: "+record[gameNumber-1]["time"]+"<br>"+
    "Win: "+record[gameNumber-1]["win"]+"<br>";
    document.getElementById("recordArea").appendChild(para);
    gameNumber++;
}

function unhideRecord(){
    let x = document.getElementById("recordArea");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function guess(){
    userNumber = userGuess.value;
    if((userNumber)>100 || (userNumber<1)){
        return resultArea.innerHTML="Error: only a number between 1 and 100 please!";
    }
    if(history.includes(userNumber)){
        return resultArea.innerHTML="Error: you already chose that number!";
    }
    history.push(userNumber);
    userGuess.value="";
    if((win===false) && (chance>0)){
        if(userNumber == randomNumber){
            message = "yeah correct";
            resultArea.innerHTML = `${message}`;
            win=true;
            timeOut();
            recording();
            showRecord();
        } else if(userNumber > randomNumber){
            chance--;
            message="Too big.... bro";
            //history.push(userNumber);
            showMessage();
            youLose();
        } else if(userNumber<randomNumber) {
            chance--;
            message="Too small.... bro";
            //history.push(userNumber);
            showMessage();
            youLose();
        }   
    }
}
