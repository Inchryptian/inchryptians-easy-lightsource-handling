export function createLightButton() {
    let button = document.createElement('div')

    button.classList.add('control-icon')
    button.classList.add('artwork-open')
    button.innerHTML = `<i class="fas fa-image fa-fw"></i>`
    button.title = 'Show Art'

    return $(button)
}
