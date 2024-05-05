import { LIGHT_SPELL_INFOS, LIGHT_BUTTONS_ORDER } from "../constants.js"
import { dropLightItem, handleLightEffectAndChangeLight, getEffect, handleLightSpell, handleLightItem } from "../lightSourceHandler.js"
import { askForLight } from "../sockets.js"
import { createButton, createLightSourceButtonObjects } from "./buttons.js"
import { adminMode } from "./checks.js"

export function activeLightItemDialog(token, lightInfos) {
    let dropLightItemButton = createButton(`${lightInfos.germanName} fallen lassen`, () => {
        ui.notifications.info(`${lightInfos.germanName} fallen gelassen`)
        dropLightItem(token, lightInfos)
        handleLightEffectAndChangeLight(token, lightInfos)
    }, false)

    let extinguishTorchButton = createButton(`${lightInfos.germanName} löschen`, () => {
        ui.notifications.info(`${lightInfos.germanName} gelöscht`)
        handleLightEffectAndChangeLight(token, lightInfos)
    }, false)

    let passOnButton = createButton(`${lightInfos.germanName} weitergeben`, () => {
        ui.notifications.info(`${lightInfos.germanName} weiter gegeben`)
        handleLightEffectAndChangeLight(token, lightInfos)
    }, false)

    new foundry.applications.api.DialogV2({
        window: { title: `${lightInfos.germanName} löschen, fallen lassen oder weiter geben`},
        content: "",
        buttons: [
            passOnButton,
            dropLightItemButton,
            extinguishTorchButton
        ]
    }).render(true);
}

export function createMainDialog(token) {
    let mainMenuButtons = []
    for (let infos of LIGHT_BUTTONS_ORDER.filter(info => info != LIGHT_SPELL_INFOS)) { mainMenuButtons = addItemButtonsToMenu(mainMenuButtons, token, infos) }

    mainMenuButtons = addSpellButtonToMenu(mainMenuButtons, token, LIGHT_SPELL_INFOS)

    if (mainMenuButtons.length == 1) {
        mainMenuButtons[0].callback()
    }
    if (Object.keys(mainMenuButtons).length > 1) {
        new foundry.applications.api.DialogV2({
            window: {title: "Lichtquellen Bedienen"},
            content: "",
            buttons: mainMenuButtons
        }).render({ force: true})
    }
    if (foundry.utils.isEmpty(mainMenuButtons)) {
        ui.notifications.error(`Keine Lichtquellen im Inventar oder in der Nähe`)
        return
    }
}

export function createDialogForLightSpell(token, spellInfos){
    new foundry.applications.api.DialogV2({
        window: { label: "Farbe des Lightspells" },
        content: "<input type=\"color\" value=\"#000000\" data-edit=\"pickColorForLightSpell\"/>",
        buttons: [{
            label: "LightSpell Farbe",
            callback: e => {
                ui.notifications.info(`${spellInfos.germanName} gewirkt`)
                let spelldata = spellInfos.data
                spelldata.light.color = $("input[data-edit='pickColorForLightSpell']").val()
                let userTargets = game.user.targets
                if (userTargets.size > 0) {
                    return askForLight({
                        userTargets: userTargets.ids,
                        lightInfos: spellInfos
                    })
                }
                handleLightEffectAndChangeLight(token, spellInfos)
            },
            icon: ["fas fa-check"]
        }],
    }).render(true)
}

function addItemButtonsToMenu(mainMenuButtons, token, lightInfos) {
    let lightItemButtons = createLightSourceButtonObjects(token, lightInfos)
    let handleLightItemButton = createButton(lightInfos.germanName, () => handleLightItem(token, lightItemButtons, lightInfos), getEffect(token, lightInfos) != undefined, lightInfos.effect.img)
    if (Object.keys(lightItemButtons).length > 0 || getEffect(token, lightInfos)) mainMenuButtons.push(handleLightItemButton)
    return mainMenuButtons
}

function addSpellButtonToMenu(mainMenuButtons, token, spellInfos) {
    let effect = getEffect(token, spellInfos)
    if (token.actor.items.find(e => e.name == "Light") == undefined && !effect && !adminMode()) return mainMenuButtons

    let lightSpellButton = createButton(spellInfos.germanName, () => handleLightSpell(token, spellInfos, effect), effect != undefined, spellInfos.effect.img)
    mainMenuButtons.push(lightSpellButton)
    return mainMenuButtons
}