const NUMBUTTONS = [...document.querySelectorAll(".num-btn")];
const OPERATORS = [...document.querySelectorAll(".op-btn")];
const EQUALS = document.querySelector("#equals");
const DECIMAL = document.querySelector("#dec");
const DISPLAY = document.querySelector("#display");
var operatorPressed = false;
var decimalPressed = false;
var waitSecondNum = false;
var displayFilled = false;
var operator = "";
var decimal = "";
var firstNum = null;
var secondNum = null;

function pushNumButton() {
  for (element of NUMBUTTONS) {
    element.addEventListener("click", event => {
      const { target } = event;
      if (operatorPressed) {
        DISPLAY.innerHTML = target.innerHTML;
        secondNum = DISPLAY.innerHTML;
        operatorPressed = false;
        console.log("second number: " + secondNum);
      } else {
        if (waitSecondNum) {
          DISPLAY.innerHTML += target.innerHTML;
          secondNum = DISPLAY.innerHTML;
          console.log("second number: " + secondNum);
        } else {
          if (displayFilled) {
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
      if (!operatorPressed && !waitSecondNum) {
        operatorPressed = true;
        operator = target.innerHTML;
        DISPLAY.innerHTML = operator;
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
    if (!decimalPressed) {
      if (operatorPressed) {
        decimal = target.innerHTML;
        DISPLAY.innerHTML = decimal;
        decimalPressed = true;
        operatorPressed = false;
        console.log(decimal);
      } else {
        decimal = target.innerHTML;
        DISPLAY.innerHTML += decimal;
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
    if (!operatorPressed) {
      if (operator == "PLUS") {
        finalNum = parseFloat(firstNum) + parseFloat(secondNum);
      }
      if (operator == "MINUS") {
        finalNum = parseFloat(firstNum) - parseFloat(secondNum);
      }
      if (operator == "MULTIPLY") {
        finalNum = parseFloat(firstNum) * parseFloat(secondNum);
      }
      if (operator == "DIVIDE") {
        finalNum = parseFloat(firstNum) / parseFloat(secondNum);
      }
      var fixedFinalNum = finalNum.toFixed(8);
      DISPLAY.innerHTML = fixedFinalNum;
      firstNum = fixedFinalNum;
      displayFilled = true;
      waitSecondNum = false;
      decimalPressed = false;
      operatorPressed = false;
      console.log(fixedFinalNum);
    }
  });
}
equalsButton();
