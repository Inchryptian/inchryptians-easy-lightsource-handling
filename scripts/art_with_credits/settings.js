const settingLists = {
    SETTINGS: [
      {
        key: "modifier",
        data: {
          name: "Modifier Key ",
          type: String,
          choices: {
            'shift': 'Shift',
            'ctrl': 'Ctrl',
            'alt': 'Alt',
          },
          default: 'shift',
          scope: "world",
          config: true,
          restricted: true,
        },
      },
      {
        key: "showTokenToEveryOne",
        data: {
          name: "Show token to everyone key: ",
          hint: "Modifier Key + this key will open the token art to everyone",
          type: String,
          default: 'Z',
          scope: "world",
          config: true,
          restricted: true,
        },
      },
      {
        key: "showArtToEveryOne",
        data: {
          name: "Show art to everyone key: ",
          hint: "Modifier Key + this key will open the main art to everyone",
          type: String,
          default: 'X',
          scope: "world",
          config: true,
          restricted: true,
        },
      },
      {
        key: "openToken",
        data: {
          name: "Open Token art: ",
          hint: "Modifier Key + this key will open token art",
          type: String,
          default: 'V',
          scope: "world",
          config: true,
          restricted: true,
        },
      },
      {
        key: "openArt",
        data: {
          name: "Open main art: ",
          hint: "Modifier Key + this key will open main art",
          type: String,
          default: 'B',
          scope: "world",
          config: true,
          restricted: true,
        },
      },
    ]
  }
  
  const registerSetting = (key, data) => {
    game.settings.register('inchryptians-easy-lightsource-handling', key, data);
  }
  
  const getSetting = (key) => {
    return game.settings.get('inchryptians-easy-lightsource-handling', key);
  }
  
  const getMacroKey = (key) => game.settings.get('inchryptians-easy-lightsource-handling', key).toLowerCase()
  
  const setSetting = (key, data) => {
    return game.settings.set('inchryptians-easy-lightsource-handling', key, data);
  }
  
  const isCorrectModifierPressed = (event) => {
    switch (getSetting('modifier')) {
      case 'shift':
        return event.shiftKey;
      case 'ctrl':
        return event.ctrlKey;
      case 'alt':
        return event.altKey;
    }
  }
  
  const registerSettings = () => {
    settingLists.SETTINGS.forEach((setting) => {
      registerSetting(setting.key, setting.data);
    });
  }
  
  export {registerSettings, setSetting, getSetting, getMacroKey, isCorrectModifierPressed}