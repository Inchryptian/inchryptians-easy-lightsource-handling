import {setImageSize, MediaDisplayApp, setExtraData} from './MediaDisplayApp.js';
import {getMacroKey, getPressedModifier} from './settings.js';

const createArtButton = () => {
  let button = document.createElement('div');

  button.classList.add('control-icon');
  button.classList.add('artwork-open');
  button.innerHTML = `<i class="fas fa-image fa-fw"></i>`;
  button.title = 'Show Art';

  return $(button);
};

const createReceivedMediaDisplayApp = (receivedObject) => {
  const img = new Image();
  img.onload = () => {
    setImageSize({w: img.width, h: img.height});
    setExtraData(receivedObject.type, receivedObject.actorId);

    new MediaDisplayApp(receivedObject.imgPath, receivedObject.text, game.actors.get(receivedObject.actorId), receivedObject.type, game.user.isGM).render(true);
  };

  img.src = receivedObject.imgPath;
};

const createNewMediaDisplayApp = (imagePath, actor, type) => {
  const img = new Image();
  img.onload = () => {
    setImageSize({w: img.width, h: img.height});
    setExtraData(type, actor.id);

    new MediaDisplayApp(
      imagePath,
      actor.getFlag('inchryptians-easy-lightsource-handling', `Author-${type}`),
      actor,
      type,
      game.user.isGM,
    ).render(true);
  };

  img.src = imagePath;
};

const receiveSharedImages = (receivedObject) => {
  createReceivedMediaDisplayApp(receivedObject);
};

const shareImage = async (imgPath, text, actorId, type) => {
  await game.socket.emit('module.inchryptians-easy-lightsource-handling', {
    imgPath: imgPath,
    text: text,
    actorId: actorId,
    type: type
  });
};

const prepTokenKeybinding = (token, control) => {
  const doc = $(document);
  doc.off('keydown.inchryptians-easy-lightsource-handling');
  doc.off('keyup.inchryptians-easy-lightsource-handling');
  if (!control) return;
  const actor = game.actors.get(token.actor.id);
  const image = actor.img;
  const tokenImage = token.document.texture.src;

  doc.on('keydown.inchryptians-easy-lightsource-handling', (event) => keyDownEventHandler(event, image, tokenImage, actor));
  doc.on('keyup.inchryptians-easy-lightsource-handling', (event => keyUpEventHandler(event, actor)))
};

async function keyDownEventHandler(event, image, tokenImage, actor){
  const showTokenToEveryone = getPressedModifier(event) && event.key.toLowerCase() === getMacroKey('showTokenToEveryOne') && game.user.isGM
  const showArtToEveryone = getPressedModifier(event) && event.key.toLowerCase() === getMacroKey('showArtToEveryOne') && game.user.isGM
  const showToken = getPressedModifier(event) && event.key.toLowerCase() === getMacroKey('openToken')
  const showArt = getPressedModifier(event) && event.key.toLowerCase() === getMacroKey('openArt')
  
  if (showTokenToEveryone) {
    createNewMediaDisplayApp(tokenImage, actor, 'token');
    return await shareImage(tokenImage, actor.getFlag('inchryptians-easy-lightsource-handling', 'Author-token'), actor.id, 'token');
  }
  if (showArtToEveryone) {
    createNewMediaDisplayApp(image, actor, 'main');
    return await shareImage(image, actor.getFlag('inchryptians-easy-lightsource-handling', 'Author-main'), actor.id, 'main');
  }  
  if (showToken) {
    return createNewMediaDisplayApp(tokenImage, actor, 'token');
  }
  if (showArt) {
    return createNewMediaDisplayApp(image, actor, 'main');
  }
  
};

async function keyUpEventHandler(event, actor){
  const setUnconcious = getPressedModifier(event) && event.key.toLowerCase() === getMacroKey('setUnconcious')
  if (setUnconcious) {
    await actor.toggleStatusEffect("unconscious")
    await actor.toggleStatusEffect("prone")
    return 
  }
}

export { prepTokenKeybinding, receiveSharedImages, createArtButton, createNewMediaDisplayApp };