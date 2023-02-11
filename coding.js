let question1;
let form1;
let res1;
let qno1;
let score1;

const questions1 =[ 
    {
    
        
       title: "What is the correct syntax for an if statement in Python?",
      options: ["if (condition):", "if condition", "if: condition", "if condition:"],
      answer: "3",
       
    },
    {
       
      title: "Which of the following is not a data type in JavaScript?",
      options: ["String", "Number", "Boolean", "ArrayList"],
      answer: "3",
       
    },
    {
       
      title: "Which of the following is used to declare a variable in Java?",
      options: ["var", "let", "const", "int"],
      answer: "3",
       
    },
    {
       
      title: "What is the correct syntax for a for loop in C#?",
      options: ["for i = 0 to 10", "for (i = 0; i <= 10; i++)", "for (int i = 0; i <= 10)", "for i in range(0, 10)"],
      answer: "1",
      
    },
    {
       
      title: "Which of the following is not a looping structure in PHP?",
      options: ["while", "for", "do-while", "foreach"],
      answer: "3",
       
    },
    {
       
      title: "Which of the following is not a valid operator in C++?",
      options: ["+", "-", "*", "$"],
      answer: "3",
       
    },
    {
       
      title: "In which programming language is 'print' used for displaying output?",
      options: ["Python", "JavaScript", "Java", "C++"],
      answer: "0",
      
    },
    {
       
      title: "What is the correct syntax for a function in Ruby?",
      options: ["function name()", "def name", "function name", "def name()"],
      answer: "1",
       
    },
    {
       
      title: "Which of the following is not a type of variable in Swift?",
      options: ["Int", "String", "Double", "Object"],
      answer: "3",
       
    },
    {
       
      title: "In which programming language is '#' used for commenting?",
      options: ["Python", "JavaScript", "Java", "C++"],
      answer: "3",
       
    }
]
 
function restartScreen() {
    document.querySelector('.quiz-heading').innerHTML = `Score : ${score}`
    const card = document.querySelector('.question-card');
    card.innerHTML = "<ul>";
    questions1.forEach((ques) => {
        const html = `
        <li>${ques.title} <div class="answer-label">${ques.options[ques.answer]}</div></li>
        `;
        card.innerHTML += html;
    });
    card.innerHTML += "</ul>";
    document.querySelector('.answer-key').style.display ='block';
    document.querySelector('button').style.display ='block';
}

function resetradio() {
    document.querySelectorAll('[type="radio"]').forEach((radio) => {
        radio.removeAttribute("disabled");
    });
    res.setAttribute("class","idle");
    res.innerHTML = "Empty";
}

function evaluate() {
    if(form1.op.value == questions[qno].answer) {
        res.setAttribute("class","correct");
        res.innerHTML = "Correct";
        score += questions[qno].score;

    } 
    else {
        res.setAttribute("class","incorrect");
        res.innerHTML = "Incorrect";
    }
    document.querySelectorAll('[type="radio"]').forEach((radio) => {
        radio.setAttribute("disabled","");
    })
}

function getNextQuestion() {
    qno++;
    ques = questions[qno];
    question.innerHTML = ques.title;
    const labels = document.querySelectorAll('label');
    labels.forEach((label, idx) => {
        label.innerHTML = ques.options[idx];
    }); 
}

function handleSubmit(e) {
    e.preventDefault();
    if(!form1.op.value) {
        alert('Please select an option');
    }
    else if(form1.submit.classList.contains('submit')) {
        evaluate();
        form1.submit.classList.remove('submit');
        form1.submit.value = "Next"
        form1.submit.classList.add('next');
    }
    else if(qno < questions1.length - 1 && form1.submit.classList.contains('next')) {
        getNextQuestion();
        resetradio();
        form1.submit.classList.remove('next');
        form1.submit.value = "Submit"
        form1.submit.classList.add('submit');
        form1.reset();
    }
    else if(form1.submit.classList.contains('next')) {
        restartScreen();
        form1.submit.classList.remove('next');
        form1.submit.value = "Submit"
        form1.submit.classList.add('submit');
        form1.reset();
    }
}
function init() {
    document.body.innerHTML = `
        <h1 class="quiz-heading">Coding-Quiz</h1>
        <div class="app-body">
            <h1 class="answer-key">Answer Key</h1>
            <div class="question-card">
                <h2 id='question'>Question</h2>
                <form1>
                    <input type="radio" id="op1" name="op" value="0">
                    <label for="op1">op1</label><br>
                    <input type="radio" id="op2" name="op" value="1">
                    <label for="op2">op2</label><br>
                    <input type="radio" id="op3" name="op" value="2">
                    <label for="op3">op3</label><br>
                    <input type="radio" id="op4" name="op" value="3">
                    <label for="op4">op4</label><br>
                    <div id = "res" class="idle">Empty</div><br>
                    <input type="submit" name="submit" value = 'Submit' class = "submit"/>
                </form1>
            </div>
            <button>Restart</button>
        </div>
    `;
   question1 = document.querySelector('#question1');
   form1 = document.querySelector('form1');
   res1 = document.querySelector('#res1');
   qno1 = -1;
   score1 = 0;
   form1.addEventListener('submit', handleSubmit);
   document.querySelector('button').addEventListener('click', init);
   getNextQuestion();
}
document.querySelector('button').addEventListener('click', init);
init();
