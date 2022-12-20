
var startBtn = document.querySelector(".start-btn")
var infoBox = document.querySelector(".info-box")
var exitBtn = document.querySelector(".buttons .quit")
var continueBtn = document.querySelector(".buttons .restart")
var quizBox = document.querySelector(".quiz-box")
var resultBox = document.querySelector("result-box")
var answerText = document.querySelector("answer-text")
var timeLine = document.querySelector("header .time-line")
var timeText = document.querySelector(".timer .time-left-txt")
var timeCount = document.querySelector(".timer .timer-sec")

startBtn.onclick = () =>{
    infoBox.classList.add("activeInfo");
}

exitBtn.onclick = () =>{
    infoBox.classList.remove("activeInfo");
}

continueBtn.onclick = () =>{
    infoBox.classList.remove("activeInfo");
    quizBox.classList.add("activeQuiz");
    showQuestions(0);
    queCounter(1);
    startTimer(10);
    startTimerLine(0);
}

var timeValue = 10;
var questionCount = 0;
var questionNumber = 1;
var userScore = 0;
var counter;
var counterLine;
var widthValue = 0;

var restartQuiz = resultBox.querySelector(".buttons .restart");
var quitQuiz = resultBox.querySelector(".buttons .quit");

restartQuiz.onclick = () =>{
    quizBox.classList.add("activeQuiz");
    resultBox.classList.remove("activeResult");
    timeValue = 15;
    questionCount = 0;
    questionNumber = 1;
    userScore = 0;
    widthValue = 0;
    showQuestions(questionCount);
    questionCount(questionNumber);
    clearInterval(counter);
    clearInterval(counterLine);
    startTimer(timeValue);
    startTimerLine(widthValue);
    timeText.textContent = "Time Left";
    nextBtn.classList.remove("show");
}