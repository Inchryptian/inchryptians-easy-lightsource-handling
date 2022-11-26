export function createLightButton() {
    let button = document.createElement('div')

    button.classList.add('control-icon')
    button.classList.add('artwork-open')
    button.innerHTML = `<i class="fas fa-lightbulb"></i>`
    button.title = 'Handle Light'

    return $(button)
}
