const currencyEL_one = document.getElementById("currency-one");
const amountEl_one = document.getElementById("amount-one");
const currencyEL_two = document.getElementById("currency-two");
const amountEL_two = document.getElementById("amount-two");

const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

// fetch exchange rate and update the DOM
function calculate() {
  const currency_one = currencyEL_one.value;
  const currency_two = currencyEL_two.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const rate = data.rates[currency_two];
      console.log(rate);
      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

      amountEL_two.value = (amountEl_one.value * rate).toFixed(2);
    });
}

//EVENT LISTENERS
currencyEL_one.addEventListener("change", calculate);
amountEl_one.addEventListener("input", calculate);
currencyEL_two.addEventListener("change", calculate);
amountEL_two.addEventListener("input", calculate);

swap.addEventListener("click", function () {
  const temp = currencyEL_one.value;
  currencyEL_one.value = currencyEL_two.value;
  currencyEL_two.value = temp;
  calculate();
});

calculate();
