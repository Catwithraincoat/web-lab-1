let x = 0
let y = 0
let r = 1

const xButtons = Array.from(document.getElementsByClassName('x_button'))
const yInput = document.getElementById('y_input')
const rCheckboxes = Array.from(document.getElementsByClassName('rki'))


const changeXHandler = (newX) => {
    x = parseFloat(newX)
    xButtons.forEach(xButton => {
        if (xButton.value !== newX) {
            xButton.classList.remove('chosen')
        } else {
            xButton.classList.add('chosen')
        }

    })

}

const changeYHandler = (newY) => {
    if (newY.match(/[+-]?([0-9]*[.])?[0-9]+/) && newY < 5 && newY > -5) {
        y = parseFloat(newY)
    }
    if (['', '-'].includes(newY)) {
        y = 0
    } else {
        yInput.value = y
    }

    console.log(`new y - ${y}`)
}

const changeRHandler = (newR) => {
    r = parseFloat(newR)
    rCheckboxes.forEach(rCheckbox => {
        if (rCheckbox.value !== newR) {
            rCheckbox.checked = false
        }
    })
}


const addEventListeners = () => {
    // add event listeners for X buttons
    xButtons.forEach(xButton => {
        xButton.addEventListener('click', (event) => {
            changeXHandler(xButton.value)
        })
    })
    //add event listener for Y input
    yInput.addEventListener('input', (event) => {
        changeYHandler(yInput.value)
    })

    //addEventListeners for R checkboxes
    const rCheckboxes = Array.from(document.getElementsByClassName('rki'))
    rCheckboxes.forEach(rCheckbox => {
        rCheckbox.addEventListener('change', event => {
            console.log(event)
            console.log(rCheckbox.value)
            changeRHandler(rCheckbox.value)
        })
    })

}
addEventListeners()

document.getElementById('sendInfo').addEventListener('click', () => {
    let formData = new FormData();
    formData.append('x', x)
    formData.append('y', y)
    formData.append('r', r)
    fetch('/server.php', {body: formData, method: 'POST'}).then(res => {
        res.text().then(data=>{
            document.getElementById('result').innerHTML = data
            console.log(data);

        })

    })

})

