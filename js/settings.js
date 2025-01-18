settingsButton = document.getElementById("settings-button")
settingsModal = document.getElementById("settings-modal")

settingsTabs = document.querySelectorAll("#settings-tabs-div div")
settingsDivs = document.querySelectorAll(".settings-div")

function functionalizeTabs() {
    settingsTabs.forEach(tab => {
        if (document.getElementById(tab.getAttribute("target"))) {
            tab.addEventListener("click", () => {
                settingsTabs.forEach(t => {
                    t.classList.remove("selected")
                })
                settingsDivs.forEach(d => {
                    d.classList.add("no-display")
                })
                tab.classList.add("selected")
                document.getElementById(tab.getAttribute("target")).classList.remove("no-display")
            })
        }
    })
}

nameInput = document.getElementById("wheel-name-input")
titleInput = document.getElementById("wheel-title-input")
descInput = document.getElementById("wheel-desc-input")
speedInput = document.getElementById("wheel-speed-input")
timeInput = document.getElementById("wheel-time-input")

wheelColorsInputDiv = document.getElementById("colors-2d-radios-div")

function makeWheelColorsInput() {
    html = ""
    fullHtml = ""
    for (i = 0; i < colorOptions.length; i++) {
        html = ""
        html += "<input type='radio' class='no-display' name='wheel-colors' id='wheel-colors-" + i.toString() + "'"
        if (i == selectedColors) { html += " checked" }
        html += ">\n"
        html += "<label for='wheel-colors-" + i.toString() + "'>\n"
        html += "<div class='color-table' num='" + i.toString() + "'>\n"
        for (j = 0; j < 4; j++) {
            html += "<div style='background-color: " + colorOptions[i]["color" + (j + 1).toString()] + ";'></div>"
        }
        html += "</div>\n"
        html += "</label>\n"
        fullHtml += html
    }
    wheelColorsInputDiv.innerHTML = fullHtml
}

bgColorsInputDiv = document.getElementById("bg-color-settings-div")

function makeBgColorsInput() {
    html = ""
    for (i = 0; i < bgColorOptions.length; i++) {
        html += "<input type='radio' class='no-display' name='wheel-bg-color' id='wheel-bg-color-" + i.toString() + "'"
        if (i == selectedBgColor) { html += " checked" }
        html += ">\n"
        html += "<label for='wheel-bg-color-" + i.toString() + "'>\n"
        html += "<div class='color-div' num='" + i.toString() + "'>\n"
        html += "<div style='background-color: " + bgColorOptions[i] + "' num='" + i.toString() + "'></div>\n</div>\n"
        html += "</label>\n"
    }
    bgColorsInputDiv.innerHTML = html
}

function showSettings() {
    nameInput.value = wheel.name
    titleInput.value = wheel.title
    descInput.value = wheel.desc
    speedInput.value = wheel.speedLevel
    timeInput.value = parseInt(wheel.spinTime / 1000)
    settingsModal.classList.remove("no-display")
}

function hideSettings() {
    settingsModal.classList.add("no-display")
}

function getInputs() {
    res = {}
    res["name"] = nameInput.value
    res["title"] = titleInput.value
    res["desc"] = descInput.value
    res["speed"] = parseInt(speedInput.value)
    res["time"] = parseInt(timeInput.value)
    wheelColorsRadios = document.querySelectorAll("#colors-2d-radios-div input[type='radio']")
    wheelColorsRadios.forEach(radio => {
        if (radio.checked) {
            selectedColors = parseInt(document.querySelector("#" + radio.getAttribute("id") + "+label div").getAttribute("num"))
        }
    });
    bgColorsRadios = document.querySelectorAll("#bg-color-settings-div input[type='radio']")
    bgColorsRadios.forEach(radio => {
        if (radio.checked) {
            selectedBgColor = parseInt(document.querySelector("#" + radio.getAttribute("id") + "+label div").getAttribute("num"))
        }
    })
    return res
}

function saveSettings() {
    inputs = getInputs()
    wheel.setName(inputs.name)
    wheel.setTitle(inputs.title)
    wheel.setDesc(inputs.desc)
    wheel.setSpeed(inputs.speed)
    wheel.setTime(inputs.time * 1000)
    wheel.setColors(colorOptions[selectedColors])
    wheel.setBgColor(bgColorOptions[selectedBgColor])
    hideSettings()
    updateWheel()
}

window.addEventListener("load", () => {
    functionalizeTabs();
    makeWheelColorsInput();
    makeBgColorsInput();
})

settingsButton.addEventListener("click", showSettings)

closeButton = document.getElementById("settings-close-button")
closeButton.addEventListener("click", hideSettings)
saveButton = document.getElementById("settings-save-button")
saveButton.addEventListener("click", saveSettings)
cancelButton = document.getElementById("settings-cancel-button")
cancelButton.addEventListener("click", hideSettings)