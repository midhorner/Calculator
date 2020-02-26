const NUMBUTTONS = [...document.querySelectorAll(".number")];
const OPERATORS = [...document.querySelectorAll(".operator")];
const EQUALS = document.querySelector("#equals");
const DECIMAL = document.querySelector("#dec");
const CLEAR = document.querySelector("#clear");
const DISPLAY = document.querySelector(".display");
const FLIP = document.querySelector(".header");

var operationPerformed = false;
var operatorPressed = false;
var decimalPressed = false;
var waitSecondNum = false;
var displayFilled = false;
var operator = "";
var decimal = "";
var firstNum = 0;
var secondNum = null;
var finalNum = null;
var fixedFinalNum = null;

function pushNumButton() {
  for (element of NUMBUTTONS) {
    element.addEventListener("click", event => {
      const { target } = event;
      operationPerformed = false;
      if (operatorPressed) {
        DISPLAY.value = target.value;
        secondNum = DISPLAY.value;
        operatorPressed = false;
      } else {
        if (waitSecondNum) {
          DISPLAY.value += target.value;
          secondNum = DISPLAY.value;
        } else {
          if (displayFilled || DISPLAY.value == "0") {
            DISPLAY.value = target.value;
            firstNum = DISPLAY.value;
            displayFilled = false;
          } else {
            DISPLAY.value += target.value;
            firstNum = DISPLAY.value;
          }
        }
      }
    });
  }
}
pushNumButton();

function pushOpButton() {
  for (element of OPERATORS) {
    element.addEventListener("click", event => {
      const { target } = event;
      operationPerformed = false;
      if (!operatorPressed && !waitSecondNum) {
        operatorPressed = true;
        operator = target.id;
        DISPLAY.value = target.innerHTML;
        waitSecondNum = true;
        decimalPressed = false;
      }
    });
  }
}
pushOpButton();

function decimalButton() {
  DECIMAL.addEventListener("click", event => {
    const { target } = event;
    if (!decimalPressed && !operationPerformed) {
      if (operatorPressed) {
        decimal = target.innerHTML;
        DISPLAY.value = "0" + decimal;
        decimalPressed = true;
        operatorPressed = false;
      } else {
        decimal = target.innerHTML;
        if (DISPLAY.value == "") {
          DISPLAY.value = "0" + decimal;
        } else {
          DISPLAY.value += decimal;
        }
        decimalPressed = true;
      }
    }
  });
}
decimalButton();

function equalsButton() {
  EQUALS.addEventListener("click", event => {
    const {} = event;
    if (!operatorPressed && waitSecondNum) {
      if (operator == "plus") {
        finalNum = parseFloat(firstNum) + parseFloat(secondNum);
      }
      if (operator == "minus") {
        finalNum = parseFloat(firstNum) - parseFloat(secondNum);
      }
      if (operator == "multiply") {
        finalNum = parseFloat(firstNum) * parseFloat(secondNum);
      }
      if (operator == "divide") {
        finalNum = parseFloat(firstNum) / parseFloat(secondNum);
      }
      fixedFinalNum = finalNum.toFixed(8);
      fixedFinalNum = parseFloat(fixedFinalNum);
      DISPLAY.value = fixedFinalNum;
      displayFilled = true;
      operationPerformed = true;
      waitSecondNum = false;
      decimalPressed = false;
      operatorPressed = false;
      firstNum = fixedFinalNum;
    }
  });
}
equalsButton();

function clearButton() {
  CLEAR.addEventListener("click", event => {
    const {} = event;
    DISPLAY.value = 0;
    operationPerformed = false;
    operatorPressed = false;
    decimalPressed = false;
    waitSecondNum = false;
    displayFilled = false;
    operator = "";
    decimal = "";
    firstNum = 0;
    secondNum = null;
    finalNum = null;
    fixedFinalNum = null;
  });
}
clearButton();

function flip() {
  FLIP.addEventListener("click", event => {
    const {} = event;
    document.querySelector("#calc-wrap").classList.toggle("flip");
  });
}
flip();
