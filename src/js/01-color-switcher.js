function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector(`[data-stop]`);
const body = document.querySelector('body');

function styleBtn() {
    btnStart.style.backgroundColor = getRandomHexColor();
    btnStop.style.backgroundColor = getRandomHexColor();
}


btnStart.addEventListener('click', () => {
timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
    btnStart.disabled = true;
}, 1000);    
    
});

btnStop.addEventListener('click', () => {
    clearInterval(timerId);
    btnStart.disabled = false;
}       
);



