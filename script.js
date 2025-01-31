const keys = document.querySelectorAll('.key')
const display_input = document.querySelector('.display .input')
const display_output = document.querySelector('.display .output')

let input = "";

for (let key of keys) {
    const codeValue = key.dataset.key
    const displayValue = key.innerText

    key.addEventListener('click', () => {
        switch (codeValue) {
            case "clear":
                input = ""
                display_input.innerHTML = ""
                display_output.innerHTML = ""
                break

            case "backspace":
                input = input.slice(0, -1)
                display_input.innerHTML = display_input.innerHTML.slice(0 , -1)
                break
            
            case "=":
                let result = eval(input)
                display_output.innerHTML = cleanOutput(result)
                break
            
            case "brackets":
                if (
                    input.indexOf("(") == -1 ||
                    input.indexOf("(") != -1 &&
                    input.indexOf(")") != -1 &&
                    input.lastIndexOf("(") < input.lastIndexOf(")")
                ) {
                    input += "("
                    display_input.innerHTML += "("
                } else {
                    input += ")"
                    display_input.innerHTML += ")"
                }
                break

            default:
                if (validateInput(codeValue)) {
                    input += codeValue;
                    display_input.innerHTML += displayValue 
                }
        }
    })
}

function cleanOutput (output) {
    let output_string = output.toString()
    let [integerPart, decimalPart] = output_string.split(".")

    let output_arr = output_string.split("")

    let formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    let result = formattedInteger;
    if (decimalPart !== undefined) {
        result += "." + decimalPart;
    }

    return result;
}

function validateInput(value) {
    let last_input = input.slice(-1)
    let operators = ["+", "-", "*", "/"]

    if (value == "." && last_input == ".") {
        return false
    }
    
    if (operators.includes(value)) {
        if (operators.includes(last_input)) {
            return false
        } else {
            return true
        }
    }
    
    if (value == 0 && [...operators, '', '('].includes(last_input.slice(-1))) {
        display_input.innerHTML += value 
        return false
    }

    return true
}