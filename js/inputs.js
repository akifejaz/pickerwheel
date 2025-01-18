function getNumericInput(component) {
    var a = parseInt(component.value)
    if (isNaN(a)) return null
    return a
}

function getExcludeList(component) {
    exclude = []
    excludeSplit = component.value.split(",")
    for (let i = 0; i < excludeSplit.length; i++) {
        a = parseInt(excludeSplit[i])
        if (isNaN(a)) continue;
        exclude.push(a)
    }
    return exclude
}

function splitRange(range) {
    j = 0
    res = []
    part = ""
    while (j < range.length) {
        if (range[j] == ":" || range[j] == ";") {
            res.push(part)
            part = ""
        } else {
            part += range[j]
        }
        j++
    }
    res.push(part)
    return res
}

function parseFormula(component) {
    formula = component.value
    formulaSplit = formula.split(",")
    options = []
    for (let i = 0; i < formulaSplit.length; i++) {
        part = formulaSplit[i].trim()
        if (part.length > 0) {
            if ((part[0] == "(" && part[part.length - 1] == ")") || (part[0] == "[" && part[part.length - 1] == "]")) {
                range = part.slice(1, part.length - 1)
                rangeParts = splitRange(range)
                if (rangeParts.length == 2) {
                    min = parseInt(rangeParts[0])
                    max = parseInt(rangeParts[1])
                    if (isNaN(min) || isNaN(max)) continue
                    if (min > max) continue
                    for (let j = min; j <= max; j++) options.push(j)
                } else if (rangeParts.length == 3) {
                    min = parseInt(rangeParts[0])
                    interval = parseInt(rangeParts[1])
                    max = parseInt(rangeParts[2])
                    if (isNaN(min) || isNaN(max) || isNaN(interval)) continue
                    if (interval == 0) {
                        if (min == max) options.push(min)
                        else continue
                    } else {
                        if ((max > min) && interval < 0) continue
                        if ((max < min) && interval > 0) continue
                        if (max >= min)
                            for (let j = min; j <= max; j += interval) options.push(j)
                        else
                            for (let j = min; j >= max; j += interval) options.push(j)
                    }
                }
            } else {
                a = parseInt(part)
                if (!isNaN(a)) options.push(a)
            }
        }
    }
    return options
}

function getDigitInfo() {
    digitInfo = {}
    digitInfo["digit"] = selectedDigit
    from = parseInt(document.getElementById("from" + selectedDigit).value)
    if (isNaN(from)) digitInfo["from"] == null
    else digitInfo["from"] = from
    to = parseInt(document.getElementById("to" + selectedDigit).value)
    if (isNaN(to)) digitInfo["to"] == null
    else digitInfo["to"] = to
    return digitInfo
}

function collectInputs() {
    inputs = {}
    inputs["input_mode"] = null
    if (inputModeRandomNumbersRadio.checked) {
        inputs["input_mode"] = RANDOM_NUMBERS
        if (randomNumbersByRangeRadio.checked) {
            inputs["input_method"] = BY_RANGE
            inputs["range_min"] = getNumericInput(rangeMinInput)
            inputs["range_max"] = getNumericInput(rangeMaxInput)
            inputs["range_interval"] = getNumericInput(rangeIntervalInput)
            inputs["range_exclude"] = getExcludeList(rangeExcludeInput)
        } else if (randomNumbersByFormulaRadio.checked) {
            inputs["input_method"] = BY_FORMULA
            inputs["options"] = parseFormula(formulaInput)
        }
    } else if (inputModeRandomDigitsRadio.checked) {
        inputs["input_mode"] = RANDOM_DIGITS
        var digitInfo = getDigitInfo()
        inputs["digit"] = digitInfo.digit
        inputs["from"] = digitInfo.from
        inputs["to"] = digitInfo.to
    }
    return inputs
}