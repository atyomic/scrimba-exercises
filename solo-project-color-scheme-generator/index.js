const chooseColorForm = document.getElementById('choose-color-form')
const colorPicker = document.getElementById('color-picker')
const palettes = document.getElementById('palettes')
const getColorBtn = document.getElementById('get-color-btn')

const palette = document.getElementById('palette')
const paletteHex = document.getElementById('palette-hex')

getColorBtn.addEventListener("click", function(e) {
    e.preventDefault()

    const color = (colorPicker.value).slice(1);

    getColor(color, palettes.value)
})

function getColor(color, scheme) {
    fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${scheme}&count=5`)
        .then(request => request.json())
        .then(data => renderColor(data))
}

function renderColor(colorArr) {
    palette.innerHTML = ""
    paletteHex.innerHTML = ""

    colorArr.colors[0].hex.value

    for (let i = 0; i < colorArr.colors.length; i++) {
        palette.innerHTML += `
            <div class="color" 
                 style="background-color: ${colorArr.colors[i].hex.value}">
                 </div>
        `
    }

    for (let i = 0; i < colorArr.colors.length; i++) {
        paletteHex.innerHTML += `
            <p class="color-hex">${colorArr.colors[i].hex.value}</p>`
    }
}