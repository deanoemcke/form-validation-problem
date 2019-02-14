'use strict';

// From https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^.{9}.*$/;
const COLOUR_REGEX = /^.+$/;
const MINIMUM_ANIMAL_COUNT = 2;

const emailSelector = '#email';
const passwordSelector = '#password';
const colourSelector = '#colour';
const animalsSelector = "input[name='animal']";
const animalsGroupSelector = '#animals_group';
const tigerSelector = '#tiger';
const tigerTypeSelector = '#tiger_type';
const submitSelector = "input[type='submit']";
const errorSelector = "[aria-invalid='true']";

function addValidationHandlers() {
    // `Email` must be a valid email address.
    const emailEl = <HTMLFormElement>document.querySelector(emailSelector);
    // addValidationListener(emailEl, 'blur', () => validateFormElWithRegex(targetEl, EMAIL_REGEX));
    emailEl.addEventListener('blur', e => {
        validateFormElWithRegex(<HTMLFormElement>e.target, EMAIL_REGEX);
    });

    // `Password` must be longer than 8 characters.
    const passwordEl = <HTMLFormElement>(
        document.querySelector(passwordSelector)
    );
    passwordEl.addEventListener('blur', e => {
        validateFormElWithRegex(<HTMLFormElement>e.target, PASSWORD_REGEX);
    });

    // `Colour` must be selected.
    const colourEl = <HTMLFormElement>document.querySelector(colourSelector);
    colourEl.addEventListener('blur', e => {
        validateFormElWithRegex(<HTMLFormElement>e.target, COLOUR_REGEX);
    });

    // At least two `Animal`s must be chosen.
    const animalEls = <NodeListOf<HTMLFormElement>>(
        document.querySelectorAll(animalsSelector)
    );
    for (var i = 0; i < animalEls.length; i++) {
        animalEls[i].addEventListener('change', e => {
            const isCheckEvent = (<HTMLFormElement>e.target!).checked;
            validateAnimalElements(MINIMUM_ANIMAL_COUNT, isCheckEvent);
        });
    }

    // If `Tiger` is one of the chosen `Animal`s then `Type of tiger` is required to be a non-empty string.
    const tigerEl = <HTMLInputElement>document.querySelector(tigerSelector);
    const tigerTypeEl = <HTMLInputElement>(
        document.querySelector(tigerTypeSelector)
    );
    tigerEl.addEventListener('change', e => validateTigerNameElement());
    tigerTypeEl.addEventListener('blur', e => validateTigerNameElement());

    // If the form is submitted and an error occurs, the error element's parent should have a CSS `error` class added to it.
    const submitEl = <HTMLInputElement>document.querySelector(submitSelector);
    submitEl.addEventListener('click', e => {
        e.preventDefault();
        validateEntireForm();
        if (isFormCurrentlyValid()) {
            // Submit form to backend
            // Ensure we perform validation in the backend including xss checks
            alert('Nice choice!');
        }
    });
}

function validateEntireForm() {
    const emailEl = <HTMLFormElement>document.querySelector(emailSelector);
    validateFormElWithRegex(emailEl, EMAIL_REGEX);
    const passwordEl = <HTMLFormElement>(
        document.querySelector(passwordSelector)
    );
    validateFormElWithRegex(passwordEl, PASSWORD_REGEX);
    const colourEl = <HTMLFormElement>document.querySelector(colourSelector);
    validateFormElWithRegex(colourEl, COLOUR_REGEX);
    validateAnimalElements(MINIMUM_ANIMAL_COUNT, false);
    validateTigerNameElement();
}

function validateFormElWithRegex(formEl: HTMLFormElement, testRegex: RegExp) {
    const inputValue = formEl.value;
    const isValid = testRegex.test(inputValue);
    applyValidationStateToElement(formEl, isValid);
}

function validateAnimalElements(
    minimumCheckedCount: number,
    isCheckEvent: boolean,
) {
    const animalEls = document.querySelectorAll(animalsSelector);
    const checkedAnimalEls = Array.prototype.filter.call(
        animalEls,
        (el: HTMLFormElement) => el.checked,
    );
    const animalsGroupEl = <HTMLFormElement>(
        document.querySelector(animalsGroupSelector)
    );
    const wasValid = isElementCurrentlyValid(animalsGroupEl);

    // Checking first animal should NOT be considered invalid, unless we are
    // already in an invalid state
    const isValid =
        checkedAnimalEls.length >= minimumCheckedCount ||
        (wasValid && isCheckEvent);
    applyValidationStateToElement(animalsGroupEl, isValid);
}

function validateTigerNameElement() {
    const tigerEl = <HTMLFormElement>document.querySelector(tigerSelector);
    const tigerTypeEl = <HTMLFormElement>(
        document.querySelector(tigerTypeSelector)
    );
    const isValid = !tigerEl.checked || tigerTypeEl.value !== '';
    applyValidationStateToElement(tigerTypeEl, isValid);
}

function applyValidationStateToElement(el: HTMLElement, isValid: boolean) {
    const validationMsgEl = <HTMLElement>el.parentElement!.lastElementChild;
    if (!isValid) {
        el.setAttribute('aria-invalid', 'true');
        validationMsgEl.style.display = 'inline-block';
    } else {
        el.removeAttribute('aria-invalid');
        validationMsgEl.style.display = 'none';
    }
}

function isElementCurrentlyValid(el: HTMLElement): boolean {
    return !el.hasAttribute('aria-invalid');
}

function isFormCurrentlyValid(): boolean {
    const firstErrorEl = document.querySelector(errorSelector);
    return !firstErrorEl;
}

addValidationHandlers();
