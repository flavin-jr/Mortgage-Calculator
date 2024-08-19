const form = document.querySelector('form')
const mortgageAmountInput = document.querySelector('#mortgage-amount');
const mortgageTermInput = document.querySelector('#mortgage-term');
const interestRateInput = document.querySelector('#interest-rate');
const mortgageTypeInputs = document.querySelectorAll('input[type = "radio"]');
const calculateBtn = document.querySelector('.calculate-btn');

const rightContent = document.querySelector('.right-content')
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const readyToSubmit = checkInputs();
    if (readyToSubmit) {
        changeRightContent()
    }
    console.log(readyToSubmit)
})
function checkRadioInputs() {
    const radioInputListCheckeds = [...mortgageTypeInputs].filter(radioInput => {
        radioInput.hasAttribute('checked')
    });

    return radioInputListCheckeds.length > 0 ? true : false;
}


function checkInputs() {
    const mortgageAmountValue = mortgageAmountInput.value;
    const mortgageTermValue = mortgageTermInput.value;
    const interestRateValue = interestRateInput.value;
    const mortgageTypeInputsList = [...mortgageTypeInputs]
    if (mortgageAmountValue === '') {
        setErrorFor(mortgageAmountInput);
    }
    if (mortgageTermValue === '') {
        setErrorFor(mortgageTermInput);
    }
    if (interestRateValue === '') {
        setErrorFor(interestRateInput);
    }
    if (!checkRadioInputs()) {
        setErrorFor(mortgageTypeInputsList.pop())
    }

    if (mortgageAmountValue === '' && mortgageTermValue === '' && interestRateValue === '' && !checkRadioInputs()) {
        return false
    }

    return true

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