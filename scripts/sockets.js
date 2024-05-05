import { createButton } from "./helpers/buttons.js"
import { handleLightEffectAndChangeLight } from "./lightSourceHandler.js"
let socket 

Hooks.once("setup", () =>{
    socket = socketlib.registerModule("inchryptians-easy-lightsource-handling")
    socket.register("askOtherPlayerForLight", askOtherPlayerForLight)
    socket.register("deleteLightGM", deleteLightGM)
    socket.register("offerLightSourceForPlayer", offerLightSourceForPlayer)
})

export function askForLight(request){
    socket.executeForEveryone("askOtherPlayerForLight", request)
}

export function deleteLight(closeLightItem){
    socket.executeAsGM("deleteLightGM", closeLightItem.object.id)
}

export async function offerLightSource(lightSource) {
    if(game.user.targets.length < 1){
        return
    }

    if(game.user.targets.length > 1){
        return
    }
    const users = Object.keys(game.user.targets.first().actor.ownership)
    socket.executeForUsers("offerLightSourceForPlayer", users, game.user.targets.first().id, lightSource)
}

export function takeLightSource() {

}

function askOtherPlayerForLight(request){
    if(!game.settings.get("inchryptians-easy-lightsource-handling", "lightRequestsForAdmin") && game.user.isGM) return
    let targetedTokens = canvas.tokens.ownedTokens.filter( token => request.userTargets.includes(token.id) )
    for(let token of targetedTokens){
        if(!token.owner) continue
        let acceptButton = createButton("Zulassen", () => handleLightEffectAndChangeLight(token, request.lightInfos))
        let declineButton = createButton("Ablehnen", () => {} , false)
        new foundry.applications.api.DialogV2({
            window: { title: "Licht Angebot" },
            content: "Jemand wirkt einen Licht-Zauber auf dich",
            buttons: [
                acceptButton,
                declineButton
            ],
        }).render(true)        
    }
}

function deleteLightGM(closeLightItemTokenId){
    canvas.tokens.get(closeLightItemTokenId).document.delete()
}

async function offerLightSourceForPlayer(target, lightSource){
    if(game.user.isGM) return
    const token = canvas.tokens.ownedTokens.find( token => target === token.id )
    handleLightEffectAndChangeLight(token, lightSource)
}