wheelList = []

function updateInputMode() {
    randomNumbersDiv.classList.add("no-display");
    randomDigitsDiv.classList.add("no-display");
    resetButton.classList.add("no-display")
    if (inputModeRandomNumbersRadio.checked) {
        randomNumbersDiv.classList.remove("no-display");
    } else if (inputModeRandomDigitsRadio.checked) {
        randomDigitsDiv.classList.remove("no-display");
        resetButton.classList.remove("no-display")
    }
}

inputModeRandomDigitsRadio.addEventListener("change", updateInputMode)
inputModeRandomNumbersRadio.addEventListener("change", updateInputMode)

function updateInputMethod() {
    byRangeDiv.classList.add("no-display");
    byFormulaDiv.classList.add("no-display")
    if (randomNumbersByRangeRadio.checked) {
        byRangeDiv.classList.remove("no-display");
    } else if (randomNumbersByFormulaRadio.checked) {
        byFormulaDiv.classList.remove("no-display")
    }
}

randomNumbersByRangeRadio.addEventListener("change", updateInputMethod)
randomNumbersByFormulaRadio.addEventListener("change", updateInputMethod)

function updateWheel() {
    inputs = collectInputs()
    wheel.changeOptionsByInput(inputs)
    wheel.updateTitleAndDesc()
}

function showHistory() {
    console.log(hist)
}

updateInputMode()
updateInputMethod()
updateWheel()

inputModeRandomDigitsRadio.addEventListener("change", updateWheel)
inputModeRandomNumbersRadio.addEventListener("change", updateWheel)
randomNumbersByRangeRadio.addEventListener("change", updateWheel)
randomNumbersByFormulaRadio.addEventListener("change", updateWheel)
rangeMinInput.addEventListener("change", updateWheel)
rangeMaxInput.addEventListener("change", updateWheel)
rangeIntervalInput.addEventListener("change", updateWheel)
rangeExcludeInput.addEventListener("change", updateWheel)

processFormulaButton.addEventListener("click", updateWheel)

spinButton.addEventListener("click", () => { spinWheel(wheel) })

shuffleButton.addEventListener("click", () => { wheel.shuffle() })

historyButton.addEventListener("click", showHistory)

function makeNth(n) {
    if (n % 10 == 1) return n.toString() + "st"
    if (n % 10 == 2) return n.toString() + "nd"
    if (n % 10 == 3) return n.toString() + "rd"
    return n.toString() + "th"
}

function selectDigit(n) {
    if (selectedDigit == n) return
    digitDisplay = document.getElementById("digit-display" + n)
    if (digitDisplay.classList.contains("done")) return
    selectedDigit = n
    for (let i = 1; i <= numDigits; i++) {
        digitDisplay = document.getElementById("digit-display" + i)
        if (i == n) digitDisplay.classList.add("selected")
        else digitDisplay.classList.remove("selected")
    }
    updateWheel()
}

function selectNext() {
    for (let i = 1; i <= numDigits; i++) {
        digitDisplay = document.getElementById("digit-display" + i)
        if (!digitDisplay.classList.contains("done")) {
            selectDigit(i)
            return true
        }
    }
    return false
}

function lockDigit(val) {
    digitDisplay = document.getElementById("digit-display" + selectedDigit)
    digitDisplay.innerHTML = "<span>" + val + "</span>"
    digitDisplay.classList.add("done")
    digitDisplay.classList.remove("selected")
    selectedDigit = null
}

function createDigitsDisplay(num_digits) {
    html = ""
    digitHtml = ""
    for (let i = 1; i <= num_digits; i++) {
        if (i == 1) digitHtml += "<div class='selected' id='digit-display" + i + "'>\n"
        else digitHtml += "<div id='digit-display" + i + "'>\n"
        digitHtml += "<span>" + makeNth(i) + "</span>\n"
        digitHtml += "<span>Digit</span>"
        digitHtml += "</div>\n"
        html = digitHtml + html
        digitHtml = ""
    }
    digitsDisplay.innerHTML = html
    numDigits = num_digits
    selectedDigit = 1
    for (let i = 1; i <= num_digits; i++) {
        digitDisplay = document.getElementById("digit-display" + i)
        digitDisplay.addEventListener("click", () => { selectDigit(i) })
    }

    for (let i = 1; i <= 6; i++) {
        from = document.getElementById("from" + i)
        to = document.getElementById("to" + i)
        if (i <= num_digits) {
            from.disabled = false
            to.disabled = false
        } else {
            from.disabled = true
            to.disabled = true
        }
    }

    updateWheel()
}

function makeDigitsResult() {
    res = ""
    for (let i = 1; i <= numDigits; i++) {
        digitDisplay = document.querySelector("#digit-display" + i + " span")
        res = digitDisplay.innerHTML + res
    }
    return res
}

function updateNumDigits() {
    if (numDigits2.checked) createDigitsDisplay(2)
    else if (numDigits3.checked) createDigitsDisplay(3)
    else if (numDigits4.checked) createDigitsDisplay(4)
    else if (numDigits5.checked) createDigitsDisplay(5)
    else if (numDigits6.checked) createDigitsDisplay(6)
}

updateNumDigits()
numDigits2.addEventListener("change", updateNumDigits)
numDigits3.addEventListener("change", updateNumDigits)
numDigits4.addEventListener("change", updateNumDigits)
numDigits5.addEventListener("change", updateNumDigits)
numDigits6.addEventListener("change", updateNumDigits)
resetButton.addEventListener("click", () => { createDigitsDisplay(numDigits) })

function updateToAndFromInputs() {
    from1.max = to1.value
    from2.max = to2.value
    from3.max = to3.value
    from4.max = to4.value
    from5.max = to5.value
    from6.max = to6.value
    to1.min = from1.value
    to2.min = from2.value
    to3.min = from3.value
    to4.min = from4.value
    to5.min = from5.value
    to6.min = from6.value
    updateWheel()
}

from1.addEventListener("change", updateToAndFromInputs)
from2.addEventListener("change", updateToAndFromInputs)
from3.addEventListener("change", updateToAndFromInputs)
from4.addEventListener("change", updateToAndFromInputs)
from5.addEventListener("change", updateToAndFromInputs)
from6.addEventListener("change", updateToAndFromInputs)
to1.addEventListener("change", updateToAndFromInputs)
to2.addEventListener("change", updateToAndFromInputs)
to3.addEventListener("change", updateToAndFromInputs)
to4.addEventListener("change", updateToAndFromInputs)
to5.addEventListener("change", updateToAndFromInputs)
to6.addEventListener("change", updateToAndFromInputs)

resultModalOK.addEventListener("click", () => {
    resultModal.classList.add("no-display")
    createDigitsDisplay(numDigits)
})

function collapseInputs() {
    inputsDivWrapper.classList.add("collapsed")
    inputsHandleWrapper.classList.add("collapsed")
}

function decollapseInputs() {
    inputsDivWrapper.classList.remove("collapsed")
    inputsHandleWrapper.classList.remove("collapsed")
}

inputsHandle.addEventListener("click", decollapseInputs)
collapseButton.addEventListener("click", collapseInputs)