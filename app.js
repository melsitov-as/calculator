const sumInput = document.querySelector('#start-sum-input');
const growPercentInput = document.querySelector('#grow-percent-input');
const monthNumberInput = document.querySelector('#month-number-input');
const plusSumInput = document.querySelector('#plus-sum-input');
const taxAmountInput = document.querySelector('#tax-amount-input');
const main = document.querySelector('main');
const calcBtn = document.querySelector('.input-data__calc-btn');
const clearBtn = document.querySelector('.input-data__clear-btn');
let monthBeginAmountElements;
let monthBeginAmountElement;
let ownProfitElement;
let consultantProfitElement;
let totalAmountElement;

let sum = 0;
let growPercent = 0;
let plusSum = 0;
let monthNumber = 0;
let consultantProfit = 0;
let ownProfit = 0;
let monthBeginAmount = 0;
let monthCount = 0;
let taxAmount = 0;

const ownProfitTemplate = () => {
  return `<div class="own-profit">
            <h3 class="own-profit__title">Своя прибыль: ${Math.round(ownProfit)}руб.</h3>
          </div>`
}

const totalAmountTemplate = () => {
  return `<div class="total-amount">
            <h3 class="total-amount__title">Общая прибыль: ${Math.round(sum)}руб.</h3>
          </div>`
}

const monthBeginAmountTemplate = () => {
  return `<div class="month-begin-amount">
            <h3 class="month-begin-amount__title">Сумма для торговли на начало ${monthCount}-го месяца: ${Math.round(monthBeginAmount)}руб.</h3>
          </div>`
}

const consultantProfitTemplate = () => {
  return `<div class="consultant-profit">
            <h3 class="consultant-profit__title">Прибыль консультанта: ${Math.round(consultantProfit)}руб.</h3>
          </div>`
}


sumInput.addEventListener('change', () => {
  sum = Number(sumInput.value);
})

growPercentInput.addEventListener('change', () => {
  growPercent = Number(growPercentInput.value/100);
})

monthNumberInput.addEventListener('change', () => {
  monthNumber = Number(monthNumberInput.value);
})

plusSumInput.addEventListener('change', () => {
  plusSum = Number(plusSumInput.value);
})

taxAmountInput.addEventListener('change', () => {
  taxAmount = Number(taxAmountInput.value)/100;
})

const clearForm = () => {
  sum = 0;
  growPercent = 0;
  plusSum = 0;
  monthNumber = 0;
  consultantProfit = 0;
  ownProfit = 0;
  monthBeginAmount = 0;
  monthCount = 0;
  sumInput.value = '';
  growPercentInput.value = '';
  monthNumberInput.value = '';
  plusSumInput.value = '';
  monthBeginAmountElements = document.querySelectorAll('.month-begin-amount');
  for (monthBeginAmountElement of monthBeginAmountElements) {
    if (main.contains(monthBeginAmountElement)) {
      main.removeChild(monthBeginAmountElement);
    } 
  }
  ownProfitElement = document.querySelector('.own-profit');
  if (main.contains(ownProfitElement)) {
    main.removeChild(ownProfitElement);
  }

  consultantProfitElement = document.querySelector('.consultant-profit');
  if (main.contains(consultantProfitElement)) {
    main.removeChild(consultantProfitElement);
  }

  totalAmountElement = document.querySelector('.total-amount');
  if (main.contains(totalAmountElement)) {
    main.removeChild(totalAmountElement);
  }
}

calcBtn.addEventListener('click', () => {
  monthBeginAmount = 0;
  ownProfit = 0;
  consultantProfit = 0;
  sum = Number(sumInput.value);
  monthBeginAmount = sum;
  monthBeginAmountElements = document.querySelectorAll('.month-begin-amount');
  for (monthBeginAmountElement of monthBeginAmountElements) {
    if (main.contains(monthBeginAmountElement)) {
      main.removeChild(monthBeginAmountElement);
    } 
  }
  ownProfitElement = document.querySelector('.own-profit');
  if (main.contains(ownProfitElement)) {
    main.removeChild(ownProfitElement);
  }

  consultantProfitElement = document.querySelector('.consultant-profit');
  if (main.contains(consultantProfitElement)) {
    main.removeChild(consultantProfitElement);
  }
  totalAmountElement = document.querySelector('.total-amount');
  if (main.contains(totalAmountElement)) {
    main.removeChild(totalAmountElement);
  }
  for (let i = 1; i < monthNumber+1; i++) {
    monthCount = i;
    if (i === 1) {
      monthBeginAmount = sum;
      main.insertAdjacentHTML('beforeend', monthBeginAmountTemplate())
    }
    if (i >= 2) {
      sum = sum + plusSum;
      monthBeginAmount = sum;
      main.insertAdjacentHTML('beforeend', monthBeginAmountTemplate())
    }
    sum = sum*growPercent + sum
  }
  sum = sum - sum*taxAmount;
  consultantProfit = sum*0.1;
  ownProfit = sum - consultantProfit;

  main.insertAdjacentHTML('beforeend', totalAmountTemplate())
  main.insertAdjacentHTML('beforeend', consultantProfitTemplate())
  main.insertAdjacentHTML('beforeend', ownProfitTemplate())
  
})

clearBtn.addEventListener('click', () => {
  clearForm();
})
