# [Form validation problem](https://springload.github.io/form-validation-problem/)

## Setup

```sh
npm install -g typescript
tsc form-validator.ts
```

## Usage

```sh
open index.html
```

## Problem definition

Included in this repository is an [index.html](index.html) file that contains a form. You must ensure all of the following rules are met before the form is posted to the (in this case imaginary) server:

* `Email` must be a valid email address.
* `Password` must be longer than 8 characters.
* `Colour` must be selected.
* At least two `Animal`s must be chosen.
* If `Tiger` is one of the chosen `Animal`s then `Type of tiger` is required to be a non-empty string.

## Other requirements

If the form is submitted and an error occurs, the error element's parent should have a CSS `error` class added to it.

```html
<p class="error">
    <label for="field"></label>
    <input id="field" type="text" value="foo">
</p>
```

## Improvements
Useability-wise there's a few enhancements I would make given more time:
* Adding inline validation messages to explain validation errors
* Removing error class as soon as input becomes valid (vs onblur)
* Style/disable submit button when errors are detected

## Considerations
* I have implemented in typescript (strict mode). Using typescript for this project was possibly overkill, but even for small projects I appreciate the strictness it enforces in my coding style.
* I have done little in terms of documentation besides some inline commenting.
* Accessibility could be improved by implementing aforementioned inline validation errors. Perhaps HTML5 form validation could have been used?
* I am target ES5 for broad browser support. 
* My tooling is fairly minimal. VScode with prettier and typescript transpiling. Debugging via chrome dev tools and VScode debugger for chrome (for debugging the raw ts files).
