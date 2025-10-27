// VARIABLES, CONSTANTS

const convertNumber = document.getElementById("convert-number")
const convertBtn = document.getElementById("convert-btn")

const lengthResult = document.getElementById("length-result")
const volumeResult = document.getElementById("volume-result")
const massResult = document.getElementById("mass-result")

const meterFeet = 3.281
const literGallon = 0.264
const kilogramPound = 2.204

// FUNCTIONS

function converter(num, conv) {
    const unitOne = (num * conv).toFixed(2)
    const unitTwo = (num / conv).toFixed(2)

    return [unitOne, unitTwo]
}

function render(el, arr, metric, imperial) {
     el.textContent = `${convertNumber.value} ${metric} = ${arr[0]} ${imperial} | ${convertNumber.value} ${imperial} = ${arr[1]} ${metric}`
}

// CONVERT PROCESS

convertBtn.addEventListener("click", function() {
   const convertNumberValue = Number(convertNumber.value)

   if (isNaN(convertNumberValue)) {
    alert("Это не число, введи плиз верно ☝️")
    return
   }

   const convertedLength = converter(convertNumberValue, meterFeet)
   const convertedVolume = converter(convertNumberValue, literGallon)
   const convertedMass = converter(convertNumberValue, kilogramPound)

   render(lengthResult, convertedLength, "meters", "feet")
   render(volumeResult, convertedVolume, "liters", "gallons")
   render(massResult, convertedMass, "kilos", "pounds")
})