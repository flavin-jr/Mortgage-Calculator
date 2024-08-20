const form = document.querySelector('form')
const mortgageAmountInput = document.querySelector('#mortgage-amount');
const mortgageTermInput = document.querySelector('#mortgage-term');
const interestRateInput = document.querySelector('#interest-rate');
const radioInputs = document.querySelectorAll('input[type="radio"]');
const calculateBtn = document.querySelector('.calculate-btn');
const rightContent = document.querySelector('.right-content')
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const readyToSubmit = checkInputs();

    if (readyToSubmit) {
        const [amount, term, rate, type] = readyToSubmit;
        calculate(amount, term, rate, type)
        changeRightContent()
    }
    console.log('rodei')
})
function checkRadioInputs() {
    const mortgageTypeInputChecked = document.querySelector('input[name = "mortgage-type"]:checked');

    return mortgageTypeInputChecked
}


function checkInputs() {
    const mortgageAmountValue = mortgageAmountInput.value;
    const mortgageTermValue = mortgageTermInput.value;
    const interestRateValue = interestRateInput.value;
    const radioInputsList = [...radioInputs]
    if (mortgageAmountValue === '') {
        setErrorFor(mortgageAmountInput);
    }
    if (mortgageTermValue === '') {
        setErrorFor(mortgageTermInput);
    }
    if (interestRateValue === '') {
        setErrorFor(interestRateInput);
    }
    const radioInputChecked = checkRadioInputs()
    if (!radioInputChecked) {
        setErrorFor(radioInputsList[1])
    }

    if (mortgageAmountValue === '' && mortgageTermValue === '' && interestRateValue === '' && !radioInputChecked) {
        return false
    }
    if (isNaN(mortgageAmountValue) || isNaN(mortgageTermValue) || isNaN(interestRateValue)) {
        return false
    }

    const mortgageValues = [parseFloat(mortgageAmountValue), parseInt(mortgageTermValue), parseFloat(interestRateValue), radioInputChecked.value]
    return mortgageValues

}

function setErrorFor(input) {

    const parentDiv = input.parentNode
    const inputType = input.getAttribute('type');
    const spanMsg = document.createElement('span');
    spanMsg.classList.add('error-msg');
    spanMsg.innerText = 'This field is required';
    if (inputType === 'radio') {
        const hasSpanErrorMsg = parentDiv.parentNode.childElementCount > 3;

        if (hasSpanErrorMsg) {
            return
        }
        parentDiv.after(spanMsg);

    }
    else {
        const hasSpanErrorMsg = parentDiv.parentNode.childElementCount > 2;
        if (hasSpanErrorMsg) {
            return
        }
        parentDiv.classList.toggle('error-div')
        parentDiv.after(spanMsg);

    }


}

function changeRightContent() {
    const childrens = [...rightContent.children]

    if (childrens[1].classList.contains('hidden')) {
        rightContent.classList.toggle('after-reset')
        childrens[1].classList.toggle('hidden')
        childrens[0].classList.toggle('hidden')
    }
    else {
        rightContent.classList.toggle('after-reset')

        childrens[1].classList.toggle('hidden')
        childrens[0].classList.toggle('hidden')
    }


}

function calculate(amount, term, rate, type) {
    console.log(amount, term, rate, type)
    let monthlyPayment;
    if (type === 'repayment') {

        const monthlyInterestRate = rate / 12 / 100;
        const numberOfPayments = term * 12;

        monthlyPayment = (amount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
            (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

    } else if (type === 'interest-only') {

        monthlyPayment = amount * (rate / 100);
    }

    console.log(monthlyPayment.toFixed(2))
}

