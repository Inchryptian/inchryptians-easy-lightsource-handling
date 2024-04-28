import { NO_LIGHT_SOURCES_AVAILABLE_OR_CLOSE } from "../constants.js"

function checkDistance(token, lightSource, distance) {
    let xVal = lightSource.x - token.x
    if (!(xVal <= distance && xVal >= -distance)) return false
    let yVal = lightSource.y - token.y
    if (!(yVal <= distance && yVal >= -distance)) return false
    return true
}

export function useDdbItems() {
    if (game.packs.get("world.ddb-data-hub-items") == undefined) return false
    return game.settings.get("inchryptians-easy-lightsource-handling", "ddbItems")
}

export function adminMode() {
    return game.settings.get("inchryptians-easy-lightsource-handling", "adminMode") && game.user.isGM
}

export function checkIfLightItemIsClose(token, lightInfos) {
    let allLightSources = canvas.tokens.objects.children
    for (let lightSource of allLightSources) {
        if (lightSource.actor == null) continue
        if (lightInfos.droppedItemName != lightSource.actor.name) continue
        if (!checkDistance(token, lightSource, 100)) continue
        //lightSource.document.delete()
        return
    }

    allLightSources = canvas.effects.lightSources.filter(filteringLightSource => {
        if (filteringLightSource.object == null) return
        const lightSourceDocument = filteringLightSource.object.document
        if (lightSourceDocument === undefined) return
        if ("light" in lightSourceDocument) return lightSourceDocument.light.dim == lightInfos.data.light.dim
        if ("config" in lightSourceDocument) return lightSourceDocument.config.dim == lightInfos.data.light.dim
    })
    
    for (let lightSource of allLightSources) {
        if (lightSource.actor != undefined) continue
        if (!checkDistance(token, lightSource, 150)) continue
        //lightSource.object.document.delete()
        return
    }
    return NO_LIGHT_SOURCES_AVAILABLE_OR_CLOSE
}