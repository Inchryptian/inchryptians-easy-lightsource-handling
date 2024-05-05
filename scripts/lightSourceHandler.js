import { LIGHT_INFO_ORDER, NO_LIGHT_SOURCES } from "./constants.js"
import { useDdbItems, adminMode } from "./helpers/checks.js"
import { extinguishOrDropLightItemDialog, createDialogForLightSpell } from "./helpers/dialogs.js"

async function createDroppedLightItem(token, actor, lightInfos) {
    let protoToken = foundry.utils.duplicate(actor.prototypeToken)
    protoToken.x = token.center.x;
    protoToken.y = token.center.y;
    await canvas.scene.createEmbeddedDocuments("Token", [protoToken])
    if (adminMode()) return
    if (lightInfos.fuel != undefined) {
        let lightSourceItem = token.actor.items.find(e => e.name == lightInfos[useDdbItems() ? "ddbItemName" : "itemName"])
        lightSourceItem.update({ system: { quantity: lightSourceItem.system.quantity - 1 } })
    }
}

export function getEffect(token, lightInfo) {
    return token.actor.statuses.find(effect => effect == lightInfo.effect.id)
}

export function activateLightSource(token, lightInfos) {
    if (adminMode()) return
    let lightSources = token.actor.items.find( item => item.name == lightInfos[useDdbItems() ? "ddbItemName" : "itemName"])
    if (lightSources == undefined) return NO_LIGHT_SOURCES
    if (lightSources.system.quantity < 1) return NO_LIGHT_SOURCES
    if (lightInfos.fuel == undefined) return
    let fuelItem = token.actor.items.find( item => item.name == lightInfos[useDdbItems() ? "ddbFuel" : "fuel"])
    if (fuelItem == undefined) return NO_LIGHT_SOURCES
    if (fuelItem.system.quantity < 1) return NO_LIGHT_SOURCES
}

export function dropLightItem(token, lightInfos) {
    let actor = game.actors.getName(lightInfos.droppedItemName)
    if (actor == undefined) {
        let actorsPack = game.packs.get("inchryptians-easy-lightsource-handling.inchryptians-easy-lightsource-light-sources")
        let actorId = actorsPack.index.find(e => e.name == lightInfos.droppedItemName)._id
        actorsPack.getDocument(actorId).then(actor => {
            newActor = Actor.create(actor.data)
            createDroppedLightItem(token, newActor, lightInfos)
        })
        return
    }
    createDroppedLightItem(token, actor, lightInfos)
}

export async function handleLightEffectAndChangeLight(token, lightInfos) {
    await token.actor.toggleStatusEffect(lightInfos.effect.id)
    for (let lightInfo of LIGHT_INFO_ORDER) {
        let strongestEffect = getEffect(token, lightInfo)
        if (strongestEffect == undefined) continue
        if (!(lightInfo.buttonName == "light")) {
            lightInfo.data.light.color = game.settings.get("inchryptians-easy-lightsource-handling", "lightColor")
        }
        lightInfo.data.light.alpha = game.settings.get("inchryptians-easy-lightsource-handling", "lightAlpha")
        token.document.update(lightInfo.data)
        return
    }
    await token.document.update({ light: { dim: 0, bright: 0 } })
}

export function handleLightItem(token, buttons, lightInfos) {
    if (getEffect(token, lightInfos)) {
        extinguishOrDropLightItemDialog(token, lightInfos)
        return
    }
    if (Object.keys(buttons).length > 1) {
        new Dialog({
            title: `${lightInfos.germanName} aufheben oder neue anzünden`,
            buttons: buttons
        }).render(true);
        return
    }
    if (Object.keys(buttons).length == 1) {
        let buttonName = Object.keys(buttons)[0]
        buttons[buttonName].callback()
    }
}

export function handleLightSpell(token, spellInfos, effect) {
    if (effect) {
        ui.notifications.info(`${spellInfos.germanName} beendet`)
        handleLightEffectAndChangeLight(token, spellInfos)
    } else {
        createDialogForLightSpell(token, spellInfos)
    }
}