import { Notify } from 'notiflix/build/notiflix-notify-aio';

 const inputDelayEl = document.querySelector("input[name='delay']");
 const inputStepEl = document.querySelector("input[name='step']");
 const inputAmountEl = document.querySelector(" [name='amount']");
const btnCreatePromEl = document.querySelector('button');
 
btnCreatePromEl.addEventListener('click', onClickBtn);
 
 function onClickBtn(evt) {
   evt.preventDefault();
   const delayFirst = +inputDelayEl.value;
   const step = +inputStepEl.value;
   const amount = +inputAmountEl.value;

   inputDelayEl.value = '';
   inputStepEl.value = '';
   inputAmountEl.value = '';

   for (let i = 0; i < amount; i += 1) {
     let position = i + 1;
     let delay = delayFirst + i * step;
     
     createPromise(position, delay)
       .then(({ position, delay }) => {
         Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
         console.log(`✅  Fulfilled promise ${position} in ${delay}ms`);
       })
       .catch(({ position, delay }) => {
         Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
         console.log(`❌ Rejected promise ${position} in ${delay}ms`);
       });
   }
 }

 function createPromise(position, delay) {
   return new Promise((resolve, reject) => {
     const shouldResolve = Math.random() > 0.3;
     setTimeout(() => {
       if (shouldResolve) {
         // Fulfill
         resolve({ position, delay });
       } else {
         // Reject
         reject({ position, delay });
       }
     }, delay);
   });
 }

