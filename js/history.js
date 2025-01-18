function makeHistoryCard(idx, value) {
    html = ""
    html += "<div class='history-entry'>\n"
    html += "    <div>" + idx.toString() + "</div>\n"
    html += "    <div>" + value.toString() + "</div>\n"
    html += "    <div>\n"
    html += "        <a>\n"
    html += "        <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-file-earmark-text' viewBox='0 0 16 16'>\n"
    html += "            <path d='M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5'/>\n"
    html += "            <path d='M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z'/>\n"
    html += "        </svg>\n"
    html += "        </a>"
    html += "    </div>\n"
    html += "</div>\n"
    return html
}

function makeFullHistory() {
    html = ""
    for (i = 0; i < hist.length; i++) {
        html += makeHistoryCard(i + 1, hist[i])
    }
    return html
}

function showHistory() {
    historyDiv.innerHTML = makeFullHistory()
    historyModal.classList.remove("no-display")
}

function hideHistory() {
    historyModal.classList.add("no-display")
}

historyButton.addEventListener("click", showHistory)
historyCloseButton.addEventListener("click", hideHistory)