//работающий адаптивный слайдер с фото
const img = document.querySelectorAll (".sliderline img");
const sliderLine = document.querySelector (".sliderline");
const dots = document.querySelectorAll (".tchk");
const cityNav = document.querySelectorAll (".city-nav__item");



let count = 0; 
let width;



                 
// информация в грид-таблице по квартирам

let dataBase = {
    0: {
        city: "Rostov-On-Don, <br>Admiral",
        area: "85 m<sup>2", 
        time: "3.5 months", 
        cost: "Upon request",
    },
    1: {
        city: "Sochi <br>Thieves",
        area: "105 m<sup>2", 
        time: "4 months", 
        cost: "Upon request",
    },
    2: {
        city: "Rostov-On-Don, <br>Patriotic",
        area: "93 m<sup>2", 
        time: "3 months", 
        cost: "Upon request",
    },
};


function gridCity (index) {
    const town = document.querySelector (".cities");
    town.innerHTML = dataBase[index].city;
    const area = document.querySelector (".area");
    area.innerHTML = dataBase[index].area;
    const time = document.querySelector (".time");
    time.innerHTML = dataBase[index].time;
    const cost = document.querySelector (".cost");
    cost.innerHTML = dataBase[index].cost;
  }

//перелистывание слайдера 
function clickPrev(){
    count--;
    if (count < 0) {
        count = img.length - 1;
    }
    start () ;    
}

function clickNext(){
    count++;
    if (count >= img.length) {
        count = 0;
    }
    start () ;    
}




//функция расчета ширины страницы для вывода изображения 
function init () {
    width = document.querySelector ('.slider').offsetWidth;  //расчет ширины страницы => надо узнать ширину основного блока slider, где находятся все картинки
    sliderLine.style.width = width * img.length + 'px'; //необходимо увеличить ширину блока слайдера так, чтобы он был равен ширине слайдера умноженного на количество картинок
    // это позволит правильно расчитать ширину sliderLine
    img.forEach (item => {
        item.style.width = width + 'px';
        item.style.height = 'auto'; //высота изображений будет "подтягиваться" до автоматического
    });
    gridCity (count);
    rollSlider();
}






//активация точки при переходе на соответствующий слайд
function dotSlide (index) { //в index передается значение счетчика count при вызове функции
    dots.forEach (item => item.classList.remove ('active-dot'));
    dots[index].classList.add('active-dot');

}


//активация городов
function citySlide (index) {
    cityNav.forEach (item => item.classList.remove ('active-city'));
    cityNav[index].classList.add('active-city');

}


function rollSlider() {
    sliderLine.style.transform = 'translate(-' + count * width + 'px)'; //смещение на ширину одного слайдера в пикселях
}

//функция, включающая сразу несколько функций, которые описаны были ранее
function start () {
    rollSlider ();
    dotSlide (count);
    citySlide (count);
    gridCity (count);
}



 //изменение размера картинки при масштабировании
window.addEventListener ('resize', init); 
init();



document
  .querySelector ('.next')
  .addEventListener ('click', clickNext);

document
  .querySelector ('.prev')
  .addEventListener ('click', clickPrev);      

dots.forEach ((dot, index) => {
    dot.addEventListener ("click", () => {
    count = index; //в функции присутствует свой счетчик, но он считает не от количества кликов, а в зависимости от индекса перелистывания при переборе; задается значение текущего индекса, который передается в остальные функции
    
    start () ;
});
});

cityNav.forEach ((city, index) => {
    city.addEventListener ("click", () => {
    count = index;
    start (); 
    
    });
});
