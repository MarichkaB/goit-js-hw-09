import Notiflix from 'notiflix';
const formElem = document.querySelector('.form');
formElem.addEventListener('submit', formSubmit);

function formSubmit(event) {
  event.preventDefault();
  for (let i = 0; i < formElem.amount.value; i += 1) {
    createPromise(
      i + 1,
      Number(formElem.delay.value) + Number(formElem.step.value) * i
    )
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
