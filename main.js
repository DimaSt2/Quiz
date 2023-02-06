const option1 = document.querySelector('.option1'),
      option2 = document.querySelector('.option2'),
      option3 = document.querySelector('.option3'),
      option4 = document.querySelector('.option4');

const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question');

const numberOfQuestion = document.getElementById('number-of-question'),
      numberOfAllQuestion = document.getElementById('number-of-all-questions');  

let indexOfQuestion,
    indexOfPage = 0;

const answersTracker = document.getElementById('answers-tracker');  

const btnNext = document.getElementById('btn-next');  

let score = 0;

const correctAnswer = document.getElementById('correct-answer'),
      numberOfAllQuestion2 = document.getElementById('number-of-all-questions-2'),
      btnTryAgain = document.getElementById('btn-try-again');

const questions = [
    {
        question: 'Что вернет метод prompt, если пользователь отменит ввод нажатием Esc?',
        options: [
            'undefined',
            '{} (пустой объект)',
            '[] (пустой массив)',
            'null'
        ],
        rightAnswer: 3
    },
    {
        question: 'Какое значение атрибута type указывается для поля-галочки в форме?',
        options: [
            'id',
            'checkbox',
            'radio',
            'name'
        ],
        rightAnswer: 1
    },
    {
        question: 'Какое правило позволяет загрузить шрифт для отображения текста?',
        options: [
            '@font-face',
            '@font',
            '@font-display',
            '@mixin'
        ],
        rightAnswer: 0
    }
];

numberOfAllQuestion.innerHTML = questions.length;

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question;

    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1; 
    indexOfPage++;
};

let completeAnswers = [];

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false;

    if(indexOfPage == questions.length) {
        quizOver()
    } else {
        if(completeAnswers.length > 0) {
            completeAnswers.forEach(item => {
                if(item == randomNumber) {
                    hitDuplicate = true;
                }
            });
            if(hitDuplicate){
                randomQuestion();
            } else {
            indexOfQuestion = randomNumber;
            load();
            }
        }
        if(completeAnswers.length == 0) {
            indexOfQuestion = randomNumber;
            load();
        }
    }
    completeAnswers.push(indexOfQuestion);
}; 

const checkAnswer = el => {
    if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
        el.target.classList.add('correct');
        updateAnswerTracker('correct');
        score++;
    } else {
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disabledOptions();
};

for(let option of optionElements){
    option.addEventListener('click', e => checkAnswer(e));
};

const disabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled');
        if(item.dataset.id == questions[indexOfQuestion].rightAnswer) {
            item.classList.add('correct');
        }
    })
}

const enableOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong')
    });
}

const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
}

const updateAnswerTracker = status1 => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status1}`);
}

const validate = () => {
    if(!optionElements[0].classList.contains('disabled')) {
        alert('Вам нужно выбрать один из вариантов ответа');
    } else {
        randomQuestion();
        enableOptions();
    }

} 

const quizOver =() => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestion2.innerHTML = questions.length;
};

const tryAgain = () => {
    window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

btnNext.addEventListener('click', () => {
    validate();
})

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
})
