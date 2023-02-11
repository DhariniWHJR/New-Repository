//Variable declaration
let question;
let form;
let res;
let qno;
let score;
//Array of questions taken from dataset.json
const questions =[ 
    {
    
        
        title :"Which of the following is not a type of music notation?",
        options: ["Standard notation", "Tab notation", "Morse code notation", "Graphics notation"],
       answer: "2",
        score: 1
      },
      {
        
        title :"What is the most common time signature in classical music?",
        options: ["3/4", "4/4", "5/4", "6/8"],
       answer: "1",
        score: 1
      },
      {
        
        title:"Which of the following is not a type of instrument in a symphony orchestra?",
        options: ["Violin", "Piano", "Harp", "Theremin"],
       answer: "3",
        score: 1
      },
      {
        
        title :"What is the most common key in pop music?",
        options: ["C Major", "G Major", "D Major", "A Major"],
       answer: "0",
        score: 1
      },
      {
      
        title: "Which of the following is not a type of chord?",
        options: ["Major", "Minor", "Diminished", "Flat"],
       answer: "3",
        score: 1
      },
      {
        
        title :"Which of the following is not a type of music genre?",
        options: ["Jazz", "Blues", "Rock", "Applesauce"],
       answer: "3",
        score: 1
      },
      {
        
        title :"Which of the following is not a type of music theory?",
        options: ["Harmony", "Counterpoint", "Form", "Cooking"],
       answer: "3",
        score: 1
      },
      {
        
        title :"What is the most common tempo marking in classical music?",
        options: ["Allegro", "Andante", "Adagio", "Moderato"],
       answer: "0",
        score: 1
      },
      {
        
        title :"Which of the following is not a type of musical form?",
        options: ["Sonata", "Symphony", "Concerto", "Spaghetti"],
       answer: "3",
        score: 1
      },
      {
        
        title: "Which of the following is not a type of music notation software?",
        options: ["Sibelius", "Finale", "MuseScore", "Microsoft Word"],
        answer: "3",
        score: 1
      }
    ]
 //Function to restart screen when restart is pressed
function restartScreen() {
    //when fn gets called , title gets changed to score obtained
    document.querySelector('.quiz-heading').innerHTML = `Score : ${score}`
    //All questions with correct answers should be displayed in an unordered list format
    const card = document.querySelector('.question-card');
    card.innerHTML = "<ul>";
    questions.forEach((ques) => {
        const html = `
        <li>${ques.title} <div class="answer-label">${ques.options[ques.answer]}</div></li>
        `;
        card.innerHTML += html;
    });
    card.innerHTML += "</ul>";
    document.querySelector('.answer-key').style.display ='block';
    document.querySelector('button').style.display ='block';
}
//function to disable radio buttons after submit button is clicked
function resetradio() {
    document.querySelectorAll('[type="radio"]').forEach((radio) => {
        radio.removeAttribute("disabled");
    });
    res.setAttribute("class","idle");
    res.innerHTML = "Empty";
}
//function to check if the answer(no)given in the array is same as user choice
function evaluate() {
    if(form.op.value == questions[qno].answer) {
        res.setAttribute("class","correct");
        //if answer correct , displays a correct green box
        res.innerHTML = "Correct";
        //score gets added by 1 for every correct answer
        score += questions[qno].score;

    } 
    else {
        //otherwise , display incorrect message with red box
        res.setAttribute("class","incorrect");
        res.innerHTML = "Incorrect";
    }
    document.querySelectorAll('[type="radio"]').forEach((radio) => {
        radio.setAttribute("disabled","");
    })
}
//Function to get next question on clicking submit
function getNextQuestion() {
    qno++;
    ques = questions[qno];
    question.innerHTML = ques.title;
    const labels = document.querySelectorAll('label');
    //runs a for Each with the question number and displays next next question accordingly
    labels.forEach((label, idx) => {
        label.innerHTML = ques.options[idx];
    }); 
}

function handleSubmit(e) {
    e.preventDefault();
    // To display alert box if user has not selected any choice
    if(!form.op.value) {
        alert('Please select an option');
    }
    //Go to Next on clicking button after one q is submitted
    else if(form.submit.classList.contains('submit')) {
        evaluate();
        form.submit.classList.remove('submit');
        form.submit.value = "Next"
        form.submit.classList.add('next');
    }
    // Questions get generated through the loop from 0 till the last question on pressing next
    else if(qno < questions.length - 1 && form.submit.classList.contains('next')) {
        getNextQuestion();
        resetradio();
        form.submit.classList.remove('next');
        form.submit.value = "Submit"
        form.submit.classList.add('submit');
        form.reset();
    }
    //On completion of everything , Restart button , when clicked restarts the screen from beginning
    else if(form.submit.classList.contains('next')) {
        restartScreen();
        form.submit.classList.remove('next');
        form.submit.value = "Submit"
        form.submit.classList.add('submit');
        form.reset();
    }
}
//HTML markdown
function init() {
    document.body.innerHTML = `
        <h1 class="quiz-heading">Music-Quiz</h1>
        <div class="app-body">
            <h1 class="answer-key">Answer Key</h1>
            <div class="question-card">
                <h2 id='question'>Question</h2>
                <form>
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
                </form>
            </div>
            <div class="footer">
            Copyright &copy; Dharini/"Tech-titans"/Quiz-Pop
             </div>
            <button>Restart</button>
        </div>
    `;
    //using declared variables in the top to access DOM elements
   question = document.querySelector('#question');
   form = document.querySelector('form');
   res = document.querySelector('#res');
   qno = -1;
   score = 0;
   form.addEventListener('submit', handleSubmit);
   document.querySelector('button').addEventListener('click', init);
   getNextQuestion();
}
document.querySelector('button').addEventListener('click', init);
init();
