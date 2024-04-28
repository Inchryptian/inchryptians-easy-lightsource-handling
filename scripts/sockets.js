import { createButton } from "./helpers/buttons.js"
import { handleLightEffectAndChangeLight } from "./lightSourceHandler.js"
let socket 

Hooks.once("setup", () =>{
    socket = socketlib.registerModule("inchryptians-easy-lightsource-handling")
    socket.register("askOtherPlayerForLight", askOtherPlayerForLight)
    socket.register("deleteLightGM", deleteLightGM)
})

export function askForLight(request){
    socket.executeForEveryone("askOtherPlayerForLight", request)
}

export function deleteLight(closeLightItem){
    socket.executeAsGM("deleteLightGM", closeLightItem.sourceId.split("Token.").pop())
}

function askOtherPlayerForLight(request){
    if(!game.settings.get("inchryptians-easy-lightsource-handling", "lightRequestsForAdmin") && game.user.isGM) return
    let targetedTokens = canvas.tokens.ownedTokens.filter( token => request.userTargets.includes(token.id) )
    for(let token of targetedTokens){
        if(!token.owner) continue
        let acceptButton = createButton("Zulassen", () => handleLightEffectAndChangeLight(token, request.lightInfos))
        let declineButton = createButton("Ablehnen", () => {} , false)
        new Dialog({
            title: "Licht Angebot",
            content: "Jemand wirkt einen Licht-Zauber auf dich",
            buttons: {
                acceptButton,
                declineButton
            },
        }).render(true)        
    }
}

export function deleteLightGM(closeLightItemTokenId){
    canvas.tokens.get(closeLightItemTokenId).document.delete()
}



