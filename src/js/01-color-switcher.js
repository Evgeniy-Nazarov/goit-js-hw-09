function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector(`[data-stop]`);
const body = document.querySelector('body');

let timerId = null;


btnStart.addEventListener('click', () => {
    timerId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
        btnStart.disabled = true;
        btnStart.style.backgroundColor = 'grey';
        btnStop.disabled = false;
        btnStop.style.backgroundColor = 'white';
    }, 1000)
});



btnStop.addEventListener('click', () => {
    btnStart.disabled = false;
    btnStart.style.backgroundColor = 'white';
    btnStop.disabled = true;
    btnStop.style.backgroundColor = 'grey';
    clearInterval(timerId);
}       
);



