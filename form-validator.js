'use strict';
// From https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
var EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var PASSWORD_REGEX = /^.{9}.*$/;
var COLOUR_REGEX = /^.+$/;
var MINIMUM_ANIMAL_COUNT = 2;
var emailSelector = '#email';
var passwordSelector = '#password';
var colourSelector = '#colour';
var animalsSelector = "input[name='animal']";
var tigerSelector = '#tiger';
var tigerTypeSelector = '#tiger_type';
var submitSelector = "input[type='submit']";
var errorSelector = '.error';
function addValidationHandlers() {
    // `Email` must be a valid email address.
    var emailEl = document.querySelector(emailSelector);
    // addValidationListener(emailEl, 'blur', () => validateFormElWithRegex(targetEl, EMAIL_REGEX));
    emailEl.addEventListener('blur', function (e) {
        validateFormElWithRegex(e.target, EMAIL_REGEX);
    });
    // `Password` must be longer than 8 characters.
    var passwordEl = (document.querySelector(passwordSelector));
    passwordEl.addEventListener('blur', function (e) {
        validateFormElWithRegex(e.target, PASSWORD_REGEX);
    });
    // `Colour` must be selected.
    var colourEl = document.querySelector(colourSelector);
    colourEl.addEventListener('blur', function (e) {
        validateFormElWithRegex(e.target, COLOUR_REGEX);
    });
    // At least two `Animal`s must be chosen.
    var animalEls = (document.querySelectorAll(animalsSelector));
    for (var i = 0; i < animalEls.length; i++) {
        animalEls[i].addEventListener('change', function (e) {
            var isCheckEvent = e.target.checked;
            validateAnimalElements(MINIMUM_ANIMAL_COUNT, isCheckEvent);
        });
    }
    // If `Tiger` is one of the chosen `Animal`s then `Type of tiger` is required to be a non-empty string.
    var tigerEl = document.querySelector(tigerSelector);
    var tigerTypeEl = (document.querySelector(tigerTypeSelector));
    tigerEl.addEventListener('change', function (e) { return validateTigerNameElement(); });
    tigerTypeEl.addEventListener('blur', function (e) { return validateTigerNameElement(); });
    // If the form is submitted and an error occurs, the error element's parent should have a CSS `error` class added to it.
    var submitEl = document.querySelector(submitSelector);
    submitEl.addEventListener('click', function (e) {
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
    var emailEl = document.querySelector(emailSelector);
    validateFormElWithRegex(emailEl, EMAIL_REGEX);
    var passwordEl = (document.querySelector(passwordSelector));
    validateFormElWithRegex(passwordEl, PASSWORD_REGEX);
    var colourEl = document.querySelector(colourSelector);
    validateFormElWithRegex(colourEl, COLOUR_REGEX);
    validateAnimalElements(MINIMUM_ANIMAL_COUNT, false);
    validateTigerNameElement();
}
function validateFormElWithRegex(formEl, testRegex) {
    var inputValue = formEl.value;
    var isValid = testRegex.test(inputValue);
    applyValidationStateToElement(formEl, isValid);
}
function validateAnimalElements(minimumCheckedCount, isCheckEvent) {
    var animalEls = document.querySelectorAll(animalsSelector);
    var firstAnimalEl = animalEls[0];
    var checkedAnimalEls = Array.prototype.filter.call(animalEls, function (el) { return el.checked; });
    var wasValid = isElementCurrentlyValid(firstAnimalEl);
    // Checking first animal should NOT be considered invalid, unless we are
    // already in an invalid state
    var isValid = checkedAnimalEls.length >= minimumCheckedCount ||
        (wasValid && isCheckEvent);
    applyValidationStateToElement(firstAnimalEl, isValid);
}
function validateTigerNameElement() {
    var tigerEl = document.querySelector(tigerSelector);
    var tigerTypeEl = (document.querySelector(tigerTypeSelector));
    var isValid = !tigerEl.checked || tigerTypeEl.value !== '';
    applyValidationStateToElement(tigerTypeEl, isValid);
}
function applyValidationStateToElement(el, isValid) {
    var parentEl = el.parentElement;
    if (!parentEl || parentEl.tagName !== 'P')
        return;
    if (!isValid) {
        parentEl.classList.add('error');
    }
    else {
        parentEl.classList.remove('error');
    }
}
function isElementCurrentlyValid(el) {
    var parentEl = el.parentElement;
    if (!parentEl)
        return true;
    return !parentEl.classList.contains('error');
}
function isFormCurrentlyValid() {
    var firstErrorEl = document.querySelector(errorSelector);
    return !firstErrorEl;
}
addValidationHandlers();
//# sourceMappingURL=form-validator.js.map