const questions = [
    {
        question:"Which keyword is use to find the length of array in javaScript ?",
        options:["length", "size", "len", "total"],
        answer:"length",
        id:1
    },
    {
        question:"Which of them language is supported by browser ?",
        options:["python", "javascript", "java", "c++"],
        answer:"javascript",
        id:2
    },
    {
        question:"What is the ASCII value of 'A' ?",
        options:["96", "85", "80", "65"],
        answer:"65",
        id:3
    },
];

const questionTxt = document.querySelector("#questionTxt");
const labels = document.querySelectorAll(".labels")
const radioInput = document.querySelectorAll(".inputRadios");
const btn = document.querySelector("#btn");
const questionBox = document.querySelector(".questionBox");
const summary = document.querySelector(".summary");
const summaryBox = document.querySelector(".summaryBox");
const scoreText = document.querySelector("#score");
const restartBtn = document.getElementById("restartBtn");
let counter = 0;
let allAnswers = [];

const startGame = (data) => {
    questionTxt.textContent = data[counter].question;
    let options = data[counter].options;
    labels.forEach((item, i)=>{
        item.textContent = options[i];
        radioInput[i].setAttribute("value", options[i]);
        radioInput[i].checked = false;
        radioInput[i].setAttribute("qId", data[counter].id);
    });
    counter++;
}

btn.addEventListener("click", ()=>{
    let checkedValue = document.querySelector("input[type='radio'][name='option']:checked");
    if(!checkedValue){
        alert("Please select an answer!!");
        return;
    }
    let qId = checkedValue.getAttribute("qId");
    allAnswers.push({
        userAns : checkedValue.value,
        rightAns : questions.find(({id}) => id == qId).answer,
        question : questions.find(({id}) => id == qId).question,
    });
    if(counter === questions.length - 1){
        btn.textContent = "Show Results";
    }
    if(counter < questions.length){
        startGame(questions);
    }else{
        showSummary(allAnswers);
    }
});

const showSummary = (answers) => {
    let score = 0;
    questionBox.style.display = "none";
    answers.forEach((item, i)=>{
        let element = document.createElement("div");
        let str = `<p class="ques">${item.question}</p>
            <p class="ans">Your : ${item.userAns}</p>
            <p class="ans">Right : ${item.rightAns}</p>`;
        element.classList.add("result");
        element.innerHTML = str;
        if(item.userAns == item.rightAns){
            score++;
            element.classList.add("right");
        }else{
            element.classList.add("wrong");
        }
        summary.append(element);
    });
    summaryBox.style.display = "initial";
    scoreText.textContent = `Your score is ${score}`;
}

restartBtn.addEventListener("click", ()=>{
    allAnswers = [];
    counter = 0;
    summary.innerHTML = "";
    summaryBox.style.display = "none";
    questionBox.style.display = "flex";
    btn.textContent = "Next Question";
    startGame(questions);

})

const playGame = ()=> {
    startGame(questions);
}