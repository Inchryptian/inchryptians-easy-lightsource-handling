import { NO_LIGHT_SOURCES_AVAILABLE_OR_CLOSE, NO_LIGHT_SOURCES } from "../constants.js"
import { handleLightEffectAndChangeLight, activateLightSource } from "../lightSourceHandler.js"
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

export function createButton(label, callbackFunction, active = true) {
    return {
        label: label,
        callback: callbackFunction,
        icon: `<i class="fas fa-${active ? "check" : "times"}"></i>`
    }
}

export function createLightSourceButtonObjects(token, lightInfos) {
    let buttons = {}
    const closeLightItem = checkIfLightItemIsClose(token, lightInfos)
    if ( closeLightItem != NO_LIGHT_SOURCES_AVAILABLE_OR_CLOSE){
        buttons.pickupButton = createButton(`${lightInfos.germanName} aufheben`, () => {
            ui.notifications.info(`${lightInfos.germanName} aufgehoben`)
            handleLightEffectAndChangeLight(token, lightInfos)
            if (closeLightItem.sourceId.includes("Token")) deleteLight(closeLightItem)
            if (adminMode()) return
            if (lightInfos.fuel != undefined) {
                let lightSourceItem = token.actor.items.find(item => item.name == lightInfos[useDdbItems() ? "ddbItemName" : "itemName"])
                if (lightSourceItem != undefined) {
                    lightSourceItem.update({ system: { quantity: lightSourceItem.system.quantity + 1 } })
                } else {
                    let compendiumItems = game.packs.get(useDdbItems() ? "world.ddb-data-hub-items" : "dnd5e.items")
                    let lightSourceItemId = compendiumItems.index.find(item => item.name == lightInfos[useDdbItems() ? "ddbItemName" : "itemName"])._id
                    compendiumItems.getDocument(lightSourceItemId)
                        .then(item => { token.actor.createEmbeddedDocuments("Item", [item]) })
                }
            }
        })
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
    
    if (activateLightSource(token, lightInfos) != NO_LIGHT_SOURCES) buttons.lightingButton = buttonForLighting
    return buttons
}
