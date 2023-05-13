
var questions = [
    {
    numb: 1,
    question: "Which of the following is not a primitive data type in JavaScript?",
    correct: "Array",
    options: [
    "ider",
    "String",
    "Boolean",
    "Array"
    ]
    },
    {
        numb: 2,
    question: "What is the difference between == and === operators in JavaScript?",
    correct: "=== compares both value and data type while == compares only values",
    options: [
    "=== compares only values while == compares both value and data type",
    "=== compares both value and data type while == compares only values",
    "=== compares both values and memory location while == compares only values",
    "=== compares both values and memory location while == compares both values and data type"
    ]
    },
    {
        numb: 3,
    question: "What is the output of the following code: console.log(typeof null);",
    correct: "object",
    options: [
    "null",
    "undefined",
    "object",
    "string"
    ]
    },
    {
        numb: 4,
    question: "Which of the following is not a loop structure in JavaScript?",
    correct: "repeat...until",
    options: [
    "for",
    "while",
    "do...while",
    "repeat...until"
    ]
    },
    {
        numb: 5,
    question: "What is the purpose of the 'use strict' directive in JavaScript?",
    correct: "To enforce stricter parsing and error handling of JavaScript code",
    options: [
    "To enable new language features in JavaScript",
    "To disable strict mode in JavaScript",
    "To allow all global variables to be accessed",
    "To enforce stricter parsing and error handling of JavaScript code"
    ]
    },
    {
        numb: 6,
    question: "What is the output of the following code: console.log(parseInt('10px'))?",
    correct: "10",
    options: [
    "10px",
    "undefined",
    "NaN",
    "10"
    ]
    },
    {
        numb: 7,
    question: "What is the purpose of the JavaScript function 'apply()'?",
    correct: "To call a function with a given 'this' value and arguments provided as an array",
    options: [
    "To convert a string to a ider",
    "To reverse the order of an array",
    "To add a new element to the end of an array",
    "To call a function with a given 'this' value and arguments provided as an array"
    ]
    },
    {
        numb: 8,
    question: "What is the output of the following code: console.log(3 + 2 + '7')?",
    correct: "57",
    options: [
    "12",
    "327",
    "57",
    "NaN"
    ]
    },
    {
        numb: 9,
    question: "What is the difference between 'let' and 'var' in JavaScript?",
    correct: "'let' has block scope while 'var' has function scope",
    options: [
    "'let' has function scope while 'var' has block scope",
    "'let' has block scope while 'var' has function scope",
    "There is no difference between 'let' and 'var'",
    "'let' can only be used for global variables while 'var' can be used for local variables"
    ]
    },
    {
        numb: 10,
        question: "Which function is used to convert an object into a JSON string in JavaScript?",
        correct: "stringify()",
        options: [
            "serialize()",
            "parse()",
            "stringify()",
            "convert()"
        ]
    },
]

var startBtn = document.querySelector(".start-btn button");
var infoBox = document.querySelector(".info-box");
var exitBtn = document.querySelector(".buttons .quit");
var continueBtn = document.querySelector(".buttons .restart");
var quizBox = document.querySelector(".quiz-box");
var resultBox = document.querySelector(".result-box");
var optionList = document.querySelector(".option-list");
var timeLine = document.querySelector("header .time-line");
var timeText = document.querySelector(".timer .time-left-txt");
var timeCount = document.querySelector(".timer .timer-sec");

// function to show info / rules box when the "start quiz" button is clicked
startBtn.onclick = () =>{
    infoBox.classList.add("activeInfo");
}

// function to remove the info / rules box when the "exit quiz" button is clicked

exitBtn.onclick = () =>{
    infoBox.classList.remove("activeInfo");
}

// function to remove the info / rules box and display the quiz box when "continue button" is clicked

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

quitQuiz.onclick = () =>{
    window.location.reload();
}

var nextBtn = document.querySelector("footer .next-btn");
var bottomQuestionCounter = document.querySelector("footer .total-que");

nextBtn.onclick = () =>{
    if(questionCount < questions.length - 1){
        questionCount++;
        questionNumber++;
        showQuestions(questionCount);
        queCounter(questionNumber);
        clearInterval(counter);
        clearInterval(counterLine);
        startTimer(timeValue);
        startTimerLine(widthValue);
        timeText.textContent = "Time Left";
        nextBtn.classList.remove("show");
    }else{
        clearInterval(counter);
        clearInterval(counterLine);
        showResult();
    }
}

function showQuestions(index){
    var queText = document.querySelector(".que-text");

    var queTag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    var optionTag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>' 
    + '<div class="option"><span>'+ questions[index].options[1] + '</span></div>' 
    + '<div class="option"><span>'+ questions[index].options[2] + '</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] + '</span></div>';
    queText.innerHTML = queTag;
    optionList.innerHTML = optionTag;

    var option = optionList.querySelectorAll(".option")

    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

var tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
var crossIconTag = '<div class="icon tick"><i class="fas fa-times"></i></div>';


function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    var userAns = answer.textContent;
    var correcAns = questions[questionCount].answer;
    var allOptions = optionList.children.length;

// Checks if the user selected answer matches the correct answer - if matches, increase score by 1, add green tick icon and green styling to user answer. If user selected answer does not match the correct answer, it adds red styling and an x icon to user answer. Once user has selected an option, no other options are selectable. If time runs out, the correct answer is shown, but no points are awarded and user does not get credit for answering.

    if(userAns == correcAns){
        userScore += 1;
        answer.classList.add("Correct");
        answer.insertAdjacentHTML("beforeend", tickIconTag);
        console.log("Correct Answer")
        console.log("Your Correct Answers = " + userScore);
    }else{
        answer.classList.add("Incorrect");
        answer.insertAdjacentHTML("beforeend", crossIconTag);
        console.log("Incorrect");
        
        for(i=0; i < allOptions; i++){
            if(optionList.children[i].textContent == correcAns){
                optionList.children[i].setAttribute("class", "option correct");
                optionList.children[i].insertAdjacentHTML("beforeend", tickIconTag);
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        optionList.children[i].classList.add("disabled");
    }

    // shows next button if user selects an answer

    nextBtn.classList.add("show");
}

function showResult(){
    infoBox.classList.remove("activeInfo");
    quizBox.classList.remove("activeQuiz");
    resultBox.classList.add("activeResult");
    var scoreText = resultBox.querySelector(".score-text");
    if(userScore > 8){
        var scoreTag = '<span>Incredible! ,You got <p>'+ userScore +'</p> out of <p>' + questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }else if(userScore > 5){
        var scoreTag = '<span>Nice! ,You got <p>'+ userScore +'</p> out of <p>' + questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }else{
        var scoreTag = '<span>Better luck next time! ,You got <p>'+ userScore +'</p> out of <p>' + questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 9){
            var addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if(time < 0){
            clearInterval(counter);
            timeText.textContent = "Time Off";
            var allOptions = optionList.children.length;
            var correcAns = questions[questionCount].answer;
            for(i=0; i < allOptions; i++){
                if(optionList.children[i].textContent == correcAns){
                    optionList.children[i].setAttribute("class", "option correct");
                    optionList.children[i].insertAdjacentHTML("beforeend", tickIconTag);
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                optionList.children[i].classList.add("disabled");
            }
            nextBtn.classList.add("show");
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1;
        timeLine.style.width = time + "px";
        if(time > 549){
            clearInterval(counterLine);
        }
    }
}

function queCounter(index){
    var totalQueCounTag = '<span><p>'+ index +'</p> of <p>' + questions.length + '</p> Questions</span>';
    bottomQuestionCounter.innerHTML = totalQueCounTag;
}