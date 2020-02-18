const NUMBUTTONS = [...document.querySelectorAll(".num-btn")];
const OPERATORS = [...document.querySelectorAll(".op-btn")];
const EQUALS = document.querySelector("#equals");
const DECIMAL = document.querySelector("#dec").innerHTML;
const DISPLAY = document.querySelector("#display");
var operatorPressed = false;
var waitSecondNum = false;
var operator = "";
var firstNum = null;
var secondNum = null;

function pushNumButton() {
  for (element of NUMBUTTONS) {
    element.addEventListener("click", event => {
      const { target } = event;
      if (operatorPressed) {
        DISPLAY.innerHTML = target.innerHTML;
        secondNum = DISPLAY.innerHTML;
        console.log("second number: " + secondNum);
        operatorPressed = false;
      } else {
        if (waitSecondNum) {
          DISPLAY.innerHTML += target.innerHTML;
          secondNum = DISPLAY.innerHTML;
          console.log("second number: " + secondNum);
        } else {
          DISPLAY.innerHTML += target.innerHTML;
          firstNum = DISPLAY.innerHTML;
          console.log("first number: " + firstNum);
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
      if (!operatorPressed) {
        operatorPressed = true;
        operator = target.innerHTML;
        DISPLAY.innerHTML = operator;
        console.log(operator);
        waitSecondNum = true;
      }
    });
  }
}
pushOpButton();

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
      DISPLAY.innerHTML = finalNum;
      firstNum = finalNum;
      waitSecondNum = false;
      console.log(finalNum);
    }
  });
}
equalsButton();
