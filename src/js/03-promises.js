const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  let delay = Number(event.target.elements.delay.value);
  let step = Number(event.target.elements.step.value);
  let amount = Number(event.target.elements.amount.value);


  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay = delay+step
  }
});



const createPromise = (position, delay) => {
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
};
