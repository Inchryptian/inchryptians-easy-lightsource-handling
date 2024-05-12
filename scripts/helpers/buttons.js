import { NO_LIGHT_SOURCES_AVAILABLE_OR_CLOSE, NO_LIGHT_SOURCES } from "../constants.js"
import { handleLightEffectAndChangeLight, activateLightSource, createOrAddItemToInventory } from "../lightSourceHandler.js"
import { useDdbItems, adminMode, checkIfLightItemIsClose } from "./checks.js"
import { deleteLight } from "../sockets.js"

export function createLightButton() {
    let button = document.createElement('div')

    button.classList.add('control-icon')
    button.classList.add('artwork-open')
    button.innerHTML = `<i class="fas fa-lightbulb"></i>`
    button.title = 'Handle Light'

    return $(button)
}

export function createButton(label, callbackFunction, active = true, picture = null) {
    const printLabel = (picture == null) ? label : `${label} <img src='${picture}' style="border:0;width:35px;height:35px;vertical-align:middle">`
    return {
        label: printLabel,
        action: label,
        callback: callbackFunction,
        icon: [active ? "fas fa-check" : "fas fa-times"]
    }
}

export function createLightSourceButtonObjects(token, lightInfos) {
    let buttons = []
    const closeLightItem = checkIfLightItemIsClose(token, lightInfos)
    if ( closeLightItem != NO_LIGHT_SOURCES_AVAILABLE_OR_CLOSE ){
        buttons.push(createButton(`${lightInfos.germanName} aufheben`, () => {
            ui.notifications.info(`${lightInfos.germanName} aufgehoben`)
            handleLightEffectAndChangeLight(token, lightInfos)
            if (closeLightItem.sourceId.includes("Token") && (closeLightItem.object.actor === null )) deleteLight(closeLightItem)
            if (adminMode()) return
            if (lightInfos.fuel != undefined) {
                createOrAddItemToInventory(token, lightInfos)
            }
        }))
    }
    
    let buttonForLighting = createButton(`Neue ${lightInfos.germanName} anzünden`, () => {
        ui.notifications.info(`${lightInfos.germanName} angezündet`)
        handleLightEffectAndChangeLight(token, lightInfos)
        if (adminMode()) return
        if (lightInfos.fuel) {
            let lightSourceFuel = token.actor.items.find(item => item.name == lightInfos[useDdbItems() ? "ddbFuel" : "fuel"])
            lightSourceFuel.update({ system: { quantity: lightSourceFuel.system.quantity - 1 } })
        } else {
            let lightSourceItem = token.actor.items.find(item => item.name == lightInfos[useDdbItems() ? "ddbItemName" : "itemName"])
            lightSourceItem.update({ system: { quantity: lightSourceItem.system.quantity - 1 } })
        }
    })
    
    if (activateLightSource(token, lightInfos) != NO_LIGHT_SOURCES) buttons.push(buttonForLighting)
    return buttons
}
