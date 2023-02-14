const { Notify } = require("notiflix");

const inputDelay = document.querySelector('[name="delay"]');
const inputStep = document.querySelector('[name="step"]');
const inputAmount = document.querySelector('[name="amount"]');
const btnCreatePromise = document.querySelector('button');

btnCreatePromise.addEventListener('click', onCreatePromiseClick);

function onCreatePromiseClick(event) {
  event.preventDefault();
  const delay = Number(inputDelay.value);
  const step = Number(inputStep.value);
  const amount = Number(inputAmount.value);

  inputDelay.value = '';
  inputStep.value = '';
  inputAmount.value = '';

  for (let i = 0; i < amount; i += 1) {
    const position = i * step;
    createPromise(position, delay).then((onResolve, onReject) =>
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`))
      .catch((onReject) => Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`));
  }
  }



function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve(position);
      }
      reject(position);
    }, delay);
  });
}


