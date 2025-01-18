canvas = document.getElementById("wheel-canvas")
context = canvas.getContext("2d")
canvasW = canvas.width
canvasH = canvas.height

function findMaxOptionLength(list) {
    m = 0
    for (let i = 0; i < list.length; i++) {
        if (list[i].toString().length > m) m = list[i].toString().length
    }
    return m;
}

class Wheel {
    constructor(name, options, colors, bgColor, speedLevel, spinTime, input_mode) {
        this.name = name
        this.title = "Random Wheel"
        this.desc = "Spin the wheel to get a random number"
        this.setColors(colors)
        this.setBgColor(bgColor)
        this.speedLevel = speedLevel
        this.spinTime = spinTime
        this.currAngle = 0
        this.animationId = null
        this.input_mode = input_mode
        this.digit = null
        this.changeOptions(options)
    }

    setColors(colors) {
        var root = document.querySelector(":root")
        root.style.setProperty("--color-1", colors["color1"])
        root.style.setProperty("--color-2", colors["color2"])
        root.style.setProperty("--color-3", colors["color3"])
        root.style.setProperty("--color-4", colors["color4"])
        root.style.setProperty("--text-color-1", colors["text1"])
        root.style.setProperty("--text-color-2", colors["text2"])
        root.style.setProperty("--text-color-3", colors["text3"])
        root.style.setProperty("--text-color-4", colors["text4"])
        this.colors = colors
    }

    setBgColor(bgColor) {
        var root = document.querySelector(":root")
        root.style.setProperty("--background", bgColor)
        this.bgColor = bgColor
    }

    makeOptions(inputs) {
        var options = []
        if (inputs.input_mode === RANDOM_NUMBERS) {
            this.input_mode = inputs.input_mode
            if (inputs.input_method === BY_RANGE) {
                if (
                    inputs.range_min === null ||
                    inputs.range_max === null ||
                    inputs.range_interval === null ||
                    inputs.range_exclude === null
                ) {
                    options = []
                }
                options = makeListByRange(inputs.range_min, inputs.range_max, inputs.range_interval, inputs.range_exclude)
            } else if (inputs.input_method === BY_FORMULA) {
                options = inputs.options
            }
        }

        else if (inputs.input_mode === RANDOM_DIGITS) {
            this.input_mode = inputs.input_mode
            this.digit = inputs.digit
            for (let i = inputs.from; i <= inputs.to; i++) options.push(i)
        }

        else {
            options = []
        }

        if (options.length > MAX_OPTIONS_ALLOWED) return []
        return options
    }

    draw() {
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.translate(canvasW / 2, canvasH / 2)
        context.rotate(this.currAngle)
        if (this.options.length == 0) {
            var list = ["YES", "NO", "YES", "NO", "YES", "NO", "YES", "NO", "YES", "NO"]
        } else {
            var list = this.options
        }
        var anglePerOption = 2 * Math.PI / list.length
        var maxOptionLength = findMaxOptionLength(list)
        var x = 300 * Math.sin(anglePerOption / 2)
        var y = 300 * Math.cos(anglePerOption / 2)
        var fontSize = 2 * x * 0.75 / maxOptionLength
        if (fontSize > 30) fontSize = 30

        for (let i = 0; i < list.length; i++) {
            context.beginPath()
            context.moveTo(0, 0)
            context.lineTo(-x, -y)
            context.arc(0, 0, 300, 1.5 * Math.PI - anglePerOption / 2, 1.5 * Math.PI + anglePerOption / 2, false)
            context.lineTo(0, 0)
            context.fillStyle = this.colors["color" + (i % 4 + 1).toString()]
            context.fill()
            context.beginPath()
            context.moveTo(0, 0)
            context.lineTo(-x, -y)
            context.arc(0, 0, 300, 1.5 * Math.PI - anglePerOption / 2, 1.5 * Math.PI + anglePerOption / 2, false)
            context.lineTo(0, 0)
            context.strokeStyle = "#ffffff"
            context.stroke()
            context.font = "bold " + fontSize + "px Calibri"
            context.textAlign = "center"
            context.textBaseLine = "middle"
            context.fillStyle = this.colors["text" + (i % 4 + 1).toString()]
            context.fillText(list[i].toString(), 0, -300 + fontSize * 1.2)
            context.rotate(anglePerOption)
        }
    }

    shuffle() {
        for (let i = this.options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.options[i], this.options[j]] = [this.options[j], this.options[i]];
        }
        this.changeOptions(this.options)
    }

    getResult() {
        if (this.options.length == 0) {
            var list = ["YES", "NO", "YES", "NO", "YES", "NO", "YES", "NO", "YES", "NO"]
        } else {
            var list = this.options
        }
        var anglePerOption = 2 * Math.PI / list.length
        var angle = this.currAngle - anglePerOption / 2
        angle = angle % (2 * Math.PI)
        var idx = Math.floor(angle / anglePerOption)
        var result = list[list.length - 1 - idx]
        return result
    }

    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    changeOptions(options) {
        this.options = options
        this.stop()
        this.draw()
    }

    changeOptionsByInput(inputs) {
        this.changeOptions(this.makeOptions(inputs))
    }

    setName(name) {
        this.name = name
    }

    setTitle(title) {
        this.title = title
    }

    setDesc(desc) {
        this.desc = desc
    }

    setSpeed(speed) {
        if (!isNaN(speed))
            this.speedLevel = speed
    }

    setTime(time) {
        if (!isNaN(time))
            this.spinTime = time
    }

    updateTitleAndDesc() {
        wheelTitle.innerHTML = this.title
        wheelDesc.innerHTML = this.desc
    }
}

function showResult(wheel) {
    result = wheel.getResult()
    if (!isNaN(parseInt(result))) {
        hist.push(parseInt(result))
    }
    if (wheel.input_mode == RANDOM_NUMBERS) {
        resultModalMessage.innerHTML = "The result is " + result + "!"
        resultModal.classList.remove("no-display")
    } else {
        lockDigit(result)
        notDone = selectNext()
        if (!notDone) {
            overallResult = makeDigitsResult()
            resultModalMessage.innerHTML = "The result is " + overallResult + "!"
            resultModal.classList.remove("no-display")
        }
    }
    wheel.animationId = null
}

function spinWheel(wheel) {
    var currentTime = 0
    var maxSpeed = (wheel.speedLevel / 50) * (0.8 + 0.4 * Math.random())
    var duration = wheel.spinTime * (0.8 + 0.4 * Math.random())
    var accelerationTime = duration / 5
    if (accelerationTime > 2000) accelerationTime = 2000
    var acceleration = maxSpeed / accelerationTime
    var speed = 0
    var lastTimestamp = 0

    function animate(timestamp) {
        if (lastTimestamp === 0) lastTimestamp = timestamp;
        const elapsed = timestamp - lastTimestamp;
        lastTimestamp = timestamp;
        currentTime += elapsed;

        if (currentTime < accelerationTime) {
            speed += acceleration * elapsed;
        } else if (currentTime > duration - accelerationTime) {
            speed -= acceleration * elapsed;
        }

        speed = Math.max(0, Math.min(maxSpeed, speed));
        wheel.currAngle += speed;

        wheel.draw()

        if (currentTime < duration) {
            wheel.animationId = requestAnimationFrame(animate);
        } else {
            showResult(wheel)
        }
    }

    if (wheel.animationId === null)
        wheel.animationId = requestAnimationFrame(animate);
}

wheel = new Wheel("Wheel1", [], colors, bgColor, 5, 5000, RANDOM_NUMBERS)
