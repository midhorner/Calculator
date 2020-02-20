const NUMBUTTONS = [...document.querySelectorAll(".num-btn")];
const OPERATORS = [...document.querySelectorAll(".op-btn")];
const EQUALS = document.querySelector("#equals");
const DECIMAL = document.querySelector("#dec");
const DISPLAY = document.querySelector("#display");

var operationPerformed = false;
var operatorPressed = false;
var decimalPressed = false;
var waitSecondNum = false;
var displayFilled = false;
var operator = "";
var decimal = "";
var firstNum = 0;
var secondNum = null;

DISPLAY.innerHTML = 0;

function pushNumButton() {
  for (element of NUMBUTTONS) {
    element.addEventListener("click", event => {
      const { target } = event;
      operationPerformed = false;
      if (operatorPressed) {
        DISPLAY.innerHTML += target.innerHTML;
        secondNum = DISPLAY.innerHTML;
        operatorPressed = false;
        console.log("second number: " + secondNum);
      } else {
        if (waitSecondNum) {
          DISPLAY.innerHTML += target.innerHTML;
          secondNum = DISPLAY.innerHTML;
          console.log("second number: " + secondNum);
        } else {
          if (displayFilled || DISPLAY.innerHTML == "0") {
            DISPLAY.innerHTML = target.innerHTML;
            firstNum = DISPLAY.innerHTML;
            displayFilled = false;
            console.log("first number: " + firstNum);
          } else {
            DISPLAY.innerHTML += target.innerHTML;
            firstNum = DISPLAY.innerHTML;
            console.log("first number: " + firstNum);
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
        operator = target.innerHTML;
        DISPLAY.innerHTML += operator;
        console.log(operator);
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
        DISPLAY.innerHTML = "0" + decimal;
        decimalPressed = true;
        operatorPressed = false;
        console.log(decimal);
      } else {
        decimal = target.innerHTML;
        if (DISPLAY.innerHTML == "") {
          DISPLAY.innerHTML = "0" + decimal;
        } else {
          DISPLAY.innerHTML += decimal;
        }
        decimalPressed = true;
        console.log(decimal);
      }
    }
  });
}
decimalButton();

function equalsButton() {
  var finalNum = 0;
  EQUALS.addEventListener("click", event => {
    const { target } = event;
    var fixedFinalNum = "";
    if (!operatorPressed) {
      if (operator == "+") {
        finalNum = parseFloat(firstNum) + parseFloat(secondNum);
      }
      if (operator == "-") {
        finalNum = parseFloat(firstNum) - parseFloat(secondNum);
      }
      if (operator == "*") {
        finalNum = parseFloat(firstNum) * parseFloat(secondNum);
      }
      if (operator == "/") {
        finalNum = parseFloat(firstNum) / parseFloat(secondNum);
      }
      fixedFinalNum = finalNum.toFixed(8);
      fixedFinalNum = parseFloat(fixedFinalNum);
      DISPLAY.innerHTML = fixedFinalNum;
      firstNum = fixedFinalNum;
      displayFilled = true;
      operationPerformed = true;
      waitSecondNum = false;
      decimalPressed = false;
      operatorPressed = false;
      console.log(fixedFinalNum);
    }
  });
}
equalsButton();
