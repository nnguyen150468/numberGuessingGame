
let resultArea = document.getElementById("resultArea");
let chanceArea = document.getElementById("chanceArea");
let chanceLimit = 5;
let chance = chanceLimit;
let randomNumber=Math.ceil(Math.random()*100);
chanceArea.innerHTML=`Chance: ${chance}`;
let win = false;
let history = [];
let message = '';

let time = 10; // time start from 0
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

startButton.addEventListener("click", timeCounting);

function youLose(){
    if((chance==0) || (time==0)){
        resultArea.innerHTML="You lost!";
        timeOut();
        guessButton.disabled=true;

    }
}

guessButton.addEventListener("click", guess); //when 'clicked', execute guess()

function showMessage(){
    resultArea.innerHTML = `${message}`;
    chanceArea.innerHTML=`Chance: ${chance}`;
    historyArea.innerHTML = history;
}

resetButton.addEventListener("click", reset);

function reset() {
    chance=chanceLimit;
    history=[];
    message="";
    timeOut();
    showMessage();
 };

function guess(){
    userNumber = userGuess.value;
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
        } else if(userNumber > randomNumber){
            chance--;
            message="Too big.... bro";
            history.push(userNumber);
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
