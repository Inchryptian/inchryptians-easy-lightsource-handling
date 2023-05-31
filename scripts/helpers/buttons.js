export function createLightButton() {
    let button = document.createElement('div')

    button.classList.add('control-icon')
    button.classList.add('artwork-open')
    button.innerHTML = `<i class="fas fa-lightbulb"></i>`
    button.title = 'Handle Light'

    return $(button)
}

export function createButton(label, callbackFunction, active = true) {
    return {
        label: label,
        callback: callbackFunction,
        icon: `<i class="fas fa-${active ? "check" : "times"}"></i>`
    }
}
