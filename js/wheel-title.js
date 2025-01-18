
function updateWheelTitle() {
    wheel.updateTitleAndDesc()
}

function showTitleChangeModal() {
    titleChangeModal.classList.remove("no-display")
    wheelTitleInput.value = wheelTitle.innerHTML
    wheelDescInput.value = wheelDesc.innerHTML
}

function hideTitleChangeModal() {
    titleChangeModal.classList.add("no-display")
}

function saveTitleAndDesc() {
    wheel.setTitle(wheelTitleInput.value)
    wheel.setDesc(wheelDescInput.value)
    updateWheelTitle()
    hideTitleChangeModal()
}

window.addEventListener("load", updateWheelTitle)
titleChangeButton.addEventListener("click", showTitleChangeModal)
wheelTitleSaveButton.addEventListener("click", saveTitleAndDesc)
wheelTitleCancelButton.addEventListener("click", hideTitleChangeModal)