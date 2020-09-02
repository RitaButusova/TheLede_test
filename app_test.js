document.addEventListener('DOMContentLoaded', finishLoading);
var app = document.getElementById('app');

var endObj = document.getElementById('end');
var endText = document.getElementById('end-text');

var Test = [
    {'question': 'Який колір тобі більше подобається?',
     'image': 'img_test/img1.png',
     'answers':['Білий бла бла бла блаб лааллалалла алла лалалаа лалалал лалалалалла лалалал', 'Сірий', 'Помаранчевий', 'Чорний'],
     'index': ['option_1', 'option_2', 'option_3', 'option_4'],
     'percent': 10
    },
    {'question': 'Що тебе зазвичай бісить?',
     'image': 'img_test/img2.gif',
     'answers':['Холод', 'Люди', 'Підлість', 'Вода'],
     'index': ['option_2', 'option_1', 'option_3', 'option_4'],
     'percent': 20
    },
    {'question': 'Найбільш за все ти любиш їсти?',
     'image': 'img_test/img3.gif',
     'answers':['Рибу', 'Мед', 'Зернові', 'Курятину'],
     'index': ['option_4', 'option_1', 'option_2', 'option_3'],
     'percent': 30
    },
    {'question': 'Властивість твого характеру',
     'image': 'img_test/img4.gif',
     'answers':['Хитрість', 'Ловкість', 'Сила', 'Гордість'],
     'index': ['option_3', 'option_2', 'option_1', 'option_4'],
     'percent': 40
    }
];

var result = [
            {'name': 'option_1', percentAnsw: 0},
            {'name': 'option_2', percentAnsw: 0},
            {'name': 'option_3', percentAnsw: 0},
            {'name': 'option_4', percentAnsw: 0}
];

function finishLoading(){
    app.innerHTML += `<div id='overlay'>
                <div id='element-id'>
                <div id='the-lede' class='anim-typewriter'>The lede</div>
                </div>
            <h1 id='title-text'>Яка ти тваринка блаблабла блабла блаблаблабла бла блаблаблаблаб лабла?</h1>
            <button id='go'>ПОЧАТИ</button>
        </div>`
    var startButton = document.getElementById('go');
    setTimeout(buttonLoaded, 2500);
    startButton.addEventListener('click', initLoaded);
    startButton.addEventListener('click', nextPage);
    document.addEventListener('keydown', eventStart);
}

function eventStart(event){
    var startButton = document.getElementById('go');
    if(event.code == 'Enter'){
        startButton.click();
    }
}

function buttonLoaded(){
    document.getElementById('go').style.visibility = 'visible';
    document.getElementById('title-text').style.visibility = 'visible';
}

function initLoaded(){
    var overlay = document.getElementById('overlay');
    overlay.className = 'loaded';
}

function nextPage(){
    document.removeEventListener('keydown', eventStart);
    app.innerHTML = '';
    app.innerHTML += `<div id="container-question">
    <div class='question'>
        <div class='img-container padded'>
        <img class='img-test centered'>
        </div>
        <h1 id='question' class='q-text'></h1>
    </div>
    <div class='wrapper'>
        <div data-n='0' class='answer' onclick="answerClicked(this.getAttribute('data-n'), this)">
            <p id='0'></p>
        </div>
        <div data-n='1' class='answer' onclick="answerClicked(this.getAttribute('data-n'), this)">
            <p id='1'></p>
        </div>
        <div data-n='2' class='answer' onclick="answerClicked(this.getAttribute('data-n'), this)">
            <p id='2'></p>
        </div>
        <div data-n='3' class='answer' onclick="answerClicked(this.getAttribute('data-n'), this)">
            <p id='3'></p>
        </div>
        <div class='test-message'><p>Оберіть один варіант</p></div>
        <button id='next'>Далі</button>
    </div>
    </div>`;
    var buttNext = document.getElementById('next');
    buttNext.addEventListener('click', updatePosition);
    document.addEventListener('keydown', eventNext);
    displayCurrentQuestion();
}

function eventNext(event){
    var buttNext = document.getElementById('next');
    if(event.code == 'Enter'){
        buttNext.click();
    }
}

var currentQuestion = 0;
var choice;
function delCheckedAnsw(){
    var answ = document.getElementsByClassName('answer');
    for(i = 0 ; i < answ.length; i++){
        answ[i].className = 'answer';
    }
}
function answerClicked(id, obj) {
    delCheckedAnsw();
    var testMessage = document.querySelector('.test-message');
    testMessage.style.display = 'none';
    choice = +id;
    obj.className += ' active-answer';
}

function updatePosition() {
        delCheckedAnsw();
        if(choice === null) {
            var testMessage = document.querySelector('.test-message');
            testMessage.style.display = 'block';
        } else {
                var optVal = Test[currentQuestion].index[choice];
                for(item in result){
                    if(result[item].name == optVal){
                        result[item].percentAnsw += Test[currentQuestion].percent;
                    }
                }
                currentQuestion++;
                
                if(currentQuestion < Test.length) {
                    displayCurrentQuestion();
                } else {
                    displayScore();
                }
        }
}


function displayCurrentQuestion() {
    choice = null;
    var question = Test[currentQuestion].question;
    var image = Test[currentQuestion].image;
    var questionDiv = document.getElementById('question');
    var answer = document.getElementsByTagName('p');
    var imgContainer = document.querySelector('.img-test');
    imgContainer.src = image;
    var lenAnswers = Test[currentQuestion].answers.length;
    questionDiv.innerText = question;
    //Remove all current <li> elements (if any).innerHTML = '';
    for (i = 0; i < lenAnswers; i++) { 
        answer[i].innerHTML = Test[currentQuestion].answers[i];
    }
}

function eventRestart(event){
    var endButt = document.getElementById('end-butt');
    if(event.code == 'Enter'){
        endButt.click();
    }
}

function displayScore() {
    app.innerHTML = '';
    document.removeEventListener('keydown', eventNext);
    document.addEventListener('keydown', eventRestart);
    app.innerHTML += `<div id='end'>
    <h1 id='end-text'></h1>
    <div class='img-end padded'>
        <img class='img-test centered'>
    </div>
    <button id='end-butt' onClick='window.location.reload()'>Пройти ще раз</button>
    </div>`
    var sortRes = result.sort(function(a, b) { return b.percentAnsw - a.percentAnsw });
    var finallyResult;
    var imgFin;
    switch(sortRes[0].name){
        case 'option_1':
        finallyResult = 'Ведмідь'
        imgFin = 'img_test/res_test/img1.png'
        break;
        case 'option_2':
        finallyResult ='Миш'
        imgFin = 'img_test/res_test/img2.jpg'
        break;
        case 'option_3':
        finallyResult = 'Лисиця'
        imgFin = 'img_test/res_test/img3.gif'
        break;
        case 'option_4':
        finallyResult ='Кіт'
        imgFin = 'img_test/res_test/img4.gif'
        break;
    }
    document.getElementById('end-text').innerHTML = `Ви ${finallyResult}`;
    document.querySelector('.img-test').src = imgFin;
}