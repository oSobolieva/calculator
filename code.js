
window.addEventListener("DOMContentLoaded", () => {
    
const keys = document.querySelector(".keys"),
    input = document.querySelector(".display > input"),
    equal = document.querySelector(".equal"),
    checkNum = /[0-9]|\./;

let enteringNumbers = "", numbers = [], operations = [], memory;


keys.addEventListener("click", (e) => {
    if (e.target.value == undefined) {
        console.error("Wrong Place Click");
        return;
    }
    let value = e.target.value.toLowerCase(),
        result;
    
    if (value == "c") {
        enteringNumbers = "";
        numbers = [];
        operations = [];
        show("", input);
        return;
    } 

    if (operations.length > 0) {
        equal.removeAttribute("disabled");
    }

    if (checkNum.test(value)) {
        if (value == ".") {
            if (enteringNumbers.indexOf('.') >= 0) {
                e.preventDefault();
                return;
            }
        }

        enteringNumbers += value;
        show(enteringNumbers, input);
    } else { 

        if (stringCheck(enteringNumbers) && value != "m+" && !numbers[0]) {
            return;
        }

        switch (value) {
            case "m+":
                memory = numbers[0];
                numbers.shift();
                show("", input);
                return;
            case "m-":
                memory = null;
                return;
            case "mrc":
                enteringNumbers = String(memory);
                show(memory, input);
                return;
        }
        
        if (value != "=") {
            operations.push(value);
        } else {
            show(result, input);
        }
        
        if (numbers.length == 2) {
            result = chooseOperation(operations[0], numbers[0], numbers[1]);

            replaceArraysValue(result, numbers);
            replaceArraysValue(operations[1], operations);

            roundResult(result);
        }

    }
    
}
);

const show = (newValue, place) => place.value = newValue,

    replaceArraysValue = (newValue, array) => {
        array[0] = newValue;
        array.pop();
    };



function roundResult(value) {
    let valueFloat;
    if (parseInt(Number(value)) == value) {
        show(value, input);
    } else {
        valueFloat = parseFloat(value.toFixed(5));
        show(valueFloat, input);
    }
}

function chooseOperation(value, n1, n2) {
    switch (value) {
        case "+":
            return n1 + n2;
        case "-":
            return n1 - n2;
        case "*":
            return n1 * n2;
        case "/":
            if (n2 == 0) {
                return NaN;
            }
            return n1 / n2;
    }
}

function stringCheck(enteringNum) {
    if (enteringNum != "") {
        numbers.push(parseFloat(enteringNum));
        enteringNumbers = "";
        return false;
    } else {
        show("", input);
        return true;
    }   
}

})