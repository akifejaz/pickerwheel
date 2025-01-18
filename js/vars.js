var RANDOM_NUMBERS = 0
var RANDOM_DIGITS = 1

var BY_RANGE = 0
var BY_FORMULA = 1

var MAX_OPTIONS_ALLOWED = 1000

var selectedDigit = null
var numDigits = 3

var colorOptions = [
    {
        "color1": "#3d52a0", "text1": "#ede8f5",
        "color2": "#7091e6", "text2": "#12170a",
        "color3": "#8697c4", "text3": "#12170a",
        "color4": "#adbbda", "text4": "#12170a"
    },
    {
        "color1": "#2b580c", "text1": "#ede8f5",
        "color2": "#f7b71d", "text2": "#12170a",
        "color3": "#afa939", "text3": "#12170a",
        "color4": "#fdef96", "text4": "#12170a"
    },
    {
        "color1": "#343434", "text1": "#ede8f5",
        "color2": "#e2434b", "text2": "#ede8f5",
        "color3": "#f9bf8f", "text3": "#12170a",
        "color4": "#fee9d7", "text4": "#12170a"
    },
    {
        "color1": "#283c63", "text1": "#ede8f5",
        "color2": "#f85f73", "text2": "#ede8f5",
        "color3": "#928a97", "text3": "#ede8f5",
        "color4": "#fbe8d3", "text4": "#12170a"
    },
    {
        "color1": "#1f4e5f", "text1": "#ede8f5",
        "color2": "#79a8a9", "text2": "#ede8f5",
        "color3": "#aacfd0", "text3": "#12170a",
        "color4": "#f4f7f7", "text4": "#12170a"
    },
    {
        "color1": "#1e2022", "text1": "#ede8f5",
        "color2": "#52616b", "text2": "#ede8f5",
        "color3": "#c9d6df", "text3": "#12170a",
        "color4": "#f0f5f9", "text4": "#12170a"
    },
]

var selectedColors = 0
var colors = colorOptions[selectedColors]

var bgColorOptions = ["#7091e6", "#b1bda8", "#a6a6b9", "#c0aab1", "#c2c190", "#c2a490"]
var selectedBgColor = 0
var bgColor = bgColorOptions[selectedBgColor]

var hist = []